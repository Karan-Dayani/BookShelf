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

export interface Error {
  error: string;
  status: number;
}

export interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  maxPage: number;
}
