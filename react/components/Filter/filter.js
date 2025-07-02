import { IconButton, Box, Typography, Paper, Button, SpeedDial, SpeedDialAction, } from "@mui/material";
import { useState } from 'react';
import Stack from '@mui/material/Stack';

//import Chip from '@mui/material/Chip';

import Checkbox from '@mui/material/Checkbox';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FormControlLabel from '@mui/material/FormControlLabel';
import { RenderDateFilter } from "./dateFilter";
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import dayjs from 'dayjs';
import { makeStormLines, makeStormList } from "../historical_storm/historical_storm_utils";
import { filters, input_filters } from "@/components/Filter/filters_list";
import { useRouter } from 'next/router';
import { InputFilter } from "./inputFilter";
import { basePath } from "@/next.config";
import LoadingScreen from "../loading_screen";
import { smallScreenIconButton } from "./filter_utils";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { RenderCategoryFilter } from "./categorySlider";


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


export function RenderFilter({ clearShapesRef, state, dispatch }) {
  const [showFilterIcons, setShowFilterIcons] = useState(false);
  const [showFilterOptions, setShowFilterOptions] = useState({});
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [filterParameters, setFilterParameters] = useState([]);


  const [openSpeedDial, setOpenSpeedDial] = useState(false);


  const handleOpen = () => setOpenSpeedDial(true);
  const handleClose = (event, reason) => {
    if (reason !== "toggle") {
      setOpenSpeedDial(false);
    }
  };



  const [loading, setLoading] = useState(false);

  const router = useRouter(); // Next.js useRouter

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


    const updatedParams = {
      ...selectedOptions, // Spread selected options correctly
      startDate: state.startDate, // Ensure start and end dates are included
      endDate: state.endDate,
      polyCoords: state.polyFilterCoords,
      startCategory: state.startCategory,
      endCategory: state.endCategory,

    };

    console.debug("Updated Search Parameters: ", updatedParams); // 

    const [stormResult, stormLines] = await processFilterRequest(updatedParams, setLoading);

    console.log("processFilterRequest Complete:");

    console.debug("Setting Filter Result...", stormResult);
    dispatch({ type: "SET_FILTER_RESULT", payload: stormResult });

    console.debug("Setting Storm Points...", stormLines);
    dispatch({ type: "SET_STORM_POINT", payload: stormLines });

    // router.push(`/?storms=historical`);

    //setIsDrawerOpen(true);
    //setReturnFilterResult(true);
    dispatch({ type: "TOGGLE_DRAWER", payload: true });
    dispatch({ type: "TOGGLE_FILTER_RESULT", payload: true });
    
    console.debug("Drawer and Filter results toggled to 'True'.");
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
              position: 'absolute', bottom: 25, right: 7,
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

            {openSpeedDial && (input_filters.map((input_filter, index) => {
              return (
                <div className="filter-group" key={index}>
                  <InputFilter
                    input_filter={input_filter}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                    showFilterOptions={showFilterOptions}
                    setShowFilterOptions={setShowFilterOptions}
                  />
                </div>
              )
            }))

            }
            {openSpeedDial && (<div className="filter-group">
              <RenderDateFilter
                state={state}
                dispatch={dispatch}
              />

            </div>
            )

            }
            {openSpeedDial && (<div className="filter-group">
              <RenderCategoryFilter
                state={state}
                dispatch={dispatch}
              />

            </div>
            )

            }
          </SpeedDial>

          <Stack
            direction="row"
            spacing={0.1}
            sx={{ display: { xs: "none", md: "flex" }, }}
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
                    />
                  </div>
                )
              })
            }


            <div className="filter-group">
              <RenderDateFilter
                state={state}
                dispatch={dispatch}
              />
            </div>
            <div className="filter-group">
              <RenderCategoryFilter
                state={state}
                dispatch={dispatch}
              />
            </div>

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
          </Stack>
        </>
      )
      };
    </>
  )
}


export async function processFilterRequest(filterParameters, setLoading) {

  console.log(filterParameters);
  let uniqueList, stormLines;
  const stormCategory = formatStormCategory(filterParameters['stormCategory']);
  const stormNames = formatStormName(filterParameters['stormName']);
  const startDate = formatFilterDate(filterParameters['startDate']);
  const endDate = formatFilterDate(filterParameters['endDate']);

  const stormPoly = filterParameters['polyCoords'];
  const startCategory = filterParameters['startCategory'];
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
    uniqueList = makeStormList(storm_data);
    // Create a set to track unique IDs and add objects to the result list
    stormLines = makeStormLines(uniqueList);
    setLoading(false);

    console.log(uniqueList);
    if (uniqueList.length === 0) {
      alert("No result found for this search, please try again...")
    }


  } catch (error) {
    setLoading(false);
    console.error('Error fetching storm or station data:', error);
  }

  return [uniqueList, stormLines];
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

export function formatStormName(storm_names = "") {
  storm_names = storm_names.replace(/\s+/g, ''); // Remove all spaces
  console.log(storm_names);
  const storm_list = storm_names.split(",");
  const formattedStormList = storm_list.join("_");
  return formattedStormList;
}
