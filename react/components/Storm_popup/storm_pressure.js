import React from "react";
import { pressureToKPa, pressureToInHg } from "../utils/unit_conversion";
/**
 * The function `StormPressure` converts a given pressure value to both kilopascal (KPa) and inches of
 * mercury (InHg) units and displays the converted values in a paragraph.
 * @returns The `StormPressure` component is returning a paragraph (`<p>`) element that displays the
 * pressure value in both kilopascal (KPa) and inches of mercury (InHg) units. The pressure value is
 * converted to both units using the `pressureToKPa` and `pressureToInHg` functions, and then displayed
 * in the format:
 */

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