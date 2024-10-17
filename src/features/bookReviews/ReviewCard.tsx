import { Book } from '../../types';
import { Link } from 'react-router-dom';
interface ReviewCardProps {
  book: Book;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { book } = props;

  return (
    <li className="border border-gray-300 rounded-md py-3 px-2 hover:bg-slate-200 bg-gray-50">
      <Link to={`/detail/${book.id}`} target="_blank" className="text-xl text-gray-900">
        <div className="border-b border-gray-300 py-2">
          <p className="line-clamp-2">{book.title}</p>
        </div>
        <p className=" px-2 py-3 text-sm text-gray-900">レビュワー：{book.reviewer}</p>
        <p className="px-2 pt-2 text-sm mt-1 text-gray-900 truncate">{book.review}</p>
      </Link>
    </li>
  );
};

export default ReviewCard;
