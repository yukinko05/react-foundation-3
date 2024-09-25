import BookReviewList from '../components/BookReviewList';
import { nextPage, previousPage } from '../offsetSlice';
import { useDispatch } from 'react-redux';
const Home = () => {
  const dispatch = useDispatch();
  return (
    <main className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <h1 className=" text-center text-4xl text-gray-900">Book Reviews</h1>
      <div className="mt-10">
        <button onClick={() => dispatch(nextPage())}>次へ</button>
        <button onClick={() => dispatch(previousPage())}> 前へ</button>
        <BookReviewList />
      </div>
    </main>
  );
};

export default Home;
