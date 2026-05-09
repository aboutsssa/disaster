export const observatoryLayers = [
  {
    id: 'population',
    label: 'WorldPop population density',
    group: 'Exposure',
    type: 'raster',
    defaultVisible: true,
    color: '#d9a66f',
    legendClasses: [
      { label: '50-250 people/km²', color: '#e6d3a1' },
      { label: '250-1k people/km²', color: '#d9a66f' },
      { label: '>1k people/km²', color: '#c56f58' }
    ],
    renderingRule: {
      rasterFunction: 'Colormap',
      rasterFunctionArguments: {
        Colormap: [
          [1, 230, 211, 161],
          [2, 217, 166, 111],
          [3, 197, 111, 88]
        ],
        Raster: {
          rasterFunction: 'Remap',
          rasterFunctionArguments: {
            InputRanges: [50, 250, 250, 1000, 1000, 1000000],
            OutputValues: [1, 2, 3],
            NoDataRanges: [0, 50],
            AllowUnmatched: false,
            Raster: '$$'
          },
          outputPixelType: 'U8',
          variableName: 'Raster'
        }
      },
      outputPixelType: 'U8',
      variableName: 'Raster'
    },
    source:
      'https://worldpop.arcgis.com/arcgis/rest/services/WorldPop_Population_Density_1km/ImageServer/exportImage',
    description:
      'Gridded population density for exposure reading. Low-density pixels are treated as transparent so the map emphasizes dense exposure clusters.',
    citation: 'WorldPop Population Density 1km ImageServer'
  },
  {
    id: 'flood-risk',
    label: 'UNEP global flood risk',
    group: 'Hazard',
    type: 'raster',
    defaultVisible: false,
    color: '#7fb7c9',
    legendClasses: [
      { label: 'Lower flood risk', color: '#b7d7df' },
      { label: 'Medium flood risk', color: '#7fb7c9' },
      { label: 'Higher flood risk', color: '#3d879f' }
    ],
    source:
      'https://geo.fas.usda.gov/arcgis2/rest/services/G_Disaster_Data/GlobalFloodRisk_UNEP/MapServer/export',
    description:
      'Global flood-risk raster service for screening flood-prone regions and comparing exposure against population.',
    citation: 'UNEP Global Flood Risk via ArcGIS MapServer'
  },
  {
    id: 'urban-heat',
    label: 'Urban heat island / land surface temperature',
    group: 'Heat',
    type: 'gibs-raster',
    defaultVisible: false,
    color: '#c9855c',
    legendClasses: [
      { label: 'Warm urban surface', color: '#e8c58f' },
      { label: 'Hot urban surface', color: '#c9855c' },
      { label: 'Extreme urban heat', color: '#b45d5c' }
    ],
    gibsLayer: 'UHI_Avg_Summer_Day_Max_Land_Surface_Temp_2013',
    tileMatrixSet: 'GoogleMapsCompatible_Level7',
    source:
      'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/UHI_Avg_Summer_Day_Max_Land_Surface_Temp_2013/default/GoogleMapsCompatible_Level7/{z}/{y}/{x}.png',
    description:
      'NASA GIBS urban heat island layer showing average summer daytime maximum land surface temperature for urban heat exposure screening.',
    citation: 'NASA GIBS Urban Heat Island land surface temperature'
  },
  {
    id: 'active-fire',
    label: 'NASA VIIRS active fires',
    group: 'Hazard',
    type: 'raster',
    defaultVisible: false,
    color: '#d06f55',
    legendClasses: [
      { label: 'Thermal anomaly', color: '#d9a66f' },
      { label: 'Active fire cluster', color: '#d06f55' }
    ],
    source: 'NASA GIBS WMTS',
    description:
      'Thermal anomaly visualization from NASA GIBS. Useful as a live/near-live fire layer once the date is advanced by the data pipeline.',
    citation: 'NASA GIBS VIIRS/SNPP thermal anomalies'
  },
  {
    id: 'hurricane-tracks',
    label: 'Historical hurricane tracks',
    group: 'Cyclone',
    type: 'geojson-line',
    defaultVisible: false,
    color: '#b59ad6',
    legendClasses: [
      { label: 'Cat 1-2 / 64-95 kt', color: '#d7c9e8' },
      { label: 'Cat 3-4 / 96-136 kt', color: '#b59ad6' },
      { label: 'Cat 5 / 137+ kt', color: '#8f6fbd' }
    ],
    source:
      'https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/Historical_Hurricane_Tracks/FeatureServer/0/query?where=year%3E%3D2000%20AND%20USA_WIND%3E%3D64&outFields=NAME,year,BASIN,USA_WIND&returnGeometry=true&f=geojson&outSR=4326&resultRecordCount=2000',
    description:
      'Recent historical hurricane-force tropical cyclone track segments from NOAA/IBTrACS-derived ArcGIS service.',
    citation: 'NOAA Historical Hurricane Tracks / IBTrACS FeatureServer'
  },
  {
    id: 'tsunami-events',
    label: 'Historical tsunami events',
    group: 'Tsunami',
    type: 'geojson-point',
    defaultVisible: false,
    color: '#77c7b8',
    legendClasses: [
      { label: 'Major runup >5 m', color: '#b9e2d9' },
      { label: 'High impact >100 deaths', color: '#77c7b8' },
      { label: 'Extreme impact >1k deaths', color: '#3a9c8e' }
    ],
    source:
      'https://services.arcgis.com/jIL9msH9OI208GCb/ArcGIS/rest/services/Historical_Tsunami_Events/FeatureServer/0/query?where=DEATHS%3E100%20OR%20MAXIMUM_WATER_HEIGHT%3E5&outFields=YEAR,COUNTRY,LOCATION_NAME,PRIMARY_MAGNITUDE,MAXIMUM_WATER_HEIGHT,DEATHS,CAUSE_CODE&returnGeometry=true&f=geojson&outSR=4326',
    description:
      'NOAA/NCEI global historical tsunami source events filtered to higher-impact events and larger observed water heights.',
    citation: 'NOAA/NCEI Global Historical Tsunami Database FeatureServer'
  },
  {
    id: 'earthquakes',
    label: 'USGS earthquakes',
    group: 'Event',
    type: 'geojson',
    defaultVisible: true,
    color: '#8db7d2',
    legendClasses: [
      { label: 'M2.5-4.5', color: '#8db7d2' },
      { label: 'M4.5-6', color: '#d9b46d' },
      { label: 'M6+', color: '#c76f7e' }
    ],
    source: 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson',
    description:
      'Recent global M2.5+ earthquakes from the USGS GeoJSON feed. Events remain points, while exposure and hazard intensity layers remain raster.',
    citation: 'USGS Earthquake Hazards Program GeoJSON feed'
  }
] as const;

export const plannedRemoteSensingLayers = [
  {
    name: 'Coastal inundation and sea-level exposure',
    source: 'NASA sea-level scenarios, coastal DEMs, GEE-derived inundation surfaces',
    status: 'Pipeline design'
  },
  {
    name: 'Surface water change and flood history',
    source: 'JRC Global Surface Water and JRC Global River Flood Hazard Maps in Earth Engine',
    status: 'GEE export'
  },
  {
    name: 'Drought and rainfall anomaly',
    source: 'CHIRPS, CHIRTS, ERA5, TerraClimate',
    status: 'GEE export'
  },
  {
    name: 'Burned area and vegetation recovery',
    source: 'MODIS burned area, VIIRS active fire, Sentinel/Landsat indices',
    status: 'GEE export'
  },
  {
    name: 'Settlement and re-inhabitability indicators',
    source: 'WorldPop, GHSL, World Settlement Footprint, nighttime lights, roads and service access',
    status: 'Analysis layer'
  }
] as const;

export const geePlan = {
  project: 'ee-jakobzhao',
  recommendedFlow: [
    'Use Earth Engine to build analysis-ready hazard and exposure composites.',
    'Export browser-ready outputs as XYZ tiles, Cloud Optimized GeoTIFFs, PMTiles, or vector tiles.',
    'Load public web layers in MapLibre; keep Earth Engine authentication and quota-sensitive processing outside the browser.',
    'Attach each visible layer to source metadata, resolution, temporal coverage, and known uncertainty.'
  ]
};
