const APIKEY = 'e4586beaf87275dedf9cfb1c2d12c743';
const https = require('https');
const cityID = process.argv.slice(2);


/*  "id": 1172451,
  "name": "Lahore",
  "country": "PK",
  "coord": {
    "lon": 74.343613,
    "lat": 31.549721 */


function getWeatherForecast(cityID)
{
  try {
    var url = `https://api.openweathermap.org/data/2.5/forecast?id=${cityID}&APPID=${APIKEY}`
    https.get(url, function(response)
     {

       var data = "";
       response.on('data', (chunk) =>
       {
         data+=chunk;
      });

      response.on('end', ()=>
      {
        var parse = JSON.parse(data);

        console.log(`Weather report for ${parse.city.name}(${parse.city.country}) is given as:`)
        console.log(getAllDetails(parse.list));
      });

    });

    request.on('error', ()=>
    {
      console.error(`Error! Something went wrong.`);
    });
  } catch (error) {
    console.error(error.message);
  }
}






function printWeatherDetails(data)
{
  var array=[];
  var array2=[];
  for(let i=0 ;i < data.length ; i++)
  {
    array.push(data[i].description);
    array2.push(data[i].main);
  }
  return array.concat(array2);
}

function getAllDetails(data)
{
  for(let i=0; i<data.length; i++)
  {
    console.log(data[i].dt_txt, 'Temperature:',data[i].main.temp,`(Min: ${data[i].main.temp_min}, Max: ${data[i].main.temp_max})`, printWeatherDetails(data[i].weather));
  }
}


getWeatherForecast(cityID);
