import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Popup from "./storm_more_info_popoup";
import { storm_categories } from "@/lib/storm_class";

export default function StormCategory({ STORMFORCE }) {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => setShowPopup(!showPopup);

    const stormCategory = String(STORMFORCE);
    const hasStormForce = Boolean(STORMFORCE);
    const stormCategoryInfo = hasStormForce
        ? storm_categories[stormCategory]?.info
        : "There is currently no information on the storm category. Please check back later.";
    const stormCategoryLink = hasStormForce
        ? storm_categories[stormCategory]?.more_info_link
        : "https://www.canada.ca/en/environment-climate-change/services/archive/hurricanes/extratropical-transition/classification.html";
    const stormCategoryTitle = hasStormForce
        ? storm_categories[stormCategory]?.name?.en
        : "Storm Category: No Current Information";

    return (
        <>
            <p>
                <strong>Storm Category:</strong> {STORMFORCE || "Unknown"}{" "}
                <FaInfoCircle
                    style={{ cursor: "pointer", marginLeft: "5px" }}
                    onClick={togglePopup}
                />
            </p>
            {showPopup && (
                <Popup title={stormCategoryTitle} onClose={togglePopup}>
                    <p>{stormCategoryInfo}</p>
                    <p>
                        Please visit{" "}
                        <a href={stormCategoryLink} target="_blank" rel="noopener noreferrer">
                            here
                        </a>{" "}
                        for information on storm categories.
                    </p>
                </Popup>
            )}
        </>
    );
}
