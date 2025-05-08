let express = require("express");
let fs = require("fs");
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let app = express();
const port = 8080;

app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    console.log("Connection received.");
    res.sendFile("./public/index.html");
});

app.post("/searchCity", function (req, res) {
    let xhttp = new XMLHttpRequest();
    let url = "https://geogratis.gc.ca/services/geoname/en/geonames.json?q=";
    let receivedData = {
        userInput: req.body.userInput,
    };

    console.log(receivedData);
    xhttp.open("GET", url + receivedData.userInput, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function () {
        if (!xhttp.status === "200") {
            console.log(xhttp.responseText, "here?");
            // console.log(xhttp.responseText);
        } else {
            res.send(xhttp.responseText);
        }
    };
    xhttp.send();
});

app.get("/getTornadoData", function (req, res) {
    fs.readFile("/data/TornadoEvents_1980-2009.json", { encoding: "utf8" }, function (err, data) {});
});

app.listen(port, function (req, res) {
    console.log(`Listening on port ${port}.`);
});
