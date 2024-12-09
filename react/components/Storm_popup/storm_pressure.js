import React from "react";
import { pressureToKPa, pressureToInHg } from "../utils/unit_conversion";

export default function StormPressure({ STORMPRESSURE }) {

    const value_in_Kpa = pressureToKPa(parseFloat(STORMPRESSURE)).value// parse float just incase it returns a string
    const unit_in_Kpa = pressureToKPa(parseFloat(STORMPRESSURE)).unit

    const value_in_InHg = pressureToInHg(parseFloat(STORMPRESSURE)).value// parse float just incase it returns a string
    const unit_in_InHg = pressureToInHg(parseFloat(STORMPRESSURE)).unit



    return (
        <p>
            <strong>Pressure:</strong> {value_in_Kpa} {unit_in_Kpa} ({value_in_InHg} {unit_in_InHg})

        </p>
    );
}