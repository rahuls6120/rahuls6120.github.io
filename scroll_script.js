// Scroll Background Change Logic
const body = document.body;
const gradients = [
    { stop: 0, gradient: "linear-gradient(135deg, #1e272e, #4a5568)" }, // Charcoal to Steel Gray
    { stop: 0.5, gradient: "linear-gradient(135deg, #4a5568, #a0aec0)" }, // Steel Gray to Light Silver/Gray
    { stop: 1, gradient: "linear-gradient(135deg, #a0aec0, #e2e8f0)" }  // Light Silver/Gray to Light Slate
];

let lastScrollPercent = -1;

window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight === 0 ? 0 : scrollTop / scrollHeight;

    // Avoid unnecessary updates if scroll percentage hasn't changed significantly
    if (Math.abs(scrollPercent - lastScrollPercent) < 0.01) {
        return;
    }
    lastScrollPercent = scrollPercent;

    // Find the appropriate gradient based on scroll percentage
    let currentGradient = gradients[0].gradient; // Default to top
    for (let i = gradients.length - 1; i >= 0; i--) {
        // Use the gradient defined at or before the current scroll percentage
        if (scrollPercent >= gradients[i].stop) {
            currentGradient = gradients[i].gradient;
            break;
        }
    }
    
    // Apply the gradient smoothly
    if (body.style.background !== currentGradient) {
        body.style.background = currentGradient;
        // Ensure transition is defined in CSS or apply here if needed
        // body.style.transition = "background 0.5s ease"; // Already in CSS is better
    }
}, { passive: true }); // Use passive listener for better scroll performance

// Section Fade-in Logic
const sections = document.querySelectorAll(".section");
const observerOptions = {
    root: null, // viewport
    rootMargin: "0px",
    threshold: 0.1 // Trigger when 10% of the section is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Optional: Stop observing once it becomes visible
            // observer.unobserve(entry.target);
        }
        // Optional: Remove class if scrolling back up
        // else {
        //     entry.target.classList.remove("visible");
        // }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

