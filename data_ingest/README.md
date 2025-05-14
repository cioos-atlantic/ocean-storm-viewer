# Ocean Storm Viewer - Data Ingest

A collection of scripts and resources for supplying the backend of the Ocean Storm Viewer (OSV) application.

OSV fetches data from Geoserver using the WFS protocol, which allows its data to be leveraged by other services.

## ERDDAP

Station data is harvested from various ERDDAP servers and cached in a PostgreSQL/PostGIS database that is in turn connected to Geoserver to serve the data via WFS.

Details of the ERDDAP caching scripts are documented in the [README.md](ERDDAP/README.md) file in that directory.

## IBTrACS

The main source of historical storm data is the most recent version of the IBTrACS dataset, which is automatically fetched and integrated at regular intervals.

IBTrACS data is then used to fetch historical storm data based on date/time and geographic location.

## Jupyter Notebooks

Sample notebooks and early exploration of available data sources can be found in the jupyter subfolder.

You will first need to create the 'hurricane' conda environmnent:

```
conda env create -f environment.yml
```

Then set VS Code to use the hurricane kernal and run through the notebooks.

## PostGIS Schemas & Geoserver

A collection of PostgreSQL/PostGIS table definitions for the Geoserver backend.

## Sample Data

Notes on ECCC hurricane classification and sample forecasts in their legacy Shapefile format.  

> NOTE: ECCC will be replacing this format with a new GeoJSON format in the near future (anticipated by summer 2025).  The Legacy format will still be available to allow for transition.

## Sarracenia

Sarracenia/MetPX is a data service utilized by Environment and Climate Change Canada (ECCC) to automatically pump and replicate data to clients rather than clients having to poll for updated data.

ECCC produces forecasts during the hurricane season for active storms, these are integrated upon receipt and made available via Active Storms.

