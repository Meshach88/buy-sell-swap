import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Shell } from './Shell.jsx';
import { Home } from '../pages/Home.jsx';
import { DesignSystem } from '../pages/DesignSystem.jsx';
import { ComingSoon } from '../pages/ComingSoon.jsx';

export function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="design" element={<DesignSystem />} />
        <Route path="*" element={<ComingSoon />} />
      </Route>
    </Routes>
  );
}
