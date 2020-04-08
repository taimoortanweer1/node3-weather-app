const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const app = express();
const port = process.env.PORT || 3000;

//define path
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handle bar engine and view location
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialPath);

//setup static directory to serve
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Taimoor",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Taimoor",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Taimoor",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "No Address Provided",
    });
  } else {
    geocode(req.query.address, (error, { lattitude, longitude, location } = {} ) => {
      if (error) {
        return res.send({
          error: "No Address Provided",
        });
      }

      forecast(lattitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error: "No Address Provided",
          });
          }
    
        res.send([
          {
            forecast: forecastData.temp,            
            location,
            address: req.query.address,                        
          },          
        ]);
      });
    });
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Taimoor",
    errorMessage: "Help Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Taimoor",
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log("server is up and running on " + port);
});
