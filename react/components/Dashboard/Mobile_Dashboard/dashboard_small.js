import { fetch_value } from "@/lib/storm_utils";
import { getStationDataText, getMatchedStation, get_station_field_data } from "../../utils/station_data_format_util";
import { convert_unit_data } from "../../utils/unit_conversion";
import { Box } from "@mui/material";
import { FaWindowClose } from "react-icons/fa";
import RenderStormChart from "../../storm_dashboard/storm_graph";
import RenderCombinedChart from './combined_graph'
import StormTypeChart from "@/components/storm_dashboard/storm_type_chart";
import StormCategoryChart from "@/components/storm_dashboard/storm_cat_chart";
import { RenderWindRose } from "@/components/station_dashboard/wind_rose";
import { createVarPresenceDict, alignMergedData, mergeData, parseStationData, parseStormData, getStationInfo } from "./utils";



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

	const variablePresence = createVarPresenceDict(alignedMergedData, stormCategory, stormType, stationValues);
	

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
      {variablePresence[stormType] && (<section className="station_dashboard_small_screen_section">
        <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px'}
          }}
          className="section-header"
        >{stormType['name']}</Box>
        <p>{<StormTypeChart chartData={stormType}/>}</p>
        
      </section>)}


      {/* Storm Category */}
      {variablePresence[stormCategory] && (<section className="station_dashboard_small_screen_section">
        <Box
          sx= {{
            fontSize: { xs: '14px', sm: '16px'}
          }}
          className="section-header"
        >{stormCategory['name']}</Box>
        <p>{<StormCategoryChart chartData={stormCategory}/>}</p>
        
      </section>)}



			{/* Wind Direction Section */}
				{variablePresence["wind_from_direction"] && (
					<section className="station_dashboard_small_screen_section">
						<Box className="section-header"
						sx= {{
							fontSize: { xs: '14px', sm: '16px', md: '18px', lg: '18px' }
						}}>Wind Direction</Box>
						<RenderWindRose
							sourceData={stationValues?.properties?.station_data}
							hasWindRoseData={variablePresence["wind_from_direction"]}
						/>
					</section>
				)}
				
				
				
				
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




function parseStormInfo(hover_point){
	return (
		<StormSummaryText storm_point_hover={hover_point}/>
	)
}

