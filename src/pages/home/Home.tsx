import BookReviewList from '../../features/bookReviews/BookReviewList';
import { nextPage, previousPage } from '../../features/bookReviews/offsetSlice';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import UserAvatar from '../../features/user/UserAvatar';
import { signOut } from '../auth/authSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/login');
  };

  return (
    <main className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <Header>
        <div className="flex justify-end">
          {isAuthenticated ? (
            <div>
              <Link to="/profile">
                <UserAvatar />
              </Link>
              <button onClick={handleSignOut}>ログアウト</button>
              <Link to="/new">
                レビュー新規投稿
              </Link>
            </div>
          ) : (
            <Link
              to="/signin"
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
