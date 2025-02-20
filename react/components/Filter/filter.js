import { IconButton, TextField, Box, Typography, Paper, Button } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Search from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { FitScreen } from "@mui/icons-material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
//import Chip from '@mui/material/Chip';

import Checkbox from '@mui/material/Checkbox';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Avatar from '@mui/material/Avatar';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CategoryIcon from '@mui/icons-material/Category';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RenderDateFilter } from "./dateFilter";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import dayjs from 'dayjs';




const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};

const filters = [
  
  { 
    "name":'Storm Category',
    "options":["Cat 1","Cat 2","Cat 3"],
    'icon':<CategoryOutlinedIcon />,
    
  }

]

const showOptionsArrow = <KeyboardDoubleArrowDownIcon/>; 
const closeOptionsArrow = <KeyboardDoubleArrowUpIcon/>;


export function RenderFilter(){
  const [showFilterIcons, setShowFilterIcons] = useState(false); 
  const [showFilterOptions, setShowFilterOptions] = useState({}); 
  const [selectedOptions, setSelectedOptions] = useState([]); 
  const [filterParameters, setFilterParameters] = useState([]); 
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);


  function handleClick(){
    setShowFilterIcons((prev) => !prev); // Toggle form visibility
  };

  return(
    <>
      {!showFilterIcons &&
        (<IconButton  aria-label='filter'
      id='filter-icon'
      onClick={() => handleClick()}>
        <FilterAltIcon
        sx={{
          fontSize: 'larger',          
        }}
        />
      </IconButton>)
      }
      {showFilterIcons && (
        <FilterIcons
        setShowFilterIcons = {setShowFilterIcons}
        showFilterOptions={showFilterOptions}
        setShowFilterOptions={setShowFilterOptions}
        setSelectedOptions={setSelectedOptions}
        selectedOptions={selectedOptions}
        filterParameters={filterParameters}
        setFilterParameters={setFilterParameters}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}

        
        />
      )}
    </>
  )
}

function FilterIcons({setShowFilterIcons, showFilterOptions, setShowFilterOptions, setSelectedOptions, selectedOptions, filterParameters, setFilterParameters, startDate, endDate,setStartDate, setEndDate,}){

  function handleFilterSubmit() {
    setFilterParameters((prev) => {
      const updatedParams = {
        ...prev,
        ...selectedOptions, // Spread selected options correctly
        startDate: startDate, // Ensure start and end dates are included
        endDate: endDate
      };
      console.log(updatedParams); // Log the correct updated state
      return updatedParams;
    });
  }

  return(
    <>
    <Stack
    direction="row"
    spacing={0.1}
    className='filter-icons-list'>

      <div className="filter-group">
        <RenderDateFilter
          showOptionsArrow={showOptionsArrow}
          closeOptionsArrow={closeOptionsArrow}
          setSelectedOptions={setSelectedOptions}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />

      </div>

      
      {
        filters.map((filter, index) => {
          return(

            <div className="filter-group" key={index}>
  

              <Badges
              filter={filter}
              showFilterOptions={showFilterOptions}
              setShowFilterOptions={setShowFilterOptions}
              setSelectedOptions={setSelectedOptions}
              selectedOptions={selectedOptions}
              />

            </div>


          )
        })
      }

      <Button
        className="filter-submit-button"
        onClick={handleFilterSubmit}
        startIcon={<PublishRoundedIcon/>}>
        Submit
      </Button>
      <Button
        id="cancel-filter-icon"
        className="filter-icons"
        onClick={() => {setShowFilterIcons(false)}}>
        X
      </Button> 
       


    </Stack>
    


  </>
  )
  
}



export function Badges({ filter, showFilterOptions, setShowFilterOptions, setSelectedOptions, selectedOptions}){
  const buttonStyle = {
    backgroundColor: selectedOptions[filter.name]?.length > 0 ? '#e55162' : 'white',
    color: selectedOptions[filter.name]?.length > 0 ? 'white' : '#e55162',
    '&:hover': {
      backgroundColor: selectedOptions[filter.name]?.length > 0 ? '#f1faee' : '#82ccdd', 
      color: selectedOptions[filter.name]?.length > 0 ? 'black' : 'black',
    },
  };
   
  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[filter.name] || []; // Get current options for this filter
      const isSelected = currentOptions.includes(option);
  
      // Toggle selection
      const updatedOptions = isSelected
        ? currentOptions.filter((item) => item !== option) // Remove if selected
        : [...currentOptions, option];                    // Add if not selected
  
      return {
        ...prev,
        [filter.name]: updatedOptions // Set as name: options
      };
    });
  };

  function handleClear(name)  {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: [] // Clear the options for the specific filter name
    }));
    console.log({ [name]: [] }); // Log the cleared options
  };
  
  return(
    <>
    <Button
    className="filter-badge"
    onClick= {() => {
      setShowFilterOptions((prev) => ({
        ...prev,
        [filter.name]: !prev[filter.name],
      }));
     }}
    startIcon={filter.icon}
    endIcon={ !showFilterOptions[filter.name] ? (showOptionsArrow):(closeOptionsArrow)}
    sx={buttonStyle}>
      
      {filter.name}
      
      {console.log(showFilterOptions)}

    </Button>

    {showFilterOptions[filter.name] && (
      <Paper className="filter-dropdown-menu">

        <Stack
        direction="column"
        sx={{
          padding: '5px',
        }}
        spacing={1}>
          {filter.options.map((option, optIndex) => {
            return(
              <FormControlLabel
                
                key={optIndex}
                label={<Typography sx={{ fontSize: '12px' }}>
                          {option}
                        </Typography>}
                control={
                  <Checkbox        
                    checked={selectedOptions[filter.name]?.includes(option) || false}
                    onChange={() => handleCheckboxChange(option)}
                    sx= {{color:"#e55162",
                          '&.Mui-checked': {color: 'grey',}
                        

                      
                      
                      }}

                  />
                }
              />
            )
          })}

          <Box 
            sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                <Button 
                  onClick={() => handleClear(filter.name)} 
                  className="filter-submit-button"
                >
                  Clear
                </Button>
          </Box>

        </Stack>
        
        

        {console.log(selectedOptions)}
        {console.log(filter.options)}
        
      </Paper>
    )}

  </>
    
  )

};

export function handleFilterSubmit(filterParameters){

}

export function changeParametersFormat(filterParameters){


}

const ibtracsName



