import React from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';


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
                <li><a className='flex items-center gap-3' href="/"><HomeRoundedIcon /> Home</a></li>
                <li><a className='flex items-center gap-3' href="/"><CompareArrowsRoundedIcon/>Compare</a></li>
                <li><a className='flex items-center gap-3' href="/"><GradeRoundedIcon/>Saved</a></li>
                <li><a className='flex items-center gap-3' href="/"><GridViewRoundedIcon/>Dashboard</a></li>
            </ul>
      </Drawer>
    </div>
  );
}
