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
    "name":'Year',
    "options":[1996,1995,1998,1991,1990,1997],
    'icon':<CalendarMonthOutlinedIcon className="filter-badge-icon"/>,
    
  },
  { 
    "name":'Storm Category',
    "options":["Cat 1","Cat 2","Cat 3"],
    'icon':<CategoryOutlinedIcon className="filter-badge-icon"/>,
    
  }

]

const showOptionsArrow = <KeyboardDoubleArrowDownIcon/>; 
const closeOptionsArrow = <KeyboardDoubleArrowUpIcon/>;


export function RenderFilter(){
  const [showFilterIcons, setShowFilterIcons] = useState(false); 
  const [showFilterOptions, setShowFilterOptions] = useState({}); 

  function handleClick(){
    setShowFilterIcons((prev) => !prev); // Toggle form visibility
  };

  return(
    <>
      {!showFilterIcons &&
        (<IconButton  aria-label='search'
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
        
        />
      )}
    </>
  )
}

function FilterIcons({setShowFilterIcons, showFilterOptions, setShowFilterOptions}){
  return(
    <>
    <Stack
    direction="row"
    spacing={0.1}
    className='filter-icons-list'>

      
      {
        filters.map((filter, index) => {
          return(
            <>{/* 
              <Chip icon={<FilterListIcon />} label={filter.name}
              className="filter-icons"
              /> */}

              
              {/*<MultipleSelectChip
              filterName={filter.name}
              options={filter.option}/> */}

              {/*<CheckboxesTags
              filterName={filter.name}
              options={filter.option}/>*/}
              <div className="filter-group" key={index}>
                <RenderDateFilter
                showOptionsArrow={showOptionsArrow}
                closeOptionsArrow={closeOptionsArrow}
                filter={filter}
                />

                <Badges
                filter={filter}
                showFilterOptions={showFilterOptions}
                setShowFilterOptions={setShowFilterOptions}
                />

              </div>

            </>

            

          )
        })
      }

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

export  function MultipleSelectChip({filterName, options}) {
  const [selectedOption, setSelectedOption] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedOption(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">{filterName}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedOption}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.1 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, selectedOption)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
function getStyles(option, selectedOption) {
  return {
    fontWeight: selectedOption.includes(option)
      ? 'bold'
      : 'normal',
  };
}


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


export function CheckboxesTags({filterName, options}) {
  return (
    <Autocomplete
      sx={{paddingRight: '6px'}}
  
      multiple
      id="checkboxes-tags-demo"
      options={options}
      disableCloseOnSelect
      getOptionLabel={(options) => options}
      renderOption={(props, options, { selected }) => {
        const { key, ...optionProps } = props;
        return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 4 }}
              checked={selected}
            />
            {options}
          </li>
        );
      }}
      style={{ width: 200 }}
      renderInput={(params) => (
        <TextField {...params} label={filterName} />
      )}
    />
  );
}

export function Badges({ filter, showFilterOptions, setShowFilterOptions}){
  const [selectedOptions, setSelectedOptions] = useState([]); // State to keep track of selected options
  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option) // Remove if already selected
        : [...prev, option] // Add if not selected
    );
  };

  function handleSubmit(e, name, )  {
    e.preventDefault(); // Prevent default form submission behavior
    console.log({[name]: selectedOptions}); // Log selected options
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
    endIcon={ !showFilterOptions[filter.name] ? (showOptionsArrow):(closeOptionsArrow)}>
      
      {filter.name}
      
      {console.log(showFilterOptions)}

    </Button>

    {showFilterOptions[filter.name] && (
      <Box className="filter-dropdown-menu">
        <FormGroup fullWidth>
          <Box
            
            id="demo-simple-select"
            value={filter.name}
            
          >

            {filter.options.map((option, optIndex) => (

              <FormControlLabel 
                //onSubmit={console.log(selectedOptions)}
                control={<Checkbox 
                            defaultChecked 
                            checked={selectedOptions.includes(option)}
                            onChange={() => handleCheckboxChange(option)}
                            sx= {{color:"#e55162",
                                  '&.Mui-checked': {
                                            color: 'grey',
                                            }}}/>}
                label={option}/>
            ))}
          </Box>
          <Button type="summit" onClick={(e) =>{handleSubmit(e, filter.name)}}>Summit</Button>
      </FormGroup>

        
        {console.log(filter.options)}
        
      </Box>
    )}

  </>
    
  )

};

