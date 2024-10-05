const EditProfile = () => {
  return (
    <div>
      <main>
        <h1>プロフィールを編集</h1>
        <form>
          <div>
            <label htmlFor="name">ユーザー名</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="iconUrl">アイコン画像</label>
            <input type="file" id="iconUrl" name="iconUrl" />
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditProfile;
