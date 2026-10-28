import dayjs from "dayjs";
import { basePath } from "@/next.config";
import { storm_cat } from "@/lib/storm_cat";

// Earliest and latest dates the date filter allows (pickers and year slider).
// MIN_DATE is the start of the earliest storm in the historical data (SID 1851175N26270).
export const MIN_DATE = dayjs('1851-06-23');
export const MAX_DATE = dayjs().endOf('day');

// The date pickers store whatever was typed, so the field, the summary and the query always agree.
// Returns why the typed dates can't be applied ('' when they can, or when no date is set):
// incomplete or impossible, outside MIN_DATE..MAX_DATE, or an end before the start.
export function getDateRangeError(startDate, endDate) {
  const isUnusable = (date) => date != null &&
    (!date.isValid() || date.isBefore(MIN_DATE, 'day') || date.isAfter(MAX_DATE, 'day'));

  if (isUnusable(startDate) || isUnusable(endDate)) return 'Enter dates between 23/06/1851 and today';
  if (startDate && endDate && endDate.isBefore(startDate, 'day')) return 'End date is before the start date';
  return '';
}

// Date range the historical page starts with, so storms are listed on first load: the last 12 months
export function getDefaultDateRange() {
  const today = dayjs().startOf('day');
  return { startDate: today.subtract(1, 'year'), endDate: today };
}

// Short text for a filter's current value, shown on the filter buttons and with the results.
// Each returns '' when that filter is not set.
export function formatStormNamesSummary(names = []) {
  if (!names?.length) return '';
  if (names.length <= 2) return names.join(', ');
  return `${names.slice(0, 2).join(', ')} +${names.length - 2}`;
}

export function formatDateRangeSummary(startDate, endDate) {
  const hasStart = Boolean(startDate) && dayjs(startDate).isValid();
  const hasEnd = Boolean(endDate) && dayjs(endDate).isValid();
  const format = (date) => dayjs(date).format('DD/MM/YYYY');

  if (hasStart && hasEnd) return `${format(startDate)} – ${format(endDate)}`;
  if (hasStart) return `From ${format(startDate)}`;
  if (hasEnd) return `Until ${format(endDate)}`;
  return '';
}

export function formatCategorySummary(startCategory, endCategory) {
  if (startCategory == null || endCategory == null) return '';
  const startName = storm_cat[startCategory]?.name?.en;
  const endName = storm_cat[endCategory]?.name?.en;
  return startCategory === endCategory ? startName : `${startName} – ${endName}`;
}

export function titleCase(str) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() +
            txt.substr(1).toLowerCase();
    });
}


export function makeStormNameList(storm_data){
  // Create a set to track unique IDs and add objects to the result list
  const uniqueList = [];
  const stormIdentifiers = new Set();
  const stormData = storm_data?.ib_data?.features

  

  stormData?.forEach(feature => {
    let name = feature.properties.NAME;


    // check if name and year exists and if storm identifier does not have the identifier

    if (name && !stormIdentifiers.has(name)) {
      stormIdentifiers.add(name);
      uniqueList.push(name);
    }
  
  
  })

  uniqueList.sort(); // sort storm in alphabetical order 
  const editedStormList = uniqueList.map((stormName)=> stormName = titleCase(stormName));


  return editedStormList;
}

// Number of filters with a value (0-4): storm names, date (either end; open-ended ranges are
// allowed; a mistyped date still counts, see getDateRangeError), a full category range, and a drawn polygon
export function countActiveFilters({ filterStormName, startDate, endDate, startCategory, endCategory, polyFilterCoords }) {
  return [
    filterStormName?.length > 0,
    startDate != null || endDate != null,
    startCategory != null && endCategory != null,
    Boolean(polyFilterCoords),
  ].filter(Boolean).length;
}

// Converts the category labels kept in filterReducer ('TD' ... 'C5') to the wind-speed range
// the filter API expects. TD's min is 0, so check for null instead of truthiness.
export function formatCategoryRange(startCategory, endCategory) {
  const startRange = startCategory != null ? storm_cat[startCategory] : null;
  const endRange = endCategory != null ? storm_cat[endCategory] : null;

  if (!startRange || !endRange) {
    return { start_category: '', end_category: '' };
  }
  return { start_category: String(startRange.min), end_category: String(endRange.max) };
}

// Every historical storm name, for the Storm Name filter. The list does not depend on the other
// filters, so it is fetched once per page load (from /api/storm_name, which returns only the names)
// and reused each time the panel opens. Returns undefined when the request fails, so the next
// open tries again.
let stormNamesRequest = null;

export async function queryStormName() {
  if (!stormNamesRequest) {
    stormNamesRequest = (async () => {
      const resource = await fetch(`${basePath}/api/storm_name`);
      if (!resource.ok) throw new Error(`storm_name returned ${resource.status}`);
      return makeStormNameList(await resource.json());
    })();
  }

  try {
    return await stormNamesRequest;
  } catch (error) {
    stormNamesRequest = null;
    console.error('Error fetching storm names:', error);
    return undefined;
  }
}


export function formatFilterDate(date) {
  if (!date?.isValid?.()) {
    return ""; // No date, or a half-typed one
  }
  const formattedDate = date.format("YYYY-MM-DD").trim();
  return formattedDate;
}

export function formatStormCategory(category_list = []) {
  const formattedCategoryList = category_list.join("_");
  return formattedCategoryList;
}

export function formatStormName(storm_list = []) {
  const formattedStormList = [];
  if (storm_list.length > 0) {
    formattedStormList.push(storm_list.join("_"));
  }
  return formattedStormList;
}
