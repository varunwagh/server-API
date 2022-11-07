const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function (req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    //console.log(firstName, lastName, email);

    var data = {
        members: [
            {
                email_address: email,
                status: "Subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    var jsondata = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/96cd31baa2';

    const options = {
        method: "POST",
        auth: "varun1:fe6d53f17e9dbd706fd059e766c7a0f0-us21",

    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsondata);
    request.end();

});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});

// API KEY  - fe6d53f17e9dbd706fd059e766c7a0f0-us21
// List ID - 96cd31baa2