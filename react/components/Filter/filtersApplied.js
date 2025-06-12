import { Box, Card, CardContent, CardActions, Button } from "@mui/material";
import { CategoryRangeSlider } from "./categorySlider";
//import { DateDisplay } from "./dateFilter";
import { shortcutsItems } from "./dateFilter";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Slider, Tooltip} from '@mui/material';
import dayjs from 'dayjs';
import { RangeSlider } from "./dateFilter";
import { useState, useEffect } from "react";
import { storm_category_list } from "./categorySlider";
import { storm_categories } from "@/lib/storm_class";

export function AppliedFilters({showCatSelection, setShowCatSelection,
  setStartCategory,
  setEndCategory,
  startCategory,
  endCategory,
  showDateSelection,
  setShowDateSelection,
  startDate,
  endDate,
  setStartDate,
  setEndDate,}

  
){
  return(
    <Box>
      
        {showCatSelection && 
              (<Box >
                 <CategoryRangeSliderDrawer 
                setStartCategory = {setStartCategory}
                setEndCategory = {setEndCategory}
                setShowCatSelection={setShowCatSelection}
                startCategory={startCategory}
                endCategory={endCategory}
                />
              </Box>
             )}
        
            


        {showDateSelection && 
          (<DrawerDateDisplay 
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            setShowDateSelection={setShowDateSelection}  />

          )}

        


        
      
    </Box>
  )
}


export function DrawerDateDisplay({startDate, 
  endDate, setStartDate, setEndDate, setShowDateSelection}){
   

  const slotProps={
    popper:{ sx: { zIndex: 9999 },},
    
    textField: {
      sx: { 
        color: '#e55162', // Change text color
        '& label': { color: '#e55162' }, // Change label color
        //'& input': { color: '#e55162' }, // Change input text color
        '& .MuiOutlinedInput-root': {
          height:'40px !important',
          fontSize:{sm:'12px !important', md:'14px !important'},
          '& fieldset': { borderColor: '#e55162' }, // Default border color
          '&:hover fieldset': { borderColor: '#d43b50' }, // Hover effect
          '&.Mui-focused fieldset': { borderColor: 'red' }, // Focused border color
        },
        '& .MuiOutlinedInput-notchedOutline': {
          height:'inherit !important',
        },
        '& .MuiInputLabel-root': {
          fontSize:'14px !important',
          left: '-2px !important',
        }
      },
    },
    openPickerIcon: {
      sx: {
        color: '#e55162', // Change icon color
        '&:hover': { color: '#d43b50' }, // Change color on hover
      },
    },
    }
  const handleShortcutClick = (getValue) => {
    const [newStartDate, newEndDate] = getValue();    
    setStartDate(newStartDate);
    setEndDate(newEndDate);}
  return(
    <Card
     sx={{
      //position: 'absolute',
      //top:'6px',
      //right:'100%',
      width:'210px',
      height:'200px',
      overflow:'scroll',
      padding: '6px',
      backgroundColor: "#f4f4f4",
      alignContent: 'center',
      border: '2px solid #e55162',
      borderRadius: '10px',
      zIndex:'9001',
      

     }}>
      <CardContent
      className='date-card-content'
      >
      <Box >
            {shortcutsItemsDrawer.map((shortcut, indx) => {
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
      <CardContent
      className='date-card-content'>
        
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box 
          display="flex" 
          flexDirection="row" 
          gap={2} 
          justifyContent="center" // Centers horizontally
          alignItems="center" // Centers vertically
          >

          <DatePicker 
            defaultValue={dayjs()} 
            label='Start Date' 
            className='filter-time-input'
            value={startDate}
            onChange={setStartDate}
            slotProps={slotProps}
            
            />
          <DatePicker 
            defaultValue={dayjs()} 
            label='End Date' 
            className='filter-time-input'
            value={endDate}
            onChange={setEndDate}
            slotProps={slotProps}
            
            
            
             />
            </Box>
        </LocalizationProvider>
      </CardContent>
      
      <CardContent
      className='date-card-content'
      >
        <RangeSliderDrawer
          setStartDate={setStartDate}
          setEndDate={setEndDate}/>
      </CardContent>

      <CardActions
      className='date-card-content'>
        <Box 
          sx={{ display: 'flex', justifyContent: 'center', gap: '2px', width: '100%' }}>
            <Button 
              size="small"
              className='filter-submit-button'
              onClick={() => {
                setStartDate(null); // Reset to empty string
                setEndDate(null);   // Reset to empty string
              }}>Clear</Button>
            <Button 
              size="small" 
              className='filter-submit-button' 
              onClick={()=> {setShowDateSelection(false)}}>Close</Button>


        </Box>
        
        

      </CardActions>

      

      

    
  
    </Card>
    
  )
}

export const shortcutsItemsDrawer = [
  
  
  {
    label: '7 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'This Month',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: '30 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(30, 'day'), today];
    },
  },
  {
    label: '1 yr',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(1, 'year'), today];
    },
  },
  {
    label: '10 yrs',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(10, 'year'), today];
    },
  },
  
  
  
];

const reset= { label: 'Reset', getValue: () => [null, null] };

export function RangeSliderDrawer({  setStartDate, setEndDate }) {
  const currentYear = dayjs().year();
  
  // Independent state for the slider's range
  const [value, setValue] = useState([1860, currentYear]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartDate(dayjs().year(newValue[0]));
    setEndDate(dayjs().year(newValue[1]));
  };

  return (
    <Box sx={{ width: '180px',  }}>
      <Slider
      sx={{
        width: '85%',
        color: '#e55162',
        
      }}
        getAriaLabel={() => 'Year range'}
        value={value}
        onChange={handleChange}
        //valueLabelDisplay="auto"
        min={1860}
        max={currentYear}
        marks={[
          { value: 1860, label: '1860' },
          { value: 1900, label: '1900' },
          { value: 1980, label: '1980' },
          { value: 2020, label: '2020' },
          
        ]}
      />
    </Box>
  );
}

export function CategoryRangeSliderDrawer({ setStartCategory, setEndCategory, setShowCatSelection, startCategory, endCategory }) {
  const defaultText = "Select a range of storm category between -5 and 5";

  const [sliderText, setSliderText] = useState(defaultText);
  
  const values = storm_category_list.map(item => item.value);
  const minCategory = Math.min(...values);
  const maxCategory = Math.max(...values);
  
  // Independent state for the slider's range
  const [value, setValue] = useState([minCategory, maxCategory]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartCategory(newValue[0]);
    setEndCategory(newValue[1]);
  };


  
  
  const stormCategoryLink = "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html";


  useEffect(() => {
    if (startCategory != null && endCategory != null) {
      const stormMin = `${startCategory}`;
      const stormMax = `${endCategory}`;
  
      setSliderText(
        <>
          You&apos;ve selected a storm category range from <strong>{stormMin}</strong> to <strong>{stormMax}</strong>. <br />
          Category <strong>{stormMin}</strong>: {storm_categories[stormMin]?.sub_info}. <br />
          Category <strong>{stormMax}</strong>: {storm_categories[stormMax]?.sub_info}. <br />
          For more details, visit{' '}
          <a href={stormCategoryLink}
             target="_blank"
             rel="noopener noreferrer">
            this page
          </a>.
        </>
      );
    } else {
      setSliderText(
        <>
          Adjust the slider to filter storms by category, from -5 (weakest) to 5 (strongest). <br />
          Learn more about {" "}
          <a href={stormCategoryLink}
             target="_blank"
             rel="noopener noreferrer">
            storm categories
          </a>.
        </>
      );
    }
  }, [startCategory, endCategory]);

  return (
    <Card
      sx={{
        width:'210px',
        height:'200px',
        overflow:'scroll',
        padding: '6px',
        backgroundColor: "#f4f4f4",
        alignContent: 'center',
        border: '2px solid #e55162',
        borderRadius: '10px',
        zIndex:'9001',
        

      }}>
        <CardContent className='date-card-content'>
          {sliderText}
        </CardContent>
        <CardContent
          className='date-card-content'>
            <Box sx={{ width: '180px', }}>
              <Slider
              sx={{
                width: '85%',
                color: '#e55162',
                
              }}
                getAriaLabel={() => 'Category range'}
                value={value}
                onChange={handleChange}
                //valueLabelDisplay="auto"
                min={minCategory}
                max={maxCategory}
                marks={ [...storm_category_list].sort((a, b) => a.value - b.value) }
              />
            </Box>

        </CardContent>
        <CardActions
              className='date-card-content'>
                <Box 
                  sx={{ display: 'flex', justifyContent: 'center', gap: '2px', width: '100%' }}>
                    <Button 
                      size="small"
                      className='filter-submit-button'
                      onClick={() => {
                        setValue([minCategory, maxCategory]); // Reset slider range
                        setSliderText(defaultText); // Optional: reset text too
                        setStartCategory(null); // Reset to empty string
                        setEndCategory(null);   // Reset to empty string
                      }}>Clear</Button>
                    <Button 
                      size="small" 
                      className='filter-submit-button' 
                      onClick={()=> {setShowCatSelection(false)}}>Close</Button>
        
        
                </Box>
                
                
        
              </CardActions>

    </Card>
    
  );
}
