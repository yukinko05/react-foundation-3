import BookReviewList from '../bookReviews/BookReviewList';
import { nextPage, previousPage } from '../bookReviews/offsetSlice';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import UserProfile from '../userProfile/UserProfile';

const Home = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  return (
    <main className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <Header>
        <div className="flex justify-end">
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <Link
              to="/login"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
            >
              ログイン
            </Link>
          )}
        </div>
      </Header>
      {isAuthenticated && (
        <div className="mt-10">
          <button
            onClick={() => dispatch(previousPage())}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md"
          >
            前へ
          </button>
          <button
            onClick={() => dispatch(nextPage())}
            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 ml-2 rounded-md"
          >
            次へ
          </button>
        </div>
      )}
      <BookReviewList />
    </main>
  );
};

export default Home;
