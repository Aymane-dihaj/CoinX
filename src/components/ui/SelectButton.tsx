import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl fullWidth>
        <InputLabel id="days" sx={{ color: 'white' }}>Days</InputLabel>
        <Select
          labelId="days"
          id="days"
          value={age}
          label="Days"
          onChange={handleChange}
          sx={{
            height: "2.5rem",
            display: 'flex',
            alignItems: 'center',
            color: "white",
            textAlign: 'start',
            borderColor: "white",

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
              "&:focus-within": {
                borderColor: "gold",
              },
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
            "& .MuiSelect-select": {
                "& #id": {
                    border: '2px solid red',
                },
              color: "white", // Change the selected text color to white
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "gold",
            },
          }}
        >
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={365}>365</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
