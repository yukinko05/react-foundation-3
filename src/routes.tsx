import { Routes, Route } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import Home from './pages/home/Home';
import EditProfile from './pages/userProfile/EditProfile';
import CreateReview from './pages/bookReviewViews/CreateReview';
import NotFound from './pages/notFound/NotFound';
import BookReviewDetail from './pages/bookReviewViews/BookReviewDetail';
import EditBookReview from './pages/bookReviewViews/EditBookReview';

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
      <Route
        path="/detail/:id"
        element={
          <RequireAuth>
            <BookReviewDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <RequireAuth>
            <EditBookReview />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
