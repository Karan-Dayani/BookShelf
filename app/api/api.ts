import axios from "axios";
import { book, Error } from "../interface";
const baseUrl = "http://localhost:6969";

export const getCount = async (
  table: string,
  genre?: string,
  search?: string,
  role?: string
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

//* Books
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

//* Users
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

//* Borrowing
export const requestBook = async (userId: number, bookId: number) => {
  try {
    const res = await axios.post(`${baseUrl}/requestBook`, {
      data: {
        userId,
        bookId,
      },
    });

    if (res.data.reqStatus === "Success") {
      console.log("Request sent");
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 409) {
        alert("You have already requested this book");
      } else if (error.response.status === 400) {
        alert("Cannot request more than 3 books");
      } else {
        console.error("Request failed:", error.response.data);
      }
    } else {
      console.error("Unknown error:", error);
    }
  }
};

export const getUsersBooks = async (userId: number) => {
  if (userId) {
    const res = await axios
      .get(`${baseUrl}/usersBooks/${userId}`)
      .then((res) => res);

    if (res.status === 200) {
      return { data: res.data, status: 200 };
    } else {
      return { error: "error fetching data", status: res.status };
    }
  }
};

export const getRequests = async (limit: number, page: number) => {
  const res = await axios
    .get(`${baseUrl}/getRequests?limit=${limit}&&page=${page}`)
    .then((res) => res);
  if (res.status === 200) {
    return { data: res.data, status: 200 };
  } else {
    return { error: "error fetching data", status: res.status };
  }
};

export const approveRequests = async (requestId: number) => {
  const res = await axios.post(`${baseUrl}/approveRequests`, {
    data: {
      requestId,
    },
  });
  if (res.data.ApprovalStatus === "Success") {
    window.location.reload();
  }
};

export const cancelRequest = async (requestId: number) => {
  const res = await axios.post(`${baseUrl}/cancelRequest`, {
    data: {
      requestId,
    },
  });
  if (res.data.cancelStatus === "Success") {
    window.location.reload();
  }
};

export const returnBook = async (borrowId: number) => {
  const res = await axios.post(`${baseUrl}/returnBook`, {
    data: {
      borrowId,
    },
  });
  if (res.data.returnStatus === "Success") {
    alert(res.data.message + ", fine: " + res.data.fine);
    setTimeout(function () {
      window.location.reload();
    }, 5000);
  }
};
