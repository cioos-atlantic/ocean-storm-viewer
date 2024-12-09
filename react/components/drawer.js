import styles from './drawer.module.css'
import { useMap } from "react-leaflet";
import ActiveStormList from "@/components/active_storm_list";
import HistoricalStormList from "@/components/historical_storm_list";
import Leaflet from 'leaflet';


export default function Drawer({ children, element_id, classes, storm_data, source_type, setStormPoints, setStationPoints }) {
    let other = null;

    switch (classes) {
        case "left":
            other = styles.left;
            break;

        case "right":
            other = styles.right;
            break;
    }

    const map = useMap();
    console.debug("Map Object: ", map);

    return (
        <div id={element_id} className={styles.drawer + " h-100 " + other}>
            <div className={styles.drawer_interior}>
                {
                    source_type == "active" ? (
                        <ActiveStormList
                            active_storm_data={storm_data}
                            setStormPoints={setStormPoints}
                            map={map}
                            Leaflet={Leaflet}
                        />
                    ) : source_type == "historical" ? (
                        <HistoricalStormList
                            setStationPoints={setStationPoints}
                            setStormPoints={setStormPoints}
                            map={map}
                            Leaflet={Leaflet}
                        />
                    ) : (
                        <>
                            <div>Placeholder for Home Page</div>
                        </>
                    )
                }

            </div>
        </div>
    )
}
