const pages = document.querySelectorAll(".page");

const music = document.getElementById("bgMusic");

let currentPage = 0;

let changing = false;


/* ================= MUSIC ================= */

music.loop = true;

function startWebsite() {

  music.volume = 0.8;

  music.currentTime = 0;

  music.play()
    .then(() => {
      console.log("Music started successfully");
    })
    .catch((error) => {
      console.log("Music error:", error);
    });

  nextPage();
}


/* Extra protection for looping */

music.addEventListener("ended", () => {

  music.currentTime = 0;

  music.play().catch(() => {});

});


/* ================= PAGE NAVIGATION ================= */

function showPage(index) {

  if (index < 0 || index >= pages.length) {
    return;
  }

  if (changing || index === currentPage) {
    return;
  }

  changing = true;

  const oldPage = pages[currentPage];

  const newPage = pages[index];

  oldPage.classList.remove("active");

  oldPage.classList.add("prev");

  newPage.classList.remove("prev");

  newPage.classList.add("active");

  currentPage = index;

  setTimeout(() => {

    oldPage.classList.remove("prev");

    changing = false;

  }, 700);

}


/* NEXT */

function nextPage() {

  if (currentPage < pages.length - 1) {

    showPage(currentPage + 1);

  }

}


/* PREVIOUS */

function previousPage() {

  if (currentPage > 0) {

    showPage(currentPage - 1);

  }

}


/* ================= KEYBOARD ================= */

document.addEventListener("keydown", (event) => {

  if (event.key === "ArrowRight") {

    nextPage();

  }

  if (event.key === "ArrowLeft") {

    previousPage();

  }

});


/* ================= SWIPE ================= */

let startX = 0;
let startY = 0;


document.addEventListener("touchstart", (event) => {

  startX = event.changedTouches[0].screenX;

  startY = event.changedTouches[0].screenY;

});


document.addEventListener("touchend", (event) => {

  const endX = event.changedTouches[0].screenX;

  const endY = event.changedTouches[0].screenY;

  const diffX = endX - startX;

  const diffY = endY - startY;


  /* Don't interfere with vertical scrolling */

  if (Math.abs(diffY) > Math.abs(diffX)) {

    return;

  }


  if (diffX < -70) {

    nextPage();

  }


  if (diffX > 70) {

    previousPage();

  }

});


/* ================= BLUE SNOW ================= */

const snow = document.getElementById("snow");

for (let i = 0; i < 50; i++) {

  const flake = document.createElement("div");

  flake.className = "snowflake";

  const size = Math.random() * 4 + 2;

  flake.style.width = size + "px";

  flake.style.height = size + "px";

  flake.style.left =
    Math.random() * 100 + "%";

  flake.style.animationDuration =
    Math.random() * 8 + 7 + "s";

  flake.style.animationDelay =
    Math.random() * -15 + "s";

  snow.appendChild(flake);

}
