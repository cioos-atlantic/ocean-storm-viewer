import { Button, Box,  Paper,  OutlinedInput,  FormControl, InputLabel, Autocomplete, TextField, Checkbox, Stack, Select, MenuItem, ListItemText, Popper  } from "@mui/material"
import {  useState } from 'react';
import { smallScreenIconButton } from "./filter_utils";
import { CloseOptions, ShowOptions } from "./filter";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function InputFilter({input_filter, showOptionsArrow, closeOptionsArrow, setSelectedOptions, selectedOptions, showFilterOptions, setShowFilterOptions, dispatch, filterStormName}){
  const [inputValue, setInputValue] = useState(""); // Controlled input field
  const [stormNameList, setStormNameList] = useState([]);
  const [selectedStorms, setSelectedStorms] = useState([]);
  const buttonStyle = {
    backgroundColor: selectedOptions[input_filter.name]?.length > 0 ? '#e55162' : 'white',
    color: selectedOptions[input_filter.name]?.length > 0 ? 'white' : '#e55162',
    '&:hover': {
      backgroundColor: selectedOptions[input_filter.name]?.length > 0 ? '#ffd1dc' : '#82ccdd', 
      color: selectedOptions[input_filter.name]?.length > 0 ? 'black' : 'black',
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
  if (selectedStorms.length === stormNameList.length) {
    setSelectedStorms([]); // Unselect all
  } else {
    setSelectedStorms(stormNameList); // Select all
  }
};

  const handleClearAll = () => {
    setSelectedStorms([]);
  };
  const toggleStorm = (name) => {
  setSelectedStorms(prev =>
    prev.includes(name) ? prev.filter(s => s !== name) : [...prev, name]
  );
  };
  const getDisplayValue = () => {
  if (selectedStorms.length === 0) return '';
  if (selectedStorms.length <= 2) return selectedStorms.join(', ');
  return `${selectedStorms.length} selected`;
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
        className="input-filter"
        sx={{top:{xs: '6px', md: '100%',},
        right:{xs: '100%', md: '0px',},
        width:{xs: '210px', md: '240px' },
        }}>
      <Autocomplete
        multiple
        fullWidth
        //disableCloseOnSelect
        options={stormNameList}
        value={selectedStorms}
        size='small'
        onChange={(event, newValue) => setSelectedStorms(newValue)}
        limitTags={1}
        getOptionLabel={(option) => option}
        renderOption={(props, option, { selected }) => (
          <li {...props} key={option}>
            <Checkbox
            fullWidth
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
            
          />
        )}
        ListboxProps={{
          style: {
            maxHeight: "250px",
            overflowY: "auto",
            
          }
        }}
        slotProps={{
          paper: {
            sx: {
              borderRadius: "0px",
              boxShadow: "0px 6px 16px #00000026",
            },
          },
        }}
        PopperComponent={(props) => (
          <Popper {...props} placement="top"  >
            <Paper >
              {props.children}
              <Box sx={{padding: "5px", borderTop: '1px solid #e55162' }}>
                <Button size="small"className="filter-submit-button" onClick={handleSelectAll}>Select All</Button>
              <Button size="small" className="filter-submit-button" onClick={handleClearAll}>Clear</Button>
              <Button size="small" className="filter-submit-button" onClick={() => setShowFilterOptions({ ...showFilterOptions, [input_filter.name]: false })}>
                Close
              </Button>

              </Box>
               
            </Paper>
          </Popper>
        )}
      />
    </Paper>
      
      
        
        
      
      
    
    //</Stack>
    
  //</Paper>
)}
    </>
  )
}


 



