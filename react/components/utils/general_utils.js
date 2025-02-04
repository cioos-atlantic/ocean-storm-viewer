import { useEffect } from "react";

/**
 * Fetches data and sets the contents of the state variable provided by the data callback
 * @param {string} url URL to fetch data from
 * @param {function} setDataCallback Set state variable with JSON data from URL
 * @param {function} setLoadingCallback State Loading flag callback, use to set loading state to false when operation completes
 */
export function fetchData(url, setDataCallback, setLoadingCallback){
  useEffect(() => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      setDataCallback(data);

      if(setLoadingCallback){
        setLoadingCallback(false);
      }
    })
  }, []);
}

