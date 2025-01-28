import { handleSearch, handleFormSubmit } from "./historical_storm_list";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";
import Search from "@mui/icons-material/Search";
import { useEffect, useState } from 'react';
import { Stack } from "@mui/system";

export  function StormSearchQuery(){
  const [searchResult, setSearchResult] = useState({})
  return(
    <>

      <div id="storm_search"
        className="storm_search">
          
         <Box className="search-container">
          <form id='storm_search_form'
          onSubmit={(e) => handleFormSubmit(e, setSearchResult)}>
              <input type="text" 
                    id="storm_search_input" 
                    name="historical_storm_search"
                    required 
                    minLength="4" placeholder='Joan 2014 or Joan or 2014'/>
              <IconButton type="submit" aria-label='search' className="search-button">
                <Search/>
              </IconButton>
            </form>
          </Box> 
          <RenderSearchResult searchResult ={searchResult} />
          

          
          

        
        </div>
          
      

    </>

);}



function RenderSearchResult({searchResult}){
  return(
    <Box>
      <Stack
        spacing={2}
        sx={{
          overflow: "auto",
          maxHeight: 500
        }}
      >
        {searchResult.length > 0 && searchResult.map((storm, index) => (
          <Paper
            key={storm.storm_id}
            sx={{
              textAlign: "left"
            }}
          >
            <Typography>
              <strong>{`${storm.display_name}`}</strong>
            </Typography>
            
          </Paper>
        ))}
      </Stack>
    </Box>
  )
}