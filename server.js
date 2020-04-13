const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'a675aed38491eb6f14f090ce9af97e86'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

// app.get('/', function (req, res) {
//   res.render('index', {weather: {
//     temp, pres, hum, winsp, cloud, rain
//   }, error:null}););
// })
//req.body.location

app.get('/', function (req, res) {
    let location = req.query.location;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
    request(url, function (err, response, body) {
        if(err){
          res.render('index', {weather: 'null', error: 'Error, please try again'});
        } 
        else {
          let weather = JSON.parse(body)
          console.log(weather);
          if(weather.main == undefined){
            res.render('index', {weather: 'null', error: 'Error, please try again'});
          } 
          else {
            let temp = weather.main.temp;
            let pres = weather.main.pressure;
            let hum = weather.main.humidity;
            let winsp = weather.wind.speed;
            let cloud = weather.clouds.all;
            let rain = weather.rain;
            console.log(temp);
            res.render('index', {weather: {
              temp, pres, hum, winsp, cloud, rain
            }, error:null});
          }
        }
      });
    })


app.listen(4848, function () {
  console.log('App listening on port 4848!')
})