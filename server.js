const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");
app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}:${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

//app.use((req,res,next)=>{
 //res.render('maintaince.hbs');
//});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();

});
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "HomePage",
    welcomeMessage: "welcome to my website",
  });
});
app.get("/", (req, res) => {
  //  res.send('<h1>Hello Express!</h1>');
  res.send({
    name: "Remah",
    likes: ["Biking", "Cites"]
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About page",
  });
});

// / bad-send back json with error message


app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Unable to handle request"
  });
});
app.listen(port, () => {
  console.log(`  server is up on ${port}   `);
});
