// Gallery data with your custom images
// TO ADD YOUR OWN IMAGES: Replace the 'src' URLs below with paths to your own images
// Images should be placed in the 'src/images' folder in your project
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

class GalleryManager {
    constructor() {
        this.currentItems = [];
        this.filteredItems = [...galleryData];
        this.itemsPerLoad = 12;
        this.currentIndex = 0;
        this.lightboxIndex = 0;
        
        this.init();
    }
    
    init() {
        this.loadInitialItems();
        this.setupEventListeners();
        this.setupLightbox();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
    }
    
    loadInitialItems() {
        this.loadMoreItems();
    }
    
    loadMoreItems() {
        const endIndex = this.currentIndex + this.itemsPerLoad;
        const newItems = this.filteredItems.slice(this.currentIndex, endIndex);
        
        newItems.forEach((item, index) => {
            setTimeout(() => {
                this.createGalleryItem(item);
            }, index * 100);
        });
        
        this.currentIndex = endIndex;
        
        // Hide load more button if all items are loaded
        const loadMoreBtn = document.getElementById('load-more');
        if (this.currentIndex >= this.filteredItems.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    createGalleryItem(item) {
        const galleryContainer = document.getElementById('gallery-container');
        const galleryItem = document.createElement('div');
        galleryItem.className = `gallery-item ${item.category}`;
        galleryItem.dataset.category = item.category;
        galleryItem.dataset.id = item.id;
        
        if (item.type === 'video') {
            galleryItem.innerHTML = `
                <video poster="${item.poster}">
                    <source src="${item.src}" type="video/mp4">
                </video>
                <div class="gallery-overlay">
                    <h3>${item.title}</h3>
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
        galleryContainer.appendChild(galleryItem);
        this.currentItems.push(item);
    }
    
    setupEventListeners() {
        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterGallery(e.target.dataset.filter);
                
                // Update active button
                filterButtons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        
        // Load more button
        document.getElementById('load-more').addEventListener('click', () => {
            this.loadMoreItems();
        });
        
        // Mobile navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Contact form
        document.getElementById('contact-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(e.target);
        });
    }
    
    filterGallery(filter) {
        const galleryContainer = document.getElementById('gallery-container');
        galleryContainer.innerHTML = '';
        
        if (filter === 'all') {
            this.filteredItems = [...galleryData];
        } else {
            this.filteredItems = galleryData.filter(item => item.category === filter);
        }
        
        this.currentItems = [];
        this.currentIndex = 0;
        this.loadMoreItems();
    }
    
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        closeBtn.addEventListener('click', () => this.closeLightbox());
        prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
        nextBtn.addEventListener('click', () => this.navigateLightbox(1));
        
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
        
        document.getElementById('lightbox').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    displayLightboxItem(item) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxVideo = document.getElementById('lightbox-video');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxDescription = document.getElementById('lightbox-description');
        
        lightboxTitle.textContent = item.title;
        lightboxDescription.textContent = item.description;
        
        if (item.type === 'video') {
            lightboxImage.style.display = 'none';
            lightboxVideo.style.display = 'block';
            lightboxVideo.querySelector('source').src = item.src;
            lightboxVideo.load();
        } else {
            lightboxVideo.style.display = 'none';
            lightboxImage.style.display = 'block';
            lightboxImage.src = item.src;
            lightboxImage.alt = item.title;
        }
    }
    
    navigateLightbox(direction) {
        this.lightboxIndex += direction;
        
        if (this.lightboxIndex >= galleryData.length) {
            this.lightboxIndex = 0;
        } else if (this.lightboxIndex < 0) {
            this.lightboxIndex = galleryData.length - 1;
        }
        
        this.displayLightboxItem(galleryData[this.lightboxIndex]);
    }
    
    closeLightbox() {
        document.getElementById('lightbox').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Pause video if playing
        const lightboxVideo = document.getElementById('lightbox-video');
        if (!lightboxVideo.paused) {
            lightboxVideo.pause();
        }
    }
    
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements as they're added
        const observeElements = () => {
            document.querySelectorAll('.service-card, .gallery-item').forEach(el => {
                if (!el.dataset.observed) {
                    observer.observe(el);
                    el.dataset.observed = 'true';
                }
            });
        };
        
        // Initial observation
        setTimeout(observeElements, 100);
        
        // Re-observe when new items are added
        const galleryContainer = document.getElementById('gallery-container');
        if (galleryContainer) {
            new MutationObserver(observeElements).observe(galleryContainer, {
                childList: true
            });
        }
    }
    
    handleFormSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We\'ll get back to you soon.');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});