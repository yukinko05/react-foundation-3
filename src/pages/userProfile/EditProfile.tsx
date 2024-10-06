import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../app/store';
import { useCookies } from 'react-cookie';
import { fetchUserData } from '../../features/user/userSlice';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import imageCompression from '../../utils/imageCompression';

const editProfileSchema = z.object({
  name: z
    .string({
      required_error: 'ユーザー名は必須です',
    })
    .min(1, {
      message: 'ユーザー名は1文字以上で入力してください',
    }),
  iconUrl: z.union([z.string(), z.instanceof(File)]),
});

type EditProfile = z.infer<typeof editProfileSchema>;

const EditProfile = () => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const fetchDispatch = useAppDispatch();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    setValue,
    watch,
    reset,
  } = useForm<EditProfile>({
    mode: 'onBlur',
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: userData?.name,
      iconUrl: userData?.iconUrl,
    },
  });

  const iconUrl = watch('iconUrl') as string | File | undefined;

  useEffect(() => {
    fetchDispatch(fetchUserData(token));
  }, [fetchDispatch, token]);

  useEffect(() => {
    if (userData) {
      reset({
        name: userData.name,
        iconUrl: userData.iconUrl,
      });
    }
  }, [userData, reset]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    imageCompression(e, setValue);
  };

  const onSubmit: SubmitHandler<EditProfile> = async (data) => {
    console.log(data);
  };

  return (
    <div>
      <main>
        <h1>プロフィールを編集</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="name">ユーザー名</label>
            <input type="text" id="name" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="iconUrl">アイコン画像</label>
            <input
              type="file"
              id="iconUrl"
              accept=".jpg, .jpeg, .png"
              {...register('iconUrl', { onChange: handleImageChange })}
              className="hidden"
            />
            {iconUrl && (
              <img
                src={
                  typeof iconUrl === 'string'
                    ? iconUrl
                    : iconUrl instanceof File
                      ? URL.createObjectURL(iconUrl)
                      : ''
                }
                alt="ユーザー画像プレビュー"
              />
            )}
            {errors.iconUrl && <p>{errors.iconUrl.message}</p>}
          </div>
          <button type="submit" disabled={!isValid}>
            変更を保存
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
