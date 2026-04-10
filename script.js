const contactForm = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('emailInput').value.trim();
        const message = document.getElementById('messageInput').value.trim();

        if (!email || !message) {
            feedbackDiv.innerHTML = '<i class="fas fa-exclamation-circle"></i> Harap isi email dan pesan terlebih dahulu.';
            feedbackDiv.style.color = '#c26b5c';
            feedbackDiv.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                feedbackDiv.innerHTML = '';
                feedbackDiv.style.animation = '';
            }, 2500);
            return;
        }
        if (!email.includes('@') || !email.includes('.')) {
            feedbackDiv.innerHTML = '<i class="fas fa-envelope-open-text"></i> Format email tidak valid.';
            feedbackDiv.style.color = '#c26b5c';
            feedbackDiv.style.animation = 'shake 0.5s ease';
            setTimeout(() => {
                feedbackDiv.innerHTML = '';
                feedbackDiv.style.animation = '';
            }, 2500);
            return;
        }

        feedbackDiv.innerHTML = '<i class="fas fa-check-circle"></i> Terima kasih! Pesan Anda telah terkirim. Saya akan membalas segera.';
        feedbackDiv.style.color = '#2e5747';
        feedbackDiv.style.animation = 'pulseSuccess 0.5s ease';
        contactForm.reset();
        
        setTimeout(() => {
            feedbackDiv.innerHTML = '';
            feedbackDiv.style.animation = '';
        }, 4000);
    });
}

document.querySelectorAll('.nav-links a, .hero-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                highlightTarget(targetElement);
            }
        }
    });
});

function highlightTarget(element) {
    element.style.transition = 'all 0.3s ease';
    element.style.backgroundColor = 'rgba(94, 158, 126, 0.15)';
    setTimeout(() => {
        element.style.backgroundColor = '';
    }, 800);
}

function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const hiddenElements = document.querySelectorAll('.exp-card, .skill-badge, .contact-info, .contact-form, .video-box, .about-text p');
    hiddenElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1), transform 0.7s cubic-bezier(0.2, 0.9, 0.4, 1.1)';
        observer.observe(el);
    });
}

function addNavbarScrollEffect() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

function addCardHoverEffect() {
    const cards = document.querySelectorAll('.exp-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function addSkillBadgeDelay() {
    const badges = document.querySelectorAll('.skill-badge');
    badges.forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.08}s`;
    });
}

function addTypewriterEffect() {
    const heroDesc = document.querySelector('.hero-desc');
    if (heroDesc && !heroDesc.hasAttribute('data-typed')) {
        heroDesc.setAttribute('data-typed', 'true');
        const originalText = heroDesc.innerText;
        heroDesc.innerText = '';
        let i = 0;
        const typing = setInterval(() => {
            if (i < originalText.length) {
                heroDesc.innerText += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 40);
    }
}

function downloadCV() {
    const downloadBtn = document.getElementById('downloadCVBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const cvContent = `MUHAMMAD MA'RUF I.
=========================

TENTANG SAYA
------------
Murid SMK Palapa Pare jurusan RPL (Rekayasa Perangkat Lunak)
Berbasis di Pare, Kediri

SKILL
-----
• HTML (Beginner)
• Python (Intermediate)
• CSS (Beginner)
• C/C++ (Intermediate)
• FoxPro (Expert)
• Gaming & Rebahan

PENGALAMAN
----------
• Belajar Dasar Pemrograman (2025 - Sekarang)
• Pengembangan Web Dasar (2025 - Sekarang)
• EX Top nasional di game osu! (2025)
• Mahir dalam program FoxPro (2025 - Sekarang)

KONTAK
------
Email: Kodenuklir067@gmail.com
GitHub: github.com/mf32-sketch
Instagram: @subdistrict_

"Terus belajar dan berkarya!"`;
            
            const blob = new Blob([cvContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'CV_Muhammad_Maruf.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            const btnText = downloadBtn.querySelector('.texto');
            const originalText = btnText.innerText;
            btnText.innerText = 'Tersimpan!';
            setTimeout(() => {
                btnText.innerText = originalText;
            }, 2000);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    addNavbarScrollEffect();
    addCardHoverEffect();
    addSkillBadgeDelay();
    setTimeout(addTypewriterEffect, 500);
    downloadCV();
});

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    @keyframes pulseSuccess {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);