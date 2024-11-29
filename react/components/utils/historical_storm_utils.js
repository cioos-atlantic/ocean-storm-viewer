import { subYears } from "date-fns";

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
    // Create a set to track unique IDs and add objects to the result list
    const uniqueList = [];
    const storm_names = new Set();
    const stormData = storm_data.ib_data.features

    stormData.forEach(feature => {
      if (!storm_names.has(feature.properties.NAME)) {
        storm_names.add(feature.properties.NAME);
        uniqueList.push({ "name": feature.properties.NAME, "year": feature.properties.SEASON, "source": "ibtracs" });
      }
    });

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
