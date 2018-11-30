const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

var app = express();
hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", error => {
    if (error) console.log("cannot write to file");
  });
  next();
});
// app.use((req, res, next) => {
//   res.render("maintance.hbs");
// });

app.use(express.static(__dirname + "/public"));
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});
app.get("/", (req, res) => {
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcome: "Welcom to out site"
  });
});
app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});
app.get("/bad", (req, res) => {
  res.send({
    error: "Unable to fulfill the request"
  });
});
app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
