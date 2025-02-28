import { wfs_query } from "./wfs_query"

export default async function handler(req, res) {
    
    const storm_category = (req.query["storm_category"]) ? req.query["storm_category"] : "";
    const storm_bbox = (req.query["bbox"]) ? req.query["bbox"] : "";
    const storm_names = (req.query["name"]) ? req.query["name"] : "";
    const start_date = (req.query["start_date"]) ? req.query["start_date"] : "";
    const end_date = (req.query["end_date"]) ? req.query["end_date"] : "";
    
    const source = "IBTRACS"; // to gather just ibtracs 
    const category_list = storm_category ? storm_category.split("_").filter(Boolean) : [];
    const names_list = storm_names ? storm_names.split("_").filter(Boolean) : [];



    const filters = {};  // Use an object, not an array

    if (start_date !== "" && end_date !== "") {
        filters["(ISO_TIME BETWEEN "] =  `'${start_date}' AND '${end_date}')`};
    

    if (category_list.length > 0) {
        const category_string = category_list.join(", "); 
        filters["(USA_SSHS IN ("] = category_string + "))";
    }
    if (names_list.length > 0) {

        const names_string = names_list.join("','"); 
        filters["(NAME IN "] =  "('" + names_string.trim().toUpperCase() + "'))";
        
    }

    if(storm_bbox !==""){
        const storm_bbox_list = storm_bbox.split("_")
        filters["(LAT BETWEEN "] = `${storm_bbox_list[0]} AND ${storm_bbox_list[2]})`;
        filters["(LON BETWEEN "] = `${storm_bbox_list[1]} AND ${storm_bbox_list[3]})`;
    }



    const source_type = "HISTORICAL";
    const selected_features = '&propertyName=SID,NAME,SEASON';

    console.log("handler", source, source_type,  filters);

    try {
        const result = await wfs_query("", "", source, source_type, "", filters, selected_features)
        res.status(200).json({  "source": source, "source_type": source_type, ...result })
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
