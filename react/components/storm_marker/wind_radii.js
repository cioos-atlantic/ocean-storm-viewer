import { GeoJSON } from 'react-leaflet'

export default function WindSpeedRadius({ storm_wind_radii_data, hover_marker }) {
    let display_wind_speed_radii = true;
    if (hover_marker.properties.TIMESTAMP != storm_wind_radii_data.properties.TIMESTAMP) {
        display_wind_speed_radii = false;
    }

    const path_options = { className: 'wind-rad-'.concat(storm_wind_radii_data.properties.WINDFORCE) };

    return (
        display_wind_speed_radii ? (
            // Leaflet Polygon Example
            // <Polygon
            //   key={radii.properties.TIMESTAMP + radii.properties.WINDFORCE}
            //   positions={positions}
            //   pathOptions={path_options}

            // >
            //   <Popup>
            //     <h3>{radii.properties.STORMNAME}</h3>
            //     <p>Wind force: {radii.properties.WINDFORCE}</p>
            //     <p>Timestamp: {radii.properties.TIMESTAMP}</p>
            //   </Popup>
            // </Polygon>

            <GeoJSON
                key={storm_wind_radii_data.id}
                data={storm_wind_radii_data}
                style={path_options}
            />
        ) : (
            <></>
        )
    );
}