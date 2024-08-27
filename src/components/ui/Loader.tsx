import React from 'react';

const Loader = () => {
  return (
    <div className=' flex  absolute top-0 bottom-0 left-0 right-0 items-center justify-center'>
      <img className='md:max-w-[100px] max-w-[70px]' src='/spinner.svg' alt="Loading..." />
    </div>
  );
};

export default Loader;
