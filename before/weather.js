//1. 날씨정보보여주는 weather card

// 날씨 아이콘
const $weather_icon = document.querySelector("#weathericon");

// 현재 온도
const $weather_temp = document.querySelector("#temp");

// 지역
const $weather_local = document.querySelector("#local");

// 날씨정보를 불러오는 함수
function callWeather() {
  //실행할 내용
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?id=1835224&appid=7f0663a9ce5504e9a922f50b0d9bacc3"
  )
    .then((response) => response.json())
    .then((data) => {
      $weather_icon.src =
        "../before/assets/svg/" + data.weather[0].icon + ".svg";
        
      // 켈빈온도 -> 섭씨온도 °C = K - 273.15
      $weather_temp.textContent = Math.round(data.main.temp - 273.15) + "°C";

      $weather_local.textContent = "대전"
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// 3초에 한번 날씨 불러오는거 갱신
setInterval(callWeather, 3000);

// 2. 음식정보를 보여주는 food card

// 버튼
const $recomandbtn = document.querySelector(".recomandbtn");
// 카드를 담고있는 boord
const $board = document.querySelector(".board");

// 음식 사진
const $food_image = document.querySelector("#food_image");

// 음식 이름
const $food_name = document.querySelector("#food_name");

// 음식 설명
const $food_description = document.querySelector("#food_description");

// 카드 뒤집으면서 추천 음식 보여주기
function cardflip() {
  console.log("button click");

  $board.classList.toggle("flip");

  showfood();
}

// 음식 정보를 받아오기.
function showfood() {
  fetch("../before/food.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      $food_image.src = data.food[0].image;
      $food_name.textContent = data.food[0].name;
      $food_description.textContent = data.food[0].description;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// 음식 주문
function orderFood() {
  alert("음식을 주문하시겠어요?")
}