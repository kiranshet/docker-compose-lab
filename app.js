const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req,res) => {
	res.send("<h1>Welcome Kiran!</h1><h2>Docker + Node JS Demo Application</h2>");
});

//Health Check Api
app.get("/health", (req,res) => {
       	res.status(200).json({
		status : "UP",
                application : "docker-nodejs",
                version : "1.0.0"
               });
           });

//About API
app.get("/about", (req,res) => {
        res.json({
		developer: "Kiran",
		technology : "Node JS + Express + Docker"
                });
});


app.listen(PORT, () => {
	console.log(`Application running on port ${PORT}`);
});


