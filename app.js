require("dotenv").config()
const express = require("express")
const request = require("request")
const bodyParser = require("body-parser")
const https = require("https")


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))



app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstname = req.body.Fname
    const sname = req.body.Sname;
    const email = req.body.Email;
    const data = {

        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstname,
                LNAME: sname

            }
        }
        ]
    }
    const jasonData = JSON.stringify(data)
    console.log(jasonData)


    const url = "https://us22.api.mailchimp.com/3.0/lists/2ed4f5ed5d"
    const options = {
        method: "POST",
        headers: {
            Authorization: process.env.API_KEY

        }


    }

    const mailrequest = https.request(url, options, function (response) {

        if (response.statusCode === 200) {

            res.sendFile(__dirname + "/success.html");

        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data))


        })


    })
    mailrequest.write(jasonData)
    mailrequest.end()

})

app.post("/failure", function (req, res) {
    res.redirect("/")

})




app.listen(process.env.PORT || 3000, function (req, res) {
    console.log("SERVER STARTED")
});



// API for MAilchimp 94e694eddae7173236bb0d9494b68a6e - us22

// Audience id  2ed4f5ed5d.

//url  https://usX.api.mailchimp.com/3.0/campaigns?count=10&offset=10 