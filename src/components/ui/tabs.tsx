import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Coin from '../Coin';
import List from '../List';

interface Coin {
  id: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
}

interface LabTabsProps {
  coins: Coin[];
}

export default function LabTabs({ coins }: LabTabsProps) {
  const [value, setValue] = useState('grid');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList
        onChange={handleChange}
        variant='fullWidth'
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'yellow', // Set indicator color to yellow
          },
        }}
      >
        <Tab
          label="Grid View"
          value="grid"
          sx={{
            color: 'white', // Text color for unselected tab
            '&.Mui-selected': {
              color: '#FFD700', // Text color for selected tab
            },
          }}
        />
        <Tab
          label="List View"
          value="list"
          sx={{
            color: 'white', // Text color for unselected tab
            '&.Mui-selected': {
              color: '#FFD700', // Text color for selected tab
            },
          }}
        />
      </TabList>
      <TabPanel value="grid" style={{ color: 'white' }}>
        <div className='flex justify-center gap-[1.5rem]  m-[.5rem] flex-wrap p-2 items-center'>
          {coins.map((coin, idx) => (
            <Coin coin={coin} key={idx}/>
            ))}  
        </div>
      </TabPanel>
      <TabPanel value="list" style={{ color: 'white' }}>
        <table className='w-[100%] bg-white/[0.1] rounded-lg p-3 lg:px-20 ml-auto mr-auto block '>
          {coins.map((coin, idx) => (
            <List coin={coin} key={idx}/>
          ))}  
        </table>
      </TabPanel>
    </TabContext>
  );
}
