import axios from "axios";
import { book, Error } from "../interface";
const baseUrl = "http://localhost:6969";

export const fetchBooks = async (
  limit: number,
  page: number,
  genre: string
): Promise<{ data: book[]; status: number } | Error> => {
  const books = await axios
    .get(`${baseUrl}/getBooks?limit=${limit}&page=${page}&genre=${genre}`)
    .then((res) => res);

  if (books.status === 200) {
    return { data: books.data, status: 200 };
  } else {
    return { error: "error fetching data", status: books.status };
  }
};

export const getCount = async (table: string, genre: string) => {
  const count = await axios
    .get(`${baseUrl}/count/${table}?genre=${genre}`)
    .then((res) => res);

  if (count.status === 200) {
    return { data: count.data, status: 200 };
  } else {
    return { error: "error fetching data", status: count.status };
  }
};

export const getGenres = async () => {
  const genres = await axios.get(`${baseUrl}/genres`).then((res) => res);

  if (genres.status === 200) {
    return { data: genres.data, status: 200 };
  } else {
    return { error: "error fetching data", status: genres.status };
  }
};