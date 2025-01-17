import axios from "axios";
import { book, Error } from "../interface";
const baseUrl = "http://localhost:6969";

export const addBook = async (book: Partial<book>) => {
  const res = await axios.post(`${baseUrl}/addBook`, {
    data: book,
  });
  if (res.data.addStatus === "Success") {
    window.location.reload();
  }
};

export const removeBook = async (id: number) => {
  const res = await axios.post(`${baseUrl}/removeBook/${id}`);
  if (res.data.removeStatus === "Success") {
    window.location.reload();
  }
};

export const fetchBooks = async (
  limit: number,
  page: number,
  genre: string,
  search: string
): Promise<{ data: book[]; status: number } | Error> => {
  const books = await axios
    .get(
      `${baseUrl}/getBooks?limit=${limit}&page=${page}&genre=${genre}&search=${search}`
    )
    .then((res) => res);

  if (books.status === 200) {
    return { data: books.data, status: 200 };
  } else {
    return { error: "error fetching data", status: books.status };
  }
};

export const getCount = async (
  table: string,
  genre: string,
  search: string,
  role: string
) => {
  const count = await axios
    .get(
      `${baseUrl}/count/${table}?genre=${genre}&search=${search}&&role=${role}`
    )
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

export const getUsers = async (
  search: string,
  role: string,
  limit: number,
  page: number
) => {
  const users = await axios
    .get(
      `${baseUrl}/getAllUsers?search=${search}&&role=${role}&&limit=${limit}&&page=${page}`
    )
    .then((res) => res);

  if (users.status === 200) {
    return { data: users.data, status: 200 };
  } else {
    return { error: "error fetching data", status: users.status };
  }
};

export const updateBook = async (
  id: number,
  copies: number,
  availability: boolean
) => {
  const res = await axios.post(`${baseUrl}/updateBook`, {
    data: {
      id,
      copies,
      availability,
    },
  });
  if (res.data.updateStatus === "Success") {
    window.location.reload();
  }
};

export const updateUser = async (id: number, role: string) => {
  const res = await axios.post(`${baseUrl}/updateUser`, {
    data: {
      id,
      role,
    },
  });
  if (res.data.updateStatus === "Success") {
    window.location.reload();
  }
};
