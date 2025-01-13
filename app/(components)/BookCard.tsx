import Image from "next/image";
import { book } from "../interface";
import { useState } from "react";
import { CustomModal } from "./CustomModal";

const BookCard = ({ book }: { book: book }) => {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState<boolean>(false);
  const [imgStatus, setImgStatus] = useState<"loading" | "loaded" | "error">(
    "loading"
  );
  const [modalImgStatus, setModalImgStatus] = useState<
    "loading" | "loaded" | "error"
  >("loading");

  const BookOpen = () => {
    setIsCustomModalOpen(true);
  };

  return (
    <>
      <CustomModal
        isOpen={isCustomModalOpen}
        onClose={() => setIsCustomModalOpen(false)}
      >
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

              <div>
                {book.is_available ? (
                  <div className="shadow-lg bg-green-400 p-2 rounded-lg font-medium text-text">
                    <button className="">Borrow</button>
                  </div>
                ) : (
                  <div className="shadow-lg bg-red-400 p-2 rounded-lg font-medium text-text">
                    Unavailable
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
        onClick={BookOpen}
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
