import { IconButton, TextField, Box, Typography, Paper, Button } from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import Search from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';


const filters = [
  { 
    "filterName":'year',
    "filterOption":[1996,1995,1998],
  },
  { 
    "filterName":'storm category',
    "filterOption":[1996,1995,1998],
  },
  { 
    "filterName":'Bounding box',
    "filterOption":[1996,1995,1998],
  },


]

export function RenderFilter(){
  const [showfilterIcons, setShowfilterIcons] = useState(false); 

  function handleClick(){
    setShowSearchForm((prev) => !prev); // Toggle form visibility
  };

  return(
    <IconButton  aria-label='search'
    id='filter-icon'
    onClick={() => handleClick()}>
      <FilterAltIcon
      sx={{
        fontSize: 'larger',
        
        
      }}
      />
    </IconButton>
  )
}

function FilterIcons(setShowfilterIcons){
  <>
    <Button
      id="close-search-icon-small-screen"
      onClick={() => {setShowfilterIcons(false)}}>
      X
    </Button> 

  </>
}