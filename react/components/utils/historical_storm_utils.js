import { subYears } from "date-fns";
import { empty_storm_obj, build_storm_features } from "@/lib/storm_utils";

export async function getHistoricalStormList(){
  // Construct query parameters
  const oneYearAgo = subYears(new Date(), 1);
  const min_storm_time = new Date(oneYearAgo).toISOString().split('T')[0] + "T00:00:00Z"; // get the current year
  console.log( min_storm_time)
  


  const query = new URLSearchParams({
    minTime: min_storm_time,      // Using season for storm year
  }).toString();

  
  try {
    const resource = await fetch(`/api/historical_storms?${query}`);
    const storm_data = await resource.json();
    //console.log(storm_data);

    //const historical_storm_data = parseStormData(storm_data, storm.name);
    // console.log(historical_station_data);

    console.debug(`historical Storm Data for ${min_storm_time}: `, storm_data);
    const uniqueList= makeStormList(storm_data)
    // Create a set to track unique IDs and add objects to the result list
    

    console.log(uniqueList);
    return uniqueList



  } catch (error) {
    console.error('Error fetching storm or station data:', error);
  }
}

export function parseStormData(storm_data, storm_name) {

  if (storm_data?.ib_data?.features?.length === 0) {
    console.warn("No IBTRACS Data features found for ", storm_name);
    return null
  }

  console.log(storm_data)

  let storm_details = {}
  let ib_storm_list = []

  console.log(storm_data)

  storm_data.ib_data.features.map(storm_point => {
    if (!ib_storm_list.includes(storm_point.properties.NAME)) {
      ib_storm_list.push(storm_point.properties.NAME)
      storm_details[storm_point.properties.NAME] = {
        source: "ibtracs",
        year: storm_point.properties.SEASON,
        data: []
      }
    }
    storm_details[storm_point.properties.NAME].data.push(storm_point)
  });

  // console.log("parseStormData -> Storm Details: ", storm_details);
  let storm_features = build_storm_features(storm_details[storm_name]);

  // console.log("parseStormData -> Final Storm Features: ", storm_features);
  return storm_features;
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


export async function getStationData(min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time) {
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

export function getStationQueryParams(historical_storm_data) {
  const [min_lon, min_lat, max_lon, max_lat] = historical_storm_data.ib_data.bbox.map(num => num.toString());

  const storm_id = historical_storm_data.ib_data.features['0'].id;
  const [_, __, storm_time] = storm_id.split('.');
  console.log(storm_time)

  const max_storm_time = lightFormat(addDays(new Date(storm_time), 15), "yyyy-MM-dd'T'00:00:00");
  const min_storm_time = lightFormat(subDays(new Date(storm_time), 15), "yyyy-MM-dd'T'00:00:00");
  console.log(min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time)


  return [min_lon, min_lat, max_lon, max_lat, max_storm_time, min_storm_time]

}

export function makeStormList(storm_data){
  // Create a set to track unique IDs and add objects to the result list
  const uniqueList = [];
  const stormIdentifiers = new Set();
  const stormData = storm_data?.ib_data?.features

  

  stormData?.forEach(feature => {
    let name = feature.properties.NAME;
    let year = feature.properties.SEASON;
    let storm_id = feature.properties.SID;
    let display_name= `${name}-${year}`;


    if (name === "UNNAMED"){display_name = `${name}-${storm_id}` }

    const identifier = `${name}-${year}-${storm_id} `;

    // check if name and year exists and if storm identifier does not have the identifier

    if (name && year && !stormIdentifiers.has(identifier)) {
      stormIdentifiers.add(identifier);
      uniqueList.push({ name, year, storm_id, display_name, source: "ibtracs" });
    }
  
  
  })

  
  return uniqueList
}

export function isYear(input) {
  const yearPattern = /^\d{4}$/; // Matches exactly 4 digits
  return yearPattern.test(input);
}

export function isName(input) {
  const namePattern = /^[a-zA-Z]+$/; // Matches only letters (no spaces or numbers)
  return namePattern.test(input);
}



export function isStormId(input) {
  const namePattern =  /^\d{4}\d{3}[a-zA-Z]\d{5}$/; // Matches only letters (no spaces or numbers)
  return namePattern.test(input);
}

