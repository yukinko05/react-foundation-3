import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  return children;
}

export default RequireAuth;