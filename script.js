document.addEventListener("DOMContentLoaded", () => {
    
    // Spotlight Effect for Bento Cards
    const cards = document.querySelectorAll(".bento-card");
    const spotlight = document.querySelector(".pointer-spotlight");

    document.body.addEventListener("mousemove", (e) => {
        // Global spotlight
        spotlight.style.left = `${e.clientX}px`;
        spotlight.style.top = `${e.clientY}px`;

        // Card local spotlight
        cards.forEach((card) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Set CSS variables for the ::before psuedo-element gradient
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
    });

    // Staggered Entrance Animations using GSAP logic (vanilla implementation)
    const elementsToAnimate = [
        document.querySelector('.slide-down'),
        document.querySelector('.name-reveal'),
        document.querySelector('.sub-reveal'),
        document.querySelector('.hero-desc'),
        ...document.querySelectorAll('.bento-card')
    ];

    elementsToAnimate.forEach((el, index) => {
        if(!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            
            // Cleanup transform to allow CSS hover transforms
            if (el.classList.contains('bento-card')) {
                setTimeout(() => {
                    el.style.transform = '';
                }, 800);
            }
        }, 100 + (index * 100)); // Stagger the appearances
    });
});
