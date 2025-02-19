import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { useEffect, useState } from 'react';
import { IconButton, TextField, Box, Typography, Paper, Button, Stack, CardContent, Card, CardActions } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Slider from '@mui/material/Slider';

const marks = [
  {
    value: 0,
    label: '1900',
  },
  {
    value: 20,
    label: '1920',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

const shortcutsItems = [
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
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
    label: 'Last 30 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(30, 'day'), today];
    },
  },
  {
    label: 'Last 1 year',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(1, 'year'), today];
    },
  },
  {
    label: 'Last Decade',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(10, 'year'), today];
    },
  },
  
  
  
];

const reset= { label: 'Reset', getValue: () => [null, null] };




export function RenderDateFilter({showOptionsArrow, closeOptionsArrow, setSelectedOption, startDate, endDate,setStartDate, setEndDate}){
  const [showDateSelection, setShowDateSelection] = useState(false); 
  



  return (
    <>
    <Button
    className="filter-badge"
    onClick= {() => {
      setShowDateSelection(prev => !prev)
     }}
    startIcon={<CalendarMonthOutlinedIcon/>}
    endIcon={ !showDateSelection ? (showOptionsArrow):(closeOptionsArrow)}>
      
      Select Date Range
      
      

    </Button>
    {showDateSelection && 
      (<DateDisplay 
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setShowDateSelection={setShowDateSelection}  />)}

    {console.log(startDate, endDate)}
    </>


    
  );
};




function DateDisplay({setStartDate, setEndDate, setShowDateSelection, startDate, endDate}){
    // Update state when a shortcut is clicked
  const handleShortcutClick = (getValue) => {
    const [newStartDate, newEndDate] = getValue();    
    setStartDate(newStartDate);
    setEndDate(newEndDate);}
  return(
    <Card
     sx={{
      position: 'absolute',
      top: '100%',
      width: '350px'      
     }}>
      <CardContent>
      <Box>
            {shortcutsItems.map((shortcut, indx) => {
              return(
                <Button
                key={indx}
                className='shortcut-button'
                onClick={()=>{handleShortcutClick(shortcut.getValue)}}>
                  {shortcut.label}
                </Button>
              )
            })}
          </Box>
      </CardContent>
      <CardContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>

          <DatePicker 
            defaultValue={dayjs()} 
            label='Start Date' 
            className='filter-time-input'
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}/>
          <DatePicker 
            defaultValue={dayjs()} 
            label='End Date' 
            className='filter-time-input'
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)} />
        </LocalizationProvider>
      </CardContent>
      <CardContent>
        <RangeSlider
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}/>
      </CardContent>

      <CardActions>
        <Button 
          size="small"
          className='filter-submit-button'
          onClick={() => {
            setStartDate(dayjs().startOf('year'));
            setEndDate(dayjs().endOf('year'));
          }}>Clear</Button>
        <Button size="small" className='filter-submit-button' onClick={()=> {setShowDateSelection(false)}}>Close</Button>
        

      </CardActions>

      

      

    
  
    </Card>
    
  )
}



export function RangeSlider({ startDate, endDate, setStartDate, setEndDate }) {
  const [value, setValue] = useState([startDate.year(), endDate.year()]);

  useEffect(() => {
    setValue([startDate.year(), endDate.year()]);
  }, [startDate, endDate]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartDate(dayjs().year(newValue[0]));
    setEndDate(dayjs().year(newValue[1]));
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
      sx={{
        width: '100%',
        color: '#e55162',
        
      }}
        getAriaLabel={() => 'Year range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        min={1900}
        max={dayjs().year()}
        marks={[
          { value: 1900, label: '1900' },
          { value: 1940, label: '1940' },
          { value: 1980, label: '1980' },
          { value: 2020, label: '2020' },
          
        ]}
      />
    </Box>
  );
}