const weatheralerts = L.tileLayer.wms("https://geo.weather.gc.ca/geomet?lang=en&service=WMS&version=1.3.0", {
    layers: "ALERTS",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada",
    opacity: 0.8
});

var hotdays = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "INDICES.TX30.HISTO_PCTL50",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada"
});

const totalprecip = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CANGRD.TREND.PR_SUMMER",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada"
});

const meantemp = L.tileLayer.wms("https://geo.weather.gc.ca/geomet-climate?service=WMS&version=1.3.0", {
    layers: "CANGRD.TREND.TM_SUMMER",
    format: "image/png",
    transparent: true,
    attribution: "© Environment and Climate Change Canada"
});

function createLegendControl(layerName, titleText) {
    return L.control({ position: "bottomleft" }).onAdd = function (map) {
      const div = L.DomUtil.create("div", "info legend");
      div.innerHTML = `
        <h4>${titleText}</h4>
        <img src="https://geo.weather.gc.ca/geomet?service=WMS&version=1.3.0&request=GetLegendGraphic&format=image/png&layer=${layerName}" alt="${titleText} Legend">
      `;
      return div;
    };
  }
  
  const legends = {
    "Weather Alerts": L.control({ position: "bottomleft" }),
    "Days above 30&degC": L.control({ position: "bottomleft" }),
    "Total Precipitation in the Summer": L.control({ position: "bottomleft" }),
    "Mean Temperature in the Summer": L.control({ position: "bottomleft" })
  };
  
  legends["Weather Alerts"].onAdd = createLegendControl("ALERTS", "Weather Alerts");
  legends["Days above 30&degC"].onAdd = createLegendControl("hotdays", "Days above 30&degC");
  legends["Total Precipitation in the Summer"].onAdd = createLegendControl("totalprecip", "Total Precipitation in the Summer");
  legends["Mean Temperature in the Summer"].onAdd = createLegendControl("meantemp", "Mean Temperature in the Summer");

const overlaymaps = {
    "Weather Alerts": weatheralerts,
    "Days above 30&degC": hotdays,
    "Total Precipitation in the Summer": totalprecip,
    "Mean Temperature in the Summer": meantemp
};

L.control.layers(null, overlaymaps).addTo(map);

map.on("overlayadd", function (e) {
    const legend = legends[e.name];
    if (legend) legend.addTo(map);
  });
  
  map.on("overlayremove", function (e) {
    const legend = legends[e.name];
    if (legend) map.removeControl(legend);
  });

var legend = L.control({
    position: "bottomleft"
});

// legend.onAdd = function (map) {
//     var div = L.DomUtil.create("div", "legend");
//     div.innerHTML += "<h4>Weather Alerts</h4>";
//     div.innerHTML += '<i style="background: #BB0000"></i><span>Warning</span><br>';
//     div.innerHTML += '<i style="background: #FFFF00"></i><span>Watch</span><br>';
//     div.innerHTML += '<i style="background: #707070"></i><span>Statement</span><br>';
//     return div;
// };

// legend.addTo(map);

map.on('overlayadd', function (e) {
    if (e.name === "Weather Alerts") {
        map.once('click', function (ev) {
          L.popup()
            .setLatLng(ev.latlng)
            .setContent(`
          <strong>Weather Alerts Info</strong><br>
          <a href="https://weather.gc.ca/?layers=alert&zoom=3&center=60.34823086,-87.47019873" target="_blank">Click here to view active alerts</a>
        `)
        .openOn(map);
    });
  }
}); 