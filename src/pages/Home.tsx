import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get('https://railway.bookreview.techtrain.dev/public/books');
      setBooks(response.data);
    }

    fetchBooks();
  }, []);

  console.log(books);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
