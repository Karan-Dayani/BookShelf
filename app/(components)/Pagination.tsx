import { PaginationProps } from "../interface";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

const Pagination: React.FC<PaginationProps> = ({ page, setPage, maxPage }) => {
  const pageMinus = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const pagePlus = () => {
    if (page < maxPage) {
      setPage(page + 1);
    }
  };

  const getPageNumber = (pageNumber: number) => {
    return pageNumber >= 1 && pageNumber <= maxPage ? pageNumber : null;
  };
  return (
    <div>
      <div className="flex gap-3 items-center justify-center text-lg">
        <button
          className="bg-text p-2 text-background rounded-full"
          onClick={pageMinus}
        >
          <GrFormPrevious className="size-5" />
        </button>
        {getPageNumber(page - 2) && (
          <h1 onClick={() => setPage(page - 2)} className="cursor-pointer">
            {page - 2}
          </h1>
        )}
        {getPageNumber(page - 1) && (
          <h1 onClick={() => setPage(page - 1)} className="cursor-pointer">
            {page - 1}
          </h1>
        )}
        <h1 className="font-bold text-2xl">{page}</h1>
        {getPageNumber(page + 1) && (
          <h1 onClick={() => setPage(page + 1)} className="cursor-pointer">
            {page + 1}
          </h1>
        )}
        {getPageNumber(page + 2) && (
          <h1 onClick={() => setPage(page + 2)} className="cursor-pointer">
            {page + 2}
          </h1>
        )}
        <button
          className="bg-text p-2 text-background rounded-full"
          onClick={pagePlus}
        >
          <GrFormNext className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
