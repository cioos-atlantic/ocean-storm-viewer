import styles from './drawer.module.css'
import { useMap } from "react-leaflet";
import ActiveStormList from "@/components/active_storm_list";
import HistoricalStormList from "@/components/historical_storm_list";
import Leaflet from 'leaflet';


/**
 * The function `Drawer` renders a side drawer component with different content based on the
 * `source_type` prop.
 * @returns The `Drawer` component is being returned, which contains a div element with the specified
 * element_id and classes. Inside this div, there is another div with the class
 * `styles.drawer_interior`. Depending on the `source_type`, either the `ActiveStormList`,
 * `HistoricalStormList`, or a placeholder for the Home Page is rendered within the `Drawer` component.
 */
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
