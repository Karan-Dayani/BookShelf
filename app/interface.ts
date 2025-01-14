export interface book {
  id: number;
  title: string;
  description: string;
  author: string;
  genre: string;
  isbn: string;
  published_year: number;
  copies: number;
  is_available: boolean;
}

export interface user {
  id: number;
  name: string;
  email: string;
  membership_date: string;
  role: string;
}

export interface Error {
  error: string;
  status: number;
}

export interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}

export interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
