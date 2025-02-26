import { Stack, IconButton } from "@mui/material";
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';

export function RenderSpatialFilter({}){

  return(
    <Stack
    direction="column"
    
    spacing={0.1}>
      <IconButton  aria-label='search'className="spatial-filter-icon" sx={{top: "325px"}}
        >
      <RectangleOutlinedIcon
      sx={{
        fontSize: 'larger',
        
      }}
      />
      </IconButton>
      <IconButton  aria-label='search' className="spatial-filter-icon"sx={{top: "375px"}}
        >
        <PentagonOutlinedIcon
        sx={{
          fontSize: 'larger',
          
        }}
        />
      </IconButton>

    </Stack>
    
  )
  
}