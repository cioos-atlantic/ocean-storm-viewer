import React from "react";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";
import Popup from "./storm_more_info_popoup";
import { storm_type_info } from "@/lib/storm_class";

/**
 * The function StormType displays information about a storm type based on the input STORMTYPE.
 * @returns The function `StormType` is returning JSX elements that display information about a storm
 * type based on the `STORMTYPE` prop. It includes the storm type name in English, an image related to
 * the storm type, and the dimensions of the image.
 */
export default function StormType({ STORMTYPE }) {

    return (
        <p>
            <strong>Storm Type:</strong> {storm_type_info[STORMTYPE]["name"]["en"]}{" "}
            <Image
                src={storm_type_info[STORMTYPE]["img"]}
                alt={storm_type_info[STORMTYPE]["name"]["en"]}
                height={storm_type_info[STORMTYPE]["img_height"]}
                width={storm_type_info[STORMTYPE]["img_width"]}
            />
        </p>
    );
}