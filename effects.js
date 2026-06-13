const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');
let mouse = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.3 };

document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ===== LIGHTHOUSE SCENE =====
const W = () => canvas.width;
const H = () => canvas.height;

// Lighthouse position — center, sitting on ground
const lhX = () => W() * 0.42;
const lhBaseY = () => H() * 0.72;
const lhTopY = () => H() * 0.22;
const lhWidth = 28;

// Stars
const stars = [];
for (let i = 0; i < 120; i++) {
    stars.push({
        x: Math.random(),
        y: Math.random() * 0.55,
        size: 0.3 + Math.random() * 1.5,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.008 + Math.random() * 0.02,
        brightness: 0.6 + Math.random() * 0.4,
    });
}

function drawStars(time) {
    for (const s of stars) {
        s.twinkle += s.speed;
        const raw = Math.sin(s.twinkle);
        const alpha = s.brightness * (0.35 + 0.65 * Math.max(0, (raw - 0.1) / 0.9));
        ctx.beginPath();
        ctx.arc(s.x * W(), s.y * H(), s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 235, 250, ${alpha})`;
        ctx.fill();
    }
}

function drawOcean(time) {
    const baseY = H() * 0.72;

    // Ocean fill
    ctx.fillStyle = '#121A24';
    ctx.fillRect(0, baseY, W(), H() - baseY);

    // Wave lines
    for (let row = 0; row < 8; row++) {
        const y = baseY + 10 + row * ((H() - baseY) / 8);
        ctx.beginPath();
        for (let x = 0; x < W(); x += 3) {
            const wave = Math.sin(x * 0.008 + time * 0.8 + row * 2) * (3 + row * 0.5);
            const wave2 = Math.sin(x * 0.015 + time * 1.2 + row) * 2;
            if (x === 0) ctx.moveTo(x, y + wave + wave2);
            else ctx.lineTo(x, y + wave + wave2);
        }
        ctx.strokeStyle = `rgba(40, 60, 80, ${0.25 - row * 0.025})`;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
}

function drawIsland() {
    const baseY = H() * 0.72;

    // Rocky cliff / island shape on the left
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.quadraticCurveTo(W() * 0.05, baseY - 40, W() * 0.12, baseY - 60);
    ctx.quadraticCurveTo(W() * 0.18, baseY - 80, W() * 0.25, baseY - 50);
    ctx.quadraticCurveTo(W() * 0.32, baseY - 30, W() * 0.38, baseY - 20);
    // Under the lighthouse
    ctx.quadraticCurveTo(W() * 0.42, baseY - 15, W() * 0.46, baseY - 18);
    ctx.quadraticCurveTo(W() * 0.52, baseY - 10, W() * 0.56, baseY);
    ctx.lineTo(0, baseY);
    ctx.closePath();
    ctx.fillStyle = '#0E1318';
    ctx.fill();

    // Cliff edge highlight
    ctx.beginPath();
    ctx.moveTo(0, baseY);
    ctx.quadraticCurveTo(W() * 0.05, baseY - 40, W() * 0.12, baseY - 60);
    ctx.quadraticCurveTo(W() * 0.18, baseY - 80, W() * 0.25, baseY - 50);
    ctx.quadraticCurveTo(W() * 0.32, baseY - 30, W() * 0.38, baseY - 20);
    ctx.quadraticCurveTo(W() * 0.42, baseY - 15, W() * 0.46, baseY - 18);
    ctx.quadraticCurveTo(W() * 0.52, baseY - 10, W() * 0.56, baseY);
    ctx.strokeStyle = 'rgba(60, 75, 90, 0.3)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Simple tree silhouettes on the left
    const trees = [[W() * 0.08, baseY - 55, 10], [W() * 0.14, baseY - 70, 11], [W() * 0.20, baseY - 65, 9], [W() * 0.10, baseY - 48, 8]];
    for (const [tx, ty, r] of trees) {
        // Trunk
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(tx - 1, ty + 18);
        ctx.lineTo(tx + 1, ty + 18);
        ctx.closePath();
        ctx.fillStyle = '#0A0F14';
        ctx.fill();
        // Foliage
        ctx.beginPath();
        ctx.arc(tx, ty - 4, r, 0, Math.PI * 2);
        ctx.fillStyle = '#0C1118';
        ctx.fill();
    }
}

function drawLighthouse() {
    const x = lhX();
    const topY = lhTopY();
    const baseY = lhBaseY() - 18; // sits on cliff
    const w = lhWidth;

    // Tower body — slight taper
    const topW = w * 0.6;
    const botW = w;

    ctx.beginPath();
    ctx.moveTo(x - botW / 2, baseY);
    ctx.lineTo(x - topW / 2, topY + 20);
    ctx.lineTo(x + topW / 2, topY + 20);
    ctx.lineTo(x + botW / 2, baseY);
    ctx.closePath();
    ctx.fillStyle = '#1A2030';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80, 95, 110, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Horizontal stripes
    const stripes = 5;
    for (let i = 1; i < stripes; i++) {
        const t = i / stripes;
        const sy = topY + 20 + t * (baseY - topY - 20);
        const sw = topW + (botW - topW) * t;
        ctx.beginPath();
        ctx.moveTo(x - sw / 2, sy);
        ctx.lineTo(x + sw / 2, sy);
        ctx.strokeStyle = 'rgba(70, 85, 100, 0.25)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
    }

    // Lantern room
    ctx.beginPath();
    ctx.moveTo(x - topW / 2 - 4, topY + 20);
    ctx.lineTo(x - topW / 2 - 2, topY + 8);
    ctx.lineTo(x + topW / 2 + 2, topY + 8);
    ctx.lineTo(x + topW / 2 + 4, topY + 20);
    ctx.closePath();
    ctx.fillStyle = '#1E2838';
    ctx.fill();
    ctx.strokeStyle = 'rgba(80, 95, 110, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Lantern glow
    ctx.beginPath();
    ctx.arc(x, topY + 14, 6, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(232, 200, 112, 0.9)';
    ctx.fill();

    // Warm glow around lantern
    const glowGrad = ctx.createRadialGradient(x, topY + 14, 2, x, topY + 14, 30);
    glowGrad.addColorStop(0, 'rgba(232, 200, 112, 0.3)');
    glowGrad.addColorStop(1, 'rgba(232, 200, 112, 0)');
    ctx.beginPath();
    ctx.arc(x, topY + 14, 30, 0, Math.PI * 2);
    ctx.fillStyle = glowGrad;
    ctx.fill();

    // Roof cap
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x - topW / 2 - 2, topY + 8);
    ctx.lineTo(x + topW / 2 + 2, topY + 8);
    ctx.closePath();
    ctx.fillStyle = '#1A2030';
    ctx.fill();
}

function drawBeam(time) {
    const x = lhX();
    const topY = lhTopY() + 14; // beam origin = lantern

    // Angle from lighthouse to mouse
    const angle = Math.atan2(mouse.y - topY, mouse.x - x);
    const beamWidth = 0.18; // radians, half-width of cone
    const beamLength = Math.max(W(), H()) * 1.5;

    // Main beam cone
    const grad = ctx.createRadialGradient(x, topY, 0, x, topY, beamLength * 0.7);
    grad.addColorStop(0, 'rgba(232, 200, 112, 0.45)');
    grad.addColorStop(0.3, 'rgba(232, 200, 112, 0.15)');
    grad.addColorStop(0.7, 'rgba(232, 200, 112, 0.04)');
    grad.addColorStop(1, 'rgba(232, 200, 112, 0)');

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.arc(x, topY, beamLength, angle - beamWidth, angle + beamWidth);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Inner bright core
    const coreGrad = ctx.createRadialGradient(x, topY, 0, x, topY, beamLength * 0.4);
    coreGrad.addColorStop(0, 'rgba(255, 240, 200, 0.3)');
    coreGrad.addColorStop(0.5, 'rgba(255, 240, 200, 0.08)');
    coreGrad.addColorStop(1, 'rgba(255, 240, 200, 0)');

    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.arc(x, topY, beamLength, angle - beamWidth * 0.4, angle + beamWidth * 0.4);
    ctx.closePath();
    ctx.fillStyle = coreGrad;
    ctx.fill();
    ctx.restore();

}

// Moon — matches real current phase
function getMoonPhase() {
    const now = new Date();
    const refNew = new Date(2000, 0, 6, 18, 14); // known new moon
    const days = (now - refNew) / 86400000;
    return (days % 29.53058867) / 29.53058867; // 0=new, 0.5=full
}

// Check if mouse is hovering over the moon hitbox
let moonHovered = false;
const moonLink = document.getElementById('moon-link');
if (moonLink) {
    moonLink.addEventListener('mouseenter', () => { moonHovered = true; });
    moonLink.addEventListener('mouseleave', () => { moonHovered = false; });
}

function drawMoon() {
    const mx = W() * 0.82;
    const my = H() * 0.12;
    const r = 16;
    const phase = getMoonPhase();
    const hoverBoost = moonHovered ? 1.8 : 1;

    // Glow — brighter on hover
    const glowAlpha = moonHovered ? 0.25 : 0.15;
    const glowRadius = moonHovered ? r * 4.5 : r * 3.5;
    const moonGlow = ctx.createRadialGradient(mx, my, r * 0.5, mx, my, glowRadius);
    moonGlow.addColorStop(0, `rgba(230, 220, 180, ${glowAlpha})`);
    moonGlow.addColorStop(1, 'rgba(230, 220, 180, 0)');
    ctx.beginPath();
    ctx.arc(mx, my, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = moonGlow;
    ctx.fill();

    // Draw crescent by tracing a single filled path:
    // One side is the outer circular arc, the other side is an elliptical terminator.
    // The terminator is drawn by scaling the x-axis before drawing a second arc.
    //
    // phase: 0=new, 0.25=first quarter, 0.5=full, 0.75=last quarter
    // tX: terminator squeeze factor. 1=full circle, 0=half moon, -1=thin crescent
    const tX = -Math.cos(phase * Math.PI * 2);

    ctx.save();
    ctx.translate(mx, my);

    ctx.beginPath();

    if (Math.abs(phase - 0.5) <= 0.05) {
        // Full moon
        ctx.arc(0, 0, r, 0, Math.PI * 2);
    } else if (phase < 0.5) {
        // Waxing: lit side is on the RIGHT
        // Outer arc: right semicircle (top to bottom going clockwise)
        ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
        // Terminator: squeezed arc from bottom back to top
        ctx.save();
        ctx.scale(Math.abs(tX) < 0.01 ? 0.01 : Math.abs(tX), 1);
        if (tX >= 0) {
            // More than half lit: terminator bulges right
            ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2, false);
        } else {
            // Less than half lit: terminator curves left (into lit area)
            ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2, true);
        }
        ctx.restore();
    } else {
        // Waning: lit side is on the LEFT
        // Outer arc: left semicircle (bottom to top going clockwise)
        ctx.arc(0, 0, r, Math.PI / 2, -Math.PI / 2, false);
        // Terminator: squeezed arc from top back to bottom
        ctx.save();
        ctx.scale(Math.abs(tX) < 0.01 ? 0.01 : Math.abs(tX), 1);
        if (tX >= 0) {
            // More than half lit: terminator bulges left
            ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, false);
        } else {
            // Less than half lit: terminator curves right (into lit area)
            ctx.arc(0, 0, r, -Math.PI / 2, Math.PI / 2, true);
        }
        ctx.restore();
    }

    ctx.fillStyle = moonHovered ? 'rgba(245, 238, 210, 1)' : 'rgba(240, 232, 200, 0.95)';
    ctx.fill();
    ctx.restore();
}

// ===== MAIN ANIMATION =====
function animate() {
    const time = performance.now() * 0.001;

    // Dark sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, H() * 0.72);
    skyGrad.addColorStop(0, '#161E2E');
    skyGrad.addColorStop(0.5, '#1A2233');
    skyGrad.addColorStop(1, '#1E2840');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, W(), H() * 0.72);

    drawStars(time);
    drawMoon();
    drawOcean(time);
    drawIsland();
    drawLighthouse();
    drawBeam(time);

    // Position moon clickable hitbox
    const moonLink = document.getElementById('moon-link');
    if (moonLink) {
        moonLink.style.left = (W() * 0.82 - 25) + 'px';
        moonLink.style.top = (H() * 0.12 - 25) + 'px';
    }

    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
