"use client";
import React, { useEffect, useState } from "react";
import { fetchBooks, getCount, getGenres } from "../api/api";
import { book } from "../interface";
import Pagination from "../(components)/Pagination";
import BookCard from "../(components)/BookCard";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";

export default function Books() {
  const pageLimit = 9;
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [books, setBooks] = useState<book[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [genres, setGenres] = useState<{ genre: string }[]>();
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter");

  const filterMenuToggle = () => {
    setFilterMenu((prev) => !prev);
  };

  useEffect(() => {
    const fetchGenres = async () => {
      const genres = await getGenres();
      if (genres.status === 200) {
        if ("data" in genres) {
          setGenres(genres.data);
        }
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const books = await fetchBooks(pageLimit, page, selectedFilter);
      if (books.status === 200) {
        if ("data" in books) {
          setBooks(books.data as book[]);
          setLoading(false);
        }
      }
    };
    const fetchCount = async () => {
      const count = await getCount("books", selectedFilter);
      if (count.status === 200) {
        if ("data" in count) {
          setMaxPage(Math.ceil(Number(count.data[0].count) / pageLimit));
        }
      }
    };
    fetchCount();
    fetchData();
  }, [page, selectedFilter]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            placeholder="Search..."
            className="input shadow-lg border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
            name="search"
            autoComplete="off"
          />
          <CiSearch className="size-6 absolute top-3 right-3" />
        </div>
        <div className="flex items-center gap-1 relative">
          <button
            className="px-5 py-3 rounded-xl bg-white shadow-lg flex items-center gap-2 hover:bg-slate-50"
            onClick={filterMenuToggle}
          >
            <IoFilterOutline />
            {selectedFilter}
          </button>
          <div
            className={`absolute right-1 top-12 z-10 mt-2 w-36 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none transition ease-out duration-100 ${
              filterMenu
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            <div className="py-1 h-56 overflow-y-auto scrollbar" role="none">
              {selectedFilter !== "Filter" && (
                <button
                  className="px-4 py-2 text-sm text-text flex gap-1"
                  onClick={() => {
                    filterMenuToggle();
                    setSelectedFilter("Filter");
                  }}
                >
                  <MdFilterListOff className="size-5" /> Remove Filter
                </button>
              )}
              {genres?.map((genre, i) => (
                <button
                  key={i}
                  className="block px-4 py-2 text-sm text-text"
                  onClick={() => {
                    filterMenuToggle();
                    setSelectedFilter(genre.genre);
                  }}
                >
                  {genre.genre}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center">
          <div className="w-7 h-7 border-4 border-t-text border-background rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books?.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </>
      )}
    </div>
  );
}
