const projectsData = [
    {
        id: 1,
        title: "Neural Network Visualizer",
        category: "development",
        image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&q=80",
        video: null,
        description: "AI & Machine Learning Dashboard"
    },
    {
        id: 2,
        title: "Quantum UI Framework",
        category: "creative",
        image: null,
        video: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-city-scene-12957-large.mp4",
        description: "Next-gen Design System"
    }
    // Add more projects...
];

const skillsData = {
    technical: ["Python", "React", "Node.js", "TensorFlow"],
    creative: ["UI/UX", "Motion Graphics", "3D Design"],
    soft: ["Problem Solving", "Team Leadership"]
};

class ContentLoader {
    static async loadProjects() {
        const projectsSection = document.querySelector('#work');
        if (!projectsSection) return;

        const projectGrid = document.createElement('div');
        projectGrid.className = 'project-grid';

        projectsData.forEach(project => {
            const card = this.createProjectCard(project);
            projectGrid.appendChild(card);
        });

        const content = `
            <div class="content-container">
                <div class="section-header">
                    <h2 class="section-title">Featured Projects</h2>
                    <p class="section-subtitle">Exploring the digital frontier</p>
                </div>
                ${projectGrid.outerHTML}
            </div>
        `;

        projectsSection.innerHTML = content;
    }

    static createProjectCard(project) {
        const card = document.createElement('div');
        card.className = `project-card ${project.category}`;
        card.setAttribute('data-aos', 'fade-up');

        card.innerHTML = `
            <div class="project-media">
                ${this.getProjectMedia(project)}
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <a href="#" class="project-link">View Project →</a>
            </div>
        `;

        return card;
    }

    static getProjectMedia(project) {
        if (project.video) {
            return `
                <video autoplay muted loop playsinline>
                    <source src="${project.video}" type="video/mp4">
                </video>
            `;
        }
        return `<img src="${project.image}" alt="${project.title}">`;
    }

    static async loadSkills() {
        // Similar implementation for skills section
    }

    static init() {
        this.loadProjects();
        this.loadSkills();
        // Add more content loading methods as needed
    }
}

// Initialize content loader after DOM is ready
document.addEventListener('DOMContentLoaded', () => ContentLoader.init());
