// ==========================================================================
// CohScapes Landscaping - Main Interactive Script
// ==========================================================================

// Gallery data with custom project images
const galleryData = [
    // Garden Design Projects (40 items)
    {
        id: 1,
        type: 'image',
        category: 'garden',
        title: 'Modern Garden Transformation',
        description: 'Complete garden redesign with native plants and water features.',
        src: 'src/images/garden/garden-01.jpg'
    },
    {
        id: 2,
        type: 'image',
        category: 'garden',
        title: 'Perennial Garden Design',
        description: 'Seasonal flower garden with year-round color and texture.',
        src: 'src/images/garden/garden-02.jpg'
    },
    {
        id: 3,
        type: 'image',
        category: 'garden',
        title: 'Zen Garden Installation',
        description: 'Peaceful meditation garden with Japanese-inspired elements.',
        src: 'src/images/garden/garden-03.jpg'
    },
    // Garden images 4-40
    ...Array.from({length: 37}, (_, i) => ({
        id: i + 4,
        type: 'image',
        category: 'garden',
        title: `Garden Project ${i + 4}`,
        description: 'Beautiful custom garden design featuring native plants and sustainable landscaping.',
        src: `src/images/garden/garden-${String(i + 4).padStart(2, '0')}.jpg`
    })),
    
    // Hardscaping Projects (30 items)
    {
        id: 41,
        type: 'image',
        category: 'hardscape',
        title: 'Stone Patio Installation',
        description: 'Natural stone patio with integrated seating and fire pit.',
        src: 'src/images/hardscape/hardscape-01.jpg'
    },
    {
        id: 42,
        type: 'image',
        category: 'hardscape',
        title: 'Retaining Wall Project',
        description: 'Decorative retaining wall with built-in planters.',
        src: 'src/images/hardscape/hardscape-02.jpg'
    },
    // Hardscape images 3-30
    ...Array.from({length: 28}, (_, i) => ({
        id: i + 43,
        type: 'image',
        category: 'hardscape',
        title: `Hardscaping Project ${i + 3}`,
        description: 'Professional hardscaping including patios, walkways, and retaining walls.',
        src: `src/images/hardscape/hardscape-${String(i + 3).padStart(2, '0')}.jpg`
    })),
    
    // Lawn Care Projects (25 items)
    {
        id: 71,
        type: 'image',
        category: 'lawn',
        title: 'Lawn Renovation Project',
        description: 'Complete lawn restoration with new sod and irrigation.',
        src: 'src/images/lawn/lawn-01.jpg'
    },
    // Lawn images 2-25
    ...Array.from({length: 24}, (_, i) => ({
        id: i + 72,
        type: 'image',
        category: 'lawn',
        title: `Lawn Care Project ${i + 2}`,
        description: 'Professional lawn installation and maintenance services for pristine grass.',
        src: `src/images/lawn/lawn-${String(i + 2).padStart(2, '0')}.jpg`
    })),
    
    // Tree & Plant Projects (25 items)
    {
        id: 96,
        type: 'image',
        category: 'trees',
        title: 'Mature Tree Installation',
        description: 'Large tree planting with proper root ball preparation.',
        src: 'src/images/trees/trees-01.jpg'
    },
    // Tree images 2-25
    ...Array.from({length: 24}, (_, i) => ({
        id: i + 97,
        type: 'image',
        category: 'trees',
        title: `Tree & Plant Project ${i + 2}`,
        description: 'Expert tree planting and plant selection for optimal growth and beauty.',
        src: `src/images/trees/trees-${String(i + 2).padStart(2, '0')}.jpg`
    })),
    
    // Outdoor Living Project (1 video)
    {
        id: 121,
        type: 'video',
        category: 'outdoor',
        title: 'Outdoor Living Space Transformation',
        description: 'Complete outdoor living space with fire pit, seating area, and landscape lighting.',
        src: 'src/videos/outdoor-living-project.mp4',
        poster: 'poster/images/outdoor/outdoor-poster.jpg'
    }
];

class CohScapesApp {
    constructor() {
        this.galleryItems = [];
        this.filteredItems = [...galleryData];
        this.itemsPerLoad = 12;
        this.currentIndex = 0;
        this.lightboxIndex = 0;

        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupGallery();
        this.setupLightbox();
        this.setupBeforeAfterSlider();
        this.setupEstimator();
        this.setupFAQ();
        this.setupContactForm();
        this.setupSmoothScroll();
    }

    // ==========================================================================
    // Navigation & Mobile Drawer
    // ==========================================================================
    setupNavigation() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', (e) => {
                e.stopPropagation();
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });

            // Close menu when clicking any nav link
            document.querySelectorAll('.nav-link, .btn-wa-mobile').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }

        // Navbar shadow on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 40) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // ==========================================================================
    // Gallery Management
    // ==========================================================================
    setupGallery() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const loadMoreBtn = document.getElementById('load-more');

        // Load initial batch
        this.loadMoreGalleryItems();

        // Setup filter tabs
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.filterGallery(filter);

                filterButtons.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
            });
        });

        // Load more button
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreGalleryItems();
            });
        }
    }

    loadMoreGalleryItems() {
        const endIndex = this.currentIndex + this.itemsPerLoad;
        const newItems = this.filteredItems.slice(this.currentIndex, endIndex);

        newItems.forEach((item, index) => {
            setTimeout(() => {
                this.createGalleryItem(item);
            }, index * 40);
        });

        this.currentIndex = endIndex;

        const loadMoreBtn = document.getElementById('load-more');
        if (loadMoreBtn) {
            loadMoreBtn.style.display = this.currentIndex >= this.filteredItems.length ? 'none' : 'inline-block';
        }
    }

    createGalleryItem(item) {
        const container = document.getElementById('gallery-container');
        if (!container) return;

        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.id = item.id;

        if (item.type === 'video') {
            galleryItem.innerHTML = `
                <video poster="${item.poster}" preload="none">
                    <source src="${item.src}" type="video/mp4">
                </video>
                <div class="gallery-overlay">
                    <h3>▶ ${item.title}</h3>
                </div>
            `;
        } else {
            galleryItem.innerHTML = `
                <img src="${item.src}" alt="${item.title}" loading="lazy">
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
                </div>
            `;
        }

        galleryItem.addEventListener('click', () => this.openLightbox(item.id));
        container.appendChild(galleryItem);
    }

    filterGallery(filter) {
        const container = document.getElementById('gallery-container');
        if (!container) return;
        container.innerHTML = '';

        if (filter === 'all') {
            this.filteredItems = [...galleryData];
        } else {
            this.filteredItems = galleryData.filter(item => item.category === filter);
        }

        this.currentIndex = 0;
        this.loadMoreGalleryItems();
    }

    // ==========================================================================
    // Lightbox Modal
    // ==========================================================================
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (!lightbox) return;

        closeBtn?.addEventListener('click', () => this.closeLightbox());
        prevBtn?.addEventListener('click', () => this.navigateLightbox(-1));
        nextBtn?.addEventListener('click', () => this.navigateLightbox(1));

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
                if (e.key === 'ArrowRight') this.navigateLightbox(1);
            }
        });
    }

    openLightbox(itemId) {
        const item = galleryData.find(i => i.id === itemId);
        if (!item) return;

        this.lightboxIndex = galleryData.indexOf(item);
        this.displayLightboxItem(item);

        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    displayLightboxItem(item) {
        const img = document.getElementById('lightbox-image');
        const video = document.getElementById('lightbox-video');
        const title = document.getElementById('lightbox-title');
        const desc = document.getElementById('lightbox-description');

        if (title) title.textContent = item.title;
        if (desc) desc.textContent = item.description;

        if (item.type === 'video') {
            if (img) img.style.display = 'none';
            if (video) {
                video.style.display = 'block';
                video.querySelector('source').src = item.src;
                video.load();
            }
        } else {
            if (video) {
                video.style.display = 'none';
                if (!video.paused) video.pause();
            }
            if (img) {
                img.style.display = 'block';
                img.src = item.src;
                img.alt = item.title;
            }
        }
    }

    navigateLightbox(direction) {
        this.lightboxIndex += direction;
        if (this.lightboxIndex >= galleryData.length) this.lightboxIndex = 0;
        if (this.lightboxIndex < 0) this.lightboxIndex = galleryData.length - 1;

        this.displayLightboxItem(galleryData[this.lightboxIndex]);
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = 'auto';

            const video = document.getElementById('lightbox-video');
            if (video && !video.paused) video.pause();
        }
    }

    // ==========================================================================
    // Before & After Interactive Slider
    // ==========================================================================
    setupBeforeAfterSlider() {
        const container = document.getElementById('before-after-box');
        const afterWrapper = document.getElementById('after-wrapper');
        const handle = document.getElementById('slider-handle');
        const tabs = document.querySelectorAll('.slider-tab-btn');
        const beforeImg = document.getElementById('before-img');
        const afterImg = document.getElementById('after-img');
        const titleEl = document.getElementById('transformation-title');
        const descEl = document.getElementById('transformation-desc');

        if (!container || !afterWrapper || !handle) return;

        let isDragging = false;

        const updateSliderPosition = (clientX) => {
            const rect = container.getBoundingClientRect();
            let posX = clientX - rect.left;

            if (posX < 0) posX = 0;
            if (posX > rect.width) posX = rect.width;

            const percentage = (posX / rect.width) * 100;
            afterWrapper.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Mouse events
        handle.addEventListener('mousedown', () => isDragging = true);
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            updateSliderPosition(e.clientX);
        });

        // Touch events for mobile
        handle.addEventListener('touchstart', () => isDragging = true);
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            if (e.touches && e.touches[0]) {
                updateSliderPosition(e.touches[0].clientX);
            }
        });

        // Click anywhere on container to jump slider
        container.addEventListener('click', (e) => {
            updateSliderPosition(e.clientX);
        });

        // Preset Tab switching
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.forEach(t => t.classList.remove('active'));
                e.currentTarget.classList.add('active');

                const beforeSrc = e.currentTarget.dataset.before;
                const afterSrc = e.currentTarget.dataset.after;
                const title = e.currentTarget.dataset.title;
                const desc = e.currentTarget.dataset.desc;

                if (beforeImg) beforeImg.src = beforeSrc;
                if (afterImg) afterImg.src = afterSrc;
                if (titleEl) titleEl.textContent = title;
                if (descEl) descEl.textContent = desc;

                // Reset position to center 50%
                afterWrapper.style.width = '50%';
                handle.style.left = '50%';
            });
        });
    }

    // ==========================================================================
    // Instant Landscaping Cost Estimator
    // ==========================================================================
    setupEstimator() {
        const serviceBtns = document.querySelectorAll('#service-options .opt-btn');
        const sizeBtns = document.querySelectorAll('#size-options .opt-btn');
        const addonCheckboxes = document.querySelectorAll('.addon-checkboxes input[type="checkbox"]');
        const waEstimateBtn = document.getElementById('btn-share-estimate-wa');

        let currentBase = 35000;
        let currentServiceName = 'Lawn Installation & Turf';
        let currentMultiplier = 1.0;
        let currentSizeName = 'Standard Compound (< 500 sqm)';

        const formatKES = (num) => {
            return num.toLocaleString('en-US');
        };

        const recalculate = () => {
            let addonsTotal = 0;
            const selectedAddonNames = [];

            addonCheckboxes.forEach(cb => {
                if (cb.checked) {
                    addonsTotal += parseInt(cb.dataset.price || 0, 10);
                    const label = cb.closest('.addon-item')?.querySelector('span')?.textContent.trim() || 'Add-on';
                    selectedAddonNames.push(label);
                }
            });

            const calculatedMin = Math.round((currentBase * currentMultiplier) + addonsTotal);
            const calculatedMax = Math.round(calculatedMin * 1.3);

            // Update DOM
            const minEl = document.getElementById('calc-price-min');
            const maxEl = document.getElementById('calc-price-max');
            const summaryService = document.getElementById('summary-service');
            const summarySize = document.getElementById('summary-size');
            const summaryAddons = document.getElementById('summary-addons');

            if (minEl) minEl.textContent = formatKES(calculatedMin);
            if (maxEl) maxEl.textContent = formatKES(calculatedMax);
            if (summaryService) summaryService.textContent = currentServiceName;
            if (summarySize) summarySize.textContent = currentSizeName;
            if (summaryAddons) {
                summaryAddons.textContent = selectedAddonNames.length > 0 
                    ? selectedAddonNames.join(', ') 
                    : 'None';
            }
        };

        // Service buttons handler
        serviceBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                serviceBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                currentBase = parseInt(e.currentTarget.dataset.base, 10);
                currentServiceName = e.currentTarget.textContent.trim();
                recalculate();
            });
        });

        // Size buttons handler
        sizeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                sizeBtns.forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                currentMultiplier = parseFloat(e.currentTarget.dataset.multiplier);
                currentSizeName = e.currentTarget.textContent.trim();
                recalculate();
            });
        });

        // Addon checkboxes handler
        addonCheckboxes.forEach(cb => {
            cb.addEventListener('change', recalculate);
        });

        // Send Scope to WhatsApp
        if (waEstimateBtn) {
            waEstimateBtn.addEventListener('click', () => {
                const minPrice = document.getElementById('calc-price-min')?.textContent || '';
                const maxPrice = document.getElementById('calc-price-max')?.textContent || '';
                const summaryAddons = document.getElementById('summary-addons')?.textContent || 'None';

                const text = `Hello CohScapes! 🌿\n\nI generated an estimate on your website and would like to confirm a site visit:\n` +
                    `• Service: ${currentServiceName}\n` +
                    `• Property Size: ${currentSizeName}\n` +
                    `• Add-ons: ${summaryAddons}\n` +
                    `• Estimated Range: KES ${minPrice} - ${maxPrice}\n\n` +
                    `Please let me know when your team can visit my compound!`;

                const waUrl = `https://wa.me/254758467157?text=${encodeURIComponent(text)}`;
                window.open(waUrl, '_blank');
            });
        }

        recalculate();
    }

    // ==========================================================================
    // FAQ Accordion
    // ==========================================================================
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const questionBtn = item.querySelector('.faq-question');
            questionBtn?.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close others
                faqItems.forEach(i => i.classList.remove('active'));

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }

    // ==========================================================================
    // Contact Form & WhatsApp Submission
    // ==========================================================================
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        const submitWaBtn = document.getElementById('btn-submit-wa');

        // Service card click pre-populates service dropdown and scrolls to contact
        document.querySelectorAll('.service-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const requestedService = e.currentTarget.dataset.service;
                const serviceSelect = document.getElementById('form-service');
                if (serviceSelect && requestedService) {
                    for (let i = 0; i < serviceSelect.options.length; i++) {
                        if (serviceSelect.options[i].text.includes(requestedService)) {
                            serviceSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            });
        });

        // Submit via WhatsApp button
        if (submitWaBtn && contactForm) {
            submitWaBtn.addEventListener('click', () => {
                const name = document.getElementById('form-name')?.value.trim() || '';
                const phone = document.getElementById('form-phone')?.value.trim() || '';
                const location = document.getElementById('form-location')?.value.trim() || 'Nairobi';
                const service = document.getElementById('form-service')?.value || 'Landscaping';
                const size = document.getElementById('form-size')?.value || 'Standard';
                const message = document.getElementById('form-message')?.value.trim() || '';

                if (!name || !phone) {
                    alert('Please enter your name and phone number before submitting via WhatsApp.');
                    return;
                }

                const waText = `Hello CohScapes! 🌿\n\nI would like to request a consultation:\n` +
                    `• Name: ${name}\n` +
                    `• Phone: ${phone}\n` +
                    `• Location: ${location}\n` +
                    `• Service: ${service}\n` +
                    `• Compound Size: ${size}\n` +
                    (message ? `• Note: ${message}\n` : '') +
                    `\nPlease let me know your availability for a free site visit.`;

                const waUrl = `https://wa.me/254758467157?text=${encodeURIComponent(waText)}`;
                window.open(waUrl, '_blank');
            });
        }

        // Standard Email / Form submit
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('.btn-submit');
                const origText = submitBtn.textContent;

                submitBtn.textContent = 'Sending Message...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    alert('Thank you! Your inquiry has been received. Our team will contact you shortly to confirm your consultation.');
                    contactForm.reset();
                    submitBtn.textContent = origText;
                    submitBtn.disabled = false;
                }, 1200);
            });
        }
    }

    // ==========================================================================
    // Smooth Scrolling
    // ==========================================================================
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    const navHeight = document.getElementById('navbar')?.offsetHeight || 70;
                    const topBarHeight = document.querySelector('.top-bar')?.offsetHeight || 0;
                    const offsetTop = target.offsetTop - (navHeight + 10);

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new CohScapesApp();
});