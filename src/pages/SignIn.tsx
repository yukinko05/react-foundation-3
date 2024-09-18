import { useForm, SubmitHandler } from 'react-hook-form';
import { FC } from 'react';
import axios from 'axios';
import { useState } from 'react';

interface LoginForm {
  email: string;
  password: string;
}

const SignIn: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await axios.post('https://railway.bookreview.techtrain.dev/signin', data);
      console.log(data);
    } catch (error) {
      setErrorMessage(`ログインに失敗しました。${error}`);
    }
  };

  return (
    <>
      <h1>ログイン</h1>
      <p>{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="email">メールアドレス</label>
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
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
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
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit">ログイン</button>
      </form>
    </>
  );
};

export default SignIn;
