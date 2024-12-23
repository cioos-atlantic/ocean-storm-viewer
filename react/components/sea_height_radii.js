import { GeoJSON } from 'react-leaflet'

export default function SeaHeightRadius({ storm_sea_height_data, hover_marker }) {
    let display_sea_height_radii = true;
    if (hover_marker.properties.TIMESTAMP != storm_sea_height_data.properties.TIMESTAMP) {
        display_sea_height_radii = false;
    }

    const path_options = { className: 'sea-height' };

    return (
        display_sea_height_radii ? (
            <GeoJSON
                key={storm_sea_height_data.id}
                data={storm_sea_height_data}
                style={path_options}
            />
        ) : (
            <></>
        )
    );
}