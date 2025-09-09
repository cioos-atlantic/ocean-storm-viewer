import React from "react";
import { pressureToKPa, pressureToInHg, convert_unit_data } from "../utils/unit_conversion";
/**
 * The function `StormPressure` converts a given pressure value to both kilopascal (KPa) and inches of
 * mercury (InHg) units and displays the converted values in a paragraph.
 * @returns The `StormPressure` component is returning a paragraph (`<p>`) element that displays the
 * pressure value in both kilopascal (KPa) and inches of mercury (InHg) units. The pressure value is
 * converted to both units using the `pressureToKPa` and `pressureToInHg` functions, and then displayed
 * in the format:
 */

export default function StormPressure({ STORMPRESSURE }) {

  const pressure_kPa = convert_unit_data(parseFloat(STORMPRESSURE), 'mbar', 'kPa')
  const value_in_Kpa = pressure_kPa.value
  const unit_in_Kpa = pressure_kPa.unit

  const pressure_inHg = convert_unit_data(parseFloat(STORMPRESSURE), 'mbar', 'inHg')
  const value_in_InHg = pressure_inHg.value// parse float just incase it returns a string
  const unit_in_InHg = pressure_inHg.unit

    return (
        <div>
            <strong>Pressure:</strong> {value_in_Kpa} {unit_in_Kpa} ({value_in_InHg} {unit_in_InHg})
            
        </div>
    );
}