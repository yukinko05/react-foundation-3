export interface Book {
  id: number;
  title: string;
  url: string;
  reviewer: string;
  review: string;
}

export interface OffsetState {
  offset: number;
}

export interface AuthState {
  isAuthenticated: boolean;
}
