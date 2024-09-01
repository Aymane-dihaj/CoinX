import React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import { Link } from 'react-router-dom';
import { FaNewspaper } from 'react-icons/fa';


export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };


  return (
    <div className='md:hidden bg-black'>
      <IconButton onClick={toggleDrawer(true)}><MenuRoundedIcon className='dark:text-white'></MenuRoundedIcon></IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
            <ul className='dark:text-white text-black bg-black w-full h-full flex-col p-10 py-16 text-lg flex gap-5'>
                <li><Link className='flex items-center gap-3' to="/"><HomeRoundedIcon /> Home</Link></li>
                <li><Link className='flex items-center gap-3' to="/latest_news"><FaNewspaper/>News</Link></li>
                <li><Link className='flex items-center gap-3' to="/compare"><CompareArrowsRoundedIcon/>Compare</Link></li>
                <li><Link className='flex items-center gap-3' to="/saved"><GradeRoundedIcon/>Saved</Link></li>
                <li><Link className='flex items-center gap-3' to="/dashboard"><GridViewRoundedIcon/>Dashboard</Link></li>
            </ul>
      </Drawer>
    </div>
  );
}
