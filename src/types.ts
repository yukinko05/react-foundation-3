export interface Book {
  id: string;
  title: string;
  url: string;
  review: string;
  reviewer: string;
  detail: string;
  isMine: boolean;
}

export interface CreateReview {
  title: string;
  url: string;
  detail: string;
  review: string;
}

export interface User {
  name: string;
  iconUrl: string | undefined;
}
export interface OffsetState {
  offset: number;
}

export interface AuthState {
  isAuthenticated: boolean;
}
