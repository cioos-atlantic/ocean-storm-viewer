import { parseISO, format } from 'date-fns';
import { fetch_value } from "@/lib/storm_utils";

export const empty_point_obj = { properties: {}, geometry: {} }

export default function StormPointDetails({ storm_point_hover }) {
    // If properties has no items, it's an empty storm_point_hover object and should return
    // immediately
    if (Object.keys(storm_point_hover.properties).length == 0) {
        return (<></>);
    }

    // ECCC and IBTRACS have multiple ways to define a storm type, some overlap and others are unique
    const storm_types = {
        "MX": "Mixture",
        "NR": "Not Reported",
        "SS": "Subtropical Storm",
        "ET": "Extratropical Storm",
        "DS": "Disturbance",
        "TD": "Tropical Depression",
        "TS": "Tropical Storm",
        "HU": "Hurricane",
        "HR": "Hurricane",
        "PT": "Post-Tropical Storm",
    };

    // ECCC and IBTRACS use different names for the same kinds of information.  Sometimes, within IBTRACS, several different fields may possibly contain the appropriate value
    // ECCC uses TIMESTAMP and IBTRACS uses ISO_TIME
    const TIMESTAMP = format(parseISO(fetch_value(storm_point_hover, ["TIMESTAMP", "ISO_TIME"])), 'PP pp X');
    const STORMNAME = fetch_value(storm_point_hover, ["STORMNAME", "NAME"]);
    const STORMTYPE = fetch_value(storm_point_hover, ["STORMTYPE", "NATURE"]);
    const STORMFORCE = fetch_value(storm_point_hover, ["STORMFORCE", "USA_SSHS"]);
    const MAXWIND = fetch_value(storm_point_hover, ["MAXWIND", "WMO_WIND", "USA_WIND"]);
    const MINPRESS = fetch_value(storm_point_hover, ["MSLP", "WMO_PRES", "USA_PRES"]);


    return (
        <div className="info_pane">
            <div>
                <h3>{STORMNAME}</h3>
                <p><strong>Storm Type:</strong> {storm_types[STORMTYPE]}</p>
                <p><strong>Storm Status:</strong> {storm_point_hover.properties.TCDVLP}</p>
                <p><strong>Storm Category:</strong> {STORMFORCE}</p>
                <p><strong>Timestamp:</strong> {TIMESTAMP}</p>
                <p><strong>Lat/Long:</strong> {storm_point_hover.properties.LAT}&deg; N, {storm_point_hover.properties.LON}&deg; W</p>
                <p><strong>Max Windspeed:</strong> {MAXWIND} knots ({(MAXWIND * 1.84).toFixed(2)} km/h)</p>
                <p><strong>Pressure:</strong> {MINPRESS}mb</p>
                {
                    storm_point_hover.properties.ERRCT &&
                    <p><strong>Error radius :</strong> {storm_point_hover.properties.ERRCT} nmi ({(storm_point_hover.properties.ERRCT * 1.852).toFixed(2)} km)</p>
                }
            </div>
        </div>
    )
}