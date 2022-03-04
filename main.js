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

// 메인홈 스크롤 페이딩
const mainHomeInfo = document.querySelector(".mainHome__information");
const mainHomeHeight = mainHomeInfo.getBoundingClientRect().height;
document.addEventListener("scroll", () => {
  mainHomeInfo.style.opacity = 1 - window.scrollY / mainHomeHeight;
});

// 맨 위로 가기 버튼 보여주기
const mainHome = document.querySelector("#mainHome");
const mainHomeHeight2 = mainHome.getBoundingClientRect().height;
const arrowUp = document.querySelector(".arrowUp");
document.addEventListener("scroll", () => {
  if (window.scrollY > mainHomeHeight / 2) {
    arrowUp.classList.add("on");
  } else {
    arrowUp.classList.remove("on");
  }
});

// 맨 위로 가기 버튼 기능
arrowUp.addEventListener("click", () => {
  scrollTo("#mainHome");
});

// 프로젝트
const buttonContainer = document.querySelector(".work__buttonCategories");
const projects = document.querySelectorAll(".project");
const pjContainer = document.querySelector(".work__projects");
buttonContainer.addEventListener("click", (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter === null) {
    return;
  }
  pjContainer.classList.add("anime-out");
  projects.forEach((project) => {
    if (filter === "*" || filter === project.dataset.type) {
      project.classList.remove("invisible");
    } else {
      project.classList.add("invisible");
    }
  });
  setTimeout(() => {
    pjContainer.classList.remove("anime-out");
  }, 300);
});

function scrollTo(object) {
  const scrollTo = document.querySelector(object);
  scrollTo.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "center",
  });
}
