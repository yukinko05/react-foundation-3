import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { fetchUserData } from './userSlice';
const Users = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userData = useSelector((state: RootState) => state.user.userData);
  const fetchDispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  useEffect(() => {
    if (isAuthenticated) {
      fetchDispatch(fetchUserData(token));
    }
  }, [isAuthenticated, fetchDispatch, token]);

  return (
    <>
      <img src={userData?.iconUrl} alt="ユーザー画像" />
      <p>{userData?.name}</p>
    </>
  );
};

export default Users;
