import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useEffect, useState } from 'react';
import { IconButton, TextField, Box, Typography, Paper, Button } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';



const shortcutsItems = [
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Last Week',
    getValue: () => {
      const today = dayjs();
      const prevWeek = today.subtract(7, 'day');
      return [prevWeek.startOf('week'), prevWeek.endOf('week')];
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'Current Month',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Next Month',
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf('month').add(1, 'day');
      return [startOfNextMonth, startOfNextMonth.endOf('month')];
    },
  },
  { label: 'Reset', getValue: () => [null, null] },
];



export function RenderDateFilter({showOptionsArrow, closeOptionsArrow, filter }){
  const [showDateSelection, setShowDateSelection] = useState(false); 


  return (
    <>
    <Button
    className="filter-badge"
    onClick= {() => {
      setShowDateSelection((prev) => ({
        ...prev,
        [filter.name]: !prev[filter.name],
      }));
     }}
    startIcon={<CalendarMonthOutlinedIcon/>}
    endIcon={ !showDateSelection ? (showOptionsArrow):(closeOptionsArrow)}>
      
      Select Date Range
      
      

    </Button>
    {showDateSelection && (<LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
      <DatePicker defaultValue={dayjs()} />
      <DatePicker defaultValue={dayjs()} />

      </Box>
    </LocalizationProvider>)}
    </>


    
  );
};