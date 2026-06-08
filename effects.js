// ===== SUBTLE GRAIN/NOISE EFFECT =====
const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');
let animationId;
let mouse = { x: null, y: null };
let stars = [];

// Track mouse position for star trail
document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Add star particles
    if (Math.random() > 0.5) {
        stars.push(new StarTrail(mouse.x, mouse.y));
    }
});

document.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// Star trail particle class
class StarTrail {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.opacity = 1;
        this.decay = Math.random() * 0.02 + 0.015;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        // Get colors from current palette
        const style = getComputedStyle(document.documentElement);
        const accent = style.getPropertyValue('--accent').trim() || '#D4AF6A';
        const lightGreen = style.getPropertyValue('--light-green').trim() || '#F5EDD8';
        this.color = Math.random() > 0.3 ? accent : lightGreen;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= this.decay;
        this.size *= 0.98;
    }

    draw() {
        if (this.opacity <= 0) return;

        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 6;

        // Draw a small star/sparkle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Create static grain texture once
let grainImageData = null;

function createGrain() {
    grainImageData = ctx.createImageData(canvas.width, canvas.height);
    const data = grainImageData.data;

    for (let i = 0; i < data.length; i += 4) {
        // Random noise value
        const noise = Math.random() * 50 - 25;

        // More visible grain texture
        data[i] = 128 + noise;     // R
        data[i + 1] = 128 + noise; // G
        data[i + 2] = 128 + noise; // B
        data[i + 3] = Math.random() * 30 + 5; // More visible alpha
    }
}

function drawGrain() {
    if (grainImageData) {
        ctx.putImageData(grainImageData, 0, 0);
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw static grain
    drawGrain();

    // Update and draw star trail
    stars = stars.filter(star => star.opacity > 0);
    stars.forEach(star => {
        star.update();
        star.draw();
    });

    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createGrain();
});

resizeCanvas();
createGrain();
animate();

// ===== KOREAN COLOR PALETTE SWITCHER =====
const palettes = {
    default: {
        '--dark-green': '#EDE0C0',
        '--light-green': '#1A0E06',
        '--accent': '#C8922A',
        '--medium-gray': '#6B5540',
        '--highlight': '#2D5A27'
    },
    green: { // forest
        '--dark-green': '#0F2B0F',
        '--light-green': '#F0EDD8',
        '--accent': '#D4C27A',
        '--medium-gray': '#9BB89B',
        '--highlight': '#D4C27A'
    },
    blue: { // 청 - East, spring
        '--dark-green': '#0a1628',
        '--light-green': '#E8F1F5',
        '--accent': '#6B9BD8',
        '--medium-gray': '#90B8C8',
        '--highlight': '#6B9BD8'
    },
    red: { // 적 - South, summer
        '--dark-green': '#530000',
        '--light-green': '#F9E5D8',
        '--accent': '#D4535A',
        '--medium-gray': '#C89B88',
        '--highlight': '#D4535A'
    },
    yellow: { // 황 - Center, earth
        '--dark-green': '#FFF5B8',
        '--light-green': '#3B2800',
        '--accent': '#D4920A',
        '--medium-gray': '#8B6E30',
        '--highlight': '#6B4400'
    },
    black: { // 흑 - North, winter
        '--dark-green': '#0A0A0A',
        '--light-green': '#D4D4D4',
        '--accent': '#AAAAAA',
        '--medium-gray': '#888888',
        '--highlight': '#AAAAAA'
    }
};

function switchPalette(paletteName) {
    const palette = palettes[paletteName];
    const root = document.documentElement;

    Object.keys(palette).forEach(key => {
        root.style.setProperty(key, palette[key]);
    });

    // Update active state on buttons
    document.querySelectorAll('.palette-button').forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.querySelector(`.palette-button[data-palette="${paletteName}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Store preference
    localStorage.setItem('selectedPalette', paletteName);
}

// Load saved palette on page load
window.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('selectedPalette') || 'default';
    if (palettes[saved]) {
        switchPalette(saved);
    }
});
