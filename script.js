document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal logic
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll(".fade-up");
    fadeElements.forEach(el => observer.observe(el));

    // Navbar blur on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(19, 21, 31, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(19, 21, 31, 0.6)';
            navbar.style.backdropFilter = 'blur(12px)';
        }
    });

    // Smooth scroll for anchor tags
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Accordion functionality
    const accHeaders = document.querySelectorAll('.acc-header');
    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            
            // Close all other active accordions in the same group
            const group = item.parentElement;
            group.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                }
            });
            
            // Toggle current
            item.classList.toggle('active');
        });
    });
    
    // Open first accordion by default
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(acc => {
        const firstItem = acc.querySelector('.accordion-item');
        if (firstItem) {
            firstItem.classList.add('active');
        }
    });

    // Image Modal Logic
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const zoomContainers = document.querySelectorAll(".image-zoom-container");
    const closeBtn = document.getElementById("modalClose");

    if (modal && zoomContainers.length > 0 && modalImage && closeBtn) {
        zoomContainers.forEach(container => {
            container.addEventListener("click", () => {
                const img = container.querySelector("img");
                if (img) {
                    modalImage.src = img.src;
                    modal.style.display = "block";
                    // Trigger reflow for transition
                    void modal.offsetWidth;
                    modal.classList.add("show");
                    document.body.style.overflow = "hidden"; // Prevent scrolling
                }
            });
        });

        const closeModal = () => {
            modal.classList.remove("show");
            setTimeout(() => {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }, 300); // Wait for transition
        };

        closeBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal.classList.contains("show")) {
                closeModal();
            }
        });
    }
});
