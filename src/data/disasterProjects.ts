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
    name: {
      en: 'Coastal inundation and sea-level exposure',
      zh: '海岸淹没与海平面暴露'
    },
    source: {
      en: 'NASA sea-level scenarios, coastal DEMs, GEE-derived inundation surfaces',
      zh: 'NASA 海平面情景、海岸 DEM 与 GEE 淹没面'
    },
    status: { en: 'Pipeline design', zh: '流程设计' }
  },
  {
    name: {
      en: 'Surface water change and flood history',
      zh: '地表水变化与洪水历史'
    },
    source: {
      en: 'JRC Global Surface Water and JRC Global River Flood Hazard Maps in Earth Engine',
      zh: 'Earth Engine 中的 JRC 全球地表水与全球河流洪水风险图'
    },
    status: { en: 'GEE export', zh: 'GEE 导出' }
  },
  {
    name: {
      en: 'Drought and rainfall anomaly',
      zh: '干旱与降水异常'
    },
    source: {
      en: 'CHIRPS, CHIRTS, ERA5, TerraClimate',
      zh: 'CHIRPS、CHIRTS、ERA5、TerraClimate'
    },
    status: { en: 'GEE export', zh: 'GEE 导出' }
  },
  {
    name: {
      en: 'Burned area and vegetation recovery',
      zh: '火烧迹地与植被恢复'
    },
    source: {
      en: 'MODIS burned area, VIIRS active fire, Sentinel/Landsat indices',
      zh: 'MODIS 火烧迹地、VIIRS 活跃火点、Sentinel/Landsat 指数'
    },
    status: { en: 'GEE export', zh: 'GEE 导出' }
  },
  {
    name: {
      en: 'Settlement and ReSpace indicators',
      zh: '聚落与复原空间指标'
    },
    source: {
      en: 'WorldPop, GHSL, World Settlement Footprint, nighttime lights, roads and service access',
      zh: 'WorldPop、GHSL、世界聚落足迹、夜间灯光、道路与服务可达性'
    },
    status: { en: 'Analysis layer', zh: '分析图层' }
  }
] as const;

export const geePlan = {
  project: 'ee-jakobzhao',
  recommendedFlow: [
    {
      en: 'Use Earth Engine to build analysis-ready hazard and exposure composites.',
      zh: '使用 Earth Engine 构建可分析的灾害与暴露综合图层。'
    },
    {
      en: 'Export browser-ready outputs as XYZ tiles, Cloud Optimized GeoTIFFs, PMTiles, or vector tiles.',
      zh: '将成果导出为浏览器可直接加载的 XYZ 瓦片、COG、PMTiles 或矢量瓦片。'
    },
    {
      en: 'Load public web layers in MapLibre; keep Earth Engine authentication and quota-sensitive processing outside the browser.',
      zh: '在 MapLibre 中加载公开 Web 图层，把 Earth Engine 认证和配额敏感处理留在浏览器之外。'
    },
    {
      en: 'Attach each visible layer to source metadata, resolution, temporal coverage, and known uncertainty.',
      zh: '为每个可见图层附加数据来源、分辨率、时间覆盖范围与不确定性说明。'
    }
  ]
};
