# Ocean Storm Viewer

A react/next.js application for viewing active and historical hurricanes alongside insitu data (climate stations, buoys, etc.) to view the track and impact over time of hurricanes.

This application is focusing on Atlantic Canada initially but could be expanded to other regions as well.

The primary source of historical storm data is the [International Best Track Archive for Climate Stewardship (IBTrACS)](https://www.ncei.noaa.gov/products/international-best-track-archive) dataset.

Historical station data is sourced from CIOOS data servers with the intention to expand to other marine and terrestrial data sources in the future, such as ECCC, DFO and NBDC.

## React - Node.js / Next.js

Setup and Install node modules

``` bash
cd react
npm install
```

To run in development mode:

``` bash
npm run dev
```

To perform linting:

``` bash
npm run lint
```

To run in production mode:

``` bash
npm run build
npm run prod
```

## Docker

To build a docker image of the Ocean Storm Viewer:

`docker build -f react/Dockerfile .`

### Docker Compose

`docker compose up -d -f react/docker-compose.yml`
