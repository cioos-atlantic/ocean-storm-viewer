//import { handleClick } from "./historical_storm_utils";
import { Button } from "@mui/material";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { handleStormButtonClick } from "../historical_storm/historical_storm_utils";
import StormListItem from "../storm_list_item";
import { useEffect } from "react";
import { empty_storm_obj } from "../point_defaults";


export function RenderFilterResult({filterResult, router, drawerButtonClicked,  cancelFilters, setStormPoints}){

  useEffect(() => {
    if (filterResult?.length > 0) {
      const newStormPoints = makeStormLines(filterResult);
      console.log("Setting storm points from filter result", newStormPoints);
      setStormPoints(newStormPoints);
    }
  }, [filterResult, setStormPoints]); // Runs when filterResult changes
  
  
  return(
    <>
      
      <Stack
      
        spacing={0.1}
        className='search-output-space'
        sx={{
          
        }}
      >
        {console.log(filterResult)}
        {filterResult.length > 0 ? (
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
                setStormPoints({ ...empty_storm_obj });
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
        ): (<Box
          sx={{
            color: "white"
          }}>
          ...</Box>)}
      </Stack>
      <Button
      onClick={cancelFilters}
      className="cancel-search"
      >Clear Results</Button>
    </>
  )
}

function makeStormLines(stormList){
  let lin = []

  stormList.forEach((storm)=> {
    let line_of_travel = {
      "type": "Feature",
      "id": "line-of-travel-".concat(storm.display_name),
      "geometry": {
          "type": "LineString",
          "coordinates": storm.storm_lines || []
      },
      "properties": {
          "SEASON": storm.year,
          "STORMNAME": storm.name,
      }
    };
    lin.push(line_of_travel)

  })

  const storm_obj = 
  {
    pts: { features: [] },
    err: { features: [] },
    lin: { features: lin },
    rad: { features: [] },
    sea: { features: [] },
  };


  return storm_obj;
  
};


