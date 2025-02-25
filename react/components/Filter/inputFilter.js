import { Button, CardActions, CardContent, Stack, Card, Box, TextField, } from "@mui/material"
import { input_filters } from "./filters_list"
import { useEffect, useState } from 'react';



export function InputFilter({input_filter, showOptionsArrow, closeOptionsArrow, setSelectedOptions, selectedOptions, showFilterOptions, setShowFilterOptions}){
  const [inputValue, setInputValue] = useState(""); // Controlled input field
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
    console.log({ [input_filter.name]: [] }); // Log the cleared options
  };

  // Handle clearing input
  function handleClear()  {
    setSelectedOptions((prev) => ({
      ...prev,
      [input_filter.name]: "", // Clear the options for the specific filter name
    }));
    setInputValue(""); // Reset input field
  };
  return(
    <>
    <Button
      className="filter-badge"
      onClick= {() => {
        setShowFilterOptions((prev) => ({
          ...prev,
          [input_filter.name]: !prev[input_filter.name],
        }));
      }}
      startIcon={input_filter.icon}
      endIcon={ !showFilterOptions[input_filter.name] ? (showOptionsArrow):(closeOptionsArrow)}
      sx={buttonStyle}
    >{input_filter.display_name}

    </Button>
    {showFilterOptions[input_filter.name] && (
      <Card
      sx={{
        position: 'absolute',
        top: '100%',
        width: '340px',
        padding: '6px',
  
       }}>
        <CardContent>
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
            onSubmit= {handleSubmit} >
            <TextField 
              id="outlined-basic" 
              label={input_filter.display_name} 
              variant="outlined"
              placeholder={input_filter.placeholder} // Set the placeholder to "Joan"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Add onChange handler
               />  
            <CardActions>
            
              <Button 
                size="small"
                className='filter-submit-button'
                type="submit"
                
                >Enter
              </Button>
              <Button 
                size="small"
                className='filter-submit-button'
                onClick={handleClear}
                >Clear
              </Button>

            
          </CardActions>
          
          </Box>
          
        </CardContent>
        

      </Card>
      
    )}
    </>
  )
}