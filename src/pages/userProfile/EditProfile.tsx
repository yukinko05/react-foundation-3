import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useCookies } from 'react-cookie';
import { fetchUserData } from '../../features/user/userSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import imageCompression from '../../utils/imageCompression';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';
import { TbCameraPlus } from 'react-icons/tb';
import Header from '../../components/Header';
import axiosInstance from '../../api/axiosInstance';

const editProfileSchema = z.object({
  name: z
    .string({
      required_error: 'ユーザー名は必須です',
    })
    .min(1, {
      message: 'ユーザー名は1文字以上で入力してください',
    }),
  icon: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type EditProfile = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fetchDispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState<string | File | undefined>(userData?.iconUrl);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditProfile>({
    mode: 'onChange',
    defaultValues: { name: '' },
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    fetchDispatch(fetchUserData(token));
  }, [fetchDispatch, token]);

  useEffect(() => {
    if (userData) {
      setValue('name', userData.name);
      setValue('icon', userData.iconUrl);
      setPreviewImage(userData.iconUrl);
    }
  }, [userData, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      imageCompression(e, setValue);
      setPreviewImage(files[0]);
    } else {
      setValue('icon', undefined);
    }
  };

  const onSubmit: SubmitHandler<EditProfile> = async (data) => {
    try {
      await axiosInstance.put(
        'https://railway.bookreview.techtrain.dev/users',
        { name: data.name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.icon instanceof File) {
        const formData = new FormData();
        formData.append('icon', data.icon);

        await axiosInstance.post('https://railway.bookreview.techtrain.dev/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
      }

      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        setErrorMessage(error.response.data.ErrorMessageJP || 'エラーが発生しました。');
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('不明なエラーが発生しました。');
      }
    }
  };

  return (
    <div>
      <Header />

      <div className="max-w-2xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8 bg-slate-100 min-h-screen">
        <main className="bg-white rounded-lg shadow-md p-4 mt-8 sm:p-6 lg:p-8">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
            アカウント設定
          </h1>
          <div className="border-2 border-gray-300 rounded-md p-4">
            <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">プロフィール</h2>
            {errorMessage && (
              <p className="text-red-600 bg-red-100 border border-red-400 rounded p-3 mb-4 text-sm sm:text-base">
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative w-20 h-20 group">
                  <label htmlFor="icon" className="cursor-pointer block">
                    <TbCameraPlus className="absolute right-0 bottom-0 w-6 h-6 text-blue-500 bg-white rounded-full p-1" />
                    {previewImage ? (
                      <img
                        src={
                          typeof previewImage === 'string'
                            ? previewImage
                            : previewImage instanceof File
                              ? URL.createObjectURL(previewImage)
                              : ''
                        }
                        alt="ユーザー画像プレビュー"
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    ) : (
                      <FaCircleUser className="w-20 h-20 text-gray-400" />
                    )}
                  </label>
                  <span className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                    プロフィールアイコンを更新
                  </span>
                  <input
                    type="file"
                    id="icon"
                    accept=".jpg, .jpeg, .png"
                    {...register('icon', { onChange: handleImageChange })}
                    className="hidden"
                  />
                </div>
                <div className="flex-1 w-full sm:w-auto">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    ユーザー名
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md max-sm:w-full"
                >
                  変更を保存
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
