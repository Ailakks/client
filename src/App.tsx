import { Route, Routes, useLocation } from 'react-router-dom';
import OAuthLogin from './pages/oauth-login';

import "@repo/ui/styles/globals.css";

export default function App() {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/oauth/login" element={<OAuthLogin />} />
    </Routes>
  )
}