import React, { useState } from 'react';

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
      
        {[...new Array(pagesCount)].map((_, i) => (
          <div
            key={i}
            active={i + 1 === currentPage}
            onClick={() => onPageNumberClick(i + 1)}
          >
            {i + 1}
          </div>
        ))}
      
    </>
  );
}
