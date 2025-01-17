import Image from "next/image";
import { book } from "../interface";
import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { useSession } from "next-auth/react";
import { updateBook } from "../api/api";
import { FaPlus, FaMinus } from "react-icons/fa6";

const BookCard = ({ book }: { book: book }) => {
  const { data: session } = useSession();
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [latestCopies, setLatestCopies] = useState<number>(book.copies);
  const [issuingStatus, setIssuingStatus] = useState<boolean>(
    book.is_available
  );
  const [imgStatus, setImgStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [modalImgStatus, setModalImgStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  return (
    <>
      <CustomModal
        isOpen={editModal}
        onClose={() => {
          setEditModal(false);
          setDetailModal(true);
        }}
      >
        <div className="bg-background rounded-lg p-4 md:p-6 relative">
          <div className="flex flex-col items-center space-y-4">
            <div>
              <div className="w-28 relative">
                <label className="block mb-1 text-sm text-center text-slate-600">
                  Copies
                </label>
                <div className="relative">
                  <button
                    id="decreaseButton"
                    className="absolute left-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() =>
                      setLatestCopies((prev) => (prev > 0 ? prev - 1 : prev))
                    }
                  >
                    <FaMinus className="size-4" />
                  </button>
                  <input
                    id="amountInput"
                    type="number"
                    value={latestCopies}
                    readOnly
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md text-center pl-8 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    id="increaseButton"
                    className="absolute right-1 top-1 rounded bg-slate-800 p-1.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => setLatestCopies((prev) => prev + 1)}
                  >
                    <FaPlus className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div className="block mb-1 text-sm text-slate-600">
                Availaible
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  onChange={() => setIssuingStatus((prev) => !prev)}
                  checked={issuingStatus}
                  className="sr-only peer"
                />
                <div className="group peer ring-0 bg-rose-400  rounded-full outline-none duration-300 after:duration-300 w-16 h-8 shadow-md peer-checked:bg-emerald-500  peer-focus:outline-none  after:content-['✖️']  after:rounded-full after:absolute after:bg-gray-50 after:outline-none after:h-6 after:w-6 after:top-1 after:left-1 after:-rotate-180 after:flex after:justify-center after:items-center peer-checked:after:translate-x-8 peer-checked:after:content-['✔️'] peer-hover:after:scale-95 peer-checked:after:rotate-0"></div>
              </label>
            </div>
          </div>
          <div className="absolute bottom-4 right-4">
            <div
              onClick={() => {
                updateBook(
                  book.id,
                  latestCopies,
                  latestCopies === 0
                    ? false
                    : book.copies === 0 && latestCopies > 0
                    ? true
                    : issuingStatus
                );
              }}
              className="bg-green-500 bg-opacity-50 border border-green-500 text-text text-center p-1 rounded-lg cursor-pointer"
            >
              Save
            </div>
          </div>
        </div>
      </CustomModal>
      <CustomModal isOpen={detailModal} onClose={() => setDetailModal(false)}>
        <div className="bg-background rounded-lg p-4 md:p-6 flex flex-col justify-center items-center gap-4">
          <div className="w-[40%] relative">
            {modalImgStatus !== "error" && (
              <Image
                src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg?default=false`}
                alt="img"
                width={200}
                height={200}
                onLoad={() => setModalImgStatus("loaded")}
                onError={() => setModalImgStatus("error")}
                className={`rounded-lg object-cover w-full h-full transition-opacity duration-300 ${
                  modalImgStatus === "loaded" ? "opacity-100" : "opacity-0"
                }`}
              />
            )}
            {modalImgStatus === "loading" && (
              <div
                className={`absolute top-0 left-0 w-full h-full rounded-lg animate-pulse bg-gray-200`}
              ></div>
            )}
            {modalImgStatus === "error" && (
              <div
                className={`absolute top-0 left-0 w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-center`}
              >
                Image Not Found
              </div>
            )}
          </div>
          {modalImgStatus !== "loading" ? (
            <div className="space-y-2 text-center">
              <h1 className="font-extrabold text-xl md:text-2xl mb-3 text-text">
                {book.title}{" "}
                <span className="text-gray-500 text-lg">
                  ({book.published_year})
                </span>
              </h1>

              <p className="text-md mb-4 text-text line-clamp-3">
                {book.description}
              </p>

              <div className="flex flex-col gap-2 text-md text-text">
                <p>
                  <span className="font-medium text-text">Genre:</span>{" "}
                  {book.genre}
                </p>
                <p>
                  <span className="font-medium text-text">Author:</span>{" "}
                  {book.author}
                </p>
                <p>
                  <span className="font-medium text-text">Isbn:</span>{" "}
                  {book.isbn}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full">
                {book.is_available ? (
                  <div
                    onClick={() => console.log("borrow")}
                    className="shadow-lg bg-green-400 p-2 rounded-lg font-medium text-text w-full cursor-pointer hover:bg-opacity-90"
                  >
                    Borrow
                  </div>
                ) : (
                  <div className="shadow-lg bg-red-400 p-2 rounded-lg font-medium text-text w-full">
                    Unavailable
                  </div>
                )}
                {session?.user.role === "admin" && (
                  <div
                    onClick={() => {
                      setEditModal(true);
                      setDetailModal(false);
                    }}
                    className="shadow-lg bg-blue-500 p-2 rounded-lg font-medium text-background cursor-pointer hover:bg-opacity-90"
                  >
                    Edit
                  </div>
                )}
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </CustomModal>
      <div
        onClick={() => setDetailModal(true)}
        className={`relative flex gap-4 h-48 md:h-72 w-full max-w-md border border-gray-300 rounded-xl p-2 md:p-6 bg-white text-text overflow-hidden shadow-lg duration-500 ${
          imgStatus === "loading"
            ? "pointer-events-none"
            : "md:hover:bg-slate-300 md:hover:scale-105 md:hover:shadow-2xl cursor-pointer"
        }`}
      >
        <div className="w-[40%] relative">
          {imgStatus !== "error" && (
            <Image
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-M.jpg?default=false`}
              alt="img"
              width={200}
              height={200}
              onLoad={() => setImgStatus("loaded")}
              onError={() => setImgStatus("error")}
              className={`rounded-lg object-cover w-full h-full transition-opacity duration-300 ${
                imgStatus === "loaded" ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
          {imgStatus === "loading" && (
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-lg animate-pulse bg-gray-200`}
            ></div>
          )}
          {imgStatus === "error" && (
            <div
              className={`absolute top-0 left-0 w-full h-full rounded-lg bg-gray-200 flex items-center justify-center text-center`}
            >
              Image Not Found
            </div>
          )}
        </div>
        {imgStatus !== "loading" ? (
          <div className="w-[60%]">
            <h1 className="font-extrabold md:text-2xl mb-3 text-text">
              {book.title}{" "}
              <span className="text-gray-500 md:text-lg">
                ({book.published_year})
              </span>
            </h1>

            <p className="text-sm mb-4 text-text line-clamp-3 hidden md:block">
              {book.description}
            </p>

            <div className="flex flex-col gap-2 text-sm text-text">
              <p>
                <span className="font-medium text-text">Genre:</span>{" "}
                {book.genre}
              </p>
              <p>
                <span className="font-medium text-text">Author:</span>{" "}
                {book.author}
              </p>
              {/* <p className="hidden md:block">
                <span className="font-medium text-text">Isbn:</span> {book.isbn}
              </p> */}
            </div>

            <div className="absolute bottom-4 right-4">
              {book.is_available ? (
                <span className="inline-block text-xs px-4 py-1 rounded-full bg-green-400 text-white font-bold">
                  {book.copies} Available
                </span>
              ) : (
                <span className="inline-block text-xs px-4 py-1 rounded-full bg-red-400 text-white font-bold">
                  Unavailable
                </span>
              )}
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default BookCard;
