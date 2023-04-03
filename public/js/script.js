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
const $btnAll = document.querySelector(".btn_all");
const $btnKorea = document.querySelector(".btn_korea");
const $btnGlobal = document.querySelector(".btn_global");
const $travel_list = document.querySelectorAll(".travel_list");

$btnAll.addEventListener("click", () => {
  $travel_list.forEach((list) => {
    list.classList.remove("hide");
  });
});

$btnKorea.addEventListener("click", () => {
  $travel_list.forEach((list) => {
    const category = list.dataset.category;
    if (category === "korea") {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
});

$btnGlobal.addEventListener("click", () => {
  $travel_list.forEach((list) => {
    const category = list.dataset.category;
    if (category === "global") {
      list.classList.remove("hide");
    } else {
      list.classList.add("hide");
    }
  });
});
