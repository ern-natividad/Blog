// Slideshow for About Hero Section
const images = ['background_a.jpg', 'background_m.jpg', 'background_z.jpg', 'background_x.jpg']; 
let index = 0;
const heroImage = document.getElementById('heroImage');
const overlay = document.querySelector('.hero-overlay');

function changeBackground() {
    // Step 1: Fade in black overlay (to hide white flash)
    overlay.style.opacity = "1";  

    setTimeout(() => {
        // Step 2: Change the background image
        heroImage.src = images[index];  

        setTimeout(() => {
            // Step 3: Fade out black overlay to reveal the new image
            overlay.style.opacity = "0.7";  
        }, 300); // Wait a bit before revealing

        index = (index + 1) % images.length; // Loop through images
    }, 1200); // Hold black screen before switching
}

// Start image transition every 5 seconds
setInterval(changeBackground, 5000);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling (for demo - no actual submission)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! This is a demo form, so no message was actually sent.');
        this.reset();
    });
}

// Newsletter subscription handling (for demo - no actual submission)
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for subscribing! This is a demo form, so no subscription was actually processed.');
        this.reset();
    });
}
