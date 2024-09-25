import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { Book } from './types';

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
        <li key={book.id} className="border border-gray-300 rounded-md">
          <p className="px-2 pt-3 text-xl text-gray-900">{book.title}</p>
          <p className="p-2 text-sm text-gray-600 border-b-2 border-gray-200">
            URL：<a href={book.url}>{book.url}</a>
          </p>
          <p className="px-2 pt-3 text-sm text-gray-900">レビュワー：{book.reviewer}</p>
          <p className="px-2 py-1 text-sm text-gray-900">{book.review}</p>
        </li>
      ))}
    </ul>
  );
};

export default BookReviewList;
