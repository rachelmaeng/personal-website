const canvas = document.getElementById('constellation-canvas');
const ctx = canvas.getContext('2d');
let mouse = { x: -1000, y: -1000 };

document.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
document.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ===== STARRY BACKGROUND =====
const stars = [];
for (let i = 0; i < 300; i++) {
    stars.push({
        x: Math.random(),
        y: Math.random(),
        size: 0.3 + Math.random() * 2,
        twinkle: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.04,
        brightness: 0.3 + Math.random() * 0.7,
    });
}


function animate() {
    // Dark sky
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#06080C');
    grad.addColorStop(0.5, '#0A0E16');
    grad.addColorStop(1, '#0E1420');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (const s of stars) {
        s.twinkle += s.speed;
        const raw = Math.sin(s.twinkle);
        const alpha = s.brightness * (raw > 0.6 ? 1 : 0.12);

        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 225, 240, ${alpha})`;
        ctx.fill();

        if (raw > 0.6 && s.size > 1) {
            ctx.beginPath();
            ctx.arc(s.x * canvas.width, s.y * canvas.height, s.size + 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(200, 210, 240, ${alpha * 0.2})`;
            ctx.fill();
        }
    }


    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
