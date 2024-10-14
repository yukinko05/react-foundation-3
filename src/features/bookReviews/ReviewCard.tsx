import { Book } from '../../types';
import { Link } from 'react-router-dom';

interface ReviewCardProps {
  book: Book;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { book } = props;

  return (
    <li className="border border-gray-300 rounded-md pt-2 px-2">
      <div className="border-b border-gray-300 py-2">
        <div className="inline-block hover:border-b hover:border-blue-600">
          <Link
            to={book.url}
            target="_blank"
            className="text-xl text-gray-900 line-clamp-2 hover:text-blue-600 duration-300"
          >
            {book.title}
          </Link>
        </div>
      </div>
      <p className="px-2 pt-2 text-sm mt-1 text-gray-900 truncate">{book.detail}</p>
      <p className=" px-2 py-3 text-sm text-gray-900">レビュワー：{book.reviewer}</p>
    </li>
  );
};

export default ReviewCard;
