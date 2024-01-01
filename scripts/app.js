"use strict"

let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext("2d");
let width, height;
let mouse = { x: undefined, y: undefined };
let hearts = [];
let heartImg = new Image()
heartImg.src = './assets/icons/heart.png';

function start() {
    resizeReset();
    animationLoop()
}

function resizeReset() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function animationLoop() {
    ctx.clearRect(0, 0, width, height);
    drawHearts();

    requestAnimationFrame(animationLoop);
}

function drawHearts() {
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].draw();
    }
}

function mouseMove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    hearts.push(new Heart())
}

function mouseOut() {
    mouse.x = undefined;
    mouse.y = undefined;
}

class Heart {
    constructor() {
        this.start = {
            x: mouse.x + getRandomNum(-20, 20),
            y: mouse.y + getRandomNum(-20, 20),
            size: heartImg.width,
        }
        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;
    }

    draw() {
        ctx.drawImage(
            heartImg,
            this.x,
            this.y,
            this.size,
            this.size
        );
    }

    update() {

    }
}

window.addEventListener('DOMContentLoaded', start);
window.addEventListener('resize', resizeReset);
window.addEventListener('mousemove', mouseMove);
window.addEventListener('mouseout', mouseOut);


function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}