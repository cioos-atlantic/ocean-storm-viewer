import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { RenderWindRose } from './wind_rose';
import RenderChart from '../station_graph.js'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function BasicTabs({stationName, stationData, stationSummaryText, variablePresence, selectedTab, setSelectedTab}) {
  console.log(stationData)
  function generateGraph(selectedVar){
    return (
     <div className="station_chart" 
     style={{
     height: 'auto',
     width: 'auto', // Adjust width based on content (chart)
     padding: '0px', // Optional padding around chart
     display:'flex',
     }}>
     <RenderChart  
         sourceData={stationData}
         stationName={stationName}
         varCategory={selectedVar}
       />
   </div>
    )
   }

  const [value, setValue] = React.useState(0);
  //const [hasData, setHasData] = React.useState(true); // State to track if data is available

  const data_link = "https://cioosatlantic.ca/erddap/tabledap/" + stationName + ".html"
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Wind Speed" {...a11yProps(1)} disabled={!variablePresence['wind_speed']}/>
          <Tab label="Wind Dir." {...a11yProps(2)} disabled={!variablePresence['wind_from_direction']} />
          <Tab label="Temperature" {...a11yProps(3)} disabled={!variablePresence['temperature']}/>
          <Tab label="Waves" {...a11yProps(4)} disabled={!variablePresence['wave']}/>
          <Tab label="Pressure" {...a11yProps(5)} disabled={!variablePresence['air_pressure']}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        {stationSummaryText}
        <div class="data-footer">
                <a href={data_link} target="_blank">Full data</a>
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        {generateGraph("wind_speed")}
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
      <RenderWindRose  
                sourceData={stationData}
                hasWindRoseData={variablePresence['wind_from_direction']}
                /> 
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={3}>
        {generateGraph("temperature")}
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={4}>
        {generateGraph("wave")}
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={5}>
        {generateGraph("air_pressure")}
      </CustomTabPanel>
    </Box>
  );
}
