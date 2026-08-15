/* =========================
   PAGE SYSTEM
========================= */

let currentPage = 0;

const pages = document.querySelectorAll(".page");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const pageNumber = document.getElementById("pageNumber");

const music = document.getElementById("bgMusic");


/* =========================
   SHOW PAGE
========================= */

function showPage(index) {

    if (index < 0) {
        index = 0;
    }

    if (index >= pages.length) {
        index = pages.length - 1;
    }

    currentPage = index;


    pages.forEach((page, i) => {

        page.classList.toggle(
            "active",
            i === currentPage
        );

    });


    pageNumber.textContent =
        String(currentPage + 1).padStart(2, "0")
        + " / 03";


    prevBtn.disabled =
        currentPage === 0;

    nextBtn.disabled =
        currentPage === pages.length - 1;
}


/* =========================
   NEXT PAGE
========================= */

function nextPage() {

    if (currentPage < pages.length - 1) {

        showPage(currentPage + 1);

    }
}


/* =========================
   PREVIOUS PAGE
========================= */

function previousPage() {

    if (currentPage > 0) {

        showPage(currentPage - 1);

    }
}


/* =========================
   START EXPERIENCE
========================= */

function startExperience() {

    /*
       Browser allows music because
       this function is triggered by
       the user's button click.
    */

    music.volume = 0.65;

    music.play().catch(() => {
        console.log("Music waiting for browser permission.");
    });


    showPage(1);
}


/* =========================
   SNOW PARTICLES
========================= */

const particleContainer =
    document.getElementById("particles");


function createSnow() {

    const snow =
        document.createElement("div");

    snow.className = "snow";


    const size =
        Math.random() * 4 + 2;

    snow.style.width =
        size + "px";

    snow.style.height =
        size + "px";


    snow.style.left =
        Math.random() * 100 + "%";


    snow.style.animationDuration =
        Math.random() * 8 + 7 + "s";


    snow.style.animationDelay =
        Math.random() * 5 + "s";


    snow.style.opacity =
        Math.random() * 0.6 + 0.25;


    particleContainer.appendChild(snow);


    setTimeout(() => {

        snow.remove();

    }, 16000);
}


/* Keep creating particles */

setInterval(createSnow, 250);


/* Initial particles */

for (let i = 0; i < 35; i++) {

    createSnow();

}


/* =========================
   KEYBOARD NAVIGATION
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* =========================
   INITIAL PAGE
========================= */

showPage(0);
