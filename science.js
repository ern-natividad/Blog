// Function to handle "Learn More" button clicks
function learnMore(instrument) {
    // In a real site, this would navigate to instrument-specific pages
    // For this standalone version, we'll show an alert with information
    
    const instrumentInfo = {
        'microscope': {
            title: 'Microscope',
            description: 'A microscope is an instrument used to see objects that are too small to be seen by the naked eye. The science of investigating small objects using such an instrument is called microscopy.',
            history: 'The history of microscopes dates back to the late 16th century with the invention of the first compound microscope by Zacharias Janssen. Anton van Leeuwenhoek later developed simple microscopes with a single lens capable of 270x magnification.',
            types: 'Types include optical microscopes (compound, stereo, confocal), electron microscopes (TEM, SEM), and scanning probe microscopes (AFM, STM).',
            applications: 'Used in biology, medicine, forensics, material science, and more.'
        },
        'telescope': {
            title: 'Telescope',
            description: 'Telescopes are optical instruments designed to make distant objects appear magnified by collecting and analyzing radiation from them.',
            history: 'The first recorded telescope was created by Hans Lippershey in 1608. Galileo Galilei improved the design in 1609 and used it to make astronomical observations.',
            types: 'Types include refracting telescopes (using lenses), reflecting telescopes (using mirrors), and catadioptric telescopes (using both).',
            applications: 'Used in astronomy, navigation, surveillance, and more.'
        },
        'particle-accelerators': {
            title: 'Particle Accelerators',
            description: 'Particle accelerators propel charged particles to high speeds and energies, allowing scientists to study fundamental properties of matter.',
            history: 'The first cyclotron was invented by Ernest Lawrence in the 1930s. The Large Hadron Collider at CERN is currently the world\'s largest and most powerful particle accelerator.',
            types: 'Types include linear accelerators (linacs), cyclotrons, synchrotrons, and colliders.',
            applications: 'Used in physics research, medical applications (cancer treatment), materials science, and security.'
        },
        'lenses': {
            title: 'Lenses',
            description: 'Lenses are transparent optical devices that focus or disperse light rays through refraction.',
            history: 'The earliest lenses date back to ancient Egypt and Mesopotamia. The development of modern lens theory began in the 17th century with scientists like Isaac Newton.',
            types: 'Types include convex (converging) lenses, concave (diverging) lenses, and compound lenses.',
            applications: 'Used in microscopes, telescopes, cameras, eyeglasses, and many other optical instruments.'
        },
        'mirrors': {
            title: 'Mirrors',
            description: 'Mirrors are surfaces that reflect light in a predictable way, maintaining image integrity.',
            history: 'The first mirrors were likely pools of water. Metal mirrors date back to 4000-3000 BCE. Glass mirrors with metal backings appeared around the 1st century CE.',
            types: 'Types include plane mirrors, concave mirrors, convex mirrors, and parabolic mirrors.',
            applications: 'Used in telescopes, periscopes, microscopes, lasers, and many other optical systems.'
        },
        'sensors': {
            title: 'Sensors',
            description: 'Scientific sensors detect and measure physical properties and convert them into signals that can be analyzed.',
            history: 'The development of modern sensors accelerated in the 20th century with advances in electronics and materials science.',
            types: 'Types include temperature sensors, light sensors, pressure sensors, chemical sensors, and many more.',
            applications: 'Used in environmental monitoring, medical devices, industrial automation, and scientific research.'
        }
    };

    // Get info for the selected instrument
    const info = instrumentInfo[instrument];
    
    // Create and display a modal with the instrument information
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            <h2>${info.title}</h2>
            <p><strong>Description:</strong> ${info.description}</p>
            <p><strong>History:</strong> ${info.history}</p>
            <p><strong>Types:</strong> ${info.types}</p>
            <p><strong>Applications:</strong> ${info.applications}</p>
        </div>
    `;
    
    // Add the modal to the page
    document.body.appendChild(modal);
    
    // Add styles for the modal
    const style = document.createElement('style');
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }
        
        .modal-content {
            background-color: white;
            padding: 2rem;
            border-radius: 0.5rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
        }
        
        .close-button {
            position: absolute;
            top: 1rem;
            right: 1rem;
            font-size: 1.5rem;
            cursor: pointer;
        }
    `;
    
    document.head.appendChild(style);
    
    // Handle closing the modal
    const closeButton = modal.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    // Also close when clicking outside the modal content
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add any additional functionality here
document.addEventListener('DOMContentLoaded', function() {
    console.log('Science Instruments Blog loaded successfully!');
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });
    });
});