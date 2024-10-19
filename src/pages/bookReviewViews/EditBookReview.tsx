import Header from '../../components/Header';
import { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Book } from '../../types';
import { useCookies } from 'react-cookie';
import axios, { AxiosError } from 'axios';
import { useParams } from 'react-router';

const editReviewSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  url: z.string().min(1, { message: 'URLは必須です' }),
  detail: z.string().min(1, { message: '書籍概要は必須です' }),
  review: z.string().min(1, { message: 'レビューは必須です' }),
});

type EditReview = z.infer<typeof editReviewSchema>;

const EditBookReview = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bookReviews, setBookReviews] = useState<Book>();
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditReview>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      url: '',
      detail: '',
      review: '',
    },
    resolver: zodResolver(editReviewSchema),
  });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookReviews(response.data);
      } catch (error) {
        if (error instanceof AxiosError && error.response && error.response.data) {
          setErrorMessage(error.response.data.ErrorMessageJP);
        }
      }
    };
    fetchBooks();
  }, [id, token]);

  useEffect(() => {
    if (bookReviews) {
      setValue('title', bookReviews.title);
      setValue('url', bookReviews.url);
      setValue('detail', bookReviews.detail);
      setValue('review', bookReviews.review);
    }
  }, [bookReviews, setValue]);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />

      <main className="max-w-2xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md p-4 mt-8 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
          書籍レビューの編集
        </h1>
        <form className="space-y-4 sm:space-y-6">
          {errorMessage && (
            <p className="text-red-600 bg-red-100 border border-red-400 rounded p-3 mb-4 text-sm sm:text-base">
              {errorMessage}
            </p>
          )}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              タイトル
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              id="url"
              {...register('url')}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.url && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.url.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
              書籍概要
            </label>
            <textarea
              id="detail"
              {...register('detail')}
              rows={3}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.detail && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.detail.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              レビュー
            </label>
            <textarea
              id="review"
              {...register('review')}
              rows={5}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.review && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.review.message}</p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 ml-2 rounded-md max-sm:w-full"
            >
              削除
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 ml-2 rounded-md max-sm:w-full"
            >
              変更
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditBookReview;
