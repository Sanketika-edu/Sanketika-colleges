// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize particles background
  createParticles();

  // Initialize scroll animations
  initScrollAnimations();

  // Initialize navigation
  initNavigation();

  // Initialize form submission
  initContactForm();

  // Initialize course buttons
  initCourseButtons();

  // Initialize interactive elements
  initInteractiveElements();
});

// Create animated particles for background
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    // Random size, position, and animation
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.width = ${size}px;
    particle.style.height = ${size}px;
    particle.style.left = ${posX}%;
    particle.style.top = ${posY}%;
    particle.style.animationDuration = ${duration}s;
    particle.style.animationDelay = ${delay}s;
    particle.style.backgroundColor = `rgba(192, 192, 192, ${
      Math.random() * 0.5 + 0.1
    })`;

    particlesContainer.appendChild(particle);
  }

  // Add CSS for particles
  const style = document.createElement("style");
  style.textContent = `
        .particle {
            position: absolute;
            border-radius: 50%;
            animation: float-particle linear infinite;
        }
        
        @keyframes float-particle {
            0% {
                transform: translateY(0) translateX(0);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) translateX(20px);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
}

// Initialize scroll animations
function initScrollAnimations() {
  // Create Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // For course cards, stagger the animation
        if (entry.target.classList.contains("course-card")) {
          const index = Array.from(entry.target.parentNode.children).indexOf(
            entry.target
          );
          entry.target.style.transitionDelay = ${index * 0.1}s;
        }
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  document.querySelectorAll(".fade-in, .slide-up").forEach((el) => {
    observer.observe(el);
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const nav = document.querySelector(".glass-nav");
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
  });
}

// Initialize navigation
function initNavigation() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");

      // Update active link
      navLinks.forEach((item) => item.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth"
        });
      }
    });
  });
}

// Update active nav link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === #${currentSection}) {
      link.classList.add("active");
    }
  });
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        institution: document.getElementById("institution").value,
        message: document.getElementById("message").value
      };

      // Here you would typically send the data to a server
      // For demo purposes, we'll just show an alert
      const submitBtn = document.querySelector(".submit-btn");
      const originalText = submitBtn.textContent;

      // Simulate form submission
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      setTimeout(() => {
        alert(
          Thank you, ${formData.name}! Your message has been sent to ${formData.institution}. We'll get back to you at ${formData.email} soon.
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
}

// Initialize course buttons
function initCourseButtons() {
  const courseButtons = document.querySelectorAll(".course-btn");

  courseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const courseCard = this.closest(".course-card");
      const courseName = courseCard.querySelector(".course-name").textContent;

      // Create a modal-like effect
      const modal = document.createElement("div");
      modal.className = "course-modal glass-card";
      modal.innerHTML = `
                <div class="modal-content">
                    <h3>${courseName}</h3>
                    <p>More detailed information about this course would appear here. This could include:</p>
                    <ul>
                        <li>Course duration and structure</li>
                        <li>Eligibility criteria</li>
                        <li>Career opportunities</li>
                        <li>Special facilities available</li>
                        <li>Faculty expertise</li>
                    </ul>
                    <p>For complete details, please contact our admissions office.</p>
                    <button class="btn silver-btn close-modal">Close</button>
                </div>
            `;

      // Add modal styles
      const style = document.createElement("style");
      style.textContent = `
                .course-modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 600px;
                    padding: 2rem;
                    z-index: 2000;
                    animation: modalFadeIn 0.3s ease;
                }
                
                .modal-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }
                
                .modal-content h3 {
                    font-size: 1.8rem;
                    color: #C0C0C0;
                }
                
                .modal-content ul {
                    margin-left: 1.5rem;
                }
                
                .modal-content li {
                    margin-bottom: 0.5rem;
                }
                
                .close-modal {
                    align-self: flex-start;
                }
                
                @keyframes modalFadeIn {
                    from {
                        opacity: 0;
                        transform: translate(-50%, -60%);
                    }
                    to {
                        opacity: 1;
                        transform: translate(-50%, -50%);
                    }
                }
                
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                    z-index: 1999;
                }
            `;
      document.head.appendChild(style);

      // Create overlay
      const overlay = document.createElement("div");
      overlay.className = "modal-overlay";

      // Add to DOM
      document.body.appendChild(overlay);
      document.body.appendChild(modal);

      // Close modal functionality
      const closeBtn = modal.querySelector(".close-modal");
      closeBtn.addEventListener("click", () => {
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
      });

      overlay.addEventListener("click", () => {
        document.body.removeChild(modal);
        document.body.removeChild(overlay);
      });
    });
  });
}

// Initialize interactive elements
function initInteractiveElements() {
  // Add hover effect to glass cards
  const glassCards = document.querySelectorAll(".glass-card");

  glassCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.4)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
    });
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const x = e.clientX - e.target.getBoundingClientRect().left;
      const y = e.clientY - e.target.getBoundingClientRect().top;

      const ripple = document.createElement("span");
      ripple.style.left = ${x}px;
      ripple.style.top = ${y}px;
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple styles
  const rippleStyle = document.createElement("style");
  rippleStyle.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: 20px;
            height: 20px;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(10);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(rippleStyle);

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    };

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }
}
