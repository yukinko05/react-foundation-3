import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useCookies } from 'react-cookie';
import { fetchUserData } from '../../features/user/userSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import imageCompression from '../../utils/imageCompression';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCircleUser } from 'react-icons/fa6';

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
      await axios.put(
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

        await axios.post('https://railway.bookreview.techtrain.dev/uploads', formData, {
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
      <main>
        <h1>アカウント設定</h1>
        <h2>プロフィール</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="name">ユーザー名</label>
            <input type="text" id="name" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="icon">アイコン画像</label>
            <input
              type="file"
              id="icon"
              accept=".jpg, .jpeg, .png"
              {...register('icon', { onChange: handleImageChange })}
              className="hidden"
            />
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
                className="w-14 h-14 rounded-full"
              />
            ) : (
              <FaCircleUser className="w-14 h-14" />
            )}
            {errors.icon && <p>{errors.icon.message}</p>}
          </div>
          <button type="submit">変更を保存</button>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
