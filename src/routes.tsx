import { Routes, Route } from 'react-router-dom';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/home/Home';
import EditProfile from './pages/userProfile/EditProfile';
import CreateReview from './pages/bookReviewViews/CreateReview';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { Navigate } from 'react-router-dom';

export default function RoutesComponent() {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      {isAuthenticated ? (
        <>
          <Route path="/profile" element={<EditProfile />} />
          <Route path="/new" element={<CreateReview />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/signin" />} />
      )}
      {/*TODO:NotFoundページ */}
    </Routes>
  );
}
