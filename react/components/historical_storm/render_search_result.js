import { handleClick } from "./historical_storm_utils";
import { Button } from "@mui/material";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { handleStormNameClick } from "@/pages/about_page";


export function RenderSearchResult({searchResult, router, setIsSearchSubmitted}){
  
  return(
    <Box >
      
      <Stack
      
        spacing={1}
        className='search-output-space'
        sx={{
          
        }}
      >
        {console.log(searchResult)}
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
                              handleStormNameClick(storm.name, storm.year, router);
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
      <Button
      onClick={()=> {setIsSearchSubmitted(false)}}
      className="cancel-search"
      >Cancel Search</Button>
    </Box>
  )
}