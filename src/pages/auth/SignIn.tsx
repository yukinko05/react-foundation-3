import { useForm, SubmitHandler } from 'react-hook-form';
import { FC } from 'react';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { signIn } from '../../features/auth/authSlice';
import Header from '../../components/Header';
import axiosInstance from '../../api/axiosInstance';

interface LoginForm {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_cookies, setCookies] = useCookies();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axiosInstance.post('/signin', data);
      const token = response.data.token;
      setCookies('token', token);
      dispatch(signIn());
      navigate('/');
    } catch (error) {
      setErrorMessage(`ログインに失敗しました。${error}`);
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Header />
      <main className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          ログイン
        </h1>
        <p className="text-red-600">{errorMessage}</p>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                メールアドレス
              </label>
              <div className="mt-1">
                <input
                  {...register('email', {
                    required: 'メールアドレスは必須です',
                    pattern: {
                      value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
                      message: '正しいメールアドレスを入力してください',
                    },
                  })}
                  type="email"
                  id="email"
                  name="email"
                  className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 text-sm sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && <p className="pt-1.5 text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                パスワード
              </label>
              <div className="mt-1">
                <input
                  {...register('password', {
                    required: 'パスワードは必須です',
                    minLength: {
                      value: 8,
                      message: 'パスワードは8文字以上で入力してください',
                    },
                  })}
                  type="password"
                  id="password"
                  name="password"
                  className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 text-sm sm:text-sm sm:leading-6"
                />
              </div>
              {errors.password && <p className="pt-1.5 text-red-600">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md"
            >
              ログイン
            </button>
          </form>
        </div>
        <div className=" mt-2.5 text-right">
          <Link to="/signup" className="text-blue-600 hover:text-blue-400">
            新規登録はこちら
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
