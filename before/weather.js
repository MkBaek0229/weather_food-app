//1. 날씨정보보여주는 weather card


// 날씨 아이콘 
const $weather_icon = document.querySelector("#weathericon");

// 현재 온도 
const $weather_temp = document.querySelector("#temp")


// 날씨정보를 불러오는 함수 
function callWeather(){
  //실행할 내용
    fetch("https://api.openweathermap.org/data/2.5/weather?id=1835224&appid=7f0663a9ce5504e9a922f50b0d9bacc3")
    .then((response) => response.json())
    .then((data) => {        $weather_icon.src = "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";
        // 켈빈온도 -> 섭씨온도 °C = K - 273.15
        $weather_temp.textContent = Math.round(data.main.temp - 273.15) + "°C";

    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

  // 3초에 한번 날씨 불러오는거 갱신
  setInterval(callWeather, 1000);



// 2. 카드 뒤집는 버튼 기능
const $recomandbtn = document.querySelector(".recomandbtn");


const $board = document.querySelector(".board");

function showFood() {
  console.log("button click")


  $board.classList.toggle("flip")
}

  






