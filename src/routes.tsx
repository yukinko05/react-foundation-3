import { Routes, Route } from 'react-router-dom';
import SignIn from './features/auth/SignIn';
import SignUp from './features/auth/SignUp';
import Home from './features/home/Home';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}
