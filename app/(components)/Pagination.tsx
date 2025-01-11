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
  return (
    <div>
      <div className="flex gap-3 items-center justify-center text-2xl">
        <button
          className="bg-text p-2 text-background rounded-full"
          onClick={pageMinus}
        >
          <GrFormPrevious className="size-5" />
        </button>
        <h1>{page}</h1>
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
