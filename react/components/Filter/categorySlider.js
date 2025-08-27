import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, CardActions, Slider } from "@mui/material";
import { storm_categories } from "@/lib/storm_class";
import { ShowOptions, CloseOptions } from './filter';
import { smallScreenIconButton } from './filter_utils';
export const storm_category_list = [
  { label: "5", value: 5 },
  { label: "4", value: 4 },
  { label: "3", value: 3 },
  { label: "2", value: 2 },
  { label: "1", value: 1 },
  { label: "0", value: 0 },
  { label: "-1", value: -1 },
  { label: "-2", value: -2 },
  { label: "-3", value: -3 },
  { label: "-4", value: -4 },
  { label: "-5", value: -5 },
]

export function CategoryRangeSlider({ setStartCategory, setEndCategory, setShowCatSelection, startCategory, endCategory }) {
  const stormCategoryLink = "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html";
  const defaultText = <>
  Adjust the slider to filter storms by category, from -5 (weakest) to 5 (strongest). <br />
  Learn more about {" "}
  <a href={stormCategoryLink}
     target="_blank"
     rel="noopener noreferrer">
    storm categories
  </a>.
</>;

  const [sliderText, setSliderText] = useState(defaultText);
  
  const values = storm_category_list.map(item => item.value);
  const minCategory = Math.min(...values);
  const maxCategory = Math.max(...values);
  
  // Independent state for the slider's range
  const [value, setValue] = useState([minCategory, maxCategory]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setStartCategory(newValue[0]);
    setEndCategory(newValue[1]);
  };


  
  
  


  useEffect(() => {
    if (startCategory != "" && endCategory != "") {
      const stormMin = `${startCategory}`;
      const stormMax = `${endCategory}`;
  
      setSliderText(
        <>
          You&apos;ve selected storms from Category <strong>{stormMin}</strong> to <strong>{stormMax}</strong>. <br />
          Category{' '}

          <a href={storm_categories[stormMin]?.more_info_link}
             target="_blank"
             rel="noopener noreferrer">
            <strong>{stormMin}</strong>
          </a>
            - {storm_categories[stormMin]?.sub_info}. <br />
            Category{' '}

          <a href={storm_categories[stormMax]?.more_info_link}
            target="_blank"
            rel="noopener noreferrer">
            <strong>{stormMax}</strong>
          </a> - {storm_categories[stormMax]?.sub_info}. <br />
          [See more details{' '}
          <a href={stormCategoryLink}
             target="_blank"
             rel="noopener noreferrer">
            here
          </a>.]
        </>
      );
    } else {
      setSliderText(defaultText
      );
    }
  }, [startCategory, endCategory]);

  return (
    <Card
      sx={{
        position: 'absolute',
        top:{xs: '6px', md: '100%',},
        right:{xs: '100%', md: '0px',},
        width:{xs: '280px', md: '320px',},
        height:{xs: '330px',  md: 'inherit',},
        overflow:{xs: 'scroll', md: 'hidden', },
        padding: '6px',
        backgroundColor: "#f4f4f4",
        alignContent: 'center',
        border: '2px solid #e55162',
        borderRadius: '10px',
        zIndex:'9001',
        

      }}>
        <CardContent className='date-card-content' sx={{fontSize: '13px'}}>
          {sliderText}
        </CardContent>
        <CardContent
          className='date-card-content'>
            <Box sx={{ width: {sx: 130, md: 300} }}>
              <Slider
              sx={{
                width: '85%',
                color: '#e55162',
                
              }}
                getAriaLabel={() => 'Category range'}
                value={value}
                onChange={handleChange}
                //valueLabelDisplay="auto"
                min={minCategory}
                max={maxCategory}
                marks={ [...storm_category_list].sort((a, b) => a.value - b.value) }
              />
            </Box>

        </CardContent>
        <CardActions
              className='date-card-content'>
                <Box 
                  sx={{ display: 'flex', justifyContent: 'center', gap: '2px', width: '100%' }}>
                    <Button 
                      size="small"
                      className='filter-submit-button'
                      onClick={() => {
                        setValue([minCategory, maxCategory]); // Reset slider range
                        setSliderText(defaultText); 
                        setStartCategory(""); 
                        setEndCategory("");   
                      }}>Clear</Button>
                    <Button 
                      size="small" 
                      className='filter-submit-button' 
                      onClick={()=> {setShowCatSelection(false)}}>Close</Button>
        
        
                </Box>
                
                
        
              </CardActions>

    </Card>
    
  );
}

export function RenderCategoryFilter({ state, dispatch, setShowFilterOptions }){
  
  //const [showCatSelection, setShowCatSelection] = useState(false); 
  const hasValidCategory = state.startCategory && state.endCategory;
  const buttonStyle = {
    backgroundColor: hasValidCategory  ? '#e55162' : 'white',
    color: hasValidCategory ? 'white' : '#e55162',
    
    '&:hover': {
      backgroundColor: hasValidCategory ? '#ffd1dc' : '#82ccdd',
      color: hasValidCategory ? 'black' : 'black',
    },
  };

  function handleIconClick(){
    //setShowCatSelection(prev => !prev);
    dispatch({ type: "TOGGLE_CAT_SELECTION"});
    dispatch({ type: "SET_DATE_SELECTION", payload: false});
    setShowFilterOptions(prev => ({
      ...prev,
      stormName: false, // stormName must be defined here
    }));
  }
  



  return (
    <>
    <Button
    className="filter-badge"
    onClick= {handleIconClick}
    startIcon={<CategoryOutlinedIcon />}
    endIcon={ !state.showCatSelection ? (<ShowOptions/>):(<CloseOptions/>)}
    sx={{...buttonStyle,
      display: { xs: "none", md: "inline-flex" },
       }
    }>
      
      Storm Category
      
      

    </Button>
    {smallScreenIconButton('Storm Category', handleIconClick, buttonStyle, CategoryOutlinedIcon)}
    

    {state.showCatSelection && 
      (<CategoryRangeSlider 
        setStartCategory = {(category) => dispatch({ type: "SET_START_CATEGORY", payload: category })}
        setEndCategory = {(category) => dispatch({ type: "SET_END_CATEGORY", payload: category })}
        setShowCatSelection={(status) => dispatch({ type: "SET_CAT_SELECTION", payload: status })}
        startCategory={state.startCategory}
        endCategory={state.endCategory}/>)}

    {console.log(state.startCategory, state.endCategory)}
    </>


    
  );
};




