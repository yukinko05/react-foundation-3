import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Book } from '../../types';
import ReviewCard from './ReviewCard';
import { useCookies } from 'react-cookie';
import axiosInstance from '../../api/axiosInstance';

const BookReviewList = () => {
  const offset = useSelector((state: RootState) => state.offset.offset);
  const [bookReviews, setBookReviews] = useState<Book[]>([]);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!token) {
        setErrorMessage('ログインまたは新規登録すると書籍レビューが見れるようになります');
        return;
      }
      try {
        const response = await axiosInstance.get(`/books?offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookReviews(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.data) {
          setErrorMessage(error.response.data.ErrorMessageJP);
        }
      }
    };
    fetchBooks();
  }, [offset, token]);

  return (
    <div>
      {errorMessage && <p className="text-red-600 text-center mt-10">{errorMessage}</p>}
      <ul className="grid grid-cols-1 gap-4 mt-3 sm:grid-cols-2">
        {bookReviews.map((book: Book) => (
          <ReviewCard key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BookReviewList;
