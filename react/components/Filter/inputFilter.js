import { Button, Box,  Paper,  OutlinedInput,  FormControl, InputLabel, Autocomplete, TextField, Checkbox, Stack, Select, MenuItem, ListItemText, Popper  } from "@mui/material"
import {  useState } from 'react';
import { smallScreenIconButton } from "./filter_utils";
import { CloseOptions, ShowOptions } from "./filter";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import React, { forwardRef } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function InputFilter({input_filter, showOptionsArrow, closeOptionsArrow, setSelectedOptions, selectedOptions, showFilterOptions, setShowFilterOptions, dispatch, filterStormName, setFilterStormName}){
  const [inputValue, setInputValue] = useState(""); // Controlled input field
  const [stormNameList, setStormNameList] = useState([]);

  const validStormList = filterStormName;
  
  const buttonStyle = {
    backgroundColor: validStormList?.length > 0 ? '#e55162' : 'white',
    color: validStormList?.length > 0 ? 'white' : '#e55162',
    '&:hover': {
      backgroundColor: validStormList?.length > 0 ? '#ffd1dc' : '#82ccdd', 
      color: validStormList?.length > 0 ? 'black' : 'black',
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
  if (filterStormName.length === stormNameList.length) {
    setFilterStormName([]); // Unselect all
  } else {
    setFilterStormName(stormNameList); // Select all
  }
  };

  const handleClearAll = () => {
    setFilterStormName([]);
  };
  const toggleStorm = (name) => {
  setFilterStormName(prev =>
    prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
  );
  };
  const getDisplayValue = () => {
  if (filterStormName.length === 0) return '';
  if (filterStormName.length <= 2) return filterStormName.join(', ');
  return `${filterStormName.length} selected`;
  };

  function handleIconClick(){
    console.log(showFilterOptions);
    dispatch({ type: "SET_CAT_SELECTION", payload: false});
    dispatch({ type: "SET_DATE_SELECTION", payload: false});
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
          <Stack direction="row" spacing={1} sx={{ mt: 0.5, mb:1 }}>
        
            <Button size="small"className="filter-submit-button" onClick={handleSelectAll}>Select All</Button>
            <Button size="small" className="filter-submit-button" onClick={handleClearAll}>Clear</Button>
            <Button size="small" className="filter-submit-button" onClick={() => setShowFilterOptions({ ...showFilterOptions, [input_filter.name]: false })}>
              Close
            </Button>
    
      </Stack>


      <Autocomplete
        multiple
        limitTags={1}
        fullWidth
        disableCloseOnSelect
        autoComplete
        //disablePortal
        options={stormNameList}
        value={filterStormName}
        disabled={false}
        size='small'
        onChange={(event, newValue) => setFilterStormName(newValue)}
        
        //getLimitTagsText={(more) => `+${more} names`}
        getOptionLabel={(option) => option}
        renderTags={(value, getTagProps) => {
    if (value.length === 0) return null;

    return [
      <span key="first" {...getTagProps({ index: 0 })}>
        {value[0]}
      </span>,
      value.length > 1 && (
        <span key="more" style={{ marginLeft: 4 }}>
          +{value.length - 1}
        </span>
      )
    ];
  }}
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
      {/* Action buttons OUTSIDE popper */}
      
    </Paper>

    
)}
    </>
  )
}


 



