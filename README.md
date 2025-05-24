# EventFlow

This repository contains the frontend source code for EventFlow.

## Prerequisites

To build and run the repository, you will need to download
[Node.js](https://nodejs.org/en/download). The application has been tested on Node.js 23.

### Google Maps API Key

The application uses embedded Google Maps, which requires an API key. This can be obtained by
following [these instructions](https://developers.google.com/maps/documentation/embed/get-api-key)
from the Google Maps Platform.

After obtaining an API key, create a `.env.local` file in the `frontend` subdirectory with
the following content:

```
REACT_APP_GOOGLE_MAPS_API_KEY=<Google Maps Platform API Key>
```

The application can be run without this key, but embedded Google Maps components will not work
properly in this case.

## Running

To run the application in development mode:

```sh
cd frontend
npm install
npm start
```

For all features to work, you will also need to run the
[backend server](https://github.com/EvntFlow/EventFlow_Backend/).

## Deployment

To deploy the application, first export the project as a static website:

```
cd frontend
npm install
npm run build
```

The resulting artifact will be present in the `frontend/build` folder. This can then be hosted as static assets by the [EventFlow backend server](https://github.com/EvntFlow/EventFlow_Backend).
