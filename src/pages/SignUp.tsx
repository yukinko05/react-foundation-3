export default function SignUp() {
  return (
    <>
      <h1>新規登録</h1>
      <form>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input type="email" id="email" name="email" />
        </div>

        <div>
          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" />
        </div>

        <button>作成</button>
      </form>
    </>
  );
}
