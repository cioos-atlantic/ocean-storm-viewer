import { Button, Box,  Paper,  OutlinedInput,  FormControl, InputLabel, Autocomplete, TextField, Checkbox, Stack, Select, MenuItem, ListItemText, Popper  } from "@mui/material"
import {  useState } from 'react';
import { smallScreenIconButton } from "./filter_utils";
import { CloseOptions, ShowOptions } from "./filter";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { forwardRef } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function InputFilter({input_filter, showOptionsArrow, closeOptionsArrow, setSelectedOptions, selectedOptions, showFilterOptions, setShowFilterOptions, dispatch, filterStormName, selectedStormNames, setSelectedStormNames}){
  const [inputValue, setInputValue] = useState(""); // Controlled input field
  const [stormNameList, setStormNameList] = useState([]);
  
  const buttonStyle = {
    backgroundColor: selectedStormNames?.length > 0 ? '#e55162' : 'white',
    color: selectedStormNames?.length > 0 ? 'white' : '#e55162',
    '&:hover': {
      backgroundColor: selectedStormNames?.length > 0 ? '#ffd1dc' : '#82ccdd', 
      color: selectedStormNames?.length > 0 ? 'black' : 'black',
    },
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      sx: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //overflow: 'hidden',
        
        
      },
    },
  };
  const CustomPopper = forwardRef(function CustomPopper(props, ref) {
  const { children, ...other } = props;

  return (
    <Popper {...other} ref={ref} placement="top" modifiers={[
      { name: 'offset', options: { offset: [0, 8] } },
    ]}>
      <Paper
        sx={{
          borderRadius: '8px',
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.15)',
          overflow: 'hidden',
        }}
      >
        {children}
        <Box
          sx={{
            padding: "4px",
            borderTop: '1px solid #e55162',
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 0.1,
            backgroundColor: '#fff',
          }}
        >
          <Button
            size="small"
            className="filter-submit-button"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectAll();
            }}
          >
            Select All
          </Button>
          <Button
            size="small"
            className="filter-submit-button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
          >
            Clear
          </Button>
          <Button
            size="small"
            className="filter-submit-button"
            onClick={(e) => {
              e.stopPropagation();
              setShowFilterOptions((prev) => ({
                ...prev,
                [input_filter.name]: false,
              }));
            }}
          >
            Close
          </Button>
        </Box>
      </Paper>
    </Popper>
  );
});



  // Handle form submission
  function handleSubmit (event) {
    event.preventDefault(); // Prevent default form submission
    setSelectedOptions((prev) => ({
      ...prev,
      [input_filter.name]: inputValue // Clear the options for the specific filter name
    }));
    console.log(selectedOptions)
    

    console.log({ [input_filter.name]: [] }); // Log the cleared options
  };

  // Handle clearing input
  function handleClear()  {
    setSelectedOptions((prev) => ({
      ...prev,
      [input_filter.name]: "", // Clear the options for the specific filter name
    }));
    //setInputValue(""); // Reset input field
    dispatch({ type: "SET_FILTER_STORM_NAME", payload: ""})
    setInputValue("");
  };

  const handleSelectAll = () => {
  if (selectedStormNames.length === stormNameList.length) {
    setSelectedStormNames([]); // Unselect all
  } else {
    setSelectedStormNames(stormNameList); // Select all
  }
};

  const handleClearAll = () => {
    setSelectedStormNames([]);
  };
  const toggleStorm = (name) => {
  setSelectedStormNames(prev =>
    prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
  );
  };
  const getDisplayValue = () => {
  if (selectedStormNames.length === 0) return '';
  if (selectedStormNames.length <= 2) return selectedStormNames.join(', ');
  return `${selectedStormNames.length} selected`;
};

  async function handleIconClick(){
    const stormNames = await input_filter.query(); 
    setStormNameList(stormNames);
    setShowFilterOptions((prev) => ({
      ...prev,
      [input_filter.name]: !prev[input_filter.name],
    }));
  }

  console.log(stormNameList);
  return(
    <>
    <Button
      className="filter-badge"
      onClick= {handleIconClick}
      startIcon={input_filter.Icon ? <input_filter.Icon /> : null}
      endIcon={ !showFilterOptions[input_filter.name] ? (<ShowOptions/>):(<CloseOptions/>)}
      sx={{...buttonStyle,
        display: { xs: "none", md: "inline-flex" }}
      }
    >{input_filter.display_name}

    </Button>

    {smallScreenIconButton(input_filter.display_name, handleIconClick, buttonStyle, input_filter.Icon)}

    
    
    {/* Filter Input Popup */}
    {showFilterOptions[input_filter.name] && (
      <Paper elevation={3} 
        key={input_filter.name}
        className="input-filter"
        sx={{top:{xs: '6px', md: '100%',},
        right:{xs: '100%', md: '0px',},
        width:{xs: '210px', md: '240px' },
        }}>
      <Autocomplete
        multiple
        fullWidth
        disableCloseOnSelect
        //disablePortal
        options={stormNameList}
        value={selectedStormNames}
        disabled={false}
        size='small'
        onChange={(event, newValue) => setSelectedStormNames(newValue)}
        limitTags={1}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={`option-${option}`}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              sx={{ marginRight: 1.5, color: '#e55162' }}
              checked={selected}
            />
            {option}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            //label={input_filter.display_name}
            placeholder="Search storms"
            inputProps={{
            ...params.inputProps,
            'aria-label': 'Search storms'
          }}
            
            
          />
        )}
        slots={{popper: CustomPopper,
          }}
        
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0px",
              boxShadow: "0px 6px 16px #00000026",
            },
          },
          listbox: {
            sx:{maxHeight: "250px",
            overflowY: "auto",}
          },
          
        }}
        
      />
    </Paper>

    
)}
    </>
  )
}


 



