import CustomButton from '../custom/custom-button.js';
import { addDays, subDays, lightFormat } from "date-fns";
import { empty_storm_obj, build_storm_features } from "@/lib/storm_utils";
import { useEffect, useState } from 'react';
import { getHistoricalStormList, parseStormData, makeStormList, isName, isYear, parseForFlyToPoint, addSearchParams } from './utils/historical_storm_utils.js';
import { useRouter } from 'next/router';
import { basePath } from '@/next.config.js';
import { empty_station_obj } from './layout.js';
import { Button, Box } from '@mui/material';

/**
 * The `HistoricalStormList` function fetches historical storm data, displays recent storms with
 * clickable links, and allows users to search for specific storms by name or year.
 
 */
export default function HistoricalStormList({ setStationPoints, setStormPoints, map, Leaflet, setSelectedStation}) {
  const [stormList, setStormList] = useState([]);
  const [searchResult, setSearchResult] = useState({})
  const router = useRouter();

  console.log("Historical Storms Loading...");
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

   // Check query parameters on mount and trigger `handleClick`
   /* This `useEffect` hook is used to run a search query when the component mounts. Here's a breakdown
   of what it does: */
   useEffect(() => { 
    
      async function searchQuery(){
        const { name, season } = router.query;
        /* This code snippet is checking if both `name` and `season` are present in the query
        parameters received from the router. If both parameters exist, it calls the `handleSearch`
        function with the `name` and `season` values to fetch storm data based on the search
        criteria. */
        if (name && season) {
          const stormObjectList = await handleSearch(name, season)
          const selectedStorm = stormObjectList[0];
          console.log(selectedStorm);
          if (selectedStorm) {
            await handleClick(selectedStorm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation);
          }
        }
    }
  searchQuery()
  }, []); // 


  

  // const [selected_storm, setSelectedStorm] = useState("");
  return (
    <>
      <Box className='historical_page_drawer_header'
      sx={{
        fontSize: { xs: '20px', sm: '20px', md: '24px', lg: '24px' }
      }}
      >Historical Storms: </Box>
      <hr style={{ height: '4px', backgroundColor: 'black', border: 'none' }}/>  {/* Bold line */}
      <Box className='historical_page_drawer_subheader'
      sx={{
        fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '20px' }
      }}
      >Recent Storms: </Box>
      <Box id="storm_search_result"
            className="historical_storm_search_result"
            
            >
      {stormList.map((storm, index) => {
            return (
              <div key={storm.storm_id} className={(storm.name)}>
                <Button 
                className='historical_storm_button'
                sx={{
                  fontSize: { xs: '10px', sm: '10px', md: '12px', lg: '12px' }
                }}
                onClick={(e) => { 
                  handleClick(storm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation);

                  //console.log(storm);
                  }}>{`${storm.display_name}`}</Button>
              </div>
            )
          })}


        
      </Box>

      

      <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }}/> 
      <Box className='historical_storm_search_header'
        sx={{
          fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '20px' }
        }}
      >Storm Search: </Box>
      <div id="storm_search"
      className="historical_storm_search">
        <form onSubmit={(e) => handleFormSubmit(e, setSearchResult, router)}>
        <input type="text" id="historical_storm_search" 
        name="historical_storm_search" required minLength="4" placeholder='Storm name or year'/> 
        <br/>
        <button 
        id='search_button'
        type="submit">Search</button>
        </form>

        <div id="storm_search_result"
        className='historical_storm_search_result'
        >
          {
          
          searchResult.length > 0 && searchResult.map((storm, index) => {
            return (

              <div key={storm.storm_id} className={(storm.name)}>
                <Button 
                className='historical_storm_button'
                sx={{
                  fontSize: { xs: '10px', sm: '10px', md: '12px', lg: '12px' }
                }}
                onClick={(e) => { handleClick(storm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation) }}>{`${storm.display_name}`}</Button>
              </div>
            )
          })}
      </div>

        
           
      </div>

       
    </>
  );


}

/**
 * The handleClick function handles a button click event, fetches historical storm and station data
 * based on the storm details, and sets the retrieved data for display on the map.

 */
export async function handleClick( storm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation) {

  //console.log(Leaflet);
  setSelectedStation(empty_station_obj)
  
  console.log('Button clicked for', storm.name);
  const storm_name = storm.name;
  const storm_year = storm.year;
  const storm_id = storm.storm_id;

  addSearchParams(storm_name, storm_year, router)
  let storm_source;

  // if condition because of what list.json looks like eccc instead of ECCC
  if (storm.source === 'eccc') {
    storm_source = "ECCC";
  }
  else if (storm.source === 'ibtracs') {
    storm_source = "IBTRACS"
  }
  //console.log(storm_source)


  // Construct query parameters
  const query = new URLSearchParams({
    name: storm_name,
    season: storm_year,      // Using season for storm year
    source: storm_source,
    id: storm_id
  }).toString();


  try {
    const resource = await fetch(`${basePath}/api/historical_storms?${query}`);
    const storm_data = await resource.json();

    

    //console.log(historical_station_data)
    const station_resource = await fetch(`${basePath}/api/query_stations_historical?${query}`);
    const historical_station_data = await station_resource.json();

    //console.log(Leaflet);

    const historical_storm_data = parseStormData(storm_data, storm.name, map, Leaflet);
    //console.log(historical_storm_data);

    console.debug("Historical Storm Data: ", historical_storm_data);
    console.debug("Historical Station Data: ", historical_station_data);

    setStormPoints(historical_storm_data);  // Set the storm data
    setStationPoints(historical_station_data);  // Set the station data
    


  } catch (error) {
    console.error('Error fetching storm:', error);
  }


};



/**
 * The function `handleFormSubmit` processes user input from a form, extracts storm name and year,
 * performs a search, and updates the search results.
 
 * @returns The `handleFormSubmit` function is returning the unique list of search results obtained
 * from the `handleSearch` function after processing the input values for storm name and year. This
 * unique list is then set as the search result using the `setSearchResult` function.
 */
async function handleFormSubmit(e, setSearchResult){
  //prevent default behavior
  let storm_name = "";
  let storm_year = "";
  console.log(e)
  e.preventDefault();
  
  const searchInputField = e.target.elements.historical_storm_search; // Reference to the input field
  let searchInput= searchInputField.value;
  const search_values= searchInput.split(" ")
  //if (search_values.length ===1) {}
  console.log(search_values);

  for (let value of search_values){
    if (isYear(value)){storm_year = value}
    else if (isName(value)){storm_name = value}
    else {alert("Wrong Input. If input is only year, ensure it is in 4 digits. If year  and storm name, add a space between");
      return;
    }
  };
  
  const uniqueList= await handleSearch(storm_name, storm_year)

  console.log(uniqueList)
  setSearchResult(uniqueList)

  // Clear the input field
  searchInputField.value = "";
  
}

/**
 * The function `handleSearch` fetches historical storm data based on the storm name and year, creates
 * a list of unique storm objects, and returns the list.
 
 * @returns The `handleSearch` function is returning the `uniqueList` variable, which contains the list
 * of unique storm data objects obtained from the API call.
 */
export async function handleSearch(storm_name, storm_year){
  let uniqueList;

  const query = new URLSearchParams({
    name: storm_name, 
    season: storm_year     // Using season for storm year
  }).toString();

  console.log(query)

  try {
    const resource = await fetch(`${basePath}/api/historical_storms?${query}`);
    const storm_data = await resource.json();
    //console.log(storm_data);

    //const historical_storm_data = parseStormData(storm_data, storm.name);
    // console.log(historical_station_data);

    console.debug(`historical Storm Data for ${storm_name} and ${storm_year}: `, storm_data);
    // Create a set to track unique IDs and add objects to the result list
    uniqueList = makeStormList(storm_data)
    // Create a set to track unique IDs and add objects to the result list
    

    console.log(uniqueList);
    if (uniqueList.length === 0) {
      alert("No result found for this search, please try again...")
    }
    

  } catch (error) {
    console.error('Error fetching storm or station data:', error);
  }
  
  return uniqueList
}
