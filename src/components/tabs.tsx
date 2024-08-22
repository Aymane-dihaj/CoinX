// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';

// export default function ColorTabs() {
//   const [value, setValue] = useState('one');

//   const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//     setValue(newValue);
//   };

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Tabs
//         value={value}
//         variant='fullWidth'
//         onChange={handleChange}
//         aria-label="secondary tabs example"
//         sx={{
//           '& .MuiTabs-indicator': {
//             backgroundColor: 'yellow', // Set indicator color to white
//           },
//         }}
//       >
//         <Tab
//           value="one"
//           label="Item One"
//           sx={{
//             color: 'white', // Text color for unselected tab
//             '&.Mui-selected': {
//               color: '#FFD700', // Text color for selected tab
//             },
//           }}
//         />
//         <Tab
//           value="two"
//           label="Item Two"
//           sx={{
//             color: 'white',
//             '&.Mui-selected': {
//               color: '#FFD700',
//             },
//           }}
//         />
//       </Tabs>
//     </Box>
//   );
// }


import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function LabTabs() {
  const [value, setValue] = useState('grid');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
      <TabContext value={value}>
          <TabList onChange={handleChange} variant='fullWidth' sx={{
                  '& .MuiTabs-indicator': {
                    backgroundColor: 'yellow', // Set indicator color to white
                  },
                }}>
            <Tab label="Grid View" value="grid"
              sx={{
                            color: 'white', // Text color for unselected tab
                            '&.Mui-selected': {
                              color: '#FFD700', // Text color for selected tab
                            },
                          }}
              />
            <Tab label="List View" value="list" 
               sx={{
                color: 'white', // Text color for unselected tab
                '&.Mui-selected': {
                  color: '#FFD700', // Text color for selected tab
                },
              }}
            />
          </TabList>
        <TabPanel value="grid" style={{color: 'white'}}>Grid</TabPanel>
        <TabPanel value="list" style={{color: 'white'}}>List</TabPanel>
      </TabContext>
  );
}
