import { useEffect, useState } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  url: string;
  reviewer: string;
  review: string;
}

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('https://railway.bookreview.techtrain.dev/public/books');
      setBooks(response.data);
    }

    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Reviews</h1>
      <ul>
        {books.map((book: Book) => (
          <li key={book.id}>
            <p>{book.title}</p>
            <p>{book.url}</p>
            <p>{book.reviewer}</p>
            <p>{book.review}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
