import styles from './drawer.module.css'
import { useMap } from "react-leaflet";
import ActiveStormList from "@/components/active_storm_list";
import HistoricalStormList from "@/components/historical_storm/historical_storm_list";
import Leaflet from 'leaflet';
import React, { useState } from "react";
import { Tooltip, Box, Button } from '@mui/material';



/**
 * The function `Drawer` renders a side drawer component with different content based on the
 * `source_type` prop.
 * @returns The `Drawer` component is being returned, which contains a div element with the specified
 * element_id and classes. Inside this div, there is another div with the class
 * `styles.drawer_interior`. Depending on the `source_type`, either the `ActiveStormList`,
 * `HistoricalStormList`, or a placeholder for the Home Page is rendered within the `Drawer` component.
 */
export default function Drawer({ children, element_id, classes, source_type, setStormPoints, setStationPoints, setSelectedStation, setIsDrawerOpen, isDrawerOpen, filterResult, returnFilterResult, setReturnFilterResult, drawerButtonClicked, setDrawerButtonClicked, setIsDashOpen, setIsStormDashOpen,setIsStationDashOpen }) {

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
            <Box id={element_id} 
                    className={styles.drawer + " h-100 " + sideClass}
                    sx={{
                        maxWidth:{xs:'258px', sm:'258px', md:'258px', lg:'258px',},
                        width:{xs:'100%', sm:'50%', md:'50%', lg:'50%',},
                        display: isDrawerOpen ? 'block' : 'none',
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing on internal clicks
            >
                <button className={styles.closeButton}
                onClick={() => setIsDrawerOpen(false)}
                >
                    X
                </button>
                <Box className={styles.drawer_interior}
                    
                    >
                    {
                        source_type == "active" ? (
                            <ActiveStormList
                                setStormPoints={setStormPoints}
                                map={map}
                                Leaflet={Leaflet}
                                setSelectedStation={setSelectedStation}
                            />
                        ) : 
                        source_type == "historical" ? (
                            <HistoricalStormList
                                setStationPoints={setStationPoints}
                                setStormPoints={setStormPoints}
                                map={map}
                                Leaflet={Leaflet}
                                setSelectedStation={setSelectedStation}
                                filterResult = {filterResult}
                                returnFilterResult= {returnFilterResult}
                                setReturnFilterResult = {setReturnFilterResult}
                                drawerButtonClicked={drawerButtonClicked}
                                setDrawerButtonClicked={setDrawerButtonClicked}
                                setIsDashOpen ={setIsDashOpen}
                                setIsStormDashOpen={setIsStormDashOpen}
                                setIsStationDashOpen ={setIsStationDashOpen}
                        />
                        ) : 
                        (
                            <>
                                <div>Placeholder for Home Page</div>
                            </>
                        )
                    }

                </Box>
            </Box>


            <Tooltip title="Open storm menu" arrow
                sx={{
                    "& .MuiTooltip-tooltip": {
                    backgroundColor: "white", // Custom background color
                    color: "#e55162", // Custom text color
                    fontSize: "0.9rem", // Adjust font size
                    },
                }}>
                <Button
                className={styles.openButton}
                onClick={() => setIsDrawerOpen(true)} // Open the drawer
                sx={{
                    display: !isDrawerOpen ? 'grid' : 'none',
                }}
                >{'>'}
                </Button>
            </Tooltip>
        </>
        
        

    )
}



