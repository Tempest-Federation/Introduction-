/* =========================================
   TEMPEST FEDERATION
   PAGE + MUSIC + SNOW
========================================= */


/* ================= MUSIC ================= */

const music = document.getElementById("bgMusic");

music.loop = true;


/* Start music after user presses Enter */

function startWebsite() {

  music.volume = 0.65;

  music.play().catch(function(error) {
    console.log("Music could not start:", error);
  });

  nextPage();
}


/* If song ends, restart it */

music.addEventListener("ended", function() {
  music.currentTime = 0;
  music.play();
});


/* ================= PAGE SYSTEM ================= */

const pages = document.querySelectorAll(".page");

let currentPage = 0;

let isChanging = false;


function showPage(index) {

  if (index < 0 || index >= pages.length) {
    return;
  }

  if (isChanging) {
    return;
  }

  if (index === currentPage) {
    return;
  }

  isChanging = true;

  const oldPage = pages[currentPage];
  const newPage = pages[index];

  oldPage.classList.remove("active");
  oldPage.classList.add("prev");

  newPage.classList.remove("prev");
  newPage.classList.add("active");

  currentPage = index;

  setTimeout(function() {

    oldPage.classList.remove("prev");

    isChanging = false;

  }, 750);
}


/* Next page */

function nextPage() {

  if (currentPage < pages.length - 1) {

    showPage(currentPage + 1);

  }

}


/* Previous page */

function previousPage() {

  if (currentPage > 0) {

    showPage(currentPage - 1);

  }

}


/* ================= TOUCH SWIPE ================= */

let touchStartX = 0;
let touchStartY = 0;


document.addEventListener("touchstart", function(event) {

  touchStartX = event.changedTouches[0].screenX;
  touchStartY = event.changedTouches[0].screenY;

});


document.addEventListener("touchend", function(event) {

  const touchEndX = event.changedTouches[0].screenX;
  const touchEndY = event.changedTouches[0].screenY;

  const differenceX = touchEndX - touchStartX;
  const differenceY = touchEndY - touchStartY;


  /* Ignore vertical scrolling */

  if (Math.abs(differenceY) > Math.abs(differenceX)) {
    return;
  }


  /* Swipe left */

  if (differenceX < -70) {

    nextPage();

  }


  /* Swipe right */

  if (differenceX > 70) {

    previousPage();

  }

});


/* ================= KEYBOARD ================= */

document.addEventListener("keydown", function(event) {

  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }

});


/* ================= SNOW ================= */

const snowContainer = document.getElementById("snow");

const snowCount = 45;


for (let i = 0; i < snowCount; i++) {

  const snowflake = document.createElement("div");

  snowflake.className = "snowflake";


  const size =
    Math.random() * 4 + 2;

  const left =
    Math.random() * 100;

  const duration =
    Math.random() * 8 + 7;

  const delay =
    Math.random() * -15;


  snowflake.style.width =
    size + "px";

  snowflake.style.height =
    size + "px";

  snowflake.style.left =
    left + "%";

  snowflake.style.animationDuration =
    duration + "s";

  snowflake.style.animationDelay =
    delay + "s";


  snowContainer.appendChild(snowflake);

}


/* ================= PREVENT PAGE SCROLL ================= */

/*
   Pages themselves can scroll when content
   becomes taller than the phone screen.
*/

document.addEventListener("wheel", function(event) {

  const activePage =
    document.querySelector(".page.active");

  if (!activePage) return;

  if (
    activePage.scrollHeight >
    activePage.clientHeight
  ) {

    /* allow normal scrolling */

    return;

  }

});
