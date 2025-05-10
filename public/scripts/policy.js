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

var wthstation = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS", {
    layers: "AHCCD.STATIONS",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

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

function createLegendControl({ title, wmsUrl = null, layer = null, directUrl = null, style = null }) {
    return function () {
      const div = L.DomUtil.create("div", "info legend");
      let imgSrc = "";
  
      if (directUrl) {
        imgSrc = directUrl; 
      } else if (wmsUrl && layer) {
        imgSrc = `${wmsUrl}?service=WMS&version=1.3.0&request=GetLegendGraphic&sld_version=1.1.0&layer=${layer}&format=image/png&STYLE=${style}`;
      }
  
      div.innerHTML = `
        <h4>${title}</h4>
        <img src="${imgSrc}" alt="${title} Legend" style="max-width:200px;">
      `;
      return div;
    };
  }

  const legends = {
    "Weather Stations": L.control({ position: "left" }),
    "Land Cover": L.control({ position: "left" }),
    "Average Home Value": L.control({ position: "left" }),
    "Probability of Above Normal Temperature": L.control({ position: "left" }),
    "Precipation at or Above 10mm": L.control({ position: "left" }),
    "Days with Temperatures Above 30&degC": L.control({ position: "left" }),
    "Nights Above 20&degC": L.control({ position: "left" }),
    "Historical Mean Precipitation": L.control({ position: "left" }),
    "Historical Changes in Temperature": L.control({ position: "left" }),
    "Historical Changes in Wind": L.control({ position: "left" })
  };
  
  legends["Weather Stations"].onAdd = createLegendControl({
    title: "Weather Stations",
    wmsUrl: "https://geo.weather.gc.ca/geomet-climate",
    layer: "AHCCD.STATIONS",
    style: "default"
  });
  
  legends["Landcover"].onAdd = createLegendControl({
    title: "Land Cover",
    directUrl: "https://datacube.services.geo.ca/assets/legend/legend_landcover_color.png"
  });
  
  legends["Average Home Value"].onAdd = createLegendControl({
    title: "Average Home Value",
    directUrl: "https://maps-cartes.services.geo.ca/server2_serveur2/services/StatCan/cd_socioeconomic_variables_2016_en/MapServer/WmsServer?request=GetLegendGraphic&version=1.3.0&format=image/png&layer=9"
  });

  legends["Probability of Above Normal Temperature"].onAdd = createLegendControl({
    title: "Probability of Above Normal Temperature",
    wmsUrl: "https://geo.weather.gc.ca/geomet",
    layer: "CanSIPS_100km_AirTemp-ProbAboveNormal-2m_P00M-P02M",
    style: "AirTemp-ProbAboveNormal_Dis"
  });

  legends["Precipation at or Above 10mm"].onAdd = createLegendControl({
    title: "Precipation at or Above 10mm",
    wmsUrl: "https://geo.weather.gc.ca/geomet",
    layer: "REPS.DIAG.6_PRMM.ERGE10",
    style: "REPS_PROB-LINEAR"
  });

  legends["Days with Temperatures Above 30&degC"].onAdd = createLegendControl({
    title: "Days with Temperatures Above 30&degC",
    wmsUrl: "https://geo.weather.gc.ca/geomet-climate",
    layer: "INDICES.TX30.HISTO_PCTL50",
    style: "TX30_TN20"
  });
            
  legends["Nights Above 20&degC"].onAdd = createLegendControl({
    title: "Nights Above 20&degC",
    wmsUrl: "https://geo.weather.gc.ca/geomet-climate",
    layer: "INDICES.TN20.RCP26_PCTL50",
    style: "TX30_TN20"
  });
                
  legends["Historical Mean Precipitation"].onAdd = createLegendControl({
    title: "Historical Mean Precipitation",
    wmsUrl: "https://geo.weather.gc.ca/geomet-climate",
    layer: "CMIP5.PR.HISTO.SUMMER.ABS_PCTL50",
    style: "PRECIPITATION-CMIP5"
  });
       
  legends["Historical Changes in Temperature"].onAdd = createLegendControl({
    title: "Historical Changes in Temperature",
    wmsUrl: "https://geo.weather.gc.ca/geomet-climate",
    layer: "CMIP5.TT.HISTO.SUMMER.ANO_PCTL50",
    style: "TEMP-ANOMALIES"
  });

  legends["Historical Changes in Wind"].onAdd = createLegendControl({
    title: "Historical Changes in Wind",
    wmsUrl: "https://geo.weather.gc.ca/geomet-climate",
    layer: "CMIP5.SFCWIND.HISTO.SUMMER.ANO_PCTL50",
    style: "SFCWINDSPEED-ANOMALY"
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

map.on("overlayadd", function (e) {
    if (legends[e.name]) legends[e.name].addTo(map);
  });
  
  map.on("overlayremove", function (e) {
    if (legends[e.name]) map.removeControl(legends[e.name]);
  });




