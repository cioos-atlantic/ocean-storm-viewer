import { wfs_query } from "./wfs_test";
import { station_data_format, get_station_field_data } from "@/components/utils/station_data_util";

export default async function handler(req, res) {
    const filter_station = req.query["station"]
    const source = ["ERDDAP"]
    const source_type = "ACTIVE"

    try {
        console.log("handler", source, source_type);
        const result = await wfs_query("","",source,source_type)
        const features = result['erddap_data']['features']
        const station_data = station_data_format(features, filter_station)
        res.status(200).json(station_data)
    } catch (err) {
        res.status(500).json({ err})
    }
}