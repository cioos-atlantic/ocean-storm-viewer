//import { handleClick } from "./historical_storm_utils";
import { Button } from "@mui/material";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { handleStormNameClick } from "@/pages/about_page";


export function RenderFilterResult({filterResult, router, setReturnFilterResult, filterButtonClicked, setFilterButtonClicked}){
  
  
  return(
    <Box >
      
      <Stack
      
        spacing={1}
        className='search-output-space'
        sx={{
          
        }}
      >
        {console.log(filterResult)}
        {filterResult.length > 0 ? (
          <>
          <Box
          sx={{
            color: "white",
            position: "static",
            fontSize: '14px',
            fontWeight: "bold",
          }}>
          Filter Result: ({filterResult.length} result(s) found)</Box>
          {filterResult.map((storm, index) => (
          <Paper
            key={storm.storm_id}
            onClick=
              {(e) => { console.log(`${storm.name} clicked`)
                handleStormNameClick(storm.name, storm.year, router);
                              //triggerReload(); // Reload page when a storm is clicked
            
                              //console.log(storm);
                      }}
              sx={{color: filterButtonClicked === storm.storm_id ? 'white' : 'black', 
                                backgroundColor: filterButtonClicked === storm.storm_id ? 'black' : 'white',
                                padding: filterButtonClicked === storm.storm_id ? '5px' : '0.5px',
                                border: filterButtonClicked === storm.storm_id ? 'solid white 2px': '0',
                                
                              }}      
          >
            <Typography className='search-output' sx ={{fontWeight: filterButtonClicked === storm.storm_id ? '550': 'normal'}} >
              {`${storm.display_name}`}
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
      onClick={()=> {
        setReturnFilterResult(false)
        setFilterButtonClicked('')
      }}
      className="cancel-search"
      >Cancel Filter</Button>
    </Box>
  )
}