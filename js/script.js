document.addEventListener('DOMContentLoaded', function() {
    // Typing animation for hero section
    const typingText = document.querySelector('.typing-text');
    const typingSubtext = document.querySelector('.typing-subtext');
    const text = "FULL Stack/MERN Stack Web Developer";
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            typingSubtext.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            typingText.classList.remove('typing-text');
        }
    }
    
    // Start typing animation after hero text appears
    setTimeout(typeWriter, 1500);
    
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Resume download tracking
    document.querySelectorAll('a[download]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Optional: Track download event in analytics
            console.log('Resume download initiated');
            
            // Optional: Add a small delay for better UX
            setTimeout(() => {
                // You could also add a confirmation message
                // alert('Your download will begin shortly...');
            }, 300);
        });
    });
    
    // Scroll animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-img, .about-text, .project-card, .skill-category, .carousel-container, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
    
    // Carousel functionality
    const carouselSlide = document.querySelector('.carousel-slide');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const indicators = document.querySelector('.carousel-indicators');
    let currentIndex = 0;
    const slideCount = slides.length;
    
    // Create indicators
    for (let i = 0; i < slideCount; i++) {
        const indicator = document.createElement('span');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }
    
    function updateCarousel() {
        carouselSlide.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active slide and indicator
        document.querySelectorAll('.slide').forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.carousel-indicators span').forEach(ind => ind.classList.remove('active'));
        
        slides[currentIndex].classList.add('active');
        indicators.children[currentIndex].classList.add('active');
    }
    
    function goToSlide(index) {
        currentIndex = (index + slideCount) % slideCount;
        updateCarousel();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Auto slide change
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    carouselSlide.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carouselSlide.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));
    
    // Tilt effect initialization
    const tiltElements = document.querySelectorAll('.tilt');
    
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            element.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.03)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
    
    // Current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Check if resume was requested
        const sendResume = this.querySelector('input[name="send-resume"]').checked;
        
        if (sendResume) {
            // In a real implementation, you would send the resume via email
            console.log('Resume requested by the user');
        }
        
        // Here you would typically send the form data to a server
        // For this example, we'll just show an alert
        alert('Thank you for your message! ' + (sendResume ? 'A copy of my resume has been sent to your email.' : 'I will get back to you soon.'));
        this.reset();
    });
    
    // Initialize skill bars animation
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Animate skill bars when skills section is in view
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
});