document.addEventListener('DOMContentLoaded',()=>{

  const cityInput = document.getElementById('city-input');
  const getWeatherbBtn = document.getElementById('get-weather-btn');
  const weatherInfo = document.getElementById('weather-info');
  const cityNameDisplay = document.getElementById('city-name');
  const temperatureDisplay = document.getElementById('temperature');
  const descriptionDisplay = document.getElementById('description');
  const errorMessageDisplay = document.getElementById('error-message');


const API_key = "e42047ea5f32041e8e18564c635b2659" //env variable
  getWeatherbBtn.addEventListener('click', async()=>{
     const city= cityInput.value.trim();
     if(!city) return ; 

    // it may throw an error
    // Server/database is always in another continent

    try {
    const weatherData =  await fetchWeatherData(city);
    displayWeatherData(weatherData);
    } catch (error) {
      showError()
    }




    
  })

 async function fetchWeatherData(city){
    // gets the data
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`;

    const response =await fetch(url);
    console.log(typeof response)
    console.log(response)

    if (!response.ok){
      throw new Error ("City Not found")
    }
   const data =  await response.json();
   return data;
  }

  function displayWeatherData(data){
    console.log(data);
    const {name, main, weather}= data;
    cityNameDisplay.textContent = name;temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    descriptionDisplay.textContent = `Weather : ${weather [0].description}`;

    //unlock the display
    weatherInfo.classList.remove('hidden');
    errorMessageDisplay.classList.add('hidden');
    
  }

  function showError(){
    weatherInfo.classList.add('hidden');
    errorMessageDisplay.classList.remove('hidden')
  }
});