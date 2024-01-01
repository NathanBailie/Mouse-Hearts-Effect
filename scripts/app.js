"use strict"

let canvas = document.querySelector('.canvas');
let cts = canvas.getContext("2d");
let width, height;
let mouse = { x: undefined, y: undefined };
let hearts = [];

function start() {
    resizeReset();
}

function resizeReset() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

function mouseMove(e) {
    mouse.x = e.x;
    mouse.y = e.y;
}

function mouseOut() {
    mouse.x = undefined;
    mouse.y = undefined;
}

window.addEventListener('DOMContentLoaded', start);
window.addEventListener('resize', resizeReset);
window.addEventListener('mousemove', mouseMove);
window.addEventListener('mouseout', mouseOut);