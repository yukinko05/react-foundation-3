import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { fetchUserData } from './userSlice';
import { FaCircleUser } from 'react-icons/fa6';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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
        {userData ? (
          <>
            {userData?.iconUrl ? (
              <img src={userData?.iconUrl} alt="ユーザー画像" className="w-10 h-10 rounded-full" />
            ) : (
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center max-sm:w-7 max-sm:h-7">
                <FaCircleUser className="w-10 h-10" />
              </div>
            )}
            <p className="ml-2 max-sm:text-sm">{userData?.name}</p>
          </>
        ) : (
          <>
            <Skeleton circle={true} height={40} width={40} className="mr-2" />
            <Skeleton width={100} height={20} className="ml-2" />
          </>
        )}
      </div>
    </>
  );
};

export default Users;
