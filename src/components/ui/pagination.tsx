import React from 'react';
import Pagination from '@mui/material/Pagination';

export default function PaginationControlled({ page, handlePageChange }: { page: number; handlePageChange: (event: React.ChangeEvent<unknown>, value: number) => void }) {
  return (
    <div className='flex items-center mt-2 mb-14 justify-center'>
      <Pagination
        count={10}
        page={page}
        onChange={handlePageChange}
        sx={{
          color: 'white', // Text color for unselected tab
          '& .Mui-selected': {
            backgroundColor: 'gold !important',
            color: 'black !important',
          },
          '& .MuiPaginationItem-ellipsis': {
            border: '0px solid gray !important',
          },
          '& .MuiPaginationItem-text': {
            color: 'white',
            border: '1px solid gray',
          },
        }}
      />
    </div>
  );
}
