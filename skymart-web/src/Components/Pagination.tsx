import React from "react";

type PaginationPropType = {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  limit: number;
};
const Pagination = ({ currentPage, setCurrentPage, total, limit }: PaginationPropType) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="mt-10 flex items-center justify-center gap-2 overflow-x-auto">
      <button
        onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="rounded-lg border px-4 py-2 font-semibold transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => setCurrentPage(pageNumber)}
          className={`h-10 w-10 rounded-lg font-semibold transition ${
            currentPage === pageNumber
              ? "bg-black text-white"
              : "border hover:bg-black hover:text-white"
          }`}>
          {pageNumber}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="rounded-lg border px-4 py-2 font-semibold transition hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40">
        Next
      </button>
    </div>
  );
};

export default Pagination;
