"use strict";

// navbar 상단 픽스, 반응형웹에서 토글버튼 위치조정
const navbar = document.querySelector("#navBar");
const navbarHeight = navbar.getBoundingClientRect().height;
const toggleBtn = document.querySelector(".navBar__toggleBtn");

document.addEventListener("scroll", () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    toggleBtn.classList.add("fit");
  } else {
    navbar.classList.remove("navbar--dark");
    toggleBtn.classList.remove("fit");
  }
});

// navbar 메뉴 버튼 클릭시 위치로 스크롤 이동
const navbarMenu = document.querySelector(".navBar__menuBtns");
navbarMenu.addEventListener("click", (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove("on");
  scrollTo(link);
});

// // 스크롤시 해당 섹션 navbar메뉴 토글표시
const sectionIds = [
  "#mainHome",
  "#about",
  "#skills",
  "#work",
  "#testimonials",
  "#contact",
];

const sections = sectionIds.map((section) => document.querySelector(section));
const navItems = sectionIds.map((navItem) =>
  document.querySelector(`[data-link="${navItem}"]`)
);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
  selectedNavItem.classList.remove("mark");
  selectedNavItem = selected;
  selectedNavItem.classList.add("mark");
}

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      // 범위지정
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

// 효과
window.addEventListener("wheel", () => {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + window.innerHeight ===
    document.body.clientHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
});

const observerObtion = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};
const observer = new IntersectionObserver(observerCallback, observerObtion);
sections.forEach((section) => observer.observe(section));

// 반응형 메뉴 토글버튼
toggleBtn.addEventListener("click", () => {
  navbarMenu.classList.toggle("on");
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
  if (filter == null) {
    return;
  }

  // 선택된 메뉴 선택된 동안에 표시
  const active = document.querySelector(".category.active");
  active.classList.remove("active");
  const target =
    e.target.nodeName === "BUTTON" ? e.target : e.target.parentNode;
  target.classList.add("active");

  //  프로젝트 애니메이션
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
  selectNavItem(navItems[sectionIds.indexOf(object)]);
}
