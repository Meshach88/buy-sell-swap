import { render, screen } from '@testing-library/react';
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

describe('App', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve({ app: 'BuySellSwap', database: 'ok' }) }));
  });

  it('shows the API status on the home page', async () => {
    renderAt('/');
    expect(await screen.findByText(/API and database ok/i)).toBeInTheDocument();
    expect(screen.getAllByText('BuySellSwap').length).toBeGreaterThan(0);
  });

  it('renders the design system page', () => {
    renderAt('/design');
    expect(screen.getByRole('heading', { name: 'Design system' })).toBeInTheDocument();
  });

  it('shows a placeholder for pages that are not built yet', () => {
    renderAt('/orders');
    expect(screen.getByText('Not built yet')).toBeInTheDocument();
  });
});
