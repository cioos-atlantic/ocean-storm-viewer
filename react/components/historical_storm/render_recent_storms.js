import { handleClick } from "./historical_storm_utils";
import { Button } from "@mui/material";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";


export function renderRecentStorms(stormList, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation, setLoading, setIsDashOpen){
  return(
    <>
    <Box className='historical_page_drawer_subheader'
      sx={{
        fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '20px' }
      }}
      >Recent Storms: </Box>
      <Box id="storm_search_result"
            className="historical_storm_search_result"
            
            >
      {stormList.map((storm, index) => {
            return (
              <div key={storm.storm_id} className={(storm.name)}>
                <Button 
                className='historical_storm_button'
                sx={{
                  fontSize: { xs: '10px', sm: '10px', md: '12px', lg: '12px' }
                }}
                onClick={(e) => { 
                  handleClick(storm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation, setLoading, setIsDashOpen);

                  //console.log(storm);
                  }}>{`${storm.display_name}`}</Button>
              </div>
            )
          })}


        
      </Box>

    </>
    

  )
}