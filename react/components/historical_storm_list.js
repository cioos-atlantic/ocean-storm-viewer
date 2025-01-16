import CustomButton from '../custom/custom-button.js';
import { addDays, subDays, lightFormat } from "date-fns";
import { empty_storm_obj, build_storm_features } from "@/lib/storm_utils";
import { useEffect, useState } from 'react';
import { getHistoricalStormList, parseStormData, makeStormList, isName, isYear, parseForFlyToPoint, addSearchParams } from './utils/historical_storm_utils.js';
import { useRouter } from 'next/router';


const otherStormList = [
  { "name": "FIONA", "year": 2022, "source": "ibtracs" },
  { "name": "ERNESTO", "year": 2018, "source": "ibtracs" },
  { "name": "EARL", "year": 2022, "source": "ibtracs" },
  { "name": "LEE", "year": 2017, "source": "ibtracs" },
  { "name": "IRMA", "year": 2017, "source": "ibtracs" },
  { "name": "BLAMMO", "year": 1999, "source": "ibtracs" },
  { "name": "CLAUDETTE", "year": 2015, "source": "ibtracs" },

]



export default function HistoricalStormList({ setStationPoints, setStormPoints, map, Leaflet }) {
  
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
            await handleClick(selectedStorm, setStationPoints, setStormPoints, map, Leaflet, router);
          }
        }
    }
  searchQuery()
  }, []); // 


  

  // const [selected_storm, setSelectedStorm] = useState("");
  return (
    <>
      <h2>Historical Storms: </h2>
      <hr style={{ height: '4px', backgroundColor: 'blue', border: 'none' }}/>  {/* Bold line */}
      <h4>Recent Storms: </h4>
      <div id="storm_search_result">

        <ul className="results">
          {stormList.map((storm, index) => {
            return (
              <li key={storm.storm_id} className={(storm.name)}>
                <a onClick={(e) => { 
                  handleClick(storm, setStationPoints, setStormPoints, map, Leaflet, router);
                  
                  //console.log(storm);
                  }}>{`${storm.display_name}`}</a>
              </li>
            )
          })}
        </ul>
      </div>

      

      <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }}/> 
      <h4>Storm Search: </h4>
      <div id="storm_search">
        <form onSubmit={(e) => handleFormSubmit(e, setSearchResult, router)}>
        <input type="text" id="historical_storm_search" name="historical_storm_search" required minLength="4" placeholder='Storm name or year'/> 
        <br/>
        <button type="submit">Search</button>
        </form>

        <div id="storm_search_result">

        <ul className="results">
          {
          
          searchResult.length > 0 && searchResult.map((storm, index) => {
            return (
              <li key={storm.storm_id} className={(storm.name)}>
                <a onClick={(e) => { handleClick(storm, setStationPoints, setStormPoints, map, Leaflet, router) }}>{`${storm.display_name}`}</a>
              </li>
            )
          })}
        </ul>
      </div>

        
           
      </div>

       
    </>
  );


}

export async function handleClick( storm, setStationPoints, setStormPoints, map, Leaflet, router) {
  //console.log(Leaflet);
  
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

  //const resource = await fetch(process.env.BASE_URL + '/api/historical_storms')

  // process.env reading empty

  //console.log(process)
  try {
    const resource = await fetch(`/api/historical_storms?${query}`);
    const storm_data = await resource.json();

     
    //console.log(storm_data);

    //console.log(historical_storm_data);
    //const [min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time] = getStationQueryParams (historical_storm_data)

    //console.log(min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time);

    //const historical_station_data = await getStationData(min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time )

    //console.log(historical_station_data)
    const station_resource = await fetch(`/api/query_stations_historical?${query}`);
    const historical_station_data = await station_resource.json();

    //console.log(Leaflet);

    const historical_storm_data = parseStormData(storm_data, storm.name, map, Leaflet);
    //console.log(historical_storm_data);

    console.debug("Historical Storm Data: ", historical_storm_data);
    console.debug("Historical Station Data: ", historical_station_data);

    setStormPoints(historical_storm_data);  // Set the storm data
    setStationPoints(historical_station_data);  // Set the station data
    
  
    // Trigger the callback to send data back to the parent
    // handleHarvestHistoricalData({
    //   storm_data: historical_storm_data,
    //   station_data: historical_station_data
    // }, setStationPoints, setStormPoints);

  } catch (error) {
    console.error('Error fetching storm:', error);
  }


};



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

export async function handleSearch(storm_name, storm_year){
  let uniqueList;

  const query = new URLSearchParams({
    name: storm_name, 
    season: storm_year     // Using season for storm year
  }).toString();

  console.log(query)

  try {
    const resource = await fetch(`/api/historical_storms?${query}`);
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




