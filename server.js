require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get("/", (req, res) => {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
    '?response_type=code' +
    '&client_id=' + process.env.CLIENT_ID +
    (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
    '&redirect_uri=' + encodeURIComponent("http://localhost:3000/home"));
});

app.post("https://accounts.spotify.com/api/token", (req, res) => {
        console.log("here");
        console.log(req.query.code);

        res.setHeader({
            Authorization: "Basic " + (new Buffer(process.env.CLIENT_ID + ":" + process.env.SECRET).toString("base64"))
        });

        res.json({
            grant_type: "authorization_code",
            code: code,
            redirect_uri: "http://localhost:3000/work"
        });
});

app.get("/home", (req, res) => {
    res.send("<h1>:(</h1>");
});

app.get("/work", (req, res) => {
    res.send("<h1>Worked</h1>")
});