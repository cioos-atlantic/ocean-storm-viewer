const hurricane_categories = {
  "5": {
        "min": 157,
        "max": null,
      "name": { "en": "Category 5", "fr": "catégorie 5" },
      "img" : "../data/img/storm_categories/Category_5_hurricane_icon.svg",
        "info": "placeholder"
  },
  "4": {
        "min": 113,
        "max": 136,
      "name": { "en": "Category 4", "fr": "catégorie 4" },
      "img" : "../data/img/storm_categories/Category_4_hurricane_icon.svg",
        "info": "placeholder"
  },
  "3": {
    "min": 96,
    "max": 112,
      "name": { "en": "Category 3", "fr": "catégorie 3" },
      "img" : "../data/img/storm_categories/Category_3_hurricane_icon.svg",
        "info": "placeholder"
  },
  "2": {
    "min": 83,
    "max": 95,
      "name": { "en": "Category 2", "fr": "catégorie 2" },
      "img" : "../data/img/storm_categories/Category_2_hurricane_icon.svg",
        "info": "placeholder"
  },
  "1": {
    "min": 64,
    "max": 82,      
      "name": { "en": "Category 1", "fr": "catégorie 1" },
      "img" : "../data/img/storm_categories/Category_1_hurricane_icon.svg",
        "info": "placeholder"
  },
  
 
}


const storm_types = { 
  "TD": {
  "name": { "en": "Tropical Depression", "fr": "Dépression tropicale" },
  "img" : "../data/img/storm_categories/Category_TD_hurricane_icon.svg",
  "info": "This is when tropical disturbance acquires a spin, and winds of at least 37 km/h",
  "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  
  },
  "TS": {
      "name": { "en": "Tropical Storm", "fr": "Tempête tropicale" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": "This is when tropical depression winds increase to at least 63 km/h",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "HR": {
      "name": { "en": "Hurricane", "fr": "Tempête" },
      "img" : "../data/img/storm_categories/Category_HR_hurricane_icon.svg",
        "info": "placeholder"
  },
  "D": {
      "name": { "en": "Tropical Disturbance", "fr": "Perturbation tropicale" },
      "img" : "../data/img/storm_categories/Category_DI_hurricane_icon.svg",
        "info": "A tropical disturbance forms over waters of at least 26.5°C (80F). A tropical disturbance is defined as an area of organized thunderstorm activity 100-300 in diameter which maintains its identity for 24 hours or more. ",
        "more_info_link": "https://www.weather.gov/source/zhu/ZHU_Training_Page/tropical_stuff/sub_extra_tropical/subtropical.htm"
  },
  "ET": {
      "name": { "en": "Extratropical", "fr": "Tempête extratropicale" },
      "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
    "info": "placeholder"
  },
  "SS": {
    "name": { "en": "Subtropical Storm", "fr": "Tempête subtropicale" },
    "img" : "../data/img/storm_categories/Category_TS_hurricane_icon.svg",
  "info": "A non-frontal low pressure system that has characteristics of both tropical and extratropical cyclones. The most common type is an upper-level cold low with circulation extending to the surface layer and maximum sustained winds generally occurring at a radius of about 100 miles or more from the center.",
  "more_info_link": "https://www.weather.gov/source/zhu/ZHU_Training_Page/tropical_stuff/sub_extra_tropical/subtropical.htm"
    },




}

// consider adding for unknown or mixture
// more info from NOAA or ECCC