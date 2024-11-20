// hurricane is in km/hr
const hurricane_categories = {
  "5": {
        "min": 252,
        "max": null,
      "name": { "en": "Category 5", "fr": "catégorie 5" },
      "img" : "../data/img/storm_categories/Category_5_hurricane_icon.svg",
        "info": "A hurricane with sustained winds of a minimum of 136 knots (252 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"

  },
  "4": {
        "min": 210,
        "max": 251,
      "name": { "en": "Category 4", "fr": "catégorie 4" },
      "img" : "../data/img/storm_categories/Category_4_hurricane_icon.svg",
        "info": "A hurricane with sustained winds of a minimum of 113 knots (210 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "3": {
    "min": 177,
    "max": 209,
      "name": { "en": "Category 3", "fr": "catégorie 3" },
      "img" : "../data/img/storm_categories/Category_3_hurricane_icon.svg",
       "info": "A hurricane with sustained winds of a minimum of 96 knots (177 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "2": {
    "min": 153,
    "max": 176,
      "name": { "en": "Category 2", "fr": "catégorie 2" },
      "img" : "../data/img/storm_categories/Category_2_hurricane_icon.svg",
       "info": "A hurricane with sustained winds of a minimum of 83 knots (153 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "1": {
    "min": 119,
    "max": 152,      
      "name": { "en": "Category 1", "fr": "catégorie 1" },
      "img" : "../data/img/storm_categories/Category_1_hurricane_icon.svg",
      "info": "A hurricane with sustained winds of a minimum of 64 knots (119 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  
 
}


const storm_types = { 
  "TD": {
    "min": 38,
    "max": 63,        
  "name": { "en": "Tropical Depression", "fr": "Dépression tropicale" },
  "img" : "../data/img/storm_categories/Category_TD_hurricane_icon.svg",
  "info": "This is when tropical disturbance acquires a spin, and winds of at least 20 knots (38 km/h)",
  "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
  "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  
  },
  "TS": {
    "min": 64,
    "max": 118,   
      "name": { "en": "Tropical Storm", "fr": "Tempête tropicale" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": "This is when tropical depression winds increase to at least 35 knots (64 km/h)",
    "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "HR": {
    "min": 119,
    "max": null,  
      "name": { "en": "Hurricane", "fr": "Tempête" },
      "img" : "../data/img/storm_categories/Category_HR_hurricane_icon.svg",
    "info": "A hurricane is formed when sustained winds reach a minimum of 64 knots (119 km/h). There are 5 classes of hurricane intensity as outlined by the Saffir-Simpson Scale.",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html",
    "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",

  },
  "D": {
    "min": null,
    "max": 37,  
      "name": { "en": "Tropical Disturbance", "fr": "Perturbation tropicale" },
      "img" : "../data/img/storm_categories/Category_DI_hurricane_icon.svg",
        "info": "This is an organized region of showers and thunderstorms in the tropics - generally 200 to 600 kilometres in diameter - that maintains its identity for at least 24 hours but does not have a closed wind circulation. ",
        "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
        "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "ET": {
      "name": { "en": "Extratropical", "fr": "Tempête extratropicale" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": "It is a generic term for the class of frontal low pressure systems. They are unlike tropical cyclones in that they are not symmetric in their temperature, precipitation or wind patterns.",
    "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.weather.gov/source/zhu/ZHU_Training_Page/tropical_stuff/sub_extra_tropical/subtropical.htm"

  },
  "SS": {
    "name": { "en": "Subtropical Storm", "fr": "Tempête subtropicale" },
    "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
  "info": "A subtropical storm is a cyclone that has characteristics of both a tropical storm and an extratropical cyclone. Subtropical cyclones can form in waters normally too cool for tropical cyclones.",
  "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
  "more_info_link": "https://www.weather.gov/source/zhu/ZHU_Training_Page/tropical_stuff/sub_extra_tropical/subtropical.htm"
    },

  "MX": {
      "name": { "en": "Mixture", "fr": "Un Mélange" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": " There are contradicting nature reports from different agencies"
  },
  "PT": {
      "name": { "en": "Post tropical", "fr": "Tempête post-tropicale" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": "A storm system that used to be tropical but has since lost most of its tropical characteristics. ",
    "source":"https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
  "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/learn/post-tropical-cyclones.html"
  },
  "NR": {
      "name": { "en": "Not Reported", "fr": "Non signalé" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": "Storm type not yet reported"
  },


}

// consider adding for not reported or mixture
// more info from NOAA or ECCC