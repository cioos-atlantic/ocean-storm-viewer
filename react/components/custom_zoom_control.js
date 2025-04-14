import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

function CustomZoomControl() {
  const map = useMap();

  useEffect(() => {
    // Check if zoom control already exists to prevent duplication
    if (!map.zoomControl) {
      const zoomControl = L.control.zoom({ position: "topright" });
      zoomControl.addTo(map);

      // Cleanup function: Remove zoom control when component unmounts
      return () => {
        map.removeControl(zoomControl);
      };
    }
  }, [map]); // Runs only when the map instance changes

  return null;
}

export default CustomZoomControl;
