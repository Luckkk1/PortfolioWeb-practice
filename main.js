"use strict";

// navbar 상단 픽스
const navbar = document.querySelector("#navBar");
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
  } else {
    navbar.classList.remove("navbar--dark");
  }
});

// 메뉴 버튼 클릭시 위치로 스크롤 이동
const navbarMenu = document.querySelector(".navBar__menuBtns");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollTo(link);
});

//메인홈 컨택버튼 스크롤링
const mainContactBtn = document.querySelector(".mainHome__btn");
mainContactBtn.addEventListener("click", () => {
  scrollTo("#contact");
});

function scrollTo(object) {
  const scrollTo = document.querySelector(object);
  scrollTo.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center",
  });
}

// 메인홈 스크롤 페이딩
const mainHomeInfo = document.querySelector(".mainHome__information");
const mainHomeHeight = mainHome.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  mainHomeInfo.style.opacity = 1 - window.scrollY / mainHomeHeight;
});
