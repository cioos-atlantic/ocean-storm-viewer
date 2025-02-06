import { IconButton, TextField, Box, Typography, Paper, Button } from "@mui/material";
import Search from "@mui/icons-material/Search";
//import { StormSearchQuery } from "./search_storm_header";
import { handleFormSubmit } from "./historical_storm/historical_storm_utils";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';




export function RenderStormSearch({isSearchSubmitted, setIsSearchSubmitted, searchResult, setSearchResult, setIsDrawerOpen, isDrawerOpen}){

  const [showSearchForm, setShowSearchForm] = useState(false); 

  function handleClick(){
    setShowSearchForm((prev) => !prev); // Toggle form visibility
  };

  return(
    <>
    {!showSearchForm && 
      <IconButton  aria-label='search' className="search-icon-small-screen"
        onClick={() => 
      handleClick()
      //console.log('here')
      }>
      <Search
      sx={{
        fontSize: 'larger',
        color: '#e55162'
      }}
      />
    </IconButton>}
    {/* Conditionally render the search form */}
    {showSearchForm && (
      <SearchForm
        setIsSearchSubmitted={setIsSearchSubmitted}
        setSearchResult={setSearchResult}
        setIsDrawerOpen = {setIsDrawerOpen}
        isSearchSubmitted = {isSearchSubmitted}
        searchResult = {searchResult}
        setShowSearchForm={setShowSearchForm}

      />
    )}
    </>

  )
}

function SearchForm({setIsSearchSubmitted, setIsDrawerOpen, isSearchSubmitted, setSearchResult, searchResult, setShowSearchForm}){

  const router = useRouter();
  
  function handleSubmit(e) {
    changeUrlToHistorical(router)
    setSearchResult([]);
    handleFormSubmit(e, setSearchResult);
    setIsSearchSubmitted(true); 
    setIsDrawerOpen(true)
  };



  console.log(searchResult)

  

  return(
    <>
      <Button
      id="close-search-icon-small-screen"
      onClick={() => {setShowSearchForm(false)}}>
      X
      </Button>   
      <Box className='small_screen-storm_search_form'>
      <form 
        onSubmit={handleSubmit}>
          <input type="text" 
            className="storm_search_input" 
            name="historical_storm_search"
            required 
            minLength="4" 
            placeholder='Joan 2014 or Joan or 2014'
            onClick={() => 
              {setIsSearchSubmitted(false)
                //setShowSearchForm(false)
              }}/>
          <IconButton type="submit" aria-label='search' className="small-screen-form-search-button">
            <Search/>
          </IconButton>
        </form>
        
        
      </Box>
     
        

    </>
          
      

    
  )
}
export function changeUrlToHistorical(router){
  const url = `/?storms=historical`;
  console.log(url)
  router.push(url);
}

