import { profileData } from './content-data.js';

// Performance utilities
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize intersection observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all sections
    initHeroSection();
    initProjects();
    initSkills();
    initContactForm();
    initNavigation();
    initMobileSidebar();
    
    // Clean up event listeners on page unload
    window.addEventListener('unload', () => {
        observer.disconnect();
    });
});

function initHeroSection() {
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.textContent = `INITIALIZING PROFILE: PRIYANSHU`;
    }

    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        heroSubtitle.textContent = `{'role': '${profileData.title}', 'status': 'active'}`;
    }
}

function initProjects() {
    const matrixButton = document.querySelector('.cta-button');
    if (matrixButton) {
        matrixButton.addEventListener('click', () => {
            const canvas = document.getElementById('matrixCanvas');
            if (canvas) {
                canvas.style.opacity = '0.3';
                setTimeout(() => {
                    canvas.style.opacity = '0.1';
                }, 2000);
            }

            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            matrixButton.classList.add('activated');
            setTimeout(() => {
                matrixButton.classList.remove('activated');
            }, 1000);
        });
    }

    const projectList = document.getElementById('project-list');
    const projectsData = profileData.projects;

    function loadProjects(category = 'all') {
        if (!projectList) return;

        const filteredProjects = category === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === category);

        const fragment = document.createDocumentFragment();

        filteredProjects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project-item';
            div.dataset.id = project.id;
            div.innerHTML = `
                <div class="project-id">${project.id}</div>
                <div class="project-status ${project.status.toLowerCase()}">${project.status}</div>
                <div class="project-desc">${project.description}</div>
            `;
            fragment.appendChild(div);
        });

        projectList.innerHTML = '';
        projectList.appendChild(fragment);

        const projectItems = projectList.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            observer.observe(item);
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        });
    }

    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            loadProjects(item.dataset.category);
        });
    });

    loadProjects();
}

function initSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    skillsGrid.innerHTML = Object.entries(profileData.skills)
        .map(([category, skills], index) => `
            <div class="skill-category" style="animation-delay: ${index * 0.2}s">
                <div class="skill-header">
                    <span class="category-icon">[${String(index + 1).padStart(2, '0')}]</span>
                    <span class="category-name">${category}</span>
                </div>
                <div class="skill-list">
                    ${skills.map((skill, skillIndex) => {
                        const proficiency = Math.floor(Math.random() * (95 - 75 + 1)) + 75;
                        return `
                            <div class="skill-item">
                                <span class="skill-name">${skill}</span>
                                <div class="skill-meter">
                                    <div class="skill-progress" style="width: ${proficiency}%"></div>
                                </div>
                                <span class="skill-value">${proficiency}%</span>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `).join('');
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('.matrix-button');
        const formData = new FormData(form);
        
        try {
            button.textContent = 'Processing...';
            button.disabled = true;
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            form.reset();
            button.textContent = 'Message Sent Successfully';
        } catch (error) {
            button.textContent = 'Error - Try Again';
        } finally {
            setTimeout(() => {
                button.textContent = 'Execute Command';
                button.disabled = false;
            }, 2000);
        }
    });

    document.querySelectorAll('.matrix-input').forEach(input => {
        input.addEventListener('keydown', () => {
            const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgBra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuix9/ZQAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZD4P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
            audio.volume = 0.1;
            audio.play().catch(() => {});
        });
    });
}

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    const optimizedScroll = debounce(() => {
        updateActiveLink();
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });

    window.addEventListener('scroll', updateActiveLink);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

function updateActiveLink() {
    const scrollPos = window.scrollY;
    const links = document.querySelectorAll('.nav-links a');
    
    document.querySelectorAll('section').forEach(section => {
        const top = section.offsetTop - 100;
        const bottom = top + section.offsetHeight;
        
        if (scrollPos >= top && scrollPos < bottom) {
            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

function initProfileSection() {
    const typingElements = document.querySelectorAll('.typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;

        function typeCharacter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeCharacter, Math.random() * 100 + 50);
            }
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeCharacter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(element);
    });
}

function initMatrixDecode() {
    const scrambleEl = document.querySelector('.scramble-text');
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクツヅヴェォコソトノホモヨロゴゾドボポウゥクスツヌフムユュル01';
    
    function generateScramble() {
        let result = '';
        for (let i = 0; i < 100; i++) {
            result += chars[Math.floor(Math.random() * chars.length)] + ' ';
            if (i % 10 === 9) result += '\n';
        }
        return result;
    }

    setInterval(() => {
        scrambleEl.textContent = generateScramble();
    }, 50);

    const decodeScreen = document.querySelector('.decode-screen');
    decodeScreen.addEventListener('mousemove', (e) => {
        const rect = decodeScreen.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        decodeScreen.style.setProperty('--scan-x', `${x}px`);
        decodeScreen.style.setProperty('--scan-y', `${y}px`);
    });
}

function initMobileSidebar() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.mobile-sidebar');
    const overlay = document.querySelector('.mobile-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');

    function toggleSidebar() {
        menuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle?.addEventListener('click', toggleSidebar);
    overlay?.addEventListener('click', toggleSidebar);
    sidebarClose?.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking a link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleSidebar();
            // Update active state
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}
