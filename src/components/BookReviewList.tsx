import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Book } from './types';
import ReviewCard from './ReviewCard';

const BookReviewList = () => {
  const offset = useSelector((state: RootState) => state.offset.offset);
  const [bookReviews, setBookReviews] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(
        `https://railway.bookreview.techtrain.dev/public/books?offset=${offset}`
      );
      setBookReviews(response.data);
    };
    fetchBooks();
  }, [offset]);

  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {bookReviews.map((book: Book) => (
        <ReviewCard key={book.id} book={book} />
      ))}
    </ul>
  );
};

export default BookReviewList;
