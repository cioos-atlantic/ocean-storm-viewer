import { Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, } from "@mui/material";


export default function InfoScreen({setInfo, open, onClose }){
  
    const handleClose = () => {
      setInfo(false)
    };

    return(
      <Dialog 
      onClose = {handleClose} 
      open={open} 
      disablePortal={false}
      slotProps ={{paper:{sx:{alignItems: 'center', display:'flex', justifyContent: 'center'}}, root:{sx:{zIndex:'9999', position: 'fixed',
         }} }} 
      >
        <DialogTitle>Ocean Storm Viewer - User Guide</DialogTitle>
        <DialogContent  style={{height:'60vh'}}>
        <div>
            Welcome to the <b>Ocean Storm Viewer (OSV)</b>!<br/>
            This website helps you explore and learn about ocean storms—both current and historical<br/>

          <h5>Map Controls:</h5>

          <ul>
            <li> <b>Zoom Button</b>: Top right of the map.</li>
            <li> <b>Layers Button</b>: Bottom right. Hover to reveal toggles to turn layers on or off.</li>
          </ul>

          <h5> 🌪️ Active Storms Page</h5>
          <ul>
            <li><b>Left Sidebar</b>: Lists current active storms.</li>
            <li>Includes information such as first and last reported times.</li>
            <li><b>Map</b>: Displays storm locations and real-time tracks.</li>
          </ul>


          <h5>🌀 Historical Storms Page</h5>
          <ul>
            <li> <b>Sidebar</b>: Toggleable list of recent storms (last year).</li>
            <li> <b>Clicking a storm</b>:</li>
            <li> Displays storm track on the map.</li>
            <li> Loads associated station data.</li>
            <li> <b>Hovering a storm track</b>:</li>
            <li> Shows storm name, type, category, and time.</li>
            <li> <b>Clicking a track or station</b>:</li>
            <li> Opens a <b>Storm Dashboard</b> or <b>Station Dashboard</b>.</li>
            <li> Both dashboards can be viewed at once.</li>
          </ul>

          <h3>🔍 Filters</h3>

          <h5>1. Filter by Storm Information</h5>
          <ul>
            <li> <b>Desktop</b>: Top center of the screen.</li>
            <li> <b>Mobile</b>: Bottom right icon (expands on hover).</li>
          </ul>
          You can filter by:<br />
          <ul>
            <li> <b>Storm Name</b> (comma-separated): e.g., `Chris, Kevin`</li>
            <li> <b>Date Range</b>: Last month, last year, or as far back as 1860.</li>
            <li> <b>Storm Category</b></li>
            <li> To apply the filter click <b>Submit</b></li>
            <li><b>Clear (X)</b> to start over<br /></li>
          </ul>


          <h5>2. Filter by Area</h5>
          <ul>
            <li> Located at the <b>top right</b> of the map.</li>
            <li> Draw a <b>polygon</b> or <b>rectangle</b>.</li>
            <li> Only one shape can be drawn at a time.</li>
            <li> Shapes can be <b>edited</b> or <b>cleared</b>.</li>
            <li> Uses same <b>Submit</b> and <b>Clear</b> buttons as storm filters.</li>
            </ul>
        </div>
        </DialogContent>
      </Dialog>
    )
  
  }