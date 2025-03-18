export function convert_unit_data (value, unit_from, unit_to=null){
  // Checks for certain values to convert or just reformat  
  // Explicit first, then assumptions (for graph)
  return (value == null) ? {'value':NaN, 'unit':unit_from}
  : (unit_to == 'knots') ? toKnots(value, unit_from)
  : (unitList_kmh.includes(unit_to)) ? toKmh(value, unit_from)
  : (unitList_degreeF.includes(unit_to)) ? toDegreeF(value, unit_from)
  : (unitList_degreeC.includes(unit_to)) ? toDegreeC(value, unit_from)
  : (unitList_metres.includes(unit_to)) ? toM(value, unit_from)
  : (unit_to == 'ft') ? toFt(value, unit_from)
  : (unit_to == 'kPa') ? toKPa(value, unit_from)
  : (unit_to == 'inHg') ? toInHg(value, unit_from)
  //No explicit conversion, use assumption based on incoming unit type 
  //This is done since graphs are generated  on the same statement
  //Want to clean this up by making it a config option and putting this logic in station graph later
  : (unitList_ms.includes(unit_from)) ? toKmh(value, unit_from)
  : (unitList_degreeC.includes(unit_from)) ? toDegreeC(value, unit_from)
  : (unitList_metres.includes(unit_from)) ? toM(value, unit_from)
  : (unit_from == 'mbar') ? toKPa(value, unit_from)
  : {'value':value, 'unit':unit_from} // No change, return input in formatted manner
}

const unitList_ms = ['m/s', 'm s-1', 'ms-1']
const unitList_kmh = ['km/h', 'kmh', 'kmph', 'kmh-1', 'km h-1']
const unitList_degreeC = ['°C', 'degreeC', 'degree Celsius', 'degree C']
const unitList_degreeF = ['°F', 'degreeF', 'degree Fahrenheit', 'degree F']
const unitList_metres = ['m', 'metre', 'metres', 'meter', 'meters']

export function toKmh(value_in, unit_in){
  const unit = 'km/h'; // Declare unit with const
  let value = NaN

  if (unitList_ms.includes(unit_in)){value = (value_in * 3.6)} // Convert m/s to km/h
  else if(unitList_kmh.includes(unit_in)){value = value_in}
  else return {value, unit}

  value = value.toFixed(2)
  return {value, unit};
};

export function toKnots(value_in, unit_in){
  const unit = 'knots';
  let value = NaN
  
  if (unitList_ms.includes(unit_in)){value = value_in * 1.943844}
  else if(unitList_kmh.includes(unit_in)){value = value_in *  0.539957}
  else return {value, unit}

  value = value.toFixed(1);
  return {value, unit};
};

export function toDegreeF(value_in, unit_in){
  const unit = '°F';
  let value = NaN
  
  if (unitList_degreeC.includes(unit_in)){value = ((value_in * (9.0 / 5.0)) + 32)}
  else if(unitList_degreeF.includes(unit_in)){value = parseFloat(value_in)}
  else return {value, unit}

  value = value.toFixed(1)
  return {value, unit};
};

export function toDegreeC(value_in, unit_in){// unit originally in °C
  const unit = '°C';
  let value = NaN
  
  if (unitList_degreeF.includes(unit_in)){value = (value_in - 32) * (5.0/9.0)}
  else if(unitList_degreeC.includes(unit_in)){value = parseFloat(value_in)}
  else return {value, unit}

  value = value.toFixed(1)
  return {value, unit};
};

export function toKPa(value_in, unit_in){
  const unit = 'kPa';
  let value = NaN
  
  if (unit_in == 'kPa'){value = value_in}
  else if(unit_in == 'mbar'){value = (value_in * 0.1)}
  else if(unit_in == 'hPa'){value = (value_in * 0.1)}
  else return {value, unit}

  value = value.toFixed(1); 
  return {value, unit};
};

export function toInHg(value_in, unit_in){
  const unit = 'inHg';
  let value = NaN

  if (unit_in == 'kPa'){value = (value_in * 0.2953)}
  else if(unit_in == 'mbar'){value = (value_in * 0.02953)}
  else if(unit_in == 'hPa'){value = (value_in * 0.02953)}
  else return {value, unit}

  value = value.toFixed(1); 
  return {value, unit};
};

export function toFt(value_in, unit_in){
  const unit = 'ft';
  let value = NaN

  if (unit_in == 'ft'){value = value_in}
  else if(unitList_metres.includes(unit_in)){value = (value_in * 3.28084)}
  else return {value, unit}

  value = value.toFixed(1); 
  return {value, unit};
};

export function toM(value_in, unit_in){ // unit originally in metres
  const unit = 'm';
  let value = NaN

  if (unitList_metres.includes(unit_in)){value = value_in}
  else if(unit_in == 'ft'){value = (value_in * 0.3048)}
  else return {value, unit}
  
  value = value.toFixed(1); 
  return {value, unit};
};



