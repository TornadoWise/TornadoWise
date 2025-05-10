var weatheralerts = L.tileLayer.wms("https://geo.weather.gc.ca/geomet?lang=en&service=WMS&version=1.3.0", {
    layers: "ALERTS",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
}).addTo(map);

function getFeatureInfoUrl(map, layer, latlng) {
    const point = map.latLngToContainerPoint(latlng, map.getZoom());
    const size = map.getSize();
    const bounds = map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
  
    const params = {
        request: 'GetFeatureInfo',
        service: 'WMS',
        version: '1.3.0',
        layers: layer.wmsParams.layers,
        query_layers: layer.wmsParams.layers,
        styles: '',
        bbox: `${sw.lng},${sw.lat},${ne.lng},${ne.lat}`,
        width: size.x,
        height: size.y,
        format: 'image/png',
        info_format: 'text/plain',
        transparent: true,
        feature_count: 10,
        CRS: 'EPSG:4326',
        i: Math.floor(point.x),
        j: Math.floor(point.y)
    };
    return layer._url + L.Util.getParamString(params, layer._url, true);
  }
  console.log(layer.wmsParams.layers)

  map.on("click", function (e) {
    const url = getFeatureInfoUrl(map, weatheralerts, e.latlng);
    console.log("GetFeatureInfo URL:", url);
    fetch(url)
    .then(res => res.text())
    .then(text => {
        L.popup()
            .setLatLng(e.latlng)
            .setContent(`<pre>${text}</pre>`)
            .openOn(map);
    })
    .catch(err => {
        console.error("FeatureInfo error:", err);
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