export function convert_unit_data(value, unit_from, unit_to = null) {
  // Checks for certain values to convert or just reformat  
  return (unit_from == 'm/s' && unit_to == 'knots') ? windSpeedToKnots(value)
    : (unit_from == 'm/s') ? windSpeedToKmh(value) //km/h default instead of m/s
    : (unit_from == 'm s-1') ? windSpeedToKmh(value) //km/h default instead of m/s
    : (unit_from == '°C' && unit_to == '°F') ? tempToDegreeF(value)
    : (unit_from == 'm' && unit_to == 'ft') ? windHeightToFt(value)
    : (unit_from == 'hPa' && unit_to == 'kPa') ? pressureToKPa(value)
    : (unit_from == 'hPa') ? pressureToInHg(value)
    : { 'value': value, 'unit': unit_from } // No change, return input
}

export function windSpeedToKmh(value_in) {
  const unit = 'km/h'; // Declare unit with const
  const value = (value_in * 3.6).toFixed(2); // Convert m/s to km/h
  return { value, unit };
};

export function windSpeedToKnots(value_in) {
  const unit = 'knots';
  const value = (value_in * 1.943844).toFixed(1); // Convert m/s to knots
  return { value, unit };
};

export function tempToDegreeF(value_in) {// unit originally in °C
  const unit = '°F';
  const value = Math.round((value_in * (9 / 5)) + 32);
  return { value, unit };
};

export function tempToDegreeC(value_in) {// unit originally in °C
  const unit = '°C';
  //const value= parseFloat(value_in); // Convert string to float
  const value = Math.round(parseFloat(value_in));
  return { value, unit };
};

export function pressureToKPa(value_in) {// unit originally in mbar
  const unit = 'kPa';
  const value = (value_in * 0.1).toFixed(1);
  return { value, unit };
};

export function pressureToInHg(value_in) {// unit originally in mbar
  const unit = 'inHg';
  const value = (value_in * 0.02953).toFixed(1);
  return { value, unit };
};

export function windHeightToFt(value_in) {// unit originally in metres
  const unit = 'ft';
  const value = (value_in * 3.28084).toFixed(1);
  return { value, unit };
};

export function windHeightToM(value_in) { // unit originally in metres
  const unit = 'm';
  const value = parseFloat(value_in).toFixed(1);
  return { value, unit };
};
