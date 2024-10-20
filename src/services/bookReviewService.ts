import axiosInstance from '../api/axiosInstance';
import { Book, CreateReview } from '../types';

export const fetchBookReviews = async (offset: number, token: string): Promise<Book[]> => {
  const response = await axiosInstance.get(`/books?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const fetchBookReviewDetail = async (id: Book['id'], token: string): Promise<Book> => {
  const response = await axiosInstance.get(`/books/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

export const createBookReview = async (data: CreateReview, token: string): Promise<void> => {
  await axiosInstance.post('/books', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateBookReview = async (
  id: Book['id'],
  data: CreateReview,
  token: string
): Promise<void> => {
  await axiosInstance.put(`/books/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteBookReview = async (id: Book['id'], token: string): Promise<void> => {
  await axiosInstance.delete(`/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
