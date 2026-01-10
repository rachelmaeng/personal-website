// ===== CONSTELLATION EFFECT =====
const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let animationId;
let mouse = { x: null, y: null, radius: 150 };

// Track mouse position for constellation interaction
canvas.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Colorful star palette - warm and cool tones
const starColors = [
    '#FFD700', // Gold
    '#FFA500', // Orange
    '#FF6B6B', // Coral red
    '#E8A87C', // Peach
    '#85DCB8', // Mint
    '#41B3A3', // Teal
    '#C38D9E', // Dusty rose
    '#F8B500', // Amber
    '#98D8C8', // Seafoam
    '#F7DC6F', // Soft yellow
    '#BB8FCE', // Lavender
    '#85C1E9', // Sky blue
];

class Star {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.opacity = 0;
        this.targetOpacity = 1.5;
        this.fadeSpeed = Math.random() * 0.02 + 0.01;
        // Assign a random color to each star
        this.color = starColors[Math.floor(Math.random() * starColors.length)];
    }

    update() {
        // Base movement
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0 || this.baseX > canvas.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas.height) this.vy *= -1;

        // Mouse interaction - stars gently move away from cursor
        if (mouse.x !== null && mouse.y !== null) {
            const dx = this.baseX - mouse.x;
            const dy = this.baseY - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const force = (mouse.radius - distance) / mouse.radius;
                const angle = Math.atan2(dy, dx);
                this.x = this.baseX + Math.cos(angle) * force * 30;
                this.y = this.baseY + Math.sin(angle) * force * 30;
            } else {
                this.x = this.baseX;
                this.y = this.baseY;
            }
        } else {
            this.x = this.baseX;
            this.y = this.baseY;
        }

        // Fade in gradually
        if (this.opacity < this.targetOpacity) {
            this.opacity += this.fadeSpeed;
            if (this.opacity > this.targetOpacity) {
                this.opacity = this.targetOpacity;
            }
        }
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function createStars() {
    stars = [];
    const starCount = Math.floor((canvas.width * canvas.height) / 15000);
    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}

function drawConnections() {
    const maxDistance = 150;
    ctx.lineWidth = 0.5;

    for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x;
            const dy = stars[i].y - stars[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                // Factor in both stars' opacity for the connection
                const opacity = (1 - distance / maxDistance) * Math.min(stars[i].opacity, stars[j].opacity);
                ctx.globalAlpha = opacity * 0.9;

                // Create gradient between the two star colors
                const gradient = ctx.createLinearGradient(stars[i].x, stars[i].y, stars[j].x, stars[j].y);
                gradient.addColorStop(0, stars[i].color);
                gradient.addColorStop(1, stars[j].color);
                ctx.strokeStyle = gradient;

                ctx.beginPath();
                ctx.moveTo(stars[i].x, stars[i].y);
                ctx.lineTo(stars[j].x, stars[j].y);
                ctx.stroke();
            }
        }
    }
    ctx.globalAlpha = 1;
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
        star.draw();
    });

    drawConnections();
    animationId = requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    createStars();
});

resizeCanvas();
createStars();
animate();

// ===== CURSOR TRAIL EFFECT =====
let lastTrailTime = 0;
const trailInterval = 40; // milliseconds between trail sparkles

document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrailTime < trailInterval) return;
    lastTrailTime = now;

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    // Randomize size for variety
    const size = 20 + Math.random() * 12; // 20-32px
    trail.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
            <g>
                <path d="M16 4 L18 14 L28 16 L18 18 L16 28 L14 18 L4 16 L14 14 Z"
                      fill="#FFD700" opacity="0.8"/>
            </g>
        </svg>
    `;
    trail.style.left = e.clientX - size/2 + 'px';
    trail.style.top = e.clientY - size/2 + 'px';
    document.body.appendChild(trail);

    setTimeout(() => trail.remove(), 700);
});

// ===== KOREAN COLOR PALETTE SWITCHER =====
const palettes = {
    default: {
        '--dark-green': '#001e00',
        '--light-green': '#F5EDD8',
        '--accent': '#D4AF6A',
        '--medium-gray': '#B8A888'
    },
    blue: { // 청 - East, spring
        '--dark-green': '#0a1628',
        '--light-green': '#E8F1F5',
        '--accent': '#6B9BD8',
        '--medium-gray': '#90B8C8'
    },
    red: { // 적 - South, summer
        '--dark-green': '#530000',
        '--light-green': '#F9E5D8',
        '--accent': '#D4535A',
        '--medium-gray': '#C89B88'
    },
    yellow: { // 황 - Center, earth
        '--dark-green': '#3D2F0C',
        '--light-green': '#FFFBF0',
        '--accent': '#FFD700',
        '--medium-gray': '#D4B886'
    },
    white: { // 백 - West, autumn
        '--dark-green': '#C0C0C0',
        '--light-green': '#1A1A1A',
        '--accent': '#444444',
        '--medium-gray': '#555555'
    },
    black: { // 흑 - North, winter
        '--dark-green': '#0A0A0A',
        '--light-green': '#D4D4D4',
        '--accent': '#4A4A4A',
        '--medium-gray': '#888888'
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
