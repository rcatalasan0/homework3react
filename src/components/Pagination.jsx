import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div id="pagination">
      <button   // PREVIOUS
        id="prev-page"
        className="pagination-button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >Previous</button>

      <span id="page-info" className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>
      
      <button   // NEXT
        id="next-page"
        className="pagination-button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >Next</button>
    </div>
  );
};

export default Pagination;