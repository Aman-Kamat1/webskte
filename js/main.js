document.addEventListener('DOMContentLoaded', function() {
    // Welcoming message on page load for index.html only
    if (window.location.pathname.endsWith('index.html')) {
        alert('Welcome to our website!'); 
        displayGreeting(); 
    }

    // Function to display a personalized greeting
    function displayGreeting() {
        const userName = prompt("What's your name?"); 
        if (userName) {
            const greetingElement = document.createElement('h1'); 
            greetingElement.textContent = `Welcome, ${userName}!`; 
            greetingElement.style.textAlign = 'center'; 
            greetingElement.style.position = 'absolute'; 
            greetingElement.style.top = '30%';
            greetingElement.style.left = '50%'; 
            greetingElement.style.transform = 'translate(-50%, -50%)'; 
            greetingElement.style.margin = '0'; 
            document.body.appendChild(greetingElement); 
            setTimeout(function() {
                document.body.removeChild(greetingElement); 
            }, 1000);
        }
    }

   
});

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for lazy loading
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '50px',
        threshold: 0.1
    });

    // Observe all story sections
    document.querySelectorAll('.story-section').forEach(section => {
        observer.observe(section);
    });

    // Defer non-critical resources
    function loadDeferredStyles() {
        const additionalStyles = document.querySelectorAll('link[data-defer]');
        additionalStyles.forEach(style => {
            style.setAttribute('rel', 'stylesheet');
        });
    }

    // Load non-critical resources after page load
    if (window.requestIdleCallback) {
        requestIdleCallback(loadDeferredStyles);
    } else {
        setTimeout(loadDeferredStyles, 0);
    }

    // Add smooth loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.addEventListener('load', function() {
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const header = document.querySelector('header');
    const productCards = document.querySelectorAll('.product-card');
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navLinks.contains(event.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Handle dropdown menus
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            this.classList.toggle('show');
            dropdowns.forEach(d => {
                if (d !== this) d.classList.remove('show');
            });
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // CTA button hover animations
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('pulse');
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const errors = validateForm(formData);
            
            if (Object.keys(errors).length === 0) {
                // Submit form
                submitForm(formData);
            } else {
                displayFormErrors(errors);
            }
        });
    }

    // Form validation helper
    function validateForm(formData) {
        const errors = {};
        
        if (!formData.get('email').match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (formData.get('message').length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        return errors;
    }

    // Form submission handler
    function submitForm(formData) {
        // Add your form submission logic here
        console.log('Form submitted:', Object.fromEntries(formData));
    }

    // Error display helper
    function displayFormErrors(errors) {
        Object.entries(errors).forEach(([field, message]) => {
            const errorElement = document.querySelector(`.error-${field}`);
            if (errorElement) {
                errorElement.textContent = message;
            }
        });
    }
}); 