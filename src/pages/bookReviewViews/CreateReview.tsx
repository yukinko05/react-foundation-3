const CreateReview = () => {
  return (
    <div>
      <main>
        <h1>書籍レビューの投稿</h1>
        <form>
          <div>
            <label htmlFor="title">タイトル</label>
            <input type="text" id="title" />
          </div>
          <div>
            <label htmlFor="url">URL</label>
            <input type="text" id="url" />
          </div>
          <div>
            <label htmlFor="detail">詳細</label>
            <textarea id="detail" />
          </div>
          <div>
            <label htmlFor="review">レビュー</label>
            <textarea id="review" />
          </div>
          <button type="submit">投稿</button>
        </form>
      </main>
    </div>
  );
};

export default CreateReview;
