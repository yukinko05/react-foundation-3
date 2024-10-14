import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Book } from '../../types';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const BookReviewDetail = () => {
  const [bookDetail, setBookDetail] = useState<Book | undefined>();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookDetail(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.data) {
          setErrorMessage(error.response.data.ErrorMessageJP);
        }
      }
    };
    fetchBook();
  }, [id, token]);

  console.log(bookDetail);

  if (!bookDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Header />
      <article>
        <header>
          {errorMessage && <p>{errorMessage}</p>}
          <h1>書籍タイトル{bookDetail.title}</h1>
        </header>
        <section>
          <h2>書籍について</h2>
          <p>{bookDetail.detail}</p>
          <Link to={bookDetail.url}>書籍の購入はこちら</Link>
        </section>
        <section>
          <h2>レビュワーの感想</h2>
          <p>レビュワー：{bookDetail.reviewer}さん</p>
          <p>{bookDetail.review}</p>
        </section>
      </article>
    </div>
  );
};

export default BookReviewDetail;
