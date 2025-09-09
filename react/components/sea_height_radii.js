import { GeoJSON } from 'react-leaflet'

/**
 * This function renders a GeoJSON layer representing sea height radii for a storm.
 * It checks if the hovered marker's timestamp matches the storm's sea height data timestamp, and conditionally displays the sea height radii.
/+
 * @returns {JSX.Element} - A GeoJSON layer representing the sea height radii if the timestamps match, or an empty JSX element if the timestamps do not match.
 */
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