import CustomButton from '../custom/custom-button.js';
import { addDays, subDays, lightFormat } from "date-fns";
import { empty_storm_obj, build_storm_features } from "@/lib/storm_utils";
import { useEffect, useState } from 'react';
import { getHistoricalStormList, parseStormData } from './utils/historical_storm_utils.js';

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
              <li key={storm.name + storm.year} className={(storm.name)}>
                <a onClick={(e) => { handleClick(storm, setStationPoints, setStormPoints) }}>{`${storm.name}-${storm.year}`}</a>
              </li>
            )
          })}
        </ul>
      </div>

      <hr style={{ height: '2px', backgroundColor: 'black', border: 'none' }}/> 
      <h4>Other Storms: </h4>
      <div id="other_storms_search_result">

        <ul className="results">
          {otherStormList.map((storm, index) => {
            return (
              <li key={storm.name + storm.year} className={(storm.name)}>
                <a onClick={(e) => { handleClick(storm, setStationPoints, setStormPoints) }}>{`${storm.name}-${storm.year}`}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );


}

export async function handleClick(storm, setStationPoints, setStormPoints) {
  console.log('Button clicked for', storm.name);
  const storm_name = storm.name;
  const storm_year = storm.year;

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
    source: storm_source
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

    const historical_storm_data = parseStormData(storm_data, storm.name);
    // console.log(historical_station_data);

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
    console.error('Error fetching storm or station data:', error);
  }


};

// Function to handle harvested historical storm data
function handleHarvestHistoricalData(data, setStationPoints, setStormPoints) {
  console.log("Harvested Historical Storm Data:", data);
  //console.log(data.ib_data.features)
  //if(data.ib_data.features){}
  setStormPoints(data.storm_data);  // Set the storm data
  setStationPoints(data.station_data);  // Set the station data
  // Update the state with the harvested data
  //console.log("Historical Storm Data set:", data);
};


async function getStationData(min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time) {
  const query = new URLSearchParams({
    min_time: min_storm_time,
    max_time: max_storm_time,
    min_lon,
    min_lat,
    max_lon,
    max_lat
  }).toString();

  //const resource = await fetch(process.env.BASE_URL + '/api/historical_storms')

  // process.env reading empty

  //console.log(process)
  const resource = await fetch(`/api/query_stations_historical?${query}`);

  const historical_station_data = await resource.json();

  console.log(historical_station_data);
  return historical_station_data

  // Trigger the callback to send data back to the parent


};

function getStationQueryParams(historical_storm_data) {
  const [min_lon, min_lat, max_lon, max_lat] = historical_storm_data.ib_data.bbox.map(num => num.toString());

  const storm_id = historical_storm_data.ib_data.features['0'].id;
  const [_, __, storm_time] = storm_id.split('.');
  console.log(storm_time)

  const max_storm_time = lightFormat(addDays(new Date(storm_time), 15), "yyyy-MM-dd'T'00:00:00");
  const min_storm_time = lightFormat(subDays(new Date(storm_time), 15), "yyyy-MM-dd'T'00:00:00");
  console.log(min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time)


  return [min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time]

}


