//1. 날씨정보보여주는 weather card

// 날씨 아이콘
const $weather_icon = document.querySelector("#weathericon");

// 날씨 카드에서 나타낼 현재 온도
const $weather_temp = document.querySelector("#temp");

// 좋아요 버튼
const $like_btn = document.querySelector(".like-container");

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
      let now_temp = Math.round(data.main.temp - 273.15);

      // 날씨 정보를 가져온 후에 음식 정보를 표시
      showfood(now_temp);
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

  callWeather();
}

// 온도 범위에따라 날씨 타이틀 지정해주는 함수
function weather_title_generator(temp) {
  // 현재 온도가 10도 미만일때
  if (temp < 10) {
    return "따뜻한 스튜와 함께하는 겨울의 감성";
  } // 온도가 10도 ~ 15도 사이일때
  else if (temp >= 10 && temp <= 15) {
    return "포근한 차와 함께하는 가을의 맛";
  } // 온도가 15도 ~ 20도 사이일때
  else if (temp >= 15 && temp <= 20) {
    return "상쾌한 샐러드로 화창한 봄을 맞이하세요";
  } // 온도가 20도 ~ 25도 사이일때
  else if (temp >= 20 && temp <= 25) {
    return "시원한 아이스크림과 함께하는 여름의 상쾌함";
  } // 온도가 25도 ~ 30도 사이일때
  else if (temp >= 25 && temp <= 30) {
    return "뜨거운 여름엔 시원한 맥주를 마셔보세요";
  }
}

// 온도정보에따라 맞는 음식정보 보여주기
// function weather_food(){

// }

// 음식 정보를 받아오기.
function showfood(now_temp) {
  fetch("../before/food.json")
    .then((response) => response.json())
    .then((data) => {
      // 각 온도 범위에 해당하는 음식을 선택하는 객체 배열
      const temperatureRange = [
        { min: -Infinity, max: 9, foodIndex: 0 }, // 10도 미만
        { min: 10, max: 15, foodIndex: 2 }, // 10도 ~ 15도
        { min: 16, max: 20, foodIndex: 3 }, // 15도 ~ 20도
        { min: 21, max: 25, foodIndex: 4 }, // 20도 ~ 25도
        { min: 26, max: 30, foodIndex: 5 }, // 25도 ~ 30도
      ];

      // 현재 온도에 해당하는 온도 범위를 찾음
      const selectedRange = temperatureRange.find((range) => {
        return now_temp >= range.min && now_temp <= range.max;
      });

      // 선택된 온도 범위에 해당하는 음식 정보를 가져옴
      const selectedFood = data.food[selectedRange.foodIndex];

      // 음식 정보를 UI에 표시
      $food_image.src = selectedFood.image;
      $food_name.textContent = selectedFood.name;
      $food_description.textContent = selectedFood.description;

      //   // 날씨 타이틀을 얻어내고자 weather_title_generator 함수에 현재 온도 전달
      document.querySelector("#weather_title").innerHTML =
        weather_title_generator(now_temp);
    })

    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

$like_btn.addEventListener("click", (event) => {
  alert(now_temp);
});
