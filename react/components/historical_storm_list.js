//import styles from './active_storm_list.module.css'
//import { parse, format } from 'date-fns';
//import storm_list from '../data/forecasts/list.json'
import CustomButton from '../custom/custom-button.js';
import { addDays, subDays, lightFormat } from "date-fns";
import { empty_storm_obj, build_storm_features } from "@/lib/storm_utils";
//import {forecastDataDir, getStormData} from '../../lib/storms.js';

const storm_list = [
  { "name": "FIONA", "year": 2022, "source": "ibtracs" },
  { "name": "ERNESTO", "year": 2018, "source": "ibtracs" },
  { "name": "EARL", "year": 2022, "source": "ibtracs" },
  { "name": "LEE", "year": 2017, "source": "ibtracs" },
  { "name": "IRMA", "year": 2017, "source": "ibtracs" },
  { "name": "BLAMMO", "year": 1999, "source": "ibtracs" },
  { "name": "CLAUDETTE", "year": 2015, "source": "ibtracs" },

]

export default function HistoricalStormList({ onHarvestData }) {
  console.log("Historical Storms Loading...");

  // const [selected_storm, setSelectedStorm] = useState("");

  let ib_storm_list = []
  let storm_details = {}

  // console.log("Selected Storm: " + selected_storm);
  // console.debug("IBTRACS Storm List: " + onHarvestData.ib_data.features.length + " points");
  // console.debug("ECCC Storm List: " + onHarvestData.eccc_data.features.length + " points");

  console.debug("onHarvestData: ", onHarvestData);

  // onHarvestData.ib_data.features.map(storm_point => {
  //   if (!ib_storm_list.includes(storm_point.properties.NAME)) {
  //     ib_storm_list.push(storm_point.properties.NAME)
  //     storm_details[storm_point.properties.NAME] = {
  //       source: "ibtracs", 
  //       year: storm_point.properties.SEASON, 
  //       data: []
  //     }
  //   }

  //   storm_details[storm_point.properties.NAME].data.push(storm_point)
  // })

  return (
    <>
      <h2>Historical Storms: </h2>
      <div id="storm_search_result">

        <ul className="results">
          {storm_list.map((storm, index) => {
            return (
              <li key={storm.name + storm.year} className={(storm.name)}>
                <a onClick={(e) => { handleClick(storm, onHarvestData) }}>{`${storm.name}-${storm.year}`}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );


}

export async function handleClick(storm, onHarvestData) {
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

    const historical_storm_data = parseStormData(storm_data);
    console.log(historical_station_data);



    // Trigger the callback to send data back to the parent
    if (onHarvestData) {
      onHarvestData({
        storm_data: historical_storm_data,
        station_data: historical_station_data
      });
    }
  } catch (error) {
    console.error('Error fetching storm or station data:', error);
  }


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
function parseStormData(storm_data) {

  if (storm_data?.ib_data?.features?.length === 0) {
    return null
    //TODO 
    // fix 404
  }
  console.log(storm_data)

  // let storm_features = structuredClone(empty_storm_obj);


  let storm_features = build_storm_features(storm_data.ib_data);

  //   let storm_details = {}
  //   let ib_storm_list = []
  //   //console.log("storm_data")
  //   //console.log(storm_data.ib_data.features)
  //   storm_data.ib_data.features.map(storm_point => {
  //     if (!ib_storm_list.includes(storm_point.properties.NAME)) {
  //       ib_storm_list.push(storm_point.properties.NAME)
  //       storm_details[storm_point.properties.NAME] = {
  //         source: "ibtracs", 
  //         year: storm_point.properties.SEASON, 
  //         data: []
  //       }
  //     }
  //     storm_details[storm_point.properties.NAME].data.push(storm_point)
  // });

  //   //console.log(storm_details)
  //   // Extract the storm key dynamically
  //   let stormName = Object.keys(storm_details)[0];

  //   // Extract the storm data using the key
  //   let storm_info = storm_details[stormName];

  //   for(let i in storm_info.data){

  //     switch(storm_info.data[i].geometry.type){
  //       case "Point":
  //         storm_features.pts.features.push(storm_info.data[i])
  //         break;
  //       // case "LineString":
  //       //   break;
  //       // case "Polygon":
  //       //   break;
  //     }
  //   }


  //console.log(storm_features);
  return storm_features;
};


