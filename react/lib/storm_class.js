// hurricane is in km/hr



export const storm_type_info = {
  "TD": {
    "min": 38,
    "max": 63,
    "name": { "en": "Tropical Depression", "fr": "Dépression tropicale" },
    "img": "storm_types/TD_icon.svg",
    "exp_img": "storm_types/experimental/TD_icon.svg",
    "img_height": 20,
    "img_width": 20,
    "info": "This is when tropical disturbance acquires a spin, and winds of at least 20 knots (38 km/h)",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"

  },
  "TS": {
    "min": 64,
    "max": 118,
    "name": { "en": "Tropical Storm", "fr": "Tempête tropicale" },
    "img": "storm_types/TS_icon.svg",
    "exp_img": "storm_types/experimental/TS_icon.svg",
    "img_height": 38,
    "img_width": 20,
    "info": "This is when tropical depression winds increase to at least 35 knots (64 km/h)",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "HR": {
    "min": 119,
    "max": null,
    "img_height": 38,
    "img_width": 20,
    "name": { "en": "Hurricane", "fr": "Tempête" },
    "img": "storm_types/HR_icon.svg",
    "exp_img": "storm_types/experimental/HR_icon.svg",
    "info": "A hurricane is formed when sustained winds reach a minimum of 64 knots (119 km/h). There are 5 classes of hurricane intensity as outlined by the Saffir-Simpson Scale.",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",

  },
  "HU": {
    "min": 119,
    "max": null,
    "img_height": 38,
    "img_width": 20,
    "name": { "en": "Hurricane", "fr": "Tempête" },
    "img": "storm_types/HR_icon.svg",
    "exp_img": "storm_types/experimental/HR_icon.svg",
    "info": "A hurricane is formed when sustained winds reach a minimum of 64 knots (119 km/h). There are 5 classes of hurricane intensity as outlined by the Saffir-Simpson Scale.",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",

  },
  "DS": {
    "min": null,
    "max": 37,
    "name": { "en": "Tropical Disturbance", "fr": "Perturbation tropicale" },
    "img": "storm_types/DI_icon.svg",
    "exp_img": "storm_types/experimental/DI_icon.svg",
    "img_height": 20,
    "img_width": 20,
    "info": "This is an organized region of showers and thunderstorms in the tropics - generally 200 to 600 kilometres in diameter - that maintains its identity for at least 24 hours but does not have a closed wind circulation. ",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "ET": {
    "name": { "en": "Extratropical", "fr": "Tempête extratropicale" },
    "img": "storm_types/ET_icon.svg",
    "exp_img": "storm_types/experimental/ET_icon.svg",
    "img_height": 38,
    "img_width": 20,
    "info": "It is a generic term for the class of frontal low pressure systems. They are unlike tropical cyclones in that they are not symmetric in their temperature, precipitation or wind patterns.",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.weather.gov/source/zhu/ZHU_Training_Page/tropical_stuff/sub_extra_tropical/subtropical.htm"

  },
  "SS": {
    "name": { "en": "Subtropical Storm", "fr": "Tempête subtropicale" },
    "img": "storm_types/SS_icon.svg",
    "exp_img": "storm_types/experimental/SS_icon.svg",
    "img_height": 38,
    "img_width": 20,
    "info": "A subtropical storm is a cyclone that has characteristics of both a tropical storm and an extratropical cyclone. Subtropical cyclones can form in waters normally too cool for tropical cyclones.",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.weather.gov/source/zhu/ZHU_Training_Page/tropical_stuff/sub_extra_tropical/subtropical.htm"
  },

  "MX": {
    "name": { "en": "Mixture", "fr": "Un Mélange" },
    "img": "../data/img/storm_types/MX_icon.svg",
    "exp_img": "storm_types/experimental/MX_icon.svg",
    "img_height": 20,
    "img_width": 20,
    "info": " There are contradicting nature reports from different agencies"
  },
  "PT": {
    "name": { "en": "Post tropical", "fr": "Tempête post-tropicale" },
    "img": "storm_types/PT_icon.svg",
    "exp_img": "storm_types/experimental/PT_icon.svg",
    "img_height": 20,
    "img_width": 20,
    "info": "A storm system that used to be tropical but has since lost most of its tropical characteristics. ",
    "source": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/glossary.html",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/hurricane-forecasts-facts/learn/post-tropical-cyclones.html"
  },
  "NR": {
    "name": { "en": "Not Reported", "fr": "Non signalé" },
    "img": "storm_types/NR_icon.svg",
    "exp_img": "storm_types/experimental/NR_icon.svg",
    "img_height": 20,
    "img_width": 20,
    "info": "Storm type not yet reported"
  },


}

// consider adding for not reported or mixture
// more info from NOAA or ECCC

// hurricane is in km/hr

export const storm_categories = {
  "5": {
    "min": 252,
    "max": null,
    "name": { "en": "Category 5", "fr": "catégorie 5" },
    "arcColor": '#A188FC',
    "arcStroke": '#A188FC',
    "ellipseColor": '#A188FC',
    "textColor": '#A188FC',
    "info": "A hurricane with sustained winds of a minimum of 136 knots (252 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"

  },
  "4": {
    "min": 210,
    "max": 251,
    "name": { "en": "Category 4", "fr": "catégorie 4" },
    "arcColor": '#FF738A',
    "arcStroke": '#FF738A',
    "ellipseColor": '#FF738A',
    "textColor": '#FF738A',
    "info": "A hurricane with sustained winds of a minimum of 113 knots (210 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "3": {
    "min": 177,
    "max": 209,
    "name": { "en": "Category 3", "fr": "catégorie 3" },
    "arcColor": '#FF9E59',
    "arcStroke": '#FF9E59',
    "ellipseColor": '#FF9E59',
    "textColor": '#FF9E59',
    "info": "A hurricane with sustained winds of a minimum of 96 knots (177 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "2": {
    "min": 153,
    "max": 176,
    "name": { "en": "Category 2", "fr": "catégorie 2" },
    "arcColor": '#FFD98C',
    "arcStroke": '#FFD98C',
    "ellipseColor": '#FFD98C',
    "textColor": '#FFD98C',
    "info": "A hurricane with sustained winds of a minimum of 83 knots (153 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "1": {
    "min": 119,
    "max": 152,
    "name": { "en": "Category 1", "fr": "catégorie 1" },
    "arcColor": '#FFFFD9',
    "arcStroke": '#FFFFD9',
    "ellipseColor": '#FFFFD9',
    "textColor": '#FFFFD9',
    "info": "A hurricane with sustained winds of a minimum of 64 knots (119 km/h)",
    "more_info_link": "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html"
  },
  "0": {
    "min": null,
    "max": null,
    "name": { "en": "Category 0", "fr": "catégorie 0" },
    "arcColor": '#4DFFFF',
    "arcStroke": '#4DFFFF',
    "ellipseColor": '#4DFFFF',
    "textColor": '#4DFFFF',
    "info": "This is a tropical system likely classified as tropical storm, as outlined in the IBTRACS documentation.",
    "more_info_link": "https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/2024-06/IBTrACS%20v04r01%20column%20documentation.pdf"

  },
  "-1": {
    "min": null,
    "max": null,
    "name": { "en": "Category -1", "fr": "catégorie -1" },
    "arcColor": '#6EC1EA',
    "arcStroke": '#6EC1EA',
    "ellipseColor": '#6EC1EA',
    "textColor": '#6EC1EA',
    "info": "This is a tropical system likely classified as tropical depression, as outlined in the IBTRACS documentation.",
    "more_info_link": "https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/2024-06/IBTrACS%20v04r01%20column%20documentation.pdf"

  },
  "-2": {
    "min": null,
    "max": null,
    "name": { "en": "Category -2", "fr": "catégorie -2" },
    "arcColor": '#6EC1EA',
    "arcStroke": '#6EC1EA',
    "ellipseColor": '#1591DE',
    "textColor": '#1591DE',
    "info": "This is a tropical system likely classified as subtropical storm or subtropical depression, as outlined in the IBTRACS documentation.",
    "more_info_link": "https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/2024-06/IBTrACS%20v04r01%20column%20documentation.pdf"
  },
  "-3": {
    "min": null,
    "max": null,
    "name": { "en": "Category -3", "fr": "catégorie -3" },
    "arcColor": '#5DA7F0',
    "arcStroke": '#5DA7F0',
    "ellipseColor": '#5DA7F0',
    "textColor": '#5DA7F0',
    "info": "This is a tropical system termed  Miscellaneous disturbances, likely classified as tropical wave, low, disturbance, dissipating, inland, or monsoon depression, as outlined in the IBTRACS documentation.",
    "more_info_link": "https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/2024-06/IBTrACS%20v04r01%20column%20documentation.pdf"
  },
  "-4": {
    "min": null,
    "max": null,
    "name": { "en": "Category -4", "fr": "catégorie -4" },
    "arcColor": '#2081D9',
    "arcStroke": '#2081D9',
    "ellipseColor": '#2081D9',
    "textColor": '#2081D9',
    "info": "This is a tropical system, likely classified as an extra-tropical, post-tropical, or extrapolated, as outlined in the IBTRACS documentation.",
    "more_info_link": "https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/2024-06/IBTrACS%20v04r01%20column%20documentation.pdf"
  },
  "-5": {
    "min": null,
    "max": null,
    "name": { "en": "Category -5", "fr": "catégorie -5" },
    "arcColor": '#1659B8',
    "arcStroke": '#1659B8',
    "ellipseColor": '#1659B8',
    "textColor": '#1659B8',
    "info": "This is a tropical system whose status is currently unknown as provided in the IBTRACS documentation",
    "more_info_link": "https://www.ncei.noaa.gov/sites/g/files/anmtlf171/files/2024-06/IBTrACS%20v04r01%20column%20documentation.pdf"
  },


}

