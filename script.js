/**
 * @licstart The following is the entire license notice for the JavaScript
 * code in this page.
 *
 * Copyright (C) 2024 Lenvx
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * @licend
 */

"use strict";

/* TODO: Resize to fit the whole page? */

class Particle {
    constructor(x, y, radius, canvas, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.canvas = canvas;
        this.ctx = ctx;
        this.color = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`;
        this.speed_x = Math.random() * 2 - 1;
        this.speed_y = Math.random() * 2 - 1;
    }

    draw() {
        const { ctx, x, y, radius, color } = this;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    update() {
        const { canvas, speed_x, speed_y } = this;
        this.x += speed_x;
        this.y += speed_y;

        if (this.x - this.radius < 0 || this.x + this.radius > canvas.width)
            this.speed_x *= -1;

        if (this.y - this.radius < 0 || this.y + this.radius > canvas.height)
            this.speed_y *= -1;

        this.draw();
    }
}

function debounce(func, wait) {
    let timeout;

    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function init(canvas, ctx) {
    return Array.from({ length: 128 }, () => {
        const radius = Math.random() * 3 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        return new Particle(x, y, radius, canvas, ctx);
    });
}

function animate(canvas, ctx, particles) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => particle.update());
    requestAnimationFrame(() => animate(canvas, ctx, particles));
}

function setup_canvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function main() {
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    setup_canvas(canvas);

    let particles = init(canvas, ctx);
    animate(canvas, ctx, particles);

    window.addEventListener(
        "resize",
        debounce(() => {
            setup_canvas(canvas);
            particles = init(canvas, ctx);
            animate(canvas, ctx, particles);
        }, 200),
    );
}

document.addEventListener("DOMContentLoaded", main);
