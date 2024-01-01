"use strict"

let canvas = document.querySelector('.canvas');
let ctx = canvas.getContext("2d");
let width, height;
let mouse = { x: undefined, y: undefined };
let hearts = [];
let heartImg = new Image()
heartImg.src = './assets/icons/heart.png';
heartImg.width = 60;
heartImg.height = 60;

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
    ctx.globalCompositeOperation = 'lighter';

    drawHearts();

    let temp = [];
    for (let i = 0; i < hearts.length; i++) {
        if (hearts[i].time <= hearts[i].lifeTime) {
            temp.push(hearts[i]);
        }
    }

    hearts = temp;
    requestAnimationFrame(animationLoop);
}

function drawHearts() {
    for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw();
    }
}

function mouseMove(e) {
    mouse.x = e.x;
    mouse.y = e.y;

    hearts.push(new Heart());
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

        this.end = {
            x: this.start.x + getRandomNum(-200, 200),
            y: this.start.y + getRandomNum(-650, -350)
        }

        this.x = this.start.x;
        this.y = this.start.y;
        this.size = this.start.size;

        this.time = 0;
        this.lifeTime = 90;
    }

    draw() {
        ctx.drawImage(
            heartImg,
            this.x - heartImg.width / 2,
            this.y - heartImg.width / 2,
            this.size,
            this.size
        );
    }

    update() {
        if (this.time <= this.lifeTime) {
            let progress = 1 - (this.lifeTime - this.time) / this.lifeTime;
            this.size = this.start.size * (1 - easeOutSine(progress));
            this.x = this.x + (this.end.x - this.x) * 0.009;
            this.y = this.y + (this.end.y - this.y) * 0.009;
        }

        this.time++;
    }
}

window.addEventListener('DOMContentLoaded', start);
window.addEventListener('resize', resizeReset);
window.addEventListener('mousemove', mouseMove);
window.addEventListener('mouseout', mouseOut);


function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}
