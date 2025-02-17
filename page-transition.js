document.addEventListener('DOMContentLoaded', () => {
    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.className = 'transition-overlay';
    document.body.appendChild(overlay);

    // Setup page toggle
    const pageToggle = document.getElementById('pageToggle');
    if (!pageToggle) return;

    pageToggle.addEventListener('click', async () => {
        // Determine target page
        const isMatrix = !window.location.pathname.includes('clean.html');
        const targetPage = isMatrix ? 'clean.html' : 'index.html';
        
        // Store scroll position
        localStorage.setItem('scrollPos', window.scrollY);

        // Transition animation
        overlay.classList.add('active');
        
        // Add glitch effect
        setTimeout(() => {
            overlay.classList.add('glitch');
        }, 300);

        // Navigate after animation
        setTimeout(() => {
            window.location.href = targetPage;
        }, 800);
    });

    // Handle page load transition
    if (overlay) {
        overlay.classList.add('active');
        
        // Restore scroll position
        const scrollPos = localStorage.getItem('scrollPos');
        if (scrollPos) {
            window.scrollTo(0, parseInt(scrollPos));
            localStorage.removeItem('scrollPos');
        }

        // Fade out overlay
        setTimeout(() => {
            overlay.classList.remove('active');
        }, 500);
    }
});
