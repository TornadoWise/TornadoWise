let latitude, longitude;

var map = L.map("map", {
    center: [60.18, -102.2],
    zoom: 3,
    crs: L.CRS.EPSG3857,
});

var layer = L.marker([60.18, -102.2]).addTo(map);

let provinceCodes = {
    10: "NL",
    11: "PE",
    12: "NS",
    13: "NB",
    24: "QC",
    35: "ON",
    46: "MB",
    47: "SK",
    48: "AB",
    59: "BC",
    60: "YT",
    61: "NT",
    62: "NU",
    72: "Undersea Feature",
    73: "International Waters",
};

//Shared Layers
L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: 13,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

var provinces = L.tileLayer
    .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
        layers: "provinces_names",
        format: "image/png",
        transparent: true,
        attribution: "© Natural Resources Canada",
    })
    .addTo(map);

// var placename1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "places_mid",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var placename2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "places_large",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var contour1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "contour_elevation_250k_02",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var contour2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "contour_approximative_250k_01",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var contour3 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "contour_approximative_50k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var tracks1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "track_segment_large",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var tracks2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "track_segment_250k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var tracks3 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "track_segment_50k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var roads1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "road_segment_large",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var roads2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "roads_250k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var roads3 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "road_segment_50k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterlines1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "watercourse_small",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterlines2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "watercourse_mid",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterlines3 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "watercourse_large",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterlines4 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "watercourse_250k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterbodies1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "waterbody_small",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterbodies2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "waterbody_mid",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterbodies3 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "waterbody_continental_large",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterbodies4 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "waterbody_250k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var waterbodies5 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "waterbody_50k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var buildings1 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "residentialarea_250k_01",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var buildings2 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "residentialarea_250k_02",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

// var buildings3 = L.tileLayer
//     .wms("https://maps.geogratis.gc.ca/wms/canvec_en?service=WMS", {
//         layers: "residentialarea_50k",
//         format: "image/png",
//         transparent: true,
//         attribution: "© Natural Resources Canada",
//     });

fetch("/getTornadoData")
    .then((res) => res.json())
    .then((data) => {
        data.features = data.features.map((f) => ({
            ...f,
            geometry: {
                type: "Point",
                coordinates: [parseFloat(f.properties.start_lon), parseFloat(f.properties.start_lat)],
            },
        }));

        L.geoJSON(data, {
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, {
                    radius: 4,
                    fillColor: "#ffff00",
                    color: "#eaff00",
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 0.9,
                });
            },
            onEachFeature: function (feature, layer) {
                let props = feature.properties;
                let popup =
                    `<b>Tornado</b>` +
                    `<b>Year:</b> ${props.yyyy_local || "N/A"}<br>
                            <b>Nearest Community:</b> ${props.nearcmmty || "N/A"}<br>
                            <b>Fujita Scale:</b> ${props.fujita_ || "N/A"}`;
                layer.bindPopup(popup);
            },
        }).addTo(map);
    });

fetch("https://raw.githubusercontent.com/TornadoWise/TornadoWise/refs/heads/Martha_Sandbox/data/TornadoTracks_1980_2009.geojson")
    .then((res) => res.json())
    .then((data) => {
        data.features = data.features.map((f) => ({
            ...f,
            geometry: {
                type: "LineString",
                coordinates: [
                    [parseFloat(f.properties.start_lon), parseFloat(f.properties.start_lat)],
                    [parseFloat(f.properties.end_lon), parseFloat(f.properties.end_lat)],
                ],
            },
        }));

        L.geoJSON(data, {
            style: function (feature) {
                return {
                    color: "#ffff00",
                    weight: 4,
                    opacity: 1,
                };
            },
            onEachFeature: function (feature, layer) {
                let popup = `<b>Tornado Track</b>` + `<b>Year:</b> ${feature.properties.yyyy_local || "N/A"}`;
                layer.bindPopup(popup);
            },
        }).addTo(map);
    });

// provinces.addTo(map);
// placename1.addTo(map);
// placename2.addTo(map);
// contour1.addTo(map);
// contour2.addTo(map);
// contour3.addTo(map);
// tracks1.addTo(map);
// tracks2.addTo(map);
// tracks3.addTo(map);
// roads1.addTo(map);
// roads2.addTo(map);
// roads3.addTo(map);
// waterlines1.addTo(map);
// waterlines2.addTo(map);
// waterlines3.addTo(map);
// waterlines4.addTo(map);
// waterbodies1.addTo(map);
// waterbodies2.addTo(map);
// waterbodies3.addTo(map);
// waterbodies4.addTo(map);
// waterbodies5.addTo(map);
// buildings1.addTo(map);
// buildings2.addTo(map);
// buildings3.addTo(map);

function setMap(locationData) {
    results.innerHTML = "";
    layer.remove();
    console.log(results);

    if (locationData.items.length > 0) {
        for (let i = 0; i < locationData.items.length; i++) {
            let cityOption = document.createElement("input");
            let cityLabel = document.createElement("label");
            let breakCity = document.createElement("br");
            let horizontalRule = document.createElement("hr");
            cityOption.setAttribute("name", "citySelect");
            cityOption.setAttribute("type", "radio");
            cityOption.setAttribute("id", "citySelect");
            cityOption.setAttribute("value", locationData.items[i].id);

            cityLabel.setAttribute("id", "citySelect");
            cityLabel.textContent = `${locationData.items[i].name}, ${provinceCodes[locationData.items[i].province.code]} `;

            results.appendChild(cityLabel);
            results.appendChild(cityOption);
            results.appendChild(breakCity);
            results.appendChild(horizontalRule);
            results.style.display = "block";
        }
    }

    let refinedData = locationData.items;

    console.log(results);
    document.querySelectorAll('input[name="citySelect"]').forEach(function (radio) {
        radio.addEventListener("change", function () {
            console.log(refinedData);
            console.log(this.value);

            for (let y = 0; y < refinedData.length; y++) {
                console.log(refinedData[y]);
                if (refinedData[y].id === this.value) {
                    latitude = refinedData[y].latitude;
                    longitude = refinedData[y].longitude;
                    map.flyTo(new L.LatLng(latitude, longitude), 8);
                    layer.remove();
                    layer = L.marker([latitude, longitude]).addTo(map);
                    break;
                }
            }
        });
    });
}

function success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    layer.remove();
    layer = L.marker([latitude, longitude]).addTo(map);
    map.flyTo(new L.LatLng(latitude, longitude), 8);
}

function useMyLocation() {
    navigator.geolocation.getCurrentPosition(success);
}

function useSearch() {
    let xhttp = new XMLHttpRequest();
    let userInput = document.getElementById("searchField").value;

    let requestData = {
        userInput: userInput,
    };

    xhttp.open("POST", "/searchCity", true);

    xhttp.onload = function () {
        if (!xhttp.status === "200") {
            console.log(xhttp.responseText);
        } else {
            let jsonData = JSON.parse(xhttp.responseText);
            // let coordinates = jsonData.features[0].geometry.coordinates;

            // let location = {
            //     coordinates: coordinates,
            // };

            console.log(jsonData);
            setMap(jsonData);
        }
    };

    console.log(requestData);

    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(requestData));
}
