import { IconButton, TextField, Box, Typography, Paper, Button, SpeedDial, SpeedDialIcon, SpeedDialAction, Tooltip, Dialog, DialogTitle } from "@mui/material";
import { useEffect, useState, Fragment } from 'react';

import Stack from '@mui/material/Stack';

//import Chip from '@mui/material/Chip';

import Checkbox from '@mui/material/Checkbox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RenderDateFilter } from "./dateFilter";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';
import { makeStormList } from "../historical_storm/historical_storm_utils";
import { filters, input_filters } from "@/components/Filter/filters_list";
import { useRouter } from 'next/router';
import { InputFilter } from "./inputFilter";
import { basePath } from "@/next.config";
import LoadingScreen from "../loading_screen";
import { smallScreenIconButton } from "./filter_utils";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { RenderCategoryFilter } from "./categorySlider";
import InfoScreen from "../message_screens/info_screen";
import { empty_station_obj } from "../point_defaults";

const ITEM_HEIGHT = 35;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 150,
    },
  },
};



export const ShowOptions = KeyboardDoubleArrowDownIcon;
export const CloseOptions = KeyboardDoubleArrowUpIcon;


export function RenderFilter({  clearShapesRef, state, dispatch, setStationPoints }) {
  const [showFilterIcons, setShowFilterIcons] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterParameters, setFilterParameters] = useState([]);
  const [loading, setLoading] = useState(false);
  //const [info, setInfo] = useState(true)
  
  

  const [openSpeedDial, setOpenSpeedDial] = useState(false);
  const setFilterStormName = (state) => dispatch({ type: "SET_FILTER_STORM_NAME", payload: state });

  
  const handleOpen = () => setOpenSpeedDial(true);
  const handleClose = (event, reason) => {
    if (reason !== "toggle") {
      setOpenSpeedDial(false);
    }
  };





  const router = useRouter(); // Next.js useRouter
  const drawerWidth = 258;
  const drawerOpen = state.isDrawerOpen;


  function handleClearAllFilters() {
    setSelectedOptions([]);
    dispatch({ type: "RESET_FILTERS" })

    const hasClearShapesRef = clearShapesRef && clearShapesRef.current;
    

    // Clear shapes via reference
    if (hasClearShapesRef) {
      clearShapesRef.current.clearShapes();
    }

    console.log("All filters and shapes cleared!");
  }


  async function handleFilterSubmit() {
    //setDrawerButtonClicked('');
    dispatch({ type: "SET_DRAWER_BUTTON_CLICKED", payload: '' });
    dispatch({ type: "SET_CAT_SELECTION", payload: false});
    dispatch({ type: "SET_DATE_SELECTION", payload: false});
    setShowFilterOptions(prev => ({
      ...prev,
      stormName: false, // stormName must be defined here
    }));

    
    
    
    const updatedParams = {
      //...selectedOptions, // Spread selected options correctly
      startDate: state.startDate, // Ensure start and end dates are included
      endDate: state.endDate,
      polyCoords: state.polyFilterCoords,
      startCategory: state.startCategory,
      endCategory:state.endCategory,
      stormName:state.filterStormName

    };

    console.log(updatedParams); // 
    dispatch({ type: "SET_FILTER_QUERY", payload: updatedParams});

   



    const stormResult = await processFilterRequest(updatedParams, setLoading);
    console.log(stormResult);
    dispatch({ type: "SET_FILTER_RESULT", payload: stormResult});
    router.push(`/?storms=historical`);

    //setIsDrawerOpen(true);
    //setReturnFilterResult(true);
    dispatch({ type: "TOGGLE_DRAWER", payload: true});
    dispatch({ type: "TOGGLE_FILTER_RESULT", payload: true});
    dispatch({ type: "CLOSE_STORM_TRACKS" })
    setStationPoints(empty_station_obj)

  }



  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <SpeedDial
            ariaLabel="Filter Options"
            sx={{
              position: 'absolute', bottom: 65, right: 7,
              display: { xs: "block", md: "none" }, '& .MuiSpeedDial-fab': {
                backgroundColor: '#e55162',  // Change SpeedDial button background color
                '&:hover': {
                  backgroundColor: '#b9acac', // Change SpeedDial button hover color
                }
              }
            }}
            icon={<FilterAltIcon openIcon={<KeyboardDoubleArrowDownIcon />} />}

            //onClick={handleSpeedDialToggle}
            open={openSpeedDial}
            onOpen={handleOpen}
            onClose={handleClose}
          >

            <SpeedDialAction
              icon={<IconButton className="filters-speed-dial">X</IconButton>}
              tooltipTitle="Clear Filters"
              onClick={(e) => {
                e.stopPropagation();
                handleClearAllFilters()
              }}
            />
            <SpeedDialAction
              className="filters-speed-dial"
              icon={<PublishRoundedIcon />}
              tooltipTitle="Submit"
              onClick={(e) => {
                e.stopPropagation();
                handleFilterSubmit()
              }}
            />
              {openSpeedDial && (<div className="filter-group">
              <RenderCategoryFilter
                  state={state}
                  dispatch={dispatch}
                  setShowFilterOptions={setShowFilterOptions}
                />

            </div>
            )

            }

           
            {openSpeedDial && (<div className="filter-group">
              <RenderDateFilter
                state={state}
                dispatch={dispatch}
                setShowFilterOptions={setShowFilterOptions}

              />

            </div>
            )

            }
          
             {openSpeedDial && (input_filters.map((input_filter, index) => {
              return (
                <div className="filter-group" key={index}>
                  <InputFilter
                    input_filter={input_filter}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    showFilterOptions={showFilterOptions}
                    setShowFilterOptions={setShowFilterOptions}
                    dispatch={dispatch}
                    filterStormName={state.filterStormName}
                    setFilterStormName= {setFilterStormName}
                  />
                </div>
              )
            }))

            }
            {openSpeedDial && (<div className="filter-group">
              <RenderDateFilter
                state={state}
                dispatch={dispatch}
                setShowFilterOptions={setShowFilterOptions}

              />

            </div>
            )

            }
            {openSpeedDial && (<div className="filter-group">
              <RenderCategoryFilter
                  state={state}
                  dispatch={dispatch}
                  setShowFilterOptions={setShowFilterOptions}
                />

            </div>
            )

            }
            {/*openSpeedDial && (filters.map((filter, index) => {
              return (

                <div className="filter-group" key={index}>


                  <Badges
                    filter={filter}
                    showFilterOptions={showFilterOptions}
                    setShowFilterOptions={setShowFilterOptions}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                  />

                </div>


              )
            }))

            */}

          </SpeedDial>

          <Stack
            direction="row"
            spacing={0.1}
            sx={{ display: { xs: "none", md: "flex" },  left: drawerOpen ? `${drawerWidth}px` : 0,
            width: drawerOpen ? `calc(100% - ${drawerWidth}px)` : '100%',   }}
            className='filter-icons-list'>
            {
              input_filters.map((input_filter, index) => {
                return (

                  <div className="filter-group" key={index}>
                    <InputFilter
                      input_filter={input_filter}
                      setSelectedOptions={setSelectedOptions}
                      selectedOptions={selectedOptions}
                      showFilterOptions={showFilterOptions}
                      setShowFilterOptions={setShowFilterOptions}
                      dispatch={dispatch}
                      filterStormName={state.filterStormName}
                      setFilterStormName= {setFilterStormName}
                    
                    />

                  </div>
                )
              })
            }


            <div className="filter-group">
              <RenderDateFilter
                state={state}
                dispatch={dispatch}
                setShowFilterOptions={setShowFilterOptions}
              />
            </div>
            <div className="filter-group">
              <RenderCategoryFilter
                  state={state}
                  dispatch={dispatch}
                  setShowFilterOptions={setShowFilterOptions}
                />
            </div>
            

            {/*
              filters.map((filter, index) => {
                return (

                  <div className="filter-group" key={index}>
                    <Badges
                      filter={filter}
                      showFilterOptions={showFilterOptions}
                      setShowFilterOptions={setShowFilterOptions}
                      setSelectedOptions={setSelectedOptions}
                      selectedOptions={selectedOptions}
                    />
                  </div>
                )
              })
            */}

            <Button
              className="filter-submit-button"
              onClick={handleFilterSubmit}
              startIcon={<PublishRoundedIcon />}>
              Submit
            </Button>
            <Button
              id="cancel-filter-icon"
              className="filter-icons"
              onClick={handleClearAllFilters}>
              X
            </Button>
           { <IconButton
                sx={{ color:  ' #1E90FF'}}
                onClick={() => {
                  dispatch({ type: "SET_INFO_GUIDE", payload: true});
                }}
                ><InfoIcon />
              </IconButton>}
          </Stack>
        
        </>
      )
      };
    </>
  )
}

  // Function to clear all filters and shapes
  export function handleClearAll(setSelectedOptions, setStartDate, setEndDate,  setPolyFilterCoords, clearShapesRef) {
    setSelectedOptions([]);
    setStartDate(null); // Reset to empty string
    setEndDate(null);   // Reset to empty string;
    //setFilterResult([]);         // Clear filter results
    //setReturnFilterResult(false); // Reset return state
    setPolyFilterCoords('');      // Clear polygon filter
    

    // Clear shapes via reference
    if (clearShapesRef && clearShapesRef.current) {
      clearShapesRef.current.clearShapes();
    }

    console.log("All filters and shapes cleared!");
  }

export function Badges({ filter, showFilterOptions, setShowFilterOptions, setSelectedOptions, selectedOptions }) {
  const buttonStyle = {
    backgroundColor: selectedOptions[filter.name]?.length > 0 ? '#e55162' : 'white',
    color: selectedOptions[filter.name]?.length > 0 ? 'white' : '#e55162',
    '&:hover': {
      backgroundColor: selectedOptions[filter.name]?.length > 0 ? '#ffd1dc' : '#82ccdd',
      color: selectedOptions[filter.name]?.length > 0 ? 'black' : 'black',
    },
  };

  const handleCheckboxChange = (option) => {
    setSelectedOptions((prev) => {
      const currentOptions = prev[filter.name] || []; // Get current options for this filter
      const isSelected = currentOptions.includes(option.value);

      // Toggle selection
      const updatedOptions = isSelected
        ? currentOptions.filter((item) => item !== option.value) // Remove if selected
        : [...currentOptions, option.value];                    // Add if not selected

      return {
        ...prev,
        [filter.name]: updatedOptions // Set as name: options
      };
    });
  };

  function handleClear(name) {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: [] // Clear the options for the specific filter name
    }));
    console.log({ [name]: [] }); // Log the cleared options
  };

  function handleIconClick() {
    setShowFilterOptions((prev) => ({
      ...prev,
      [filter.name]: !prev[filter.name],
    }));
  }

  return (
    <>

      <Button
        className="filter-badge"
        onClick={() => {
          setShowFilterOptions((prev) => ({
            ...prev,
            [filter.name]: !prev[filter.name],
          }));
        }}
        startIcon={filter.icon}
        endIcon={!showFilterOptions[filter.name] ? (<ShowOptions/>) : (<CloseOptions/>)}
        sx={{
          ...buttonStyle,
          display: { xs: "none", md: "inline-flex" }
        }
        }>

        {filter.display_name}

        {console.log(showFilterOptions)}

      </Button>

      {smallScreenIconButton(filter.display_name, handleIconClick, buttonStyle, filter.icon)}



      {showFilterOptions[filter.name] && (
        <Paper className="filter-dropdown-menu"
          sx={{
            top: { xs: '6px', md: '100%', },
            right: { xs: '100%', md: '0px', },
            //transform:{xs: 'translateX(-100%)', },
            width: { xs: '150px', md: '100%' }
          }}>

          <Stack
            direction="column"
            sx={{
              padding: '5px',
              height: '200px',
              overflow: 'scroll',
              width: '100%',

            }}
            spacing={1}>
            {filter.options.map((option, optIndex) => {
              return (
                <FormControlLabel

                  key={optIndex}
                  label={<Typography sx={{ fontSize: '12px' }}>
                    {option.label}
                  </Typography>}
                  control={
                    <Checkbox
                      checked={selectedOptions[filter.name]?.includes(option.value) || false}
                      onChange={() => handleCheckboxChange(option)}
                      sx={{
                        color: "#e55162",
                        '&.Mui-checked': { color: 'grey', }




                      }}

                    />
                  }
                />
              )
            })}

            <Box
              sx={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
              <Button
                onClick={() => handleClear(filter.name)}
                className="filter-submit-button"
              >
                Clear
              </Button>
            </Box>

          </Stack>



          {console.log(selectedOptions)}
          {console.log(filter.options)}

        </Paper>
      )}

    </>

  )

};



export async function processFilterRequest(filterParameters, setLoading) {

  console.log(filterParameters);
  let uniqueList;
  const stormCategory = formatStormCategory(filterParameters['stormCategory']);
  const stormNames = formatStormName(filterParameters['stormName']);
  const startDate = formatFilterDate(filterParameters['startDate']);
  const endDate = formatFilterDate(filterParameters['endDate']);
  
  const stormPoly = filterParameters['polyCoords'];                       
  const startCategory= filterParameters['startCategory'];
  const endCategory = filterParameters['endCategory'];


  console.log(stormCategory, stormNames, startDate, endDate)



  const query = new URLSearchParams({
    storm_category: stormCategory,
    name: stormNames,
    start_date: startDate,
    end_date: endDate,
    polygon: stormPoly,
    start_category: startCategory,
    end_category: endCategory,

  }).toString();

  console.log(query)
  setLoading(true);
  try {
    const resource = await fetch(`${basePath}/api/filter_storms?${query}`);
    const storm_data = await resource.json();
    //console.log(storm_data);

    //const historical_storm_data = parseStormData(storm_data, storm.name);
    // console.log(historical_station_data);

    console.debug(`historical Storm Data for ${stormCategory} Between  ${startDate} and ${endDate}: `, storm_data);
    // Create a set to track unique IDs and add objects to the result list
    uniqueList = makeStormList(storm_data)
    // Create a set to track unique IDs and add objects to the result list
    setLoading(false);

    console.log(uniqueList);
    if (uniqueList.length === 0) {
      alert("No result found for this search, please try again...")
    }


  } catch (error) {
    setLoading(false);
    console.error('Error fetching storm or station data:', error);
  }
  return uniqueList




}

export function formatFilterDate(date) {
  if (!date) {
    return ""; // Return an empty string if no date is provided
  }
  const formattedDate = date.format("YYYY-MM-DD").trim();
  return formattedDate;
}

export function formatStormCategory(category_list = []) {
  console.log(category_list);
  const formattedCategoryList = category_list.join("_");
  return formattedCategoryList;
}

export function formatStormName(storm_list = []) {
  //storm_names = storm_names.replace(/\s+/g, ''); // Remove all spaces
  console.log(storm_list);
  //const storm_list = storm_names.split(",");

  const formattedStormList = storm_list.join("_");
  return formattedStormList;
}






