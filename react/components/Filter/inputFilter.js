import { Button, Box,  Paper,  OutlinedInput,  FormControl, InputLabel, Autocomplete, TextField, Checkbox,  } from "@mui/material"
import {  useState } from 'react';
import { smallScreenIconButton } from "./filter_utils";
import { CloseOptions, ShowOptions } from "./filter";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export function InputFilter({input_filter, showOptionsArrow, closeOptionsArrow, setSelectedOptions, selectedOptions, showFilterOptions, setShowFilterOptions, dispatch, filterStormName}){
  const [inputValue, setInputValue] = useState(""); // Controlled input field
  const [stormNameList, setStormNameList] = useState([])
  const buttonStyle = {
    backgroundColor: selectedOptions[input_filter.name]?.length > 0 ? '#e55162' : 'white',
    color: selectedOptions[input_filter.name]?.length > 0 ? 'white' : '#e55162',
    '&:hover': {
      backgroundColor: selectedOptions[input_filter.name]?.length > 0 ? '#ffd1dc' : '#82ccdd', 
      color: selectedOptions[input_filter.name]?.length > 0 ? 'black' : 'black',
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
  <Paper
    elevation={3}
    className="input-filter"
    sx={{top:{xs: '6px', md: '100%',},
    right:{xs: '100%', md: '0px',},
    width:{xs: '210px', md: '240px' } }}      
  >
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      className="input-filter-box"
    >
      
      <FormControl variant="outlined" sx={{ width:{xs: '130px', md: '210px' } }}>
        <Autocomplete
          multiple
          size="small"
          options={stormNameList}
          getOptionLabel={(option) => option}
          //disableCloseOnSelect
          defaultValue={[stormNameList[1]]}
          renderOption={(props, option, { selected }) => {
          const { key, ...optionProps } = props;
          return (
          <li key={key} {...optionProps}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option}
          </li>
        );
      }}
      renderInput={(params) => (
          <TextField
            {...params}
            label={input_filter.display_name}
            placeholder={input_filter.placeholder}
            slotProps={{
              
              inputLabel: {
                sx: {
                  color: '#e55162', // Default label color
                  fontSize: '14px',
                  '&.Mui-focused': {
                    color: 'red',
                    transform: 'translate(11px, -6px) scale(1)',
                    fontSize: '12px',
                  },
                },
              },
            }}
          />
        )}
      />
        
      </FormControl>

      {/* Action Buttons */}
      <Box sx={{ display: "flex", gap: "1px" }}>
        <Button className="filter-submit-button" type="submit" onClick={()=> {if (filterStormName !== inputValue) {
            dispatch({ type: "SET_FILTER_STORM_NAME", payload: inputValue });
          }}}>
          Enter
        </Button>
        <Button className="filter-submit-button" onClick={handleClear}>
          Clear
        </Button>
        <Button className="filter-submit-button" onClick= {() => {
        setShowFilterOptions(false)}}>
          Close
        </Button>
      </Box>
    </Box>
  </Paper>
)}
    </>
  )
}


 



