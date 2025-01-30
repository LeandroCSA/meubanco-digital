// src/components/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages === 0) return null; // Esconde a paginação se não houver páginas

  const maxPagesToShow = 2; // Máximo de páginas visíveis antes de usar "..."
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <div className="flex justify-center mt-4 gap-1 md:gap-2">
      {/* Botão Anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={`flex items-center gap-3 px-2 py-1 md:px-3 md:py-2 w-auto h-8 md:h-10 justify-center border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-slate-800"}`}
      >
        Anterior
      </button>

      {/* Números das Páginas */}
      {startPage > 1 && (
        <>
          <button
            onClick={() => setCurrentPage(1)}
            className="flex items-center gap-3 px-2 py-1 md:px-3 md:py-2 w-10 h-8 md:h-10 justify-center border border-slate-300 rounded-md bg-white dark:border-slate-600 dark:bg-slate-700 dark:hover:bg-slate-800"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 py-1 md:px-3 md:py-2 w-10 h-8 md:h-10 justify-center">...</span>}
        </>
      )}

      {[...Array(endPage - startPage + 1)].map((_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`flex items-center gap-3 px-2 py-1 md:px-3 md:py-2 w-10 h-8 md:h-10 justify-center border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 ${page === currentPage ? "bg-blue-500 border-blue-500 dark:bg-blue-500 dark:border-blue-500 text-white" : "hover:bg-gray-200 dark:hover:bg-slate-800"}`}
          >
            {page}
          </button>
        );
      })}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2 py-1 md:px-3 md:py-2 w-10 h-8 md:h-10 justify-center">...</span>}
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="flex items-center gap-3 px-2 py-1 md:px-3 md:py-2 w-10 h-8 md:h-10 justify-center border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-800"
            >
            {totalPages}
          </button>
        </>
      )}

      {/* Botão Próximo */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={`flex items-center gap-3 px-2 py-1 md:px-3 md:py-2 w-auto h-8 md:h-10 justify-center border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-slate-800"}`}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;