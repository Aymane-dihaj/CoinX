import React from 'react';

const Loader = () => {
  return (
    <div className=' flex  absolute top-0 bottom-0 left-0 right-0 items-center justify-center'>
      <img className='md:max-w-[300px] max-w-[200px]' src='/ripples.svg' alt="Loading..." />
    </div>
  );
};

export default Loader;
