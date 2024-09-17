import { useForm, SubmitHandler } from 'react-hook-form';
import { FC } from 'react';

interface SignUpForm {
  email: string;
  password: string;
}

const SignUp: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({ mode: 'onBlur' });

  const onSubmit: SubmitHandler<SignUpForm> = (data: SignUpForm) => {
    console.log(data);
  };

  return (
    <>
      <h1>新規登録</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input {...register("email")} type="email" id="email" name="email" />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input {...register("password")} type="password" id="password" name="password" />
        </div>

        <button>作成</button>
      </form>
    </>
  );
}

export default SignUp;