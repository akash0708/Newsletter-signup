const express = require("express")
const bodyParser = require("body-parser")
const https = require("https")
const fetch = require("node-fetch")

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html")
})

// app.post("/", function(req, res){
    
//     const firstName = req.body.fName
//     const lastName = req.body.lName
//     const email = req.body.email

//     const data = {
        
//                 email_address: email,
//                 status: "subscribed",
//                 merge_fields:{
//                     FNAME: firstName,
//                     LNAME: lastName
//                 }
//     };

//     const jsonData = JSON.stringify(data);
//     // console.log(jsonData);

//     const url = "https://us21.api.mailchimp.com/3.0/lists/e45b9afccc/members"
//     const options = {
//         method: "POST",
//         auth: "akash1:25f9c4c770a192868c0503dba51996ab-us21"
//     }

//     const request = https.request(url, options, function(response){
//         response.on("data",function(data){
//             console.log(JSON.parse(data));
//         })
//     })

//     request.write(jsonData);
//     request.end;
// })


app.post("/", function(req, res){
    
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email

    const apiKey = process.env.API_KEY;
    const listId = process.env.LIST_ID;
const url = `https://us10.api.mailchimp.com/3.0/lists/${listId}/members`;

const data = {
  email_address: email,
  status: 'subscribed',
  merge_fields: {
    FNAME: firstName,
    LNAME: lastName
  }
};

fetch(url, {
  method: 'POST',
  headers: {
    'Authorization': `apikey ${apiKey}`,
    'Content-Type': 'application/json'
  },
  // body: JSON.stringify(data)
})
.then(response => {
  if (response.status === 200) {
    res.sendFile(__dirname+"/success.html");
  } else {
    res.sendFile(__dirname+"/failure.html");
  }
  return response.json();
})
  .then(data => console.log(data))
  .catch(error => console.error(error));

})

app.post("/failure", function(req, res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(req, res){
    console.log("server is running on port 3000")
})

// api key
// 16e0910610bf6f37d9b365347d60d0aa-us10

// audience id
// 98c3601391


// 25f9c4c770a192868c0503dba51996ab-us21
// e45b9afccc