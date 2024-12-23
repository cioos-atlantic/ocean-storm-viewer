import { GeoJSON } from 'react-leaflet'

export default function ErrorCone({ error_cone_data }) {
    return (
        <GeoJSON
            key={error_cone_data.id}
            data={error_cone_data}
            style={{ className: 'error-cone' }}
        />
    );
}