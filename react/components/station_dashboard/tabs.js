import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabList from '@mui/lab/TabList';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import { RenderWindRose } from './wind_rose';
import RenderChart from '../station_graph.js'

/**
 * The CustomTabPanel function renders children based on the value and index props.
 
 * @returns A `div` element representing a custom tab panel is being returned. The `hidden` attribute
 * is used to conditionally show or hide the panel based on the `value` and `index` props. The panel
 * content is rendered inside a `Box` component if the `value` matches the `index`.
 */
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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

/* The code snippet `CustomTabPanel.propTypes` is defining the prop types for the `CustomTabPanel`
component. It specifies that the component expects three props: */
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

/**
 * The function `a11yProps` returns an object with id and aria-controls properties based on the given
 * index.
 
 * @returns The function `a11yProps` returns an object with two properties: `id` and `aria-controls`.
 * The `id` property is set to a string value of `simple-tab-`, where `index` is the input
 * parameter of the function. The `aria-controls` property is set to a string value of
 * `simple-tabpanel-`, where `index` is also the
 */
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



/**
 * The `BasicTabs` function generates a tabbed interface displaying different data visualizations and
 * information for a specific weather station.
 * @returns A JSX element is being returned. It consists of a Box component with tabs for different
 * data categories related to a weather station. The tabs include Summary, Wind Speed, Wind Direction,
 * Temperature, Waves, and Pressure. Each tab displays relevant information or charts based on the
 * selected category. The Summary tab includes station summary text and a link to view full data. The
 * Wind Speed, Temperature, Waves, and
 */
export default function BasicTabs({stationName, stationData, stationSummaryText, variablePresence, selectedTab, setSelectedTab}) {
  /**
   * The function `generateGraph` returns a JSX element containing a chart component with specified
   * data and styling.
   * @returns A JSX element is being returned. It contains a `div` element with the class name
   * "station_chart" and some inline styles for height, width, and padding. Inside the `div`, there is
   * a `RenderChart` component with props `sourceData`, `stationName`, and `varCategory`.
   */
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
    <Box sx={{ width: '100%'}}>
      <TabContext value={String(selectedTab)}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <TabList 
          value={selectedTab} 
          onChange={handleChange} 
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile // Ensures scroll buttons appear on mobile devices
          sx={{
            '.MuiTabs-flexContainer': {
              justifyContent: 'space-between',},
            '.MuiTabScrollButton-root': {
              display: 'block', // Ensure scroll buttons are visible
              },
          }}>
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Wind Speed" {...a11yProps(1)} disabled={!variablePresence['wind_speed']}/>
          <Tab label="Wind Dir." {...a11yProps(2)} disabled={!variablePresence['wind_from_direction']} />
          <Tab label="Temperature" {...a11yProps(3)} disabled={!variablePresence['temperature']}/>
          <Tab label="Waves" {...a11yProps(4)} disabled={!variablePresence['wave']}/>
          <Tab label="Pressure" {...a11yProps(5)} disabled={!variablePresence['air_pressure']}/>
        </TabList>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        {stationSummaryText}
        <div className="data-footer">
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
      </TabContext>
    </Box>
  );
}
