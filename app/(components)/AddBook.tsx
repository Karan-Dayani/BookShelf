import React, { useEffect, useState } from "react";
import { addBook, getGenres } from "../api/api";
import { book } from "../interface";

const AddBook = () => {
  const [genres, setGenres] = useState<{ genre: string }[]>();
  const [book, setBook] = useState<Partial<book>>({
    title: "",
    description: "",
    author: "",
    genre: "",
    isbn: "",
    published_year: 0,
    copies: 1,
    is_available: true,
  });

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

  const handleFormChange = (key: string, value: string | number) => {
    setBook((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addBook(book);
  };

  return (
    <div className="p-10">
      <form onSubmit={(e) => handleSave(e)}>
        <div>
          <div>
            <h2 className="text-base/7 font-semibold text-text">Book</h2>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="title"
                    required
                    name="title"
                    type="title"
                    autoComplete="title"
                    onChange={(e) =>
                      handleFormChange("title", e.target.value as string)
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    name="description"
                    required
                    id="description"
                    rows={2}
                    onChange={(e) =>
                      handleFormChange("description", e.target.value as string)
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Author
                </label>
                <div className="mt-2">
                  <input
                    id="author"
                    required
                    name="author"
                    type="author"
                    autoComplete="author"
                    onChange={(e) =>
                      handleFormChange("author", e.target.value as string)
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label className="block text-sm/6 font-medium text-gray-900">
                  genre
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="genre"
                    required
                    name="genre"
                    autoComplete="genre"
                    defaultValue=""
                    onChange={(e) =>
                      handleFormChange("genre", e.target.value as string)
                    }
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option value="" disabled>
                      Select a genre
                    </option>
                    {genres?.map((genre, i) => (
                      <option key={i} value={genre.genre}>
                        {genre.genre}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                    data-slot="icon"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Release Data
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    required
                    name="release-date"
                    id="release-date"
                    autoComplete="release-date"
                    onChange={(e) =>
                      handleFormChange(
                        "published_year",
                        Number(e.target.value) as number
                      )
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label className="block text-sm/6 font-medium text-gray-900">
                  ISBN
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    required
                    name="isbn"
                    id="isbn"
                    autoComplete="isbn"
                    onChange={(e) =>
                      handleFormChange("isbn", e.target.value as string)
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Copies
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    required
                    name="copies"
                    id="copies"
                    autoComplete="copies"
                    onChange={(e) =>
                      handleFormChange(
                        "copies",
                        Number(e.target.value) as number
                      )
                    }
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-4 border-b border-gray-900/10" />

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-text px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-extra focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
