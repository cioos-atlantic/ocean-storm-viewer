import styles from './drawer.module.css'
import { useMap } from "react-leaflet";
import ActiveStormList from "@/components/active_storm_list";
import HistoricalStormList from "@/components/historical_storm_list";
import Leaflet from 'leaflet';
import React, { useState } from "react";


export default function Drawer({ children, element_id, classes, storm_data, source_type, setStormPoints, setStationPoints, setIsDrawerOpen, isDrawerOpen }) {

    let sideClass = null;
    
    switch (classes) {
        case "left":
            sideClass = styles.left;
            break;
        case "right":
            sideClass = styles.right;
            break;
        default:
            break;
    }

    const map = useMap();
    console.debug("Map Object: ", map);

    return (
        <>
        {isDrawerOpen ? (        
            <div id={element_id} className={styles.drawer + " h-100 " + sideClass}>
                <button className={styles.closeButton}
                onClick={() => setIsDrawerOpen(false)}
                >
                    X
                </button>
                <div className={styles.drawer_interior}>
                    {
                        source_type == "active" ? (
                            <ActiveStormList
                                active_storm_data={storm_data}
                                setStormPoints={setStormPoints}
                                map={map}
                                Leaflet={Leaflet}
                                />
                        ) : 
                        source_type == "historical" ? (
                            <HistoricalStormList
                                setStationPoints={setStationPoints}
                                setStormPoints={setStormPoints}
                                map={map}
                                Leaflet={Leaflet}
                            />
                        ) : 
                        (
                            <>
                                <div>Placeholder for Home Page</div>
                            </>
                        )
                    }

                </div>
            </div>):
        (<button
            className={styles.openButton}
            onClick={() => setIsDrawerOpen(true)} // Open the drawer
        >
            <span className={styles.openButtonText}>Open Drawer</span>
        </button>)}
        </>
    )
}
