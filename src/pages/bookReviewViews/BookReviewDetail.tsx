import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { Book } from '../../types';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { FaBook } from 'react-icons/fa';
import { CgGirl } from 'react-icons/cg';

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
    <div className="bg-slate-100 min-h-screen">
      <Header />
      <div className="max-w-2xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-lg shadow-md p-4 mt-10 sm:p-6 lg:p-8">
          <header>
            {errorMessage && <p>{errorMessage}</p>}
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
              {bookDetail.title}
            </h1>
          </header>
          <section>
            <div className="flex">
              <FaBook className="mr-1 mt-3.5" />
              <h2 className="text-xl mt-2">書籍について</h2>
            </div>
            <p className="border-b pb-4 pt-2">{bookDetail.detail}</p>
          </section>
          <section>
            <div className="flex">
              <CgGirl className="text-2xl" style={{ marginTop: '10px' }} />
              <h2 className="text-xl mt-2">レビュワーの感想</h2>
            </div>
            <p className="mt-2">
              ニックネーム：<span className="mr-2">{bookDetail.reviewer}</span>さん
            </p>
            <p className="mt-4">{bookDetail.review}</p>
          </section>
          <div className="text-right mt-4">
            <div className="inline-flex text-right px-4 py-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 rounded-lg text-sm justify-center max-sm:w-full max-sm:bg-gradient-to-r">
              <FaCartShopping className="mr-1" style={{ marginTop: '3px' }} />
              <Link to={bookDetail.url}>書籍の購入はこちら</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BookReviewDetail;
