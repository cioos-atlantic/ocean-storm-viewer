import { IconButton, TextField, Box, Typography, Paper, Button, SpeedDial,  SpeedDialIcon, SpeedDialAction, Tooltip } from "@mui/material";

export function smallScreenIconButton(toolTipTitle, handleIconClick, buttonStyle, Icon){
  return (
    <Tooltip title={toolTipTitle} placement="left">
    <IconButton
    //className="filter-badge"
    onClick={(e) => {
      e.stopPropagation(); // Prevent closing
      handleIconClick();
    }}
    
    sx={{...buttonStyle,
      display: { xs: "flex", md: "none" },
      textDecoration: 'none',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      margin: '8px',
      transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 0.8s',
      opacity: '1',
      cursor: 'pointer',
      transitionDelay: '30ms',
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
      //border:'solid red 1px',
    }
      

    }>{Icon}
    </IconButton> </Tooltip>
  )

}