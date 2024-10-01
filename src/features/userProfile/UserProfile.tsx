import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { User } from '../../types';

const Users = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://railway.bookreview.techtrain.dev/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.data) {
          console.log(error.response.data.ErrorMessageJP);
        }
      }
    };
    fetchUserData();
  }, [token]);

  return <div>ユーザー名：{userData?.name}</div>;
};

export default Users;
