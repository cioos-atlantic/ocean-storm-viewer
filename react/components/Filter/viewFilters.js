import { Box, Stack } from "@mui/material";
import dayjs from "dayjs";

export function FiltersSelected({startDate, endDate, startCategory, endCategory, polyFilterCoords}){
  console.log(polyFilterCoords);
  return(
    <Box className='search-output-space'>
      <Stack>
        <Box className='historical_page_drawer_subheader'
          sx={{
            fontSize: '14px',
            
          }}
          >Filter(s) Selected: </Box>
        <Box>
          Storm Name(s): 
        </Box>
        {startDate && endDate && (<Box>
          Date Range: {dayjs(startDate).format('DD/MM/YYYY') } - {dayjs(endDate).format('DD/MM/YYYY') }
        </Box>)}
        {startCategory && endCategory && (<Box>
          Category Range: ({startCategory} to {endCategory}) 
        </Box>)}
        {polyFilterCoords && (<Box>
          Spatial Range: Range selected
        </Box>)}

      </Stack>
    </Box>
    
  )
}