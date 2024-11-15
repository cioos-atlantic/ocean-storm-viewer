import { parseISO , format } from 'date-fns';

function formatCoordinates(coordinates){
    const lat_dir = coordinates[1] > 0 ? "N" : "S";
    const lon_dir = coordinates[0] > 0 ? "E" : "W";
    
    return (
        <>{Math.abs(coordinates[1])}&deg;{lat_dir} {Math.abs(coordinates[0])}&deg;{lon_dir}</>
    );
}

export default function StormListItem({ storm_name, storm_data }) {
    const first_point = storm_data.data[0];
    const last_point = storm_data.data.slice(-1)[0];

    
    console.log(storm_name, first_point, last_point);

    return (
        <div>
            <h3><a onClick={(e) => { populateStormDetails(e, storm_data, setSelectedStorm, setStormPoints) }}>{storm_name}</a></h3>
            <div><strong>Current Position:</strong> {formatCoordinates(last_point.geometry.coordinates)}</div>
            <div><strong>Basin:</strong> {first_point.properties.BASIN}</div>
            <div><strong>First Report:</strong> {parseISO(first_point.properties.ISO_TIME).toISOString()}</div>
            <div><strong>Last Report:</strong> {parseISO(last_point.properties.ISO_TIME).toISOString()}</div>
        </div>
    );
}