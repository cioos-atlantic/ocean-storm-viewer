import { wfs_query } from "./wfs_query"

export default async function handler(req, res) {
    
    const storm_category = (req.query["storm_category"]) ? req.query["storm_category"] : "";
    const start_date = (req.query["start_date"]) ? req.query["start_date"] : "";
    const end_date = (req.query["end_date"]) ? req.query["end_date"] : "";
    
    const source = "IBTRACS"; // to gather just ibtracs 
    const category_list = storm_category ? storm_category.split("_").filter(Boolean) : [];



    const filters = {};  // Use an object, not an array

    if (start_date !== "" && end_date !== "") {
        filters["ISO_TIME BETWEEN "] =  `${start_date} AND ${end_date}`};
    

    if (category_list.length > 0) {
        const category_string = category_list.join(" OR "); 
        filters["USA_SSHS="] = category_string;
    }



    const source_type = "HISTORICAL";

    console.log("handler", source, source_type,  filters);

    try {
        const result = await wfs_query("", "", source, source_type, "", filters)
        res.status(200).json({ "storm_name": storm_name, "season": season, "source": source, "source_type": source_type, ...result })
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
