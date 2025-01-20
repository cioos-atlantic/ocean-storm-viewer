import { useState, useEffect } from 'react';

/**
 * Fetches all datasets from the ERDDAP server and returns them as an array of objects.
 * Each object contains the dataset's ID and title.
 * @throws {Error}
 *  - Throws an error if there is an HTTP error or if there is an error parsing the response.
 */
async function fetchAllDatasets() {
  const erddapUrl = "https://cioosatlantic.ca/erddap/tabledap/allDatasets.json?datasetID,title";

  try {
    // Fetch the data from the ERDDAP server
    const response = await fetch(erddapUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();
    //console.log(data);

    // Extract dataset information
    const { columnNames, rows } = data.table;

    // Map rows to objects for easier manipulation
    const datasets = rows.map(row => {
      const datasetInfo = {};
      columnNames.forEach((column, index) => {
        datasetInfo[column] = row[index];
      });
      return datasetInfo;
    });

    // Output dataset IDs and titles
    /*datasets.forEach(dataset => {
      console.log(`ID: ${dataset.datasetID}, Title: ${dataset.title}`);
    });*/
    //console.log(datasets);

    return datasets;
  } catch (error) {
    console.error("Error querying ERDDAP datasets:", error);
  }
}

// Fetch and log all datasets


/**
 * Fetches metadata for a specific dataset from the ERDDAP server.
 *
 * @param {string} datasetID - The ID of the dataset to fetch metadata for.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the dataset's description and institution.
 *  - The object has the following properties:
 *    - description: A string representing the dataset's description.
 *    - institution: A string representing the dataset's institution.
 *  - If there is an error fetching the metadata, the promise will reject with an error message.
 */
async function fetchDatasetMetadata(datasetID) {
  const metadataUrl = `https://cioosatlantic.ca/erddap/info/${datasetID}/index.json`;

  try {
    // Fetch metadata
    const response = await fetch(metadataUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const metadata = await response.json();

    // Extract the description or summary
    const attributes = metadata.table.rows;
    //console.log(attributes)
    const description = attributes.find(attr => attr[2] === "summary")?.[4] || "No description available.";
    const institution = attributes.find(attr => attr[2] === "creator_name")?.[4] || "No institution available.";
    const institution_link = attributes.find(attr => attr[2] === "creator_url")?.[4] || "No URL available";

    const info = {
      description,
      institution,
      institution_link
    }

    //console.log(`Dataset Description for ${datasetID}: ${description}`);

    return info;
  } catch (error) {
    console.error(`Error fetching metadata for dataset ${datasetID}:`, error);
    return "Error fetching description.";
  }
}

/**
 * Fetches descriptions for all datasets from the ERDDAP server.
 * This function fetches all datasets using the fetchAllDatasets function,
 * then fetches metadata for each dataset using the fetchDatasetMetadata function.
 * The function returns an array of objects, where each object contains the dataset's ID, title, description, and institution.
 *
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of objects.
 *  - Each object has the following properties:
 *    - id: A string representing the dataset's ID.
 *    - title: A string representing the dataset's title.
 *    - description: A string representing the dataset's description.
 *    - institution: A string representing the dataset's institution.
 *  - If there is an error fetching the dataset descriptions, the promise will reject with an error message.
 */
async function fetchAllDatasetDescriptions() {
  const allDatasets = await fetchAllDatasets(); 

  const datasetDescriptions = await Promise.all(
    allDatasets.map(async dataset => {
      const info = await fetchDatasetMetadata(dataset.datasetID);
      return {
        id: dataset.datasetID,
        title: dataset.title,
        description: info.description,
        institution: info.institution,
        institution_link: info.institution_link
      };
    })
  );

  console.log(datasetDescriptions);
  return datasetDescriptions;
}


/**
 * A custom React hook that fetches and returns descriptions for all datasets from the ERDDAP server.
 * The function uses the `fetchAllDatasetDescriptions` function to fetch dataset descriptions,
 * and then stores the descriptions in the component's state using the `useState` hook.
 * The hook also uses the `useEffect` hook to fetch the dataset descriptions only once,
 * by passing an empty dependency array to the `useEffect` hook.
 *
 * @returns {Array<Object>} - An array of objects representing the dataset descriptions.
 *  - Each object has the following properties:
 *    - id: A string representing the dataset's ID.
 *    - title: A string representing the dataset's title.
 *    - description: A string representing the dataset's description.
 *    - institution: A string representing the dataset's institution.
 *  - If there is an error fetching the dataset descriptions, the function will return `null`.
 */
export function useDatasetDescriptions() {
  const [allDatasetDescriptions, setAllDatasetDescriptions] = useState(null);

  useEffect(() => {
    const fetchDataDet = async () => {
      try {
        const descriptions = await fetchAllDatasetDescriptions();
        setAllDatasetDescriptions(descriptions);
      } catch (error) {
        console.error("Error fetching dataset descriptions:", error);
      }
    };

    fetchDataDet();
  }, []); // Empty dependency array ensures this runs only once

  return allDatasetDescriptions;
}