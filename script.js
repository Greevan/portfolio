// Modern JavaScript features for enhanced user experience
class ResumeEnhancer {
    constructor() {
        this.init();
    }

    init() {
        // Initialize all enhancements
        this.setupSmoothScroll();
        this.setupThemeToggle();
        this.setupScrollReveal();
        this.setupNavigation();
        this.setupProjectCards();
        this.setupSkillsAnimation();
        
        // Performance optimization: Only load enhancements if JavaScript is available
        if ('IntersectionObserver' in window) {
            this.setupLazyLoading();
        }
    }

    // 1. Smooth scroll navigation
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // 2. Enhanced theme toggle with persistence
    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle-btn');
        const sunIcon = document.getElementById('sun-icon');
        const moonIcon = document.getElementById('moon-icon');
        
        // Load saved theme preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark-mode');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }

        // Handle theme toggle
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                localStorage.setItem('theme', 'light');
                moonIcon.style.display = 'none';
                sunIcon.style.display = 'block';
            }
        });
    }

    // 3. Scroll reveal animations
    setupScrollReveal() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });
    }

    // 4. Navigation enhancements
    setupNavigation() {
        const nav = document.querySelector('nav');
        const navLinks = document.querySelectorAll('nav a');
        
        // Add active state to current section
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.section');
            const scrollPosition = window.pageYOffset + 70;

            sections.forEach(section => {
                if (section.offsetTop <= scrollPosition && 
                    section.offsetTop + section.offsetHeight > scrollPosition) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${section.id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });

        // Add hover effects
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.transform = 'scale(1.05)';
            });
            link.addEventListener('mouseleave', () => {
                link.style.transform = 'scale(1)';
            });
        });
    }

    // 5. Project card interactions
    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) rotate(0.5deg)';
                card.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotate(0)';
                card.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
            });
        });
    }

    // 6. Skills animation
    setupSkillsAnimation() {
        const skillsList = document.querySelector('.skills-list');
        const skills = document.querySelectorAll('.skills-list li');
        
        skills.forEach((skill, index) => {
            skill.style.transitionDelay = `${index * 0.1}s`;
        });
    }

    // 7. Lazy loading for images
    setupLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('loading' in HTMLImageElement.prototype) {
            images.forEach(img => {
                img.loading = 'lazy';
            });
        } else {
            // Fallback for browsers that don't support lazy loading
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/intersection-observer/2.0.5/intersection-observer.min.js';
            document.head.appendChild(script);
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ResumeEnhancer();
});