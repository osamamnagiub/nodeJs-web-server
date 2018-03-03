const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();
app.set("view engine", "hbs");

hbs.registerPartials(__dirname + "/views/partials");

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
    return text.toUpperCase();
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFile("server.log", log + "\n", err => {
        if (err) {
            console.log("unable to save log");
        }
    });
    console.log(log);
    next();
});

app.use((req, res, next) => {
    res.render("maintenance.hbs");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  //   res.send("<h1>Hello express</h1>");
  res.render("home.hbs", {
    title: "home page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    title: "about page"
  });
});
app.listen(port, () => {
  console.log("server is up on port " + port);
});
