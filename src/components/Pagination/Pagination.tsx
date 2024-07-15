import * as React from "react";
import style from "./pagination.module.scss";
import rightArrow from "../../assets/right-arrow-icon.svg";
import leftArrow from "../../assets/left-arrow-icon.svg";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={style.pagination}>
      <div className={style.pagination_sub_div}>
        <button
          className={style.arrow}
          onClick={
            currentPage > 1 ? () => handlePageChange(currentPage - 1) : () => {}
          }
        >
          <img src={leftArrow} alt="" />
        </button>

        {currentPage < 2
          ? pages.slice(0, 4).map((page) => (
              <button
                key={page}
                className={page === currentPage ? style.active : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))
          : pages.slice(currentPage - 2, currentPage - 2 + 4).map((page) => (
              <button
                key={page}
                className={page === currentPage ? style.active : ""}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
        {totalPages > 1 && (
          <button
            className={style.arrow}
            onClick={
              currentPage < totalPages
                ? () => handlePageChange(currentPage + 1)
                : () => {}
            }
          >
            <img src={rightArrow} alt="" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
