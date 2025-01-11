import { book } from "../interface";

const BookCard = ({ book }: { book: book }) => {
  return (
    <div className="relative w-full max-w-md border border-gray-300 rounded-xl p-6 bg-white text-gray-800 overflow-hidden shadow-lg duration-200 hover:scale-105">
      <h1 className="font-extrabold text-2xl mb-3 text-gray-800">
        {book.title}{" "}
        <span className="text-gray-500 text-lg">({book.published_year})</span>
      </h1>

      <p className="text-sm mb-4 text-gray-700 line-clamp-3">
        {book.description}
      </p>

      <div className="flex flex-col gap-2 text-sm text-gray-700">
        <p>
          <span className="font-medium text-gray-800">Genre:</span> {book.genre}
        </p>
        <p>
          <span className="font-medium text-gray-800">Author:</span>{" "}
          {book.author}
        </p>
      </div>

      <div className="absolute top-4 right-4">
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

      <div className="relative mt-4">
        <button className="px-6 py-2 text-sm font-bold rounded-lg bg-extraaa text-white">
          Issue
        </button>
      </div>
    </div>
  );
};

export default BookCard;
