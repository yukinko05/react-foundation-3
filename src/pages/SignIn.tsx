import { useForm, SubmitHandler } from 'react-hook-form';

interface LoginForm {
  email: string;
  password: string;
};

export default function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<LoginForm> = (data: LoginForm) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">メールアドレス</label>
      <input
        {...register("email", {
          required: "メールアドレスは必須です",
          pattern: {
            value: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]+.[A-Za-z0-9]+$/,
            message: "正しいメールアドレスを入力してください"
          }
        })}
        type="email" id="email" name="email" />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">パスワード</label>
      <input
        {...register("password", {
          required: "パスワードは必須です",
          minLength: {
            value: 8,
            message: "パスワードは8文字以上で入力してください"
          }
        })}
        type="password" id="password" name="password" />
      {errors.password && <p>{errors.password.message}</p>}
      <button type="submit">ログイン</button>
    </form>
  )
}