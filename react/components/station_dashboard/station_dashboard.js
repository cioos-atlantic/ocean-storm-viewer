import { FaWindowClose } from "react-icons/fa";
import { empty_station_obj } from "../layout"

export default function StationDashboard({children, selected_station, setSelectedStation}) {
    console.log(children)
    return (
        <div key="01-station-dashboard" class="station_dashboard">
            <div className="dash-header">
                <button
                    class="close"
                    onClick={(e) => {
                        setSelectedStation(empty_station_obj)
                    }}
                ><FaWindowClose/></button>
                <h3>{selected_station[0]}</h3>
            </div>
            <div class="dash-body">
                <p>BEHOLD! A Station dashboard goes here!</p>
                <p>Here are the children in this tag!  {children}</p>
            </div>
            <div class="dash-footer">
                <p>This the footer block</p>
            </div>
        </div>
    )
}