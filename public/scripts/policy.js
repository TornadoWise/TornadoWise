var wthstation = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS", {
    layers: "AHCCD.STATIONS",
    format: "image/png",
    transparent: true,
    attribution: "© National Resources Canada",
}).addTo(map);

var transformers1 = L.tileLayer.wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
    layers: "transformerstation_250k",
    format: "image/png",
    transparent: true,
    attribution: "© National Resources Canada",
}).addTo(map);

var transformers2 = L.tileLayer.wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
    layers: "transformer_station_point_50k",
    format: "image/png",
    transparent: true,
    attribution: "© National Resources Canada",
}).addTo(map);

var powerlines1 = L.tileLayer.wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
    layers: "powerline_50k",
    format: "image/png",
    transparent: true,
    attribution: "© National Resources Canada",
}).addTo(map);

var powerlines2 = L.tileLayer.wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
    layers: "powerline_50k",
    format: "image/png",
    transparent: true,
    attribution: "© National Resources Canada",
}).addTo(map);

var landcover = L.tileLayer.wms("https://datacube.services.geo.ca/ows/landcover", {
    layers: "landcover-2020",
    format: "image/png",
    transparent: true,
    attribution: "© National Resources Canada",
    version: "1.3.0",
    crs: L.CRS.EPSG3857
});

var homevalue = L.tileLayer.wms("https://maps-cartes.services.geo.ca/server2_serveur2/services/StatCan/cd_socioeconomic_variables_2016_en/MapServer/WMSServer?", {
    layers: "9",
    format: "image/png",
    transparent: true,
    attribution: "© Statistics Canada",
});

var abovenrmltemp = L.tileLayer.wms("https://geo.weather.gc.ca/geomet?lang=en&service=WMS", {
    layers: "CanSIPS_100km_AirTemp-ProbAboveNormal-2m_P00M-P02M",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var precipabv10 = L.tileLayer.wms("https://geo.weather.gc.ca/geomet?lang=en&service=WMS", {
    layers: "REPS.DIAG.6_PRMM.ERGE10",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var hotdays = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "INDICES.TX30.HISTO_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var hotnights = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "INDICES.TN20.RCP26_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var historprecip = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CMIP5.PR.HISTO.SUMMER.ABS_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var historictemp = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CMIP5.TT.HISTO.SUMMER.ANO_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var historicwind = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CMIP5.SFCWIND.HISTO.SUMMER.ANO_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var overlaymaps = {
    "Weather Stations": wthstation,
    "Land Cover": landcover,
    "Average Home Value": homevalue,
    "Probability of Above Normal Temperature": abovenrmltemp,
    "Precipation at or Above 10mm": precipabv10,
    "Days with Temperatures Above 30&degC": hotdays,
    "Nights Above 20&degC": hotnights,
    "Historical Mean Precipitation": historprecip,
    "Historical Changes in Temperature": historictemp,
    "Historical Changes in Wind": historicwind
};

L.control.layers(null, overlaymaps).addTo(map);
