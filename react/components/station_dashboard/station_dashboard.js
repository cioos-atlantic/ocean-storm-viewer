import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout"
import { getDisplayName } from "../utils/station_data_format_util";
import { RenderWindRose } from "./wind_rose";

export default function StationDashboard({children, selected_station, setSelectedStation, stationsDescriptions}) {
    console.log(selected_station);
    console.log(stationsDescriptions);
    const station_name = selected_station[0];
    const display_name = getDisplayName(stationsDescriptions, station_name);
    const stationData = selected_station[1]["properties"]["station_data"]
    console.log(stationData)
    return (
        <div key="01-station-dashboard" class="station_dashboard">
            <div className="dash-header">
                <button
                    class="close"
                    onClick={(e) => {
                        setSelectedStation(empty_station_obj)
                    }}
                ><FaWindowClose/></button>
                <h3>{display_name}</h3>
            </div>
            <div class="dash-body">
                <p>BEHOLD! A Station dashboard goes here!</p>
                <p>
                <RenderWindRose  
                sourceData={stationData}
                /> 
                </p>
            </div>
            <div class="dash-footer">
                <p>This the footer block</p>
            </div>
        </div>
    )
}