import { useEffect, useState, useContext } from 'react';
import { getHistoricalStormList} from './historical_storm_utils.js';
import { useRouter } from 'next/router';
import { Button, Box } from '@mui/material';
import {  handleClick,  handleSearch } from './historical_storm_utils.js';
import { RenderRecentStorms } from './render_recent_storms.js';
import { RenderFilterResult } from '../Filter/renderFilterResult.js';
import LoadingScreen from '../loading_screen.js';
import { AppliedFilters } from '../Filter/filtersApplied.js';
import { MapStates } from '../map.js';





/**
 * The `HistoricalStormList` function fetches historical storm data, displays recent storms with
 * clickable links, and allows users to search for specific storms by name or year.
 
 */
export default function HistoricalStormList({ setStationPoints, setStormPoints, map, Leaflet}) {

  const { setSelectedStation, returnFilterResult,setDrawerButtonClicked  } = useContext(MapStates);

  const [loading, setLoading] = useState(false);

  
  const [stormList, setStormList] = useState([]);
  const router = useRouter();
  const [previousQuery, setPreviousQuery] = useState(null);

  console.log("Historical Storms Loading...");


   // Check query parameters on mount and trigger `handleClick`
   /* This `useEffect` hook is used to run a search query when the component mounts. Here's a breakdown
   of what it does: */
   useEffect(() => { 
    if (!router.isReady) return; // Ensure router is ready
    const { name, season, sid } = router.query;
    console.log( name, season, sid )
    if (previousQuery?.name !== name || previousQuery?.season !== season || previousQuery?.sid !== sid ) {
    
      async function searchQuery(){
        
        /* This code snippet is checking if both `name` and `season` are present in the query
        parameters received from the router. If both parameters exist, it calls the `handleSearch`
        function with the `name` and `season` values to fetch storm data based on the search
        criteria. */
        console.log('here')
        if (name && season) {
          const stormObjectList = await handleSearch(name, season);
          console.log(stormObjectList);

          let selectedStorm;
          if (stormObjectList.length > 1){ // this accounts for unnamed storms that has the same name and season
            stormObjectList.forEach((stormObj) => {
              if (stormObj['storm_id'] === sid){
                selectedStorm= stormObj;
              }
            })

          }
          else{selectedStorm = stormObjectList[0];}
          
          console.log(selectedStorm);
          if (selectedStorm) {
            setDrawerButtonClicked(selectedStorm.storm_id);
            await handleClick(selectedStorm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation,setLoading);
          }
        }
    }
    searchQuery()
    setPreviousQuery({ name, season, sid });

  }
  }, [router.query, previousQuery]); // 

  useEffect(() => {
    async function fetchStormData() {
      try {
        const fetchedStormList = await getHistoricalStormList();
        setStormList(fetchedStormList);


        console.log(fetchedStormList);  // Log the returned storm list
      } catch (error) {
        console.error('Error fetching storm list:', error);
      }
    }
    
    fetchStormData();  // Call the async function

    
    
  }, []); // Empty dependency array ensures it runs only once on mount


  

 
  return (
    <>
    {loading ? (
        <LoadingScreen/>
        ) : (
        <>
          <Box className='historical_page_drawer_header'
          sx={{
            fontSize: { xs: '20px', sm: '20px', md: '24px', lg: '24px' }
          }}
          >Historical Storms: </Box>
          <hr style={{ height: '4px', backgroundColor: 'black', border: 'none' }}/>  {/* Bold line */}

      

      {returnFilterResult ? 
        (<RenderFilterResult 
          router={router}
                
        />):
        (<RenderRecentStorms
            stormList={stormList}
            setStationPoints={setStationPoints}
            setStormPoints={setStormPoints}
            map={map}
            Leaflet={Leaflet}
            router={router}
            setLoading={setLoading}
        />)}
      <hr style={{ height: '4px', backgroundColor: 'black', border: 'none' }}/> 
      
          
          
        </>
         )}
    </>
  );


}






