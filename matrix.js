document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', {
        alpha: false,
        desynchronized: true
    });

    let animationFrameId;
    let isVisible = true;

    // Visibility API to pause animation when tab is not visible
    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
        if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            draw();
        }
    });

    // Optimize canvas size
    function setCanvasSize() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
    }

    // Throttle resize events
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setCanvasSize, 250);
    });

    // Matrix effect configuration
    const fontSize = 14;
    const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let drops = [];

    // Initialize drops
    function initDrops() {
        drops = [];
        const columns = Math.floor(canvas.width / fontSize);
        for(let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }
    }

    // Animation loop
    function draw() {
        if (!isVisible) return;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0F0';
        ctx.font = fontSize + 'px monospace';
        ctx.shadowBlur = 5; // Reduced glow
        ctx.shadowColor = '#00ff00';

        // Process in batches for better performance
        const batchSize = Math.min(drops.length, 50);
        for(let i = 0; i < batchSize; i++) {
            const index = Math.floor(Math.random() * drops.length);
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = index * fontSize;
            const y = drops[index] * fontSize;

            ctx.fillText(char, x, y);
            ctx.shadowBlur = 0;

            if(y > canvas.height && Math.random() > 0.975) {
                drops[index] = 0;
            }
            drops[index]++;
        }

        // Scroll page effect
        const scrolled = window.pageYOffset;
        canvas.style.transform = `translateY(${scrolled * 0.5}px)`;

        animationFrameId = requestAnimationFrame(draw);
    }

    // Initialize
    setCanvasSize();
    initDrops();
    draw();
});
