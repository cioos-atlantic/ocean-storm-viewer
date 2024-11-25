import { useState, useEffect } from 'react';

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
    const institution = attributes.find(attr => attr[2] === "institution")?.[4] || "No institution available.";

    const info = {
      description,
      institution
    }

    //console.log(`Dataset Description for ${datasetID}: ${description}`);

    return info;
  } catch (error) {
    console.error(`Error fetching metadata for dataset ${datasetID}:`, error);
    return "Error fetching description.";
  }
}

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
      };
    })
  );

  console.log(datasetDescriptions);
  return datasetDescriptions;
}


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