'use client';

import { Pagination } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

/*
    client side component to render pagination for letter board (/list)

    @param currentPage: the current page number
    @param totalPages: the total number of pages
    @param selectedTags: the tags selected by the user
*/
const PaginationComponent = ({
  currentPage, totalPages, selectedTags,
}: {
  currentPage: number; totalPages: number; selectedTags: string[];
}) => {
  // state to control the current page
  const [page, setPage] = useState(currentPage);

  // get the router object
  const router = useRouter();

  // sync the state when the page prop updates
  useEffect(() => {
    setPage(currentPage);
  }, [currentPage]);

  // handles page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    // update the query params
    const query = new URLSearchParams({
      tags: selectedTags.join(','),
      page: newPage.toString(),
    });
    // push the new query params to the router
    router.push(`?${query.toString()}`);
  };

  // create the pagination items
  const pageItems = [];

  // loop through the total number of pages and create a pagination item for each
  for (let i = 1; i <= totalPages; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>,
    );
  }

  return (
    // display the pagination
    <Pagination className="custom-pagination">
      {page > 1 && (
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
        />
      )}
      {pageItems}
      {page < totalPages && (
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
        />
      )}
    </Pagination>
  );
};

export default PaginationComponent;
