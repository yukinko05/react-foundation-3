import { useForm, SubmitHandler } from 'react-hook-form';
import { FC } from 'react';

interface SignUpForm {
  name: string;
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
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label htmlFor="name">名前</label>
          <input {...register("name", {
            required: '名前は必須です',
          })} type="text" id="name" name="name" />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email">メールアドレス</label>
          <input {...register("email", {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
              message: '正しいメールアドレスを入力してください',
            },
          })} type="email" id="email" name="email" />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input {...register("password", {
            required: 'パスワードは必須です',
            minLength: {
              value: 8,
              message: 'パスワードは8文字以上で入力してください',
            },
          })} type="password" id="password" name="password" />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button>作成</button>
      </form>
    </>
  );
}

export default SignUp;