import BookReviewList from '../../features/bookReviews/BookReviewList';
import { nextPage, previousPage } from '../../features/bookReviews/offsetSlice';
import { useDispatch } from 'react-redux';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Link } from 'react-router-dom';
import UserAvatar from '../../features/user/UserAvatar';
import { signOut } from '../../features/auth/authSlice';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Home = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuOpen = () => {
    setOpenMenu(!openMenu);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie('token');
    navigate('/signin');
  };

  return (
    <main className="flex min-h-full flex-col px-6 py-12 lg:px-8">
      <Header>
        <div>
          {isAuthenticated && (
            <div className="flex justify-between">
              <UserAvatar />
              <button onClick={handleMenuOpen} type="button" className="z-10 space-y-2">
                <div
                  className={
                    openMenu
                      ? 'w-8 h-0.5 bg-gray-600 translate-y-2.5 rotate-45 transition duration-500 ease-in-out'
                      : 'w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out'
                  }
                />
                <div
                  className={
                    openMenu
                      ? 'opacity-0 transition duration-500 ease-in-out'
                      : 'w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out'
                  }
                />
                <div
                  className={
                    openMenu
                      ? 'w-8 h-0.5 bg-gray-600 -rotate-45 transition duration-500 ease-in-out'
                      : 'w-8 h-0.5 bg-gray-600 transition duration-500 ease-in-out'
                  }
                />
              </button>

              <nav
                className={
                  openMenu
                    ? 'text-left fixed bg-slate-50 right-0 top-0 w-8/12 h-screen flex flex-col justify-start pt-8 px-3 ease-linear duration-300'
                    : 'fixed right-[-100%] ease-linear duration-300'
                }
              >
                <ul className="mt-6">
                  <li>
                    <Link to="/profile" className="py-2 inline-block hover:opacity-30">
                      プロフィール設定
                    </Link>
                  </li>
                  <li>
                    <Link to="/new" className="py-2 inline-block hover:opacity-30">
                      レビュー新規投稿
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="py-2 inline-block hover:opacity-30">
                      ログアウト
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
          {!isAuthenticated && (
            <div className="text-right">
              <Link
                to="/signin"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-right"
              >
                ログイン
              </Link>
            </div>
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
