"use client";
import React, { useEffect, useRef, useState } from "react";
import { fetchBooks, getCount, getGenres } from "../api/api";
import { book } from "../interface";
import Pagination from "../(components)/Pagination";
import BookCard from "../(components)/BookCard";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { MdFilterListOff } from "react-icons/md";
import { useSearchParams } from "next/navigation";

export default function Books() {
  const searchParam = useSearchParams().get("search");
  const pageLimit = 9;
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [books, setBooks] = useState<book[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const [filterMenu, setFilterMenu] = useState<boolean>(false);
  const [genres, setGenres] = useState<{ genre: string }[]>();
  const [selectedFilter, setSelectedFilter] = useState<string>("Filter");

  const [searchTrigger, setSearchTrigger] = useState<boolean>(true);
  const searchInputRef = useRef<string>("");

  const filterMenuToggle = () => {
    setFilterMenu((prev) => !prev);
  };

  const handleSearch = () => {
    setPage(1);
    setSearchTrigger((prev) => !prev);
  };

  useEffect(() => {
    searchInputRef.current = !searchParam ? "" : searchParam;
    const fetchGenres = async () => {
      const genres = await getGenres();
      if (genres.status === 200) {
        if ("data" in genres) {
          setGenres(genres.data);
        }
      }
    };

    fetchGenres();
  }, [searchParam]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const books = await fetchBooks(
        pageLimit,
        page,
        selectedFilter,
        searchInputRef.current
      );
      if (books.status === 200) {
        if ("data" in books) {
          setBooks(books.data as book[]);
          setLoading(false);
        }
      }
    };
    const fetchCount = async () => {
      const count = await getCount(
        "books",
        selectedFilter,
        searchInputRef.current,
        "All"
      );
      if (count.status === 200) {
        if ("data" in count) {
          setMaxPage(Math.ceil(Number(count.data[0].count) / pageLimit));
        }
      }
    };
    fetchCount();
    fetchData();
  }, [page, selectedFilter, searchTrigger]);

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            placeholder="Search by title,author..."
            className="input shadow-lg border-gray-300 px-5 py-3 rounded-xl w-56 transition-all focus:w-64 outline-none"
            name="search"
            defaultValue={searchInputRef.current}
            onChange={(e) => (searchInputRef.current = e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoComplete="off"
          />
          <CiSearch
            className="size-6 absolute top-3 right-3"
            onClick={handleSearch}
          />
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
                    setPage(1);
                  }}
                >
                  <MdFilterListOff className="size-5" /> Clear Filter
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: pageLimit }, (_, index) => (
              <div
                key={index}
                className="h-48 md:h-72 flex gap-4 p-2 md:p-6 w-full max-w-md rounded-md border border-gray-300 bg-white"
              >
                <div
                  className={` w-[40%] h-full rounded-lg animate-pulse bg-gray-200`}
                ></div>
                <div className="w-[60%]">
                  <div className="space-y-2">
                    <div className="w-full animate-pulse h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-full animate-pulse h-2 bg-gray-200 rounded-md"></div>
                    <div className="w-full animate-pulse h-2 bg-gray-200 rounded-md"></div>
                  </div>
                  <br />
                  <div className="space-y-2">
                    <div className="w-full animate-pulse h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-full animate-pulse h-2 bg-gray-200 rounded-md"></div>
                    <div className="w-full animate-pulse h-2 bg-gray-200 rounded-md"></div>
                  </div>
                  <br />
                  <div className="space-y-2 hidden md:block">
                    <div className="w-full animate-pulse h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-full animate-pulse h-2 bg-gray-200 rounded-md"></div>
                    <div className="w-full animate-pulse h-2 bg-gray-200 rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : books && books.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          <Pagination page={page} setPage={setPage} maxPage={maxPage} />
        </>
      ) : (
        <div className="text-center">
          <h1>Sowwy! got nothing</h1>
        </div>
      )}
    </div>
  );
}
