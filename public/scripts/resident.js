var weatheralerts = L.tileLayer.wms("https://geo.weather.gc.ca/geomet?lang=en&service=WMS&version=1.3.0", {
    layers: "ALERTS",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

fetch('https://dd.weather.gc.ca/alerts/cap/geojson/ON.geojson') // Replace "ON" with your province
  .then(response => response.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        const props = feature.properties;
        const popupContent = `
          <strong>${props.event}</strong><br>
          <em>${props.headline}</em><br>
          ${props.description}<br>
          <a href="${props.web}" target="_blank">More info</a>
        `;
        layer.bindPopup(popupContent);
      }
    }).addTo(map);
  });

var hotdays = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "INDICES.TX30.HISTO_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var totalprecip = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CANGRD.TREND.PR_SUMMER",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var meantemp = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CANGRD.TREND.TM_SUMMER",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
});

var overlaymaps = {
    "Weather Alerts": weatheralerts,
    "Days above 30&degC": hotdays,
    "Total Precipitation in the Summer": totalprecip,
    "Mean Temperature in the Summer": meantemp,
};

L.control.layers(null, overlaymaps).addTo(map);

var legend = L.control({
    position: "bottomleft",
});

legend.onAdd = function (map) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Weather Alerts</h4>";
    div.innerHTML += '<i style="background: #BB0000"></i><span>Warning</span><br>';
    div.innerHTML += '<i style="background: #FFFF00"></i><span>Watch</span><br>';
    div.innerHTML += '<i style="background: #707070"></i><span>Statement</span><br>';
    return div;
};

legend.addTo(map);