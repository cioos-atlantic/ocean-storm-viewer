import { fetch_value } from "@/lib/storm_utils";
import { getStationDataText, getMatchedStation } from "../utils/station_data_format_util";
import { convert_unit_data } from "../utils/unit_conversion";


export function RenderSmallDashboard({selected_station, hover_point, station_descriptions, source_type, time, storm_points}){
	const stationData = selected_station;
	console.log(stationData);
	const stationName = stationData[0];
  const stationValues = stationData[1];

  const hoverPointTime = fetch_value(hover_point, ["TIMESTAMP", "ISO_TIME"]);
  console.log(hoverPointTime);
	const stationDataDict = parseStationData(stationValues)
	console.log(stationDataDict);
	const ibtracs_link = 'https://www.ncei.noaa.gov/products/international-best-track-archive';

	const [stationSummary, stationDisplayName, institution, institutionLink] = getStationInfo(stationValues, station_descriptions, stationName, source_type, time);
  console.log(stationSummary, stationDisplayName, institution, institutionLink);
	const [stormName, stormTime, stormType, storm_data_dict] = parseStormData(storm_points);

	return (<>
	<Box
      key="01-station-dashboard"
      className={`station_dashboard`}
      sx={{
        display:  'flex',
      }}
    >
      <Box
        className="dash-header"
        sx={{
          fontSize: { xs: "14px", sm: "16px", md: "18px", lg: "18px" },
          padding: "10px",
          
        }}
      >
        <button
          className="close"
          onClick={() => {
            console.log('close button clicked')
          }}
          title="Close"
          aria-label="Close"
        >
          <FaWindowClose />
        </button>
        <div>
          <strong key={stormName}>Storm Name:</strong>
					{stormName}
        </div>
				<div>
          <strong key={stormName}>Storm DataSource:</strong>
					<a href={ibtracs_link} target="_blank" rel="noopener noreferrer">
            IBTrACS
          </a>
        </div>
				<div>
          <strong key={stationDisplayName}>Station Name:</strong>
					{stationDisplayName}
        </div>
        <div>
          <a href={institutionLink} target="_blank" rel="noopener noreferrer">
            {institution}
          </a>
        </div>
      </Box>
      <Box
        className="dash-body"
        sx={{
          fontSize: { xs: "12px", sm: "14px", md: "16px", lg: "16px" },
          
        }}
      >
        
          <StationDataLayout
            stationName={stationName}
            stationData={stationValues?.properties?.station_data}
            stationSummaryText={dataText}
            variablePresence={variablePresence}
            hoverPointTime={hoverPointTime}
          />
        
        
      </Box>
    </Box>


	</>)
}


function getStationInfo(stationValues, station_descriptions, stationName, source_type, time ){
	// Determine if active or historic
		const isHistorical = source_type == "historical" ? true : false
		const dataText = getStationDataText(stationValues, time, isHistorical);
		console.log(dataText);
	
		if (!dataText) return null;
	
    const stationDescription = getMatchedStation(station_descriptions, stationName);
    const displayName = stationDescription.title || "Unknown Station";
    const institution = stationDescription.institution || "Unknown Institution";
    const institutionLink = stationDescription.institution_link || "#";


		return [dataText, displayName, institution, institutionLink];

}


function parseStationData(stationValues){
	const excludeVars = [
    "time",
    "latitude",
    "longitude",
    "relative_humidity",
    "sea_surface_wave_from_direction",
    "sea_surface_wave_maximum_period",
  ];

	const standardNames = stationValues?.properties?.station_data?.column_std_names || [];
	const stationData = stationValues?.properties?.station_data || [];

	const dataIndx= [];
	const data_dict=[]


	standardNames.forEach((varName, index) => {
			if (!excludeVars.includes(varName)) {
				dataIndx.push(index)
				


			}})

	console.log(dataIndx);

	dataIndx.forEach((indx)=>{
		const column_name= stationData?.['column_names']?.[indx];
		const long_name = stationData?.['column_long_names']?.[indx];
		const std_name = stationData?.['column_std_names']?.[indx];
		

		const varData = []

		stationData.rows.forEach((row)=>{
			varData.push(row[indx])
		})

		data_dict.push({
			[column_name]:{
				name:long_name,
				standardName:std_name,
				data:varData
			}
		})
	})

	console.log(data_dict);
	return data_dict;
	
}
function parseStormInfo(hover_point){
	return (
		<StormSummaryText storm_point_hover={hover_point}/>
	)
}

function parseStormData(storm_points){
	const stormPoints = storm_points.pts.features;
	console.log(stormPoints)
	

	const stormNameList = [];
	const stormTime = [];
	const stormType={
	data:[], 
	name:'Storm Type'
	}

	const stormCategory={data:[], name:'Storm Category'}
	const storm_data_dict ={
	direction: [{stormDir: { data: [], name: "Storm Direction (degree)" }}],
	Pressure: [{stormPressure: { data: [], name: "Storm Pressure (kPa)" }}],
	speed: [{stormSpeed: { data: [], name: "Storm Speed (km/h)" }}],
	seaHeight: [{stormSeaHgt: { data: [], name: "Storm Sea Height (m)" }}],
	'Wind Speed': [{stormWindSpeed: { data: [], name: "Storm Wind Speed (km/h)" }},
	{stormGust: { data: [], name: "Storm Gust (km/h)" }}],

	}



	stormPoints.forEach((storm_point)=> {
	
	//console.log(storm_point);
	stormNameList.push(fetch_value(storm_point, ["STORMNAME", "NAME"]));
	stormTime.push(fetch_value(storm_point, ["TIMESTAMP", "ISO_TIME"]));
	storm_data_dict.direction[0].stormDir.data.push(storm_point.properties.STORM_DIR);
	
	stormCategory.data.push(fetch_value(storm_point, ["STORMFORCE", "USA_SSHS"]));


	// convert gust, storm speed and wind speed from knots to Kmh to synchronize with station chart
	const gust_in_Kmh = convert_unit_data(storm_point.properties.USA_GUST, 'knots', 'km/h')
	const stormWindSpeed_in_knots = fetch_value(storm_point, ["MAXWIND", "WMO_WIND", "USA_WIND"])
	const stormWindSpeed_in_Kmh = convert_unit_data(stormWindSpeed_in_knots, 'knots', 'km/h')
	const stormSpeed_in_Kmh = convert_unit_data(storm_point.properties.STORM_SPEED, 'knots', 'km/h')
	

	storm_data_dict.speed[0].stormSpeed.data.push(stormSpeed_in_Kmh.value);
	storm_data_dict['Wind Speed'][1].stormGust.data.push(gust_in_Kmh.value);
	storm_data_dict['Wind Speed'][0].stormWindSpeed.data.push(stormWindSpeed_in_Kmh.value);
	const pressure_in_mb = fetch_value(storm_point, ["MSLP", "WMO_PRES", "USA_PRES"])|| []
	
	const pressure_in_kpa= convert_unit_data(pressure_in_mb, 'mbar', 'kPa')
								
	storm_data_dict.Pressure[0].stormPressure.data.push(pressure_in_kpa.value);
	
	stormType.data.push(fetch_value(storm_point, ["STORMTYPE", "NATURE"]));

	const seaHeight_in_m = convert_unit_data(storm_point.properties.USA_SEAHGT, 'ft', 'm');
	storm_data_dict.seaHeight[0].stormSeaHgt.data.push(seaHeight_in_m.value);
	
	})
	const stormNameUniqueValues= [...new Set(stormNameList)];
	const stormName = stormNameUniqueValues[0];
	
	console.log(stormName);

	return [stormName, stormTime, stormType, storm_data_dict]
}

