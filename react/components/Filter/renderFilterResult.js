import { memo } from "react";
import {  Box, Typography, Paper, Stack } from "@mui/material";
import { handleStormButtonClick } from "../historical_storm/historical_storm_utils";
import { FiltersSubmitted } from "./viewFilters";


// The storm list in the historical drawer: the storms for the last applied filter query (the default
// date range on page load). Empty after "Clear all" until filters are applied again.
// Memoized: the parent re-renders on every filter change, but this list only needs to when its props change
// (filterQuery only changes on submit)
export const RenderFilterResult = memo(function RenderFilterResult({filterResult, filterQuery, isLoading, router, drawerButtonClicked}){
  const hasQuery = Object.keys(filterQuery).length > 0;

  let header;
  if (isLoading) header = 'Loading storms…';
  else if (hasQuery) header = `Storms: ${filterResult.length}`;
  else header = 'Storms';

  return(

    <>

      {/* historical-storm-results: target of the "historical storms" tour step (Tour/tourSteps.js) */}
      <Stack

        spacing={0.1}
        className='search-output-space historical-storm-results'
        sx={{
          
        }}
      >
       
          <>
          <Box
          className='filter_page_drawer_subheader'>
          {header}
          {!isLoading && <FiltersSubmitted filterQuery={filterQuery} />}
          </Box >

          {!isLoading && !hasQuery && (
            <Typography className='filter-result-empty'>
              Set a filter and click Apply filters to list storms.
            </Typography>
          )}

          <Stack sx={{overflowX: 'hidden', 
                    paddingLeft: '7px', 
                    paddingRight: '7px'}} 
                  spacing={0.5}>
            {filterResult.map((storm, index) => {
              const isClicked = drawerButtonClicked === storm.storm_id;
              return(
                <Paper
                  key={storm.storm_id}
                  onClick=
                    {(e) => { 
                    handleStormButtonClick(storm.name, storm.year, storm.storm_id, router);
                            }}
                    sx={{color: isClicked ? 'white' : 'black', 
                                      backgroundColor: isClicked ? 'black' : 'white',
                                      padding: isClicked ? '3px' : '0.5px',
                                      border: isClicked ? 'solid white 2px': '0',
                                      
                                    }}      
                >
                  <Typography className='search-output' sx ={{fontWeight: isClicked ? '550': 'normal'}} >
                    {`${storm.display_name}`}
                  </Typography>
                  
                </Paper>
              )
            
            
            })}
          </Stack>
          </>
        
      </Stack>
    </>
  )
});