// === HTML COMPONENT LOADER ===
function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

// === FADE-IN OBSERVER ===
function observeFadeIn() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in:not(.visible)').forEach(el => {
        observer.observe(el);
    });
}

// === NAV SMOOTH SCROLL ===
document.addEventListener("DOMContentLoaded", function () {

    // load header & footer if needed
    loadComponent("header", "src/components/header.html");
    loadComponent("footer", "src/components/footer.html");

    // smooth scrolling when clicking nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            const offset = 80;
            const pos = target.offsetTop - offset;
            window.scrollTo({ top: pos, behavior: 'smooth' });
        });
    });

    // fade in on scroll
    observeFadeIn();

    // highlight nav links on scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.clientHeight;
            if (window.scrollY >= top && window.scrollY < top + height) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // === SLIDER CAROUSELS (ACHIEVEMENTS) ===
    document.querySelectorAll('.slider').forEach(function (slider) {
        let slides = slider.querySelectorAll('.slide');
        let dots = slider.parentElement.querySelectorAll('.dot');
        let current = 0;

        function show(n) {
            if (n < 0) n = slides.length - 1;
            if (n >= slides.length) n = 0;
            slides.forEach(s => s.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            slides[n].classList.add('active');
            if (dots[n]) dots[n].classList.add('active');
            current = n;
        }

        let prevBtn = slider.parentElement.querySelector('.slider-nav.prev');
        let nextBtn = slider.parentElement.querySelector('.slider-nav.next');

        if (prevBtn) prevBtn.onclick = () => show(current - 1);
        if (nextBtn) nextBtn.onclick = () => show(current + 1);

        dots.forEach((dot, i) => {
            dot.onclick = () => show(i);
        });

        show(0);
    });

});

// Load professional experience content dynamically
document.addEventListener('DOMContentLoaded', function() {
    const experienceContainer = document.getElementById('experience-container');
    
    if (experienceContainer) {
        fetch('public/html/experience.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load experience content');
                }
                return response.text();
            })
            .then(data => {
                experienceContainer.innerHTML = data;
                
                // Add fade-in animation observer for experience cards
                const observerOptions = {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                };
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateY(0)';
                        }
                    });
                }, observerOptions);
                
                // Observe all experience cards
                const cards = document.querySelectorAll('.experience-card.fade-in');
                cards.forEach(card => {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.observe(card);
                });
            })
            .catch(error => {
                console.error('Error loading experience content:', error);
                experienceContainer.innerHTML = '<p>Failed to load experience content. Please refresh the page.</p>';
            });
    }
});


const modal = document.getElementById("certificateModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".modal .close");

document.querySelectorAll(".certificate-card img").forEach(img => {
    img.addEventListener("click", () => {
        modal.style.display = "block";
        modalImg.src = img.src;
    });
});

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", e => {
    if(e.target == modal) {
        modal.style.display = "none";
    }
});