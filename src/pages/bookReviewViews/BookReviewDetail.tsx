import Header from '../../components/Header';

const BookReviewDetail = () => {
  return (
    <div>
      <Header />
      <article>
        <header>
          <h1>ここに書籍タイトル</h1>
          <p>レビュワー：◯◯さん</p>
        </header>
        <section>
          <h2>書籍について</h2>
          <p>ここに書籍の概要</p>
        </section>
        <section>
          <h2>レビュワーの感想</h2>
          <p>ここにレビュー本文</p>
        </section>
      </article>
    </div>
  );
};

export default BookReviewDetail;
