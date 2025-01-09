import { GeoJSON } from 'react-leaflet'

/**
 * The function LineOfTravel renders a GeoJSON component with styling based on storm line data.
 
 */
export default function LineOfTravel({ storm_line_data }) {
    return (
        <GeoJSON
            key={storm_line_data.id}
            data={storm_line_data}
            style={{ className: 'line-of-travel' }}
        />
    );
}