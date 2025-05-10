var weatheralerts = L.tileLayer.wms("https://geo.weather.gc.ca/geomet?lang=en&service=WMS&version=1.3.0", {
    layers: "ALERTS",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
}).addTo(map);

function getFeatureInfoUrl(map, layer, latlng) {
    const point = map.latLngToContainerPoint(latlng, map.getZoom());
    const size = map.getSize();
  
    const params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        srs: 'EPSG:3857',
        styles: '',
        transparent: true,
        version: '1.3.0',
        format: 'image/png',
        bbox: map.getBounds().toBBoxString(),
        height: size.y,
        width: size.x,
        layers: layer.wmsParams.layers,
        query_layers: layer.wmsParams.layers,
        info_format: 'text/plain',
        i: point.x,
        j: point.y,
        feature_count: 10
    };
  
    return layer._url + L.Util.getParamString(params, layer._url, true);
  }

  map.on("click", function (e) {
    const url = getFeatureInfoUrl(map, weatheralerts, e.latlng);
    console.log("GetFeatureInfo URL:", url);
    fetch(url)
    .then(res => res.text())
    .then(text => {
        L.popup().setLatLng(e.latlng).setContent(`<pre>${text}</pre>`).openOn(map);
    })
      .then(data => {
        const features = data.features;
        if (!features || features.length === 0) {
          L.popup().setLatLng(e.latlng).setContent("No alerts at this location.").openOn(map);
          return;
        }
  
        const f = features[0].properties;
        const content = `
          <b>${f.area}</b><br>
          <strong>${f.headline}</strong><br>
          <p>${f.descrip_en}</p>
        `;

        L.popup().setLatLng(e.latlng).setContent(content).openOn(map);
    })
    .catch(err => {
        console.error("Error fetching FeatureInfo", err);
    });
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
    //"Weather Alerts": weatheralerts,
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