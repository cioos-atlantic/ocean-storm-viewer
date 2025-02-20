import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';


const storm_category_filter_list = [
  { label: "Category 5", value: 5 },
  { label: "Category 4", value: 4 },
  { label: "Category 3", value: 3 },
  { label: "Category 2", value: 2 },
  { label: "Category 1", value: 1 },
  { label: "Category 0", value: 0 },
  { label: "Category -1", value: -1 },
  { label: "Category -2", value: -2 },
  { label: "Category -3", value: -3 },
  { label: "Category -4", value: -4 },
  { label: "Category -5", value: -5 },
]

export const filters = [
  
  { 
    "name":'stormCategory',
    "options":storm_category_filter_list,
    'icon':<CategoryOutlinedIcon />,
    
    
  }

]