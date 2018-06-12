const APIKEY = 'e4586beaf87275dedf9cfb1c2d12c743';
const https = require('https');
const yargs = require('yargs');
const _ = require('lodash');

const argv = yargs
  .option('city', {
    alias: 'c',
    describe: 'The ID or the name of the city',
    demand: true
  })
  .help()
  .argv;

const city = argv.city;

function getWeatherForecast(city) {
  try {
    if (_.isString(city)) {
      var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APIKEY}`;
    } else {
      var url = `https://api.openweathermap.org/data/2.5/forecast?id=${city}&APPID=${APIKEY}`;
    }
    https.get(url, function (response) {

      var data = "";
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        var parse = JSON.parse(data);

        console.log(`Weather report for ${parse.city.name}(${parse.city.country}) is given as:`)
        console.log(getAllDetails(parse.list));
      });

    });

    request.on('error', () => {
      console.error(`Error! Something went wrong.`);
    });
  } catch (error) {

  }
}

function printWeatherDetails(data) {
  var array = [];
  var array2 = [];
  for (let i = 0; i < data.length; i++) {
    array.push(data[i].description);
    array2.push(data[i].main);
  }
  return array.concat(array2);
}

function getAllDetails(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].dt_txt, 'Temperature:', data[i].main.temp, `(Min: ${data[i].main.temp_min}, Max: ${data[i].main.temp_max})`, printWeatherDetails(data[i].weather));
  }
}


getWeatherForecast(city);
