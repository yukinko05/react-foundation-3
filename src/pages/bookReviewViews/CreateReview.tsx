import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import * as bookReviewService from '../../services/bookReviewService';

const createReviewSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは必須です' }),
  url: z.string().min(1, { message: 'URLは必須です' }),
  detail: z.string().min(1, { message: '書籍概要は必須です' }),
  review: z.string().min(1, { message: 'レビューは必須です' }),
});

export type CreateReview = z.infer<typeof createReviewSchema>;

const CreateReview = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [cookies] = useCookies(['token']);
  const token = cookies.token;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReview>({
    mode: 'onSubmit',
    resolver: zodResolver(createReviewSchema),
  });

  const onSubmit: SubmitHandler<CreateReview> = async (data) => {
    try {
      await bookReviewService.createBookReview(data, token)
      navigate('/');
    } catch (error) {
      if (error instanceof AxiosError && error.response && error.response.data) {
        setErrorMessage(error.response.data.ErrorMessageJP || 'エラーが発生しました。');
      } else {
        console.error('Unexpected error:', error);
        setErrorMessage('不明なエラーが発生しました。');
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-4 px-4 sm:mt-8 sm:px-6 lg:px-8">
      <Header />
      <main className="bg-white rounded-lg shadow-md p-4 mt-8 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
          書籍レビューの投稿
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          {errorMessage && (
            <p className="text-red-600 bg-red-100 border border-red-400 rounded p-3 mb-4 text-sm sm:text-base">
              {errorMessage}
            </p>
          )}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              タイトル<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              placeholder="タイトルを入力してください"
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.title && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL<span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="url"
              {...register('url')}
              placeholder="URLを入力してください"
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.url && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.url.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
              書籍概要<span className="text-red-600">*</span>
            </label>
            <textarea
              id="detail"
              {...register('detail')}
              placeholder="書籍の概要を入力してください"
              rows={3}
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.detail && (
              <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.detail.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              レビュー<span className="text-red-600">*</span>
            </label>
            <textarea
              id="review"
              {...register('review')}
              placeholder="レビューを入力してください"
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
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 ml-2 rounded-md max-sm:w-full"
            >
              投稿
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateReview;
