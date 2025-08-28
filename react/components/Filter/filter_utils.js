import { IconButton, Tooltip } from "@mui/material";
import { basePath } from "@/next.config";

export function smallScreenIconButton(toolTipTitle, handleIconClick, buttonStyle, Icon) {
  return (
    <Tooltip title={toolTipTitle} placement="left">
      <IconButton
        //className="filter-badge"
        onClick={(e) => {
          e.stopPropagation(); // Prevent closing
          handleIconClick();
        }}

        sx={{
          ...buttonStyle,
          display: { xs: "flex", md: "none" },
          textDecoration: 'none',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          margin: '8px',
          transition: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,opacity 0.8s',
          opacity: '1',
          cursor: 'pointer',
          transitionDelay: '30ms',
          boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
          //border:'solid red 1px',
        }


        }><Icon />
      </IconButton> </Tooltip>
  )

}
export function titleCase(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();
    });
}


export function makeStormNameList(storm_data){
  // Create a set to track unique IDs and add objects to the result list
  const uniqueList = [];
  const stormIdentifiers = new Set();
  const stormData = storm_data?.ib_data?.features

  

  stormData?.forEach(feature => {
    let name = feature.properties.NAME;


    // check if name and year exists and if storm identifier does not have the identifier

    if (name && !stormIdentifiers.has(name)) {
      stormIdentifiers.add(name);
      uniqueList.push(name);
    }
  
  
  })

  uniqueList.sort(); // sort storm in alphabetical order 
  const editedStormList = uniqueList.map((stormName)=> stormName = titleCase(stormName));


  return editedStormList;
}

export async function queryStormName() {
  
  let uniqueList;
  try {
    const resource = await fetch_retry(`${basePath}/api/storm_names?`, 3)
    const storm_data = await resource.json();
    //console.log(storm_data)
    
    uniqueList = makeStormNameList(storm_data)
    // Create a set to track unique IDs and add objects to the result list
    
    console.log(uniqueList);
    if (uniqueList.length === 0) {
      alert("No result found for this search, please try again...")
    }

    


  } catch (error) {
    
    console.error('Error fetching storm or station data:', error);
    
  }

  console.log(uniqueList) 
  return uniqueList
  

}


const fetch_retry = async (url, n, baseDelay = 100) => {
  let error;
  for (let i = 0; i < n; i++) {
    try {
      const res = await fetch(url);

      if (res.status === 404) {
        throw new Error(`Non-retryable error: ${res.status} Not Found`);
      }

      if (!res.ok) {
        error = new Error(`HTTP error: ${res.status}`);
      } else {
        return res; // ✅ success
      }
    } catch (err) {
      error = err;
    }

    if (i < n - 1) {
      const delay = baseDelay * (2 ** i); // exponential backoff
      console.warn(
        `Attempt ${i + 1} failed (${error.message}). Retrying in ${delay}ms...`
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw error; // after all retries fail
};
