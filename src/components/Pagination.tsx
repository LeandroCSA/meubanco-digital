import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null; // Se houver apenas 1 página, não mostra a paginação.

  const maxPagesToShow = 2; // Máximo de páginas visíveis antes de usar "..."
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      console.log("Mudando para página:", page);
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex justify-center mt-4 gap-2">
      {/* Botão Anterior */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`px-3 py-2 border rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      >
        Anterior
      </button>

      {/* Primeiro botão (1) e "..." */}
      {startPage > 1 && (
        <>
          <button onClick={() => handlePageChange(1)} className="px-3 py-2 border rounded hover:bg-gray-200">
            1
          </button>
          {startPage > 2 && <span className="px-3 py-2">...</span>}
        </>
      )}

      {/* Números das Páginas */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-2 border rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Última página e "..." */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-3 py-2">...</span>}
          <button onClick={() => handlePageChange(totalPages)} className="px-3 py-2 border rounded hover:bg-gray-200">
            {totalPages}
          </button>
        </>
      )}

      {/* Botão Próximo */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`px-3 py-2 border rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200"}`}
      >
        Próximo
      </button>
    </div>
  );
};

export default Pagination;
