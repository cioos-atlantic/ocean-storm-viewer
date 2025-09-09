import { GeoJSON } from 'react-leaflet'

/**
 * The function ErrorCone renders a GeoJSON component with error cone data and a specific style.
 * @returns A React functional component named ErrorCone is being returned. It renders a GeoJSON
 * component with the provided error_cone_data as the data prop and a style prop with a className of
 * 'error-cone'. The key prop is set to the id of the error_cone_data.
 */
export default function ErrorCone({ error_cone_data }) {
    return (
        <GeoJSON
            key={error_cone_data.id}
            data={error_cone_data}
            style={{ className: 'error-cone' }}
        />
    );
}