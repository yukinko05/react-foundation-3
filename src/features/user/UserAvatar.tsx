import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { fetchUserData } from './userSlice';
import { FaCircleUser } from 'react-icons/fa6';

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
      <div className="flex items-center">
        {userData?.iconUrl ? (
          <img src={userData?.iconUrl} alt="ユーザー画像" className="w-10 h-10 rounded-full" />
        ) : (
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <FaCircleUser className="w-10 h-10" />
          </div>
        )}
        <p className="ml-2">{userData?.name}</p>
      </div>
    </>
  );
};

export default Users;
