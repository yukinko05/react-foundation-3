import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { FC } from 'react';
import { AxiosError } from 'axios';
import { useCookies } from 'react-cookie';
import { Navigate, useNavigate, Link } from 'react-router-dom';
import Compressor from 'compressorjs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { signIn } from '../../features/auth/authSlice';
import Header from '../../components/Header';
import axiosInstance from '../../api/axiosInstance';

interface SignUpForm {
  name: string;
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [_cookies, setCookies] = useCookies();
  const [iconImg, setIconImg] = useState<Blob | File | null>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: 'onBlur' });

  const imageCompression = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    let quality;

    if (file.size > 5 * 1024 * 1024) {
      quality = 0.4;
    } else if (file.size < 2 * 1024 * 1024) {
      quality = 0.6;
    } else {
      quality = 0.8;
    }

    new Compressor(file, {
      quality,
      success: (compressedFile) => {
        setIconImg(compressedFile);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  };

  const onSubmit: SubmitHandler<SignUpForm> = async (data) => {
    try {
      const response = await axiosInstance.post('https://railway.bookreview.techtrain.dev/users', data);
      const token = response.data.token;
      setCookies('token', token);
      dispatch(signIn());

      if (iconImg) {
        const formData = new FormData();
        formData.append('icon', iconImg);

        await axiosInstance.post('https://railway.bookreview.techtrain.dev/uploads', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        setErrorMessage(error.response.data.ErrorMessageJP);
      }
    }
  };

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <Header />
      <main className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          新規登録
        </h1>
        <p className="text-red-600">{errorMessage}</p>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                名前
                <span className="text-red-600">*</span>
              </label>
              <div className="mt-1">
                <input
                  {...register('name', {
                    required: '名前は必須です',
                  })}
                  type="text"
                  id="name"
                  name="name"
                  className="block w-full rounded-md p-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 text-sm sm:text-sm sm:leading-6"
                />
              </div>
              {errors.name && <p className="pt-1.5 text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                メールアドレス
                <span className="text-red-600">*</span>
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
                <span className="text-red-600">*</span>
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

            {/*TODO:選択した画像のプレビューを表示 */}
            <div>
              <label htmlFor="iconImg" className="border rounded-md p-1.5 text-sm cursor-pointer">
                プロフィール写真をアップロード
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  id="iconImg"
                  name="iconImg"
                  accept=".jpg, .jpeg, .png"
                  onChange={imageCompression}
                  className="hidden"
                />
              </div>
              <p className="text-xs mt-1.5">プロフィール写真の登録は任意です</p>
            </div>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md">
              作成
            </button>
          </form>
        </div>
        <div className=" mt-2.5 text-right">
          <Link to="/signin" className="text-blue-600 hover:text-blue-400">
            ログインはこちら
          </Link>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
