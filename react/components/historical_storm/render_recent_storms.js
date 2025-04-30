import { handleClick } from "./historical_storm_utils";
import { Button } from "@mui/material";
import { IconButton, TextField, Box, Typography, Paper } from "@mui/material";


export function renderRecentStorms(stormList, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation, setLoading, drawerButtonClicked, setDrawerButtonClicked){
  return(
    <>
    <Box className='historical_page_drawer_subheader'
      sx={{
        fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '20px' }
      }}
      >Recent Storms: </Box>
      <Box 
      sx={{
        fontSize: { xs: '12px', sm: '14px', md: '16px', lg: '16px' },
        color:'#ec1632'
      }}
      >({stormList.length} result(s) found) </Box>

      <Box id="storm_search_result"
            className="historical_storm_search_result"
            
            >
      {stormList.map((storm, index) => {
            return (
              <div key={storm.storm_id} className={(storm.name)}>
                <Button 
                className='historical_storm_button'
                sx={{
                  fontSize: { xs: '10px', sm: '10px', md: '12px', lg: '12px',},
                  color: drawerButtonClicked === storm.storm_id ? 'white' : '#e55162', 
                  backgroundColor: drawerButtonClicked === storm.storm_id ? 'black' : 'white',
                  padding: drawerButtonClicked === storm.storm_id ? '5px' : '0.5px',
                  border: drawerButtonClicked === storm.storm_id ? 'solid white 2px': '0',
                  fontWeight: drawerButtonClicked === storm.storm_id ? 'bolder': 'normal'
                   
                }}
                onClick={(e) => { 
                  handleClick(storm, setStationPoints, setStormPoints, map, Leaflet, router, setSelectedStation, setLoading);

                  //console.log(storm);
                  }}>{`${storm.display_name}`}</Button>
              </div>
            )
          })}


        
      </Box>

    </>
    

  )
}