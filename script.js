/* =========================================
   STARFIELD BACKGROUND
========================================= */

const canvas = document.getElementById("starfield");

const ctx = canvas.getContext("2d");

let stars = [];

let width;
let height;


function resizeCanvas() {

    width = window.innerWidth;

    height = window.innerHeight;

    canvas.width =
        width * window.devicePixelRatio;

    canvas.height =
        height * window.devicePixelRatio;

    canvas.style.width =
        width + "px";

    canvas.style.height =
        height + "px";

    ctx.setTransform(
        window.devicePixelRatio,
        0,
        0,
        window.devicePixelRatio,
        0,
        0
    );

    createStars();
}


/* CREATE STARS */

function createStars() {

    const count =
        Math.min(
            150,
            Math.floor(window.innerWidth / 8)
        );

    stars =
        Array.from(
            { length: count },
            () => ({

                x:
                    Math.random() *
                    window.innerWidth,

                y:
                    Math.random() *
                    window.innerHeight,

                radius:
                    Math.random() *
                    1.1 + .2,

                opacity:
                    Math.random() *
                    .55 + .1,

                speed:
                    Math.random() *
                    .12 + .02

            })
        );

}


/* DRAW STARS */

function drawStars() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    stars.forEach(star => {

        star.y += star.speed;


        if (
            star.y >
            window.innerHeight
        ) {

            star.y = 0;

        }


        ctx.beginPath();


        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                90,
                190,
                255,
                ${star.opacity}
            )`;


        ctx.fill();

    });


    requestAnimationFrame(drawStars);

}


window.addEventListener(
    "resize",
    resizeCanvas
);


resizeCanvas();

drawStars();



/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuToggle =
    document.getElementById(
        "menuToggle"
    );

const navLinks =
    document.getElementById(
        "navLinks"
    );


menuToggle.addEventListener(
    "click",
    () => {

        const isOpen =
            navLinks.classList.toggle(
                "open"
            );


        menuToggle.setAttribute(
            "aria-expanded",
            isOpen
        );

    }
);



/* CLOSE MENU AFTER CLICK */

document
    .querySelectorAll("#navLinks a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "open"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });



/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(element => {

        observer.observe(element);

    });



/* =========================================
   CURRENT YEAR
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();
