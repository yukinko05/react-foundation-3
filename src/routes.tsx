import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/home/Home';
import EditProfile from './pages/userProfile/EditProfile';
import CreateReview from './pages/bookReviewViews/CreateReview';

export default function RoutesComponent() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <EditProfile />
          </RequireAuth>
        }
      />
      <Route
        path="/new"
        element={
          <RequireAuth>
            <CreateReview />
          </RequireAuth>
        }
      />
      {/*TODO:NotFoundページ */}
    </Routes>
  );
}
