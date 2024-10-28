import { wfs_query } from "./wfs_test";
import { station_data_format } from "@/components/utils/station_data_util";

export default async function handler(req, res) {
    const filter_station = req.query["station"]
    const source = ["ERDDAP"]
    const source_type = "ACTIVE"


    try {
        console.log("handler", source, source_type);
        /*
        const result = await wfs_query(storm_name, season, source, source_type)
        res.status(200).json({ "storm_name": storm_name, "season": season, "source": source, "source_type": source_type, ...result })
        */
        const result = await wfs_query("","",source,source_type)
        console.log('getting features...')
        let station_recent = {}
        const features = result['erddap_data']['features']
        const station_data = station_data_format(features, filter_station)
        //console.log(result);
        res.status(200).json(station_data)
    } catch (err) {
        res.status(500).json({ err})
    }
}