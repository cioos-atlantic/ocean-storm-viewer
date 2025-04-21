


export function RenderSmallDashboard({selected_station}){
	const stationData = selected_station;
	const stationName = stationData[0];
  const stationValues = stationData[1];

    const hoverPointTime = fetch_value(hover_point, ["TIMESTAMP", "ISO_TIME"]);
  console.log(hoverPointTime);
	parseStationData(stationValues)
  
}


function getStationInfo(station_descriptions, stationName, source_type ){
	// Determine if active or historic
		const isHistorical = source_type == "historical" ? true : false
		const dataText = getStationDataText(stationValues, time, isHistorical);
	
		if (!dataText) return null;
	
    const stationDescription = getMatchedStation(station_descriptions, stationName);
      const displayName = stationDescription.title || "Unknown Station";
      const institution = stationDescription.institution || "Unknown Institution";
      const institutionLink = stationDescription.institution_link || "#";
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
				variable_names.push(stationData?.['column_long_names']?.[index])


			}})

	console.log(dataIndx);

	dataIndx.forEach((indx)=>{
		const column_name= stationData?.['column_names']?.[indx];
		const long_name = stationData?.['column_long_names']?.[indx];
		

		const varData = []

		stationData.data.forEach((data)=>{
			varData.push(data[indx])
		})

		data_dict.push({
			[column_name]:{
				name:long_name,
				data:varData
			}
		})
	})

	console.log(data_dict);
	



}

