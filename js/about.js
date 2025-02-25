// Parallax Background
window.addEventListener('scroll', () => {
    const bg = document.querySelector('.bg-image');
    const scrollPos = window.scrollY;
    bg.style.transform = `translateY(${scrollPos * 0.3}px)`;
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            if (entry.target.classList.contains('content')) {
                entry.target.style.transform = 'translateX(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            }
            if (entry.target.classList.contains('raccoon-walker')) {
                entry.target.style.animation = 'walk 5s linear infinite';
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.content, .raccoon-walker').forEach(el => observer.observe(el));

// Raccoon Walker Animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
    @keyframes walk {
        0% { transform: translateX(-100vw); opacity: 0.7; }
        100% { transform: translateX(100vw); opacity: 0.7; }
    }
`, styleSheet.cssRules.length);

// 3D Tilt on Title (Mouse Move)
const title = document.querySelector('.title-3d');
document.querySelector('.hero').addEventListener('mousemove', (e) => {
    const rect = title.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    title.style.transform = `perspective(500px) rotateX(${y * -20}deg) rotateY(${x * 20}deg) translateZ(20px)`;
});