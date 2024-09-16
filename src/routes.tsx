import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
}