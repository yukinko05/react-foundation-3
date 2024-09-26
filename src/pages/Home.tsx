import BookReviewList from '../components/BookReviewList';
import { nextPage, previousPage } from '../offsetSlice';
import { useDispatch } from 'react-redux';
const Home = () => {
  const dispatch = useDispatch();
  return (
    <main className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <h1 className=" text-center text-4xl text-gray-900">Book Reviews</h1>
      <div className="mt-10">
        <button
          onClick={() => dispatch(previousPage())}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
        >
          {' '}
          前へ
        </button>
        <button
          onClick={() => dispatch(nextPage())}
          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 ml-2 rounded-md"
        >
          次へ
        </button>
        <BookReviewList />
      </div>
    </main>
  );
};

export default Home;
