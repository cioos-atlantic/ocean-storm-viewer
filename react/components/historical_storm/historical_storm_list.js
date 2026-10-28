import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {  Box, Button } from '@mui/material';
import LayersClearRoundedIcon from '@mui/icons-material/LayersClearRounded';
import {  handleClick,  handleSearch } from './historical_storm_utils.js';
import { RenderFilterResult } from '../Filter/renderFilterResult.js';
import LoadingScreen from '../loading_screen.js';
import { empty_station_obj } from '../point_defaults.js';
import { RenderFilter } from '../Filter/filter.js';
import { mapActions } from "@/components/mapReducer";
import { useFilters } from "@/components/Filter/FilterContext";




/**
 * The `HistoricalStormList` function shows the storm filters and the storms they return (the last
 * 12 months on first load), and opens the storm given in the URL (name, season, sid).

 */
export default function HistoricalStormList({ setStationPoints, map, Leaflet, dispatch, drawerButtonClicked, clearShapesRef, isDrawerOpen }) {
  const { filterResult, filterQuery, resultsLoading } = useFilters();

  const [loading, setLoading] = useState(false);


  //const [searchResult, setSearchResult] = useState({})
  const router = useRouter();
  const [previousQuery, setPreviousQuery] = useState(null);

  const setStormPoints = (point) => dispatch(mapActions.setStormPoints(point));
  const setSelectedStation= (station) => dispatch(mapActions.setSelectedStation(station));
  //const setDrawerButtonClicked = (clicked) => dispatch({ type: "SET_DRAWER_BUTTON_CLICKED", payload: clicked });
  const closeAllDashboards = () => dispatch(mapActions.closeAllDashboards());


   // Check query parameters on mount and trigger `handleClick`
   /* This `useEffect` hook is used to run a search query when the component mounts. Here's a breakdown
   of what it does: */
   useEffect(() => { 
    if (!router.isReady) return; // Ensure router is ready
    const { name, season, sid } = router.query;
    if (previousQuery?.name !== name || previousQuery?.season !== season || previousQuery?.sid !== sid ) {
    
      async function searchQuery(){
        
        /* This code snippet is checking if both `name` and `season` are present in the query
        parameters received from the router. If both parameters exist, it calls the `handleSearch`
        function with the `name` and `season` values to fetch storm data based on the search
        criteria. */
        if (name && season) {
          const stormObjectList = await handleSearch(name, season);

          let selectedStorm;
          if (stormObjectList.length > 1){ // this accounts for unnamed storms that has the same name and season
            stormObjectList.forEach((stormObj) => {
              if (stormObj['storm_id'] === sid){
                selectedStorm= stormObj;
              }
            })

          }
          else{selectedStorm = stormObjectList[0];}
          
          if (selectedStorm) {
            //setDrawerButtonClicked(selectedStorm.storm_id);
            dispatch(mapActions.setDrawerButtonClicked(selectedStorm.storm_id))
            

            await handleClick(selectedStorm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation,setLoading, closeAllDashboards);
          }
        }
    }
    searchQuery()
    setPreviousQuery({ name, season, sid });

  }
  }, [router.query, previousQuery, drawerButtonClicked]); // 


  // const [selected_storm, setSelectedStorm] = useState("");
  return (
    <>
    {loading ? (
        <LoadingScreen/>
        ) : (
        <>
          {/*<Box className='historical_page_drawer_header'
          sx={{
            fontSize: { xs: '20px', sm: '20px', md: '24px', lg: '24px' }
          }}
          >Historical Storms: </Box>
          <hr style={{ height: '4px', backgroundColor: 'black', border: 'none' , margin: '5px'}}/>  {/* Bold line */}
          


        <div className="view-filter-space">
          <RenderFilter
            clearShapesRef={clearShapesRef} // Pass the ref to 
            dispatch={dispatch}
            setStationPoints={setStationPoints}
            isDrawerOpen={isDrawerOpen}

        />

        </div>
      
        
      



          
      

      <RenderFilterResult
        filterResult={filterResult}
        filterQuery={filterQuery}
        isLoading={resultsLoading}
        router={router}
        drawerButtonClicked={drawerButtonClicked}
      />


      <Button
      onClick={()=> {
        dispatch(mapActions.closeStormTracks())
        setStationPoints(empty_station_obj)
    
      router.push(`/?page=historical`)
      }}
      className="cancel-search clear-storm-tracks"
      startIcon={<LayersClearRoundedIcon />}
      >Clear Storm Tracks</Button>

      
          
          
        </>
         )}
    </>
  );


}






