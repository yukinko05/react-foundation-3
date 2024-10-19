import Header from '../../components/Header';
import { useState } from 'react';

const EditBookReview = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Header />

      <main className="max-w-2xl mx-auto mt-4 sm:mt-8 px-4 sm:px-6 lg:px-8 bg-white rounded-lg shadow-md p-4 mt-8 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
          書籍レビューの投稿
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
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              id="url"
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="detail" className="block text-sm font-medium text-gray-700 mb-1">
              書籍概要
            </label>
            <textarea
              id="detail"
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
              レビュー
            </label>
            <textarea
              id="review"
              className="w-full px-3 py-2 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
