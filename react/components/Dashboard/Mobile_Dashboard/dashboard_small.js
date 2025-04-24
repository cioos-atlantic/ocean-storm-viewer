import { fetch_value } from "@/lib/storm_utils";
import { getStationDataText, getMatchedStation, get_station_field_data } from "../../utils/station_data_format_util";
import { convert_unit_data } from "../../utils/unit_conversion";
import { Box } from "@mui/material";
import { FaWindowClose } from "react-icons/fa";
import RenderStormChart from "../../storm_dashboard/storm_graph";
import RenderCombinedChart from './combined_graph'
import StormTypeChart from "@/components/storm_dashboard/storm_type_chart";
import StormCategoryChart from "@/components/storm_dashboard/storm_cat_chart";



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
	const [stormName, stormTimes, stormType, stormDataDict, stormCategory] = parseStormData(storm_points);

	const mergedData = mergeData(stationDataDict, stormDataDict);

	console.log(mergedData);
	const stationTimes = get_station_field_data(stationValues?.properties?.station_data,"time", "column_std_names")?.data

	const convertedStormTimes = stormTimes.map(time =>  Date.parse(time));

	const { unifiedTimes, alignedMergedData } = alignMergedData(mergedData, convertedStormTimes, stationTimes);

	console.log(unifiedTimes, alignedMergedData);

	const variablePresence = createVarPresenceDict(alignedMergedData);

	function generateGraph(selectedVar){
				return (
				 <div className="station_chart" 
				 style={{
				 height: 'auto',
				 width: 'auto', // Adjust width based on content (chart)
				 padding: '0px', // Optional padding around chart
				 display:'flex',
				 }}>
				 <RenderCombinedChart   
									sourceData={alignedMergedData[selectedVar]}
									varCategory={selectedVar}
									 timeData={unifiedTimes}
									 hoverPointTime={hoverPointTime}
								/>
			 </div>
				)
		}




	


	return (
	<Box
      key="01-station-dashboard"
      className={`combined_dashboard_small`}
      sx={{
				bottom: { xs: "20px", sm: "30px", md: "35px", lg: "50px", xl: "50px" },
				width: "100%",
				gap: 0,
				display: "flex",
				alignItems: "stretch", // Ensures both boxes are equal height
				maxHeight:  { xs: "45%",  md: "55%" }, 
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
      >{/* Storm Type */}
      <section className="station_dashboard_small_screen_section">
        <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px'}
          }}
          className="section-header"
        >{stormType['name']}</Box>
        <p>{<StormTypeChart chartData={stormType}/>}</p>
        
      </section>


      {/* Storm Category */}
      <section className="station_dashboard_small_screen_section">
        <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px'}
          }}
          className="section-header"
        >{stormCategory['name']}</Box>
        <p>{<StormCategoryChart chartData={stormCategory}/>}</p>
        
      </section>
				
				
				
				
				{
            Object.entries(alignedMergedData).map(([key, value], index) => {
              
              return(<>
											{variablePresence[key] && (
												<section className="station_dashboard_small_screen_section">
													<Box
														sx= {{
															fontSize: { xs: '14px', sm: '16px'}
														}}
														className="section-header"
													>{key}</Box>
													{generateGraph(key)}
											</section>)}
										</>
			)
            })
      }
        
         
        
        
      </Box>
    </Box>


	)
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
		'wind_from_direction'
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
		const unit = stationData?.['column_units']?.[indx];
		

		const varData = []

		stationData.rows.forEach((row)=>{
			varData.push(row[indx])
		})

		data_dict.push({
			[column_name]:{
				name:long_name,
				standardName:std_name,
				data:varData.map((value)=>convert_unit_data(value,unit).value) || [],
				displayName:`Station ${long_name} (${convert_unit_data(varData[0], unit).unit})`
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
		Direction: [{stormDir: { data: [], name: "Storm Direction (degree)" }}],
		Pressure: [{stormPressure: { data: [], name: "Storm Pressure (kPa)" }}],
		'Storm Speed': [{stormSpeed: { data: [], name: "Storm Speed (km/h)" }}],
		'Wave Height': [{stormSeaHgt: { data: [], name: "Storm Sea Height (m)" }}],
		'Wind Speed': [{stormWindSpeed: { data: [], name: "Storm Wind Speed (km/h)" }},
		{stormGust: { data: [], name: "Storm Gust (km/h)" }}],
		Temperature:[],

	}



	stormPoints.forEach((storm_point)=> {
	
	//console.log(storm_point);
	stormNameList.push(fetch_value(storm_point, ["STORMNAME", "NAME"]));
	stormTime.push(fetch_value(storm_point, ["TIMESTAMP", "ISO_TIME"]));
	storm_data_dict.Direction[0].stormDir.data.push(storm_point.properties.STORM_DIR);
	
	stormCategory.data.push(fetch_value(storm_point, ["STORMFORCE", "USA_SSHS"]));


	// convert gust, storm speed and wind speed from knots to Kmh to synchronize with station chart
	const gust_in_Kmh = convert_unit_data(storm_point.properties.USA_GUST, 'knots', 'km/h')
	const stormWindSpeed_in_knots = fetch_value(storm_point, ["MAXWIND", "WMO_WIND", "USA_WIND"])
	const stormWindSpeed_in_Kmh = convert_unit_data(stormWindSpeed_in_knots, 'knots', 'km/h')
	const stormSpeed_in_Kmh = convert_unit_data(storm_point.properties.STORM_SPEED, 'knots', 'km/h')
	

	storm_data_dict['Storm Speed'][0].stormSpeed.data.push(stormSpeed_in_Kmh.value);
	storm_data_dict['Wind Speed'][1].stormGust.data.push(gust_in_Kmh.value);
	storm_data_dict['Wind Speed'][0].stormWindSpeed.data.push(stormWindSpeed_in_Kmh.value);
	const pressure_in_mb = fetch_value(storm_point, ["MSLP", "WMO_PRES", "USA_PRES"])|| []
	
	const pressure_in_kpa= convert_unit_data(pressure_in_mb, 'mbar', 'kPa')
								
	storm_data_dict.Pressure[0].stormPressure.data.push(pressure_in_kpa.value);
	
	stormType.data.push(fetch_value(storm_point, ["STORMTYPE", "NATURE"]));

	const seaHeight_in_m = convert_unit_data(storm_point.properties.USA_SEAHGT, 'ft', 'm');
	storm_data_dict['Wave Height'][0].stormSeaHgt.data.push(seaHeight_in_m.value);
	
	})
	const stormNameUniqueValues= [...new Set(stormNameList)];
	const stormName = stormNameUniqueValues[0];
	
	console.log(stormName);

	return [stormName, stormTime, stormType, storm_data_dict, stormCategory]
}

function mergeData(station_data, storm_data){
	const merged_data = JSON.parse(JSON.stringify(storm_data)); // deepclone storm_data
	station_data.forEach((varObj)=>{
	const variable = Object.values(varObj)[0];
	console.log(variable);


		// sea height
		if (variable.standardName.includes('wave') && variable.standardName.includes('height'))
			{merged_data['Wave Height'].push(
				{[`station${variable.name}`]:{
					data: variable.data, 
					name: variable.displayName }}
			)}
			// wind speed and gust
		if (variable.standardName.includes('wind') && variable.standardName.includes('speed'))
			{merged_data['Wind Speed'].push(
				{[`station${variable.name}`]:{
					data: variable.data, 
					name: variable.displayName }}
			)}
			// temperature
		if (variable.standardName.includes('temperature'))
			{merged_data['Temperature'].push(
				{[`station${variable.name}`]:{
					data: variable.data, 
					name: variable.displayName }}
		)}

		//pressure
		if (variable.standardName.includes('pressure'))
			{merged_data['Pressure'].push(
				{[`station${variable.name}`]:{
					data: variable.data, 
					name: variable.displayName }}
		)}
	
	})

	return merged_data;
}

function alignMergedData(merged_data, stormTimes, stationTimes) {
  const unifiedTimes = Array.from(new Set([...stormTimes, ...stationTimes])).sort();

  const alignedMergedData = {};

  for (const category in merged_data) {
    alignedMergedData[category] = merged_data[category].map(varObj => {
      const varKey = Object.keys(varObj)[0];
      const variable = varObj[varKey];
      
      // figure out whether it is storm or station data
      const times = varKey.startsWith('storm') ? stormTimes : stationTimes;

      const timeToValue = new Map(times.map((time, idx) => [time, variable.data[idx]]));

      const alignedData = unifiedTimes.map(time => timeToValue.get(time) ?? null);

      return {
        [varKey]: {
          name: variable.name,
          data: alignedData
        }
      };
    });
  }

  return { unifiedTimes, alignedMergedData };
}

function createVarPresenceDict(mergedData){
	const variablePresence={};
  Object.keys(mergedData).forEach((key) => {
    variablePresence[key]= false;
  });

	Object.entries(mergedData).forEach(([key, value]) => {
		if (Array.isArray(value) && value.length > 0) {
			variablePresence[key] = value.some(obj => {
				const v = Object.values(obj)[0];
				return v?.data?.some(item => item != null && !Number.isNaN(item));
			});
		} else {
			variablePresence[key] = false;
		}
  });

	console.log(variablePresence);
	return variablePresence;
}

