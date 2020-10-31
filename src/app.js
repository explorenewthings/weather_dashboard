const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = express();
const port = process.env.PORT || 3000;

//adding public directry
const pubicDic = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

//access APi
const geoCode = require("../utils/geocode.js");
const forecast = require("../utils/forecast.js");

//setting views path in express
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setting static directry
app.use(express.static(pubicDic));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
  });
});

app.get("/weather", (req, res) => {
  if (req.query.address) {
    geoCode(req.query.address, (err, { latitude = 0, longitute = 0 } = {}) => {
      if (!err) {
        forecast(latitude, longitute, (err, result) => {
          if (!err) {
            res.send({
              Latitude: latitude,
              Longitude: longitute,
              forecast: result,
            });
          } else {
            res.send({
              err,
            });
          }
        });
      } else {
        res.send({
          error: err,
        });
      }
    });
  } else {
    return res.send({
      place: [req.query.address],
    });
  }
});

app.get("/about/*", (req, res) => {
  res.render("404", { errorMessage: "Eror Not Found" });
});
app.get("*", (req, res) => {
  res.render("404", { errorMessage: "Eror Not Found" });
});

app.listen(port, () => {
  console.log("Server is up on 3000");
});
