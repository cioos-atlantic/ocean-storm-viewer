import { handleSearch, handleFormSubmit } from "./historical_storm_list";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import { Stack } from "@mui/system";
import {handleClick} from '../pages/about_page'
import { useRouter } from 'next/router';


export  function StormSearchQuery(){
  const [searchResult, setSearchResult] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const router = useRouter();


  function handleSubmit(e) {
    setSearchResult([]);
    handleFormSubmit(e, setSearchResult);
    setIsSubmitted(true); 
  };


  function triggerReload() {
    router.reload(); // Trigger a page reload when called
  };
  

  return(
    <>

      <div id="storm_search"
        className="storm_search">
          
         <Box className="search-container">
          <form id='storm_search_form'
          onSubmit={handleSubmit}>
              <input type="text" 
                    id="storm_search_input" 
                    name="historical_storm_search"
                    required 
                    minLength="4" 
                    placeholder='Joan 2014 or Joan or 2014'
                    onClick={() => setIsSubmitted(false)}/>
              <IconButton type="submit" aria-label='search' className="search-button">
                <Search/>
              </IconButton>
            </form>
             {/* Conditionally render search results after submission */}
            {isSubmitted && 
              <RenderSearchResult 
                searchResult={searchResult}
                router={router}
                triggerReload={triggerReload}
                 />}
          </Box> 
          
          

          
          

        
        </div>
          
      

    </>

);}



function RenderSearchResult({searchResult, router, triggerReload}){
  return(
    <Box >
      
      <Stack
      
        spacing={1}
        className='search-output-space'
        sx={{
          
        }}
      >

        {searchResult.length > 0 ? (
          <>
          <Box
          sx={{
            color: "white",
            position: "static"
          }}>
          Search Result...</Box>
          {searchResult.map((storm, index) => (
          <Paper
            key={storm.storm_id}
            onClick={(e) => { console.log()
                              handleClick(storm.name, storm.year, router);
                              //triggerReload(); // Reload page when a storm is clicked
            
                              //console.log(storm);
                              }}      
          >
            <Typography className='search-output'>
              <strong>{`${storm.display_name}`}</strong>
            </Typography>
            
          </Paper>
          
        ))}
        </>
        ): (<Box
          sx={{
            color: "white"
          }}>
          ...</Box>)}
      </Stack>
    </Box>
  )
}

