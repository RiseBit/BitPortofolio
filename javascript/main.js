const container = document.querySelector('.usernameContainer');
const username = document.querySelector('.landingUsername');

username.innerHTML = username.textContent.split('').map(char => 
    `<span class="char">${char}</span>`
).join('');

const chars = username.querySelectorAll('.char');

container.addEventListener('mousemove', (e) => {
    const rect = username.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((e.clientY - rect.top - centerY) / centerY) * -17;
    const rotateY = ((e.clientX - rect.left - centerX) / centerX) * 17;
    
    username.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    chars.forEach(char => {
        const charRect = char.getBoundingClientRect();
        const dx = e.clientX - (charRect.left + charRect.width / 2);
        const dy = e.clientY - (charRect.top + charRect.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const scale = Math.max(0, 1 - distance / 150);
        
        char.style.color = `rgb(${17 + scale * 100}, ${157 + scale * 98}, 251)`;
        char.style.textShadow = `0 0 ${scale * 20}px rgba(17, 157, 251, ${scale})`;
        char.style.transform = `scale(${1 + scale * 0.3})`;
    });
});

container.addEventListener('mouseleave', () => {
    username.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    chars.forEach(char => {
        char.style.color = 'rgb(17, 157, 251)';
        char.style.textShadow = 'none';
        char.style.transform = 'scale(1)';
    });
});

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 20;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.1 + 0.05;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;

        if (this.x < -100 || this.x > canvas.width + 100) this.x = (this.x < 0) ? canvas.width + 100 : -100;
        if (this.y < -100 || this.y > canvas.height + 100) this.y = (this.y < 0) ? canvas.height + 100 : -100;
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(-this.size, 0);
        ctx.lineTo(this.size, 0);
        ctx.moveTo(0, -this.size);
        ctx.lineTo(0, this.size);
        ctx.stroke();

        ctx.restore();
    }
}

const particles = Array.from({length: 30}, () => new Particle());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

function goToProject() {
    window.location.href = "projects.html";
}

animate();