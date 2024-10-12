import { Book } from '../../types';

interface ReviewCardProps {
  book: Book;
}

const ReviewCard = (props: ReviewCardProps) => {
  const { book } = props;

  return (
    <li className="border border-gray-300 rounded-md pt-2 px-1">
      <a
        href={book.url}
        target="_blank"
        className="px-2 text-xl text-gray-900 hover:text-blue-600 transition-colors duration-300 inline-block border-b-2 border-transparent hover:border-blue-600"
      >
        {book.title}
      </a>
      <p className="px-2 pt-2 text-sm mt-1 text-gray-900 border-t-2 border-gray-200">
        {book.detail}
      </p>
      <p className=" px-2 py-3 text-sm text-gray-900 ">レビュワー：{book.reviewer}</p>
    </li>
  );
};

export default ReviewCard;
