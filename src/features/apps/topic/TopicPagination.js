import React, { useState } from 'react';
import { Pagination } from 'react-bootstrap';

export default function TopicPagination({
  count,
  paginate,
  pagesPerPage,
  currentPage,
}) {
  const pagesCount = Math.ceil(count / pagesPerPage);
  const onPageNumberClick = (i) => {
    paginate(i);
  };
  return (
    <>
      <Pagination>
        {[...new Array(pagesCount)].map((_, i) => (
          <Pagination.Item
            key={i}
            className="mt-4"
            active={i + 1 === currentPage}
            onClick={() => onPageNumberClick(i + 1)}
          >
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
}
