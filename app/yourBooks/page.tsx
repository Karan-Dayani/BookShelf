"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { getUsersBooks } from "../api/api";
import { borrow } from "../interface";
import Image from "next/image";

const YourBooks = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id as number;
  const [books, setBooks] = useState<borrow[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const books = await getUsersBooks(userId);
      if (books?.status === 200) {
        setBooks(books.data);
      }
    };
    fetchBooks();
  }, [userId]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      {/* <pre>{JSON.stringify(books, null, 2)}</pre> */}
      <div className="flex flex-wrap gap-6 justify-center">
        {books.map((book) => (
          <div key={book.id}>
            <div className="bg-white shadow-md rounded-md p-4 text-center space-y-3">
              <Image
                src={`https://covers.openlibrary.org/b/isbn/${book.book_details?.isbn}-M.jpg?default=false`}
                alt="img"
                width={200}
                height={200}
                className={`rounded-lg object-cover w-full h-full`}
              />
              <div className="flex gap-2">
                <p className="capitalize bg-green-300 rounded-md w-full px-2 py-1">
                  {book.status}
                </p>
                {book.status === "requested" ? (
                  <button className="bg-red-300 rounded-md w-fit px-2 py-1">
                    Cancel
                  </button>
                ) : book.status === "borrowed" ? (
                  <button className="bg-red-300 rounded-md w-fit px-2 py-1">
                    Return
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourBooks;
