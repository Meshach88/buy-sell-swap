import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { App } from './App.jsx';
import { AuthProvider } from '../lib/auth.jsx';

function renderAt(path) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter initialEntries={[path]}>
        <AuthProvider><App /></AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

function jsonResponse(status, body) {
  return Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(body) });
}

describe('auth flow', () => {
  beforeEach(() => localStorage.clear());

  it('lets a buyer pick a role and see the matching signup form', async () => {
    renderAt('/signup');
    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();

    fireEvent.click(screen.getByText('I want to buy'));
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(await screen.findByText('Your details')).toBeInTheDocument();
  });

  it('registers a buyer, verifies the code and lands signed in on Home', async () => {
    globalThis.fetch = vi.fn((url) => {
      if (url.endsWith('/auth/register')) {
        return jsonResponse(201, { message: 'ok', phone: '08011112222', debug_code: '123456' });
      }
      if (url.endsWith('/auth/otp/verify')) {
        return jsonResponse(200, {
          token: 'test-token',
          user: { id: 1, name: 'Amina Bello', phone: '08011112222', roles: ['customer'], seller: null },
        });
      }
      if (url.endsWith('/health')) {
        return jsonResponse(200, { app: 'BuySellSwap', database: 'ok' });
      }
      return jsonResponse(404, {});
    });

    renderAt('/signup/buyer');

    fireEvent.change(screen.getByLabelText('Full name'), { target: { value: 'Amina Bello' } });
    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '08011112222' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create account' }));

    expect(await screen.findByText('Enter the code')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText('Code'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }));

    expect(await screen.findByText('Welcome back, Amina')).toBeInTheDocument();
    expect(localStorage.getItem('bss.token')).toBe('test-token');
  });

  it('shows a validation error on login when the API rejects the credentials', async () => {
    globalThis.fetch = vi.fn(() => jsonResponse(422, { message: "Those details don't match an account.", errors: { phone: ["Those details don't match an account."] } }));

    renderAt('/login');

    fireEvent.change(screen.getByLabelText('Phone number'), { target: { value: '08000000000' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrong' } });
    fireEvent.click(screen.getByRole('button', { name: 'Log in' }));

    expect(await screen.findByText("Those details don't match an account.")).toBeInTheDocument();
  });
});
