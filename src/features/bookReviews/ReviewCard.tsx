import axiosInstance from '../../api/axiosInstance';
import { useCookies } from 'react-cookie';

import { Book } from '../../types';
import { Link } from 'react-router-dom';
interface ReviewCardProps {
  book: Book;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { book } = props;

  const [cookies] = useCookies(['token']);
  const token = cookies.token;

  const handleClickDetail = () => {
    const data = {
      selectBookId: book.id,
    };

    axiosInstance.post('/logs', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <li className="border border-gray-300 rounded-md py-3 px-2">
      <div className="border-b border-gray-300 py-2">
        <p className="line-clamp-2">{book.title}</p>
      </div>
      <p className=" px-2 py-3 text-sm text-gray-900">レビュワー：{book.reviewer}</p>
      <p className="px-2 pt-2 text-sm mt-1 text-gray-900 truncate">{book.review}</p>
      <div className="flex justify-between gap-2 mt-4">
        <Link
          to={`/detail/${book.id}`}
          onClick={handleClickDetail}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center text-md hover:bg-blue-600 transition-colors duration-300"
        >
          詳細
        </Link>

        {book.isMine && (
          <Link to={`/edit/${book.id}`} className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-center text-md hover:bg-green-600 transition-colors duration-300"
          >
            編集
          </Link>
        )}
      </div>
    </li>
  );
};

export default ReviewCard;
