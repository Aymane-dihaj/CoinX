import React from 'react'
import { FaLink } from 'react-icons/fa';
import { motion } from 'framer-motion';

type PaperProps = {
    image: string;
    url: string;
    title: string;
    body: string;
    tags: string;
    publish_time: string;
    catego: string;
    source: string;
    delay: number;
  };

  const Paper: React.FC<PaperProps> = ({
    image,
    url,
    title,
    body,
    catego,
    source,
    tags,
    publish_time,
    delay,
  }) => {

    const date = new Date(publish_time);

    // Format the date as needed
    const formattedDate = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: delay }}
        className='bg-softDark w-[370px] min-h-[650px] p-4 flex flex-col items-center gap-2 rounded-lg'>
        <div className='w-full rounded-lg'>
            <img src={image} alt="News Image" className=' w-full rounded-md'/>
        </div>
        <div className='mt-4 min-h-[200px]  flex flex-col'>
            <h2 className=' text-lg font-bold '>{title}</h2>
            <p 
                className='cursor-pointer mt-2 mb-4 text-sm'>
                    {body.slice(0, 100)} ...
            </p>
            <p className=' text-sm text-white/[0.6]'>{formattedDate}</p>
        </div>
        <div className='w-full flex'>
            <a href={url} target='_blank' className='bg-themeColor text-black p-2 rounded-lg flex gap-2 items-center text-sm lg:text-base'><button>Read Full Article</button> <FaLink/></a>
        </div>
        <div className='w-full'>
            <h3 className='text-xs w-full mt-2 text-start '>Tags: {tags.length > 50 ? tags.slice(0, 50) : tags}</h3>
        </div>
    </motion.div>
  )
}

export default Paper
