// Particle settings
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Particle(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = 'rgba(255, 255, 255, 0.5)';
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
}

Particle.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
};

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    this.draw();
};

function init() {
    particles = [];
    for (let i = 0; i < 100; i++) {
        let radius = Math.random() * 3;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, radius));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
