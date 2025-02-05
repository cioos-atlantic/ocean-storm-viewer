import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { StormSearchQuery } from "./search_storm";
import { handleFormSubmit } from "./historical_storm_list";
import { useEffect, useState } from 'react';



export function SearchSmallScreens({isSearchSubmitted, setIsSearchSubmitted, searchResult, setSearchResult, setIsDrawerOpen, isDrawerOpen}){

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

      />
    )}
    </>

  )
}

function SearchForm({setIsSearchSubmitted, setIsDrawerOpen, isSearchSubmitted, setSearchResult, searchResult}){
  
  function handleSubmit(e) {
    setSearchResult([]);
    handleFormSubmit(e, setSearchResult);
    setIsSearchSubmitted(true); 
  };



  console.log(searchResult)

  

  return(
    
          
      <Box 
        className="search-icon-small-screen">
        <form className='storm_search_form'
        onSubmit={handleSubmit}>
          <input type="text" 
            className="storm_search_input" 
            name="historical_storm_search"
            required 
            minLength="4" 
            placeholder='Joan 2014 or Joan or 2014'
            onClick={() => setIsSearchSubmitted(false)}/>
          <IconButton type="submit" aria-label='search' className="search-button">
            <Search/>
          </IconButton>
        </form>
          {/* Conditionally render search results after submission */}
        {isSearchSubmitted && 
          //<RenderSearchResult 
          //  searchResult={searchResult}
          //  router={router}
            
          //   />}
          setIsDrawerOpen(true)}
      </Box> 
          
      

    
  )
}