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

$btnAll.addEventListener("click", () => {
  $travelList.forEach((list) => {
    list.classList.remove("hide");
  });
});

$btnKorea.addEventListener("click", () => {
  $travelList.forEach((list) => {
    const category = list.dataset.category;
    if (category === "korea") {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
});

$btnGlobal.addEventListener("click", () => {
  $travelList.forEach((list) => {
    const category = list.dataset.category;
    if (category === "global") {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
});

$category.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    $category.forEach((a) => {
      a.classList.remove("on");
    });
    $category[i].classList.add("on");
  });
});

// 더보기 버튼
let num = 6;
$travelList.forEach((item, i) => {
  if (i < num) {
    item.classList.add("on");
  }
});
$btnMore.addEventListener("click", () => {
  num += 3;
  $travelList.forEach((item, i) => {
    if (i < num) {
      item.classList.add("on");
    }
  });
});
