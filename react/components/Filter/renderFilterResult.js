//import { handleClick } from "./historical_storm_utils";
import { Button } from "@mui/material";
import {  Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { handleStormButtonClick } from "../historical_storm/historical_storm_utils";


export function RenderFilterResult({filterResult, router, drawerButtonClicked,  cancelFilters}){
 
  
  
  return( 
    
    <>
      
      <Stack
      
        spacing={0.1}
        className='search-output-space'
        sx={{
          
        }}
      >
       
          <>
          <Box
          className='filter_page_drawer_subheader'>
          Filter Result: ({filterResult.length} result(s) found)</Box >
          <Stack sx={{overflowX: 'hidden', 
                    paddingLeft: '7px', 
                    paddingRight: '7px'}} 
                  spacing={0.5}>
            {filterResult.map((storm, index) => (
            <Paper
              key={storm.storm_id}
              onClick=
                {(e) => { console.log(`${storm.name} clicked`)
                handleStormButtonClick(storm.name, storm.year, storm.storm_id, router);
                                //triggerReload(); // Reload page when a storm is clicked
              
                                //console.log(storm);
                        }}
                sx={{color: drawerButtonClicked === storm.storm_id ? 'white' : 'black', 
                                  backgroundColor: drawerButtonClicked === storm.storm_id ? 'black' : 'white',
                                  padding: drawerButtonClicked === storm.storm_id ? '3px' : '0.5px',
                                  border: drawerButtonClicked === storm.storm_id ? 'solid white 2px': '0',
                                  
                                }}      
            >
              <Typography className='search-output' sx ={{fontWeight: drawerButtonClicked === storm.storm_id ? '550': 'normal'}} >
                {`${storm.display_name}`}
              </Typography>
              
            </Paper>
            
            ))}
          </Stack>
          </>
        
      </Stack>
      <Button
      onClick={cancelFilters}
      className="cancel-search"
      >Clear Results</Button>
    </>
  )
}