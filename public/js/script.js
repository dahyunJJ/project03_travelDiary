// 검색기능

const $search = document.querySelector("#search");
const $list = document.querySelectorAll(".travel_list");

$search.addEventListener("keyup", () => {
  const searchWord = $search.value;
  console.log(searchWord);

  $list.forEach((list) => {
    const country = list
      .querySelector(".travel_info span:first-child")
      .textContent.toLowerCase();

    if (!searchWord || searchWord === "") {
      list.classList.remove("hide");
      return;
    }

    if (searchWord.charAt(0) === country.charAt(0)) {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
});

// 카테고리 분류 기능
const $category = document.querySelectorAll(".category > button");
const $btnAll = document.querySelector(".btn_all");
const $btnKorea = document.querySelector(".btn_korea");
const $btnGlobal = document.querySelector(".btn_global");
const $travelList = document.querySelectorAll(".travel > li");
const $btnMore = document.querySelector(".btnmore");

// 카테고리 버튼 이벤트
//url에서 카테고리 가져오기
const url = new URL(window.location.href).pathname;
$btnAll.classList.remove("on");
if (url === "/korea") {
  $btnKorea.classList.add("on");
} else if (url === "/global") {
  $btnGlobal.classList.add("on");
} else {
  $btnAll.classList.add("on");
}

// 카테고리 분류
const initNum = 6;
let numShown = initNum;

$travelList.forEach((item, i) => {
  item.classList.toggle("hide", i >= numShown);
});
numShown = initNum;
$btnMore.addEventListener("click", showMore);

$btnAll.addEventListener("click", () => {
  $travelList.forEach((item, i) => {
    numShown = initNum;
    item.classList.toggle("hide", i >= numShown);
  });
  $btnMore.addEventListener("click", showMore);
});

$btnKorea.addEventListener("click", () => {
  numShown = initNum;
  $travelList.forEach((item) => {
    item.classList.toggle("hide", item.dataset.category !== "korea");
  });
  $btnMore.addEventListener("click", showMore);
});

$btnGlobal.addEventListener("click", () => {
  $travelList.forEach((item, i) => {
    item.classList.toggle(
      "hide",
      i >= initNum || item.dataset.category !== "global"
    );
  });
  numShown = initNum;
  $btnMore.addEventListener("click", showMore);
});

// 더보기 버튼
function showMore() {
  numShown += 3;
  $travelList.forEach((item, i) => {
    if (i < numShown) {
      item.classList.remove("hide");
    }
  });
}

$btnMore.addEventListener("click", showMore);
