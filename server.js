let express = require('express');
let app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + 'public/index.html');
});

app.listen(port, function(req, res){
    console.log(`Listening on port ${port}.`);
});