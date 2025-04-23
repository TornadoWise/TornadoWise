let latitude, longitude;
var map = L.map("map").setView([51.505, -0.09], 13);
var layer = L.marker([0, 0]).addTo(map);
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

L.tileLayer(`https://tile.openstreetmap.org/{z}/{x}/{y}.png`, {
    maxZoom: 12,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

function setMap(locationData) {
    var markerOptions = {
        title: "You are here",
    };

    console.log(locationData);

    let searchFields = document.getElementById("searchFields");
    let cityDropDown = document.createElement("select");

    for (let i = 0; i < locationData.items.length; i++) {
        let cityOption = document.createElement("option");

        cityOption.setAttribute("name", "citySelect");
        cityOption.setAttribute("id", "citySelect");
        cityOption.setAttribute("value", locationData.items[i].name);
        cityDropDown.setAttribute("name", "cityDropDown");
        cityDropDown.setAttribute("id", "cityDropDown");

        cityOption.setAttribute("value", locationData.items[i].name + ", " + provinceCodes[locationData.items[i].province.code]);

        console.log(locationData.items[i].province.code);

        cityOption.textContent = locationData.items[i].name + ", " + provinceCodes[locationData.items[i].province.code];
        cityDropDown.appendChild(cityOption);
    }
    searchFields.appendChild(cityDropDown);

    console.log(locationData);

    document.getElementById("cityDropDown").addEventListener("change", function () {
        console.log("test");
        let selectedCity = document.getElementById("citySelect").textContent;
        for (let i = 0; i < locationData.items.length; i++) {
            console.log(selectedCity);
            if (locationData.items[i].name == selectedCity) {
                console.log("Found!");
            } else {
                console.log("Not found");
            }
        }

        // map.setView([locationData.latitude, locationData.longitude]);
        // L.marker([locationData.latitude, locationData.longitude, markerOptions]).addTo(map);
    });
}

function success(position) {
    let location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
    };

    console.log("Your current location:");
    console.log(position);

    setMap(location);
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
