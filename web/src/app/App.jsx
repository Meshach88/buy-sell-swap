import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Shell } from './Shell.jsx';
import { Home } from '../pages/Home.jsx';
import { DesignSystem } from '../pages/DesignSystem.jsx';
import { ComingSoon } from '../pages/ComingSoon.jsx';
import { Splash } from '../pages/auth/Splash.jsx';
import { Welcome } from '../pages/auth/Welcome.jsx';
import { SignupRole } from '../pages/auth/SignupRole.jsx';
import { SignupBuyer } from '../pages/auth/SignupBuyer.jsx';
import { SignupSeller } from '../pages/auth/SignupSeller.jsx';
import { VerifyOtp } from '../pages/auth/VerifyOtp.jsx';
import { Login } from '../pages/auth/Login.jsx';

export function App() {
  return (
    <Routes>
      {/* Full-screen: no header/bottom nav. */}
      <Route path="splash" element={<Splash />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="signup" element={<SignupRole />} />
      <Route path="signup/buyer" element={<SignupBuyer />} />
      <Route path="signup/seller" element={<SignupSeller />} />
      <Route path="verify" element={<VerifyOtp />} />
      <Route path="login" element={<Login />} />

      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="design" element={<DesignSystem />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
