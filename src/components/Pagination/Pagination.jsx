import styled from "@emotion/styled";
import React from "react";
import PaginationItem from "./PaginationItem";

// condition: totalPages >= 2
const MAX_PAGINATION_ITEMS = 7;

// For example: there is 9 pages
// [1], 2, 3, 4, 5, 0, 9
// 1, [2], 3, 4, 5, 0, 9
// 1, 2, [3], 4, 5, 0, 9
// 1, 2, 3, [4], 5, 0, 9
// 1, 0, 4, [5], 6, 0, 9
// 1, 0, 5, [6], 7, 8, 9
// 1, 0, 5, 6, [7], 8, 9
// 1, 0, 5, 6, 7, [8], 9
// 1, 0, 5, 6, 7, 8, [9]
function Pagination(props) {
  const {
    currentPage,
    totalPages,
    pathPrefix,
    pathPrefixPagination,
    extraClass,
  } = props;

  const respArr = [];
  if (totalPages <= MAX_PAGINATION_ITEMS) {
    for (let i = 1; i <= totalPages; i++) {
      respArr.push(i);
    }
  } else if (currentPage <= 4) {
    for (let i = 1; i <= MAX_PAGINATION_ITEMS - 2; i++) {
      respArr.push(i);
    }
    respArr.push(0, totalPages);
  } else if (totalPages - currentPage < 4) {
    respArr.push(1, 0);
    for (let i = totalPages - 4; i <= totalPages; i++) {
      respArr.push(i);
    }
  } else {
    respArr.push(
      1,
      0,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      0,
      totalPages
    );
  }

  return (
    totalPages >= 2 && (
      <PaginationContainer className={`pagination-container ${extraClass}`}>
        {respArr.map((value, index) => (
          <PaginationItem
            key={`${pathPrefix}-${index}`}
            value={value}
            index={index}
            currentPage={currentPage}
            pathPrefix={pathPrefix}
            pathPrefixPagination={pathPrefixPagination}
          />
        ))}
      </PaginationContainer>
    )
  );
}

const PaginationContainer = styled.div`
  --border-style: 1px solid #dcdcdc;
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  .pagination-item {
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1rem;
    min-width: 4.8rem;
    min-height: 4.5rem;
    border-right: var(--border-style);
    border-top: var(--border-style);
    border-bottom: var(--border-style);
    &:hover {
      background-color: #f6f6f6;
      cursor: pointer;
    }
    &:first-child {
      border-left: var(--border-style);
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }
    &:last-child {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
    }
    &.active {
      background-color: #f6f6f6;
    }
  }
`;

export default Pagination;
