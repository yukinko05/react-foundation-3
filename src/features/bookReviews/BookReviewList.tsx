import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Book } from '../../types';
import ReviewCard from './ReviewCard';
import { useCookies } from 'react-cookie';

const BookReviewList = () => {
  const offset = useSelector((state: RootState) => state.offset.offset);
  const [bookReviews, setBookReviews] = useState<Book[]>([]);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          `https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
        );
        setBookReviews(response.data);
      } catch (error) {
        setErrorMessage(`ログインに失敗しました。${error}`);
      }
    };
    fetchBooks();
  }, [offset]);

  return (
    <div>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <ul className="grid grid-cols-1 gap-4 mt-2 sm:grid-cols-2">
        {bookReviews.map((book: Book) => (
          <ReviewCard key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BookReviewList;
