// Debounce function for performance
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

// Optimize observer
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

import profileData from './content-data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Update matrix button handler
    const matrixButton = document.querySelector('.cta-button');
    if (matrixButton) {
        matrixButton.addEventListener('click', () => {
            // Intensify matrix rain effect
            const canvas = document.getElementById('matrixCanvas');
            if (canvas) {
                canvas.style.opacity = '0.3';
                setTimeout(() => {
                    canvas.style.opacity = '0.1';
                }, 2000);
            }

            // Scroll to Projects section smoothly
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Add button animation
            matrixButton.classList.add('activated');
            setTimeout(() => {
                matrixButton.classList.remove('activated');
            }, 1000);
        });
    }

    // Cache DOM elements
    const projectList = document.getElementById('project-list');
    const skillsOutput = document.getElementById('skills-output');

    // Mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Remove hardcoded project data and use profileData instead
    const projectsData = profileData.projects;

    // Remove hardcoded skills data and use profileData instead
    const skillsData = profileData.skills;

    // Update project loading to use your categories
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

        // Add observers and click handlers
        const projectItems = projectList.querySelectorAll('.project-item');
        projectItems.forEach(item => {
            observer.observe(item);
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
            });
        });
    }

    // Add project click handlers
    document.querySelectorAll('.project-line').forEach(line => {
        line.addEventListener('click', () => {
            const projectItem = line.closest('.project-item');
            projectItem.classList.toggle('active');
        });
    });

    // Update Skills section to use your actual skills
    function loadSkills() {
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
                            // Generate a realistic proficiency value between 75 and 95
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

    function getProficiencyLevel(category, skill) {
        const proficiencyMap = {
            "Programming Languages": {
                "Python": 92,
                "C": 88,
                "C++": 88,
                "HTML": 95,
                "CSS": 90,
                "JavaScript": 85
            },
            "Tools & Libraries": {
                "MATLAB": 85,
                "MySQL": 88,
                "XAMPP": 82,
                "LaTeX": 80,
                "Pandas": 85,
                "numpy": 85
            },
            "Design & Modeling": {
                "Blender": 85,
                "Unreal Engine": 80,
                "After Effects": 88,
                "Adobe Illustrator": 90,
                "Adobe Photoshop": 92
            }
        };

        return proficiencyMap[category]?.[skill] || 75;
    }

    // Simple hero title update without effects
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        heroTitle.textContent = `INITIALIZING PROFILE: PRIYANSHU`;
    }

    const heroSubtitle = document.querySelector('.hero-content p');
    if (heroSubtitle) {
        heroSubtitle.textContent = `{'role': '${profileData.title}', 'status': 'active'}`;
    }

    // Add category filter handlers
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            loadProjects(item.dataset.category);
        });
    });

    // Initialize projects
    loadProjects();

    // Initialize skills
    loadSkills();

    // Navigation active state
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

    // Optimize scroll handler
    const optimizedScroll = debounce(() => {
        updateActiveLink();
    }, 100);
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });

    // Event listeners
    window.addEventListener('scroll', updateActiveLink);
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth' });
        });
    });

    initContactForm();
    initProfileSection();
    initMatrixDecode();

    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Get the filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Add animation delays to form lines
    document.querySelectorAll('.form-line').forEach((line, index) => {
        line.style.setProperty('--index', index);
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const button = form.querySelector('.matrix-button');
        button.textContent = 'Processing...';
        
        // Simulate form submission
        setTimeout(() => {
            button.textContent = 'Message Sent Successfully';
            form.reset();
            setTimeout(() => {
                button.textContent = 'Execute Command';
            }, 2000);
        }, 1500);
    });

    // Add matrix-style typing sound effect
    document.querySelectorAll('.matrix-input').forEach(input => {
        input.addEventListener('keydown', () => {
            // Optional: Add typing sound effect
            const audio = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgBra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuix9/ZQAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZB8P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZD4P8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAEVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV');
            audio.volume = 0.1;
            audio.play().catch(() => {});
        });
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

        // Start typing when element is in view
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

    // Matrix scanning effect on hover
    const decodeScreen = document.querySelector('.decode-screen');
    decodeScreen.addEventListener('mousemove', (e) => {
        const rect = decodeScreen.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        decodeScreen.style.setProperty('--scan-x', `${x}px`);
        decodeScreen.style.setProperty('--scan-y', `${y}px`);
    });
}

/*
// Remove the education loading function and its call
function loadEducation() {
    const educationContainer = document.querySelector('.education-data');
    if (!educationContainer) return;

    const educationHTML = profileData.education.map(edu => `
        <div class="education-item">
            <div class="edu-degree">${edu.degree}</div>
            <div class="edu-institution">${edu.institution}</div>
            <div class="edu-period">${edu.period}</div>
            <div class="edu-score">${edu.score}</div>
        </div>
    `).join('');

    educationContainer.innerHTML = educationHTML;
}
*/
