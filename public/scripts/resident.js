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
      request: "GetFeatureInfo",
      service: "WMS",
      srs: "EPSG:4326",
      styles: "",
      transparent: true,
      version: "1.3.0",
      format: "image/png",
      bbox: map.getBounds().toBBoxString(),
      height: size.y,
      width: size.x,
      layers: layer.wmsParams.layers,
      query_layers: layer.wmsParams.layers,
      info_format: "application/json",
      feature_count: 10
    };

    params.crs = "EPSG:4326";
    params.i = point.x;
    params.j = point.y;
  
    return layer._url + L.Util.getParamString(params, layer._url, true);
  }

  map.on("click", function (e) {
    const url = getFeatureInfoUrl(map, weatheralerts, e.latlng);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const features = data.features;
        if (!features || features.length === 0) {
          L.popup().setLatLng(e.latlng).setContent("No alerts at this location.").openOn(map);
          return;
        }
  
        let activeAlert = 0;
        const totalAlerts = features.length;
  
        function buildPopupContent(i) {
          const f = features[i].properties;
          const effective = new Date(f.effective).toLocaleString();
          const expires = new Date(f.expires).toLocaleString();
          return `
            <div id="alert-content">
              <b>${f.area || 'Area'}:</b> ${f.area}<br>
              <b>Headline:</b> ${f.headline}<br>
              <b>Type:</b> ${f.alert_type}<br>
              <b>Effective:</b> ${effective}<br>
              <b>Expires:</b> ${expires}<br><br>
              <div><b>Description:</b><br>${f.descrip_en}</div><br>
              <div style="text-align:center">
                <button id="prev-btn" ${i === 0 ? "disabled" : ""}>⬅</button>
                <span>Alert ${i + 1} of ${totalAlerts}</span>
                <button id="next-btn" ${i === totalAlerts - 1 ? "disabled" : ""}>➡</button>
              </div>
            </div>
          `;
        }
  
        const popup = L.popup().setLatLng(e.latlng).setContent(buildPopupContent(activeAlert)).openOn(map);
  
        function attachNavHandlers() {
          document.getElementById("prev-btn")?.addEventListener("click", () => {
            if (activeAlert > 0) {
              activeAlert--;
              popup.setContent(buildPopupContent(activeAlert));
              attachNavHandlers();
            }
          });
  
          document.getElementById("next-btn")?.addEventListener("click", () => {
            if (activeAlert < totalAlerts - 1) {
              activeAlert++;
              popup.setContent(buildPopupContent(activeAlert));
              attachNavHandlers();
            }
          });
        }
  
        attachNavHandlers();
      })
      .catch(err => {
        console.error("GetFeatureInfo error", err);
        L.popup().setLatLng(e.latlng).setContent("Error loading alert data.").openOn(map);
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