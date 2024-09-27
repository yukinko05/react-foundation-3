import { Book } from '../types';

interface ReviewCardProps {
  book: Book;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { book } = props;

  return (
    <li className="border border-gray-300 rounded-md">
      <p className="px-2 pt-3 text-xl text-gray-900">{book.title}</p>
      <p className="p-2 text-sm text-gray-600 border-b-2 border-gray-200">
        URL：<a href={book.url}>{book.url}</a>
      </p>
      <p className="px-2 pt-3 text-sm text-gray-900">レビュワー：{book.reviewer}</p>
      <p className="px-2 py-1 text-sm text-gray-900">{book.review}</p>
    </li>
  );
};

export default ReviewCard;
