import { handleSearch } from "./historical_storm_list";
import { IconButton, TextField } from "@mui/material";
import Search from "@mui/icons-material/Search";

export  function StormSearchQuery(){
  return(
    <>

      <div id="storm_search"
        className="storm_search">
          <form id='storm_search_form'>
            <input type="text" 
                  id="storm_search_query" 
                  name="historical_storm_search" 
                  required minLength="4" placeholder='e.g Joan 2014 or Joan or 2014'/> 
            <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
              <Search />
            </IconButton>
          </form>

        
        </div>
          
      

    </>

);}