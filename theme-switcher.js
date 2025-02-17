class ThemeSwitcher {
    constructor() {
        this.isMatrix = true;
        this.createSwitchButton();
        this.loadSavedTheme(); // Add this line
    }

    createSwitchButton() {
        const button = document.createElement('button');
        button.className = 'theme-switch';
        button.textContent = 'DECRYPT REALITY';
        button.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(button);
    }

    async toggleTheme() {
        document.documentElement.classList.add('theme-transition');
        
        if (this.isMatrix) {
            // Matrix to Clean transition
            this.glitchEffect();
            await this.sleep(1000);
            document.documentElement.classList.add('clean-theme');
            document.querySelector('.theme-switch').textContent = 'RETURN TO MATRIX';
            localStorage.setItem('theme', 'clean'); // Save theme preference
        } else {
            // Clean to Matrix transition
            this.glitchEffect();
            await this.sleep(1000);
            document.documentElement.classList.remove('clean-theme');
            document.querySelector('.theme-switch').textContent = 'DECRYPT REALITY';
            localStorage.setItem('theme', 'matrix'); // Save theme preference
        }
        
        this.isMatrix = !this.isMatrix;
        await this.sleep(500);
        document.documentElement.classList.remove('theme-transition');
    }

    // Add this new method
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'clean') {
            this.isMatrix = true; // Set to true because toggleTheme will switch it
            this.toggleTheme();
        }
    }

    async glitchEffect() {
        const glitch = document.createElement('div');
        glitch.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #000;
            z-index: 9999;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        document.body.appendChild(glitch);

        // Glitch animation
        for (let i = 0; i < 5; i++) {
            glitch.style.opacity = '0.8';
            await this.sleep(100);
            glitch.style.opacity = '0';
            await this.sleep(50);
        }

        glitch.remove();
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize theme switcher
document.addEventListener('DOMContentLoaded', () => {
    new ThemeSwitcher();
});
