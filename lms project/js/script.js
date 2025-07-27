document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initializeMobileMenu();
    initializeNavbarScroll();
    initializeBlogCarousel();
    initializePerformanceOptimizations();
    initializeAccessibility();
    initializeTouchOptimizations();
});

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            if (mobileMenuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                const spans = mobileMenuToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Navbar scroll effect with performance optimization
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
            navbar.style.transform = 'translateY(0)';
        } else if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        navbar.style.boxShadow = currentScroll > 0 ? '0 2px 20px rgba(255, 0, 255, 0.3)' : 'none';
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// Performance optimizations
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Preload critical resources
    const criticalResources = [
        'css/styles.css',
        'js/script.js'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = resource.endsWith('.css') ? 'style' : 'script';
        document.head.appendChild(link);
    });
    

}

// Accessibility improvements
function initializeAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id if not exists
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
    
    // Keyboard navigation for modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.querySelector('.modal[style*="display: block"]');
            if (modal) {
                closeBlogModal();
            }
        }
    });
    
    // Focus management for modals
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (firstElement && lastElement) {
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Tab') {
                    if (e.shiftKey) {
                        if (document.activeElement === firstElement) {
                            e.preventDefault();
                            lastElement.focus();
                        }
                    } else {
                        if (document.activeElement === lastElement) {
                            e.preventDefault();
                            firstElement.focus();
                        }
                    }
                }
            });
        }
    });
}

// Touch device optimizations
function initializeTouchOptimizations() {
    // Add touch-action CSS for better touch performance
    const touchElements = document.querySelectorAll('button, a, .carousel-blog-card, .feature-card');
    touchElements.forEach(element => {
        element.style.touchAction = 'manipulation';
    });
    
    // Prevent double-tap zoom on mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Add passive event listeners for better scroll performance
    const passiveEvents = ['touchstart', 'touchmove', 'wheel'];
    passiveEvents.forEach(eventType => {
        document.addEventListener(eventType, () => {}, { passive: true });
    });
}

// Blog carousel data and functions
const blogData = [
    {
        id: 1,
        title: "Bias in AI: Can Machine Learning Be Truly Fair?",
        content: "As artificial intelligence systems become increasingly integrated into our daily lives, the question of algorithmic bias has emerged as a critical concern. This comprehensive analysis explores the various forms of bias that can manifest in machine learning models, from data bias to algorithmic bias, and examines the ethical implications of AI decision-making in areas such as hiring, lending, and criminal justice.",
        owner: "Pranjal",
        status: "featured",
        date: "2024-02-15",
        moduleId: "bias-ai-module"
    },
    {
        id: 2,
        title: "The Rise of Auto ML: Can You Build ML Models Without Coding?",
        content: "Automated Machine Learning (AutoML) is revolutionizing the way we approach data science and model development. This comprehensive guide explores how AutoML platforms are democratizing machine learning, allowing non-technical users to build sophisticated models without writing a single line of code. We examine the capabilities of leading AutoML tools, their applications across various industries, and the implications for the future of data science careers.",
        owner: "Pranjal",
        status: "published",
        date: "2024-02-20",
        moduleId: "automl-module"
    },
    {
        id: 3,
        title: "How to Build Your First Machine Learning Model Using Scikit-Learn",
        content: "A step-by-step guide to building your first machine learning model in Python using Scikit-learn. This tutorial covers everything from prerequisites and data loading to model training, evaluation, and visualization. Perfect for beginners looking to enter the field of machine learning with practical, hands-on experience.",
        owner: "Kapish",
        status: "published",
        date: "2024-07-01",
        moduleId: "scikit-learn-module"
    },
    {
        id: 4,
        title: "Understanding Confusion Matrix: Why Accuracy Isn't Everything in Machine Learning",
        content: "Learn why accuracy alone can be misleading and how the confusion matrix provides a complete picture of your model's performance. This article includes key metrics, real-world examples, and practical insights for evaluating classification models effectively in high-stakes situations like healthcare and finance.",
        owner: "Kapish",
        status: "published",
        date: "2024-07-02",
        moduleId: "confusion-matrix-module"
    },
    {
        id: 5,
        title: "How AI Is Revolutionizing Healthcare Diagnostics",
        content: "AI is transforming healthcare diagnostics in multiple ways, from predicting complex diseases before symptoms appear to minimizing turnaround times for imaging assessments. This comprehensive analysis explores current applications, benefits, challenges, and the future of AI in medical diagnostics.",
        owner: "Tania",
        status: "featured",
        date: "2024-04-15",
        moduleId: "ai-healthcare-module"
    },
    {
        id: 6,
        title: "Top 5 Open Datasets for Practicing Machine Learning",
        content: "Discover the best open datasets for developing your ML skills, from beginner-friendly options to complex real-world industry data. This guide covers trending datasets in climate science, AI safety, fake news detection, multimodal learning, and generative AI.",
        owner: "Tania",
        status: "published",
        date: "2024-04-20",
        moduleId: "ml-datasets-module"
    }
];

let currentSlide = 0;
let itemsPerView = 3;

function initializeBlogCarousel() {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicatorsContainer = document.getElementById('carouselIndicators');

    if (!carouselTrack) return;

    // Adjust items per view based on screen size
    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);

    // Load blog cards
    loadBlogCards();

    // Create indicators
    createIndicators();

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            previousSlide();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
        });
    }

    // Update button states
    updateButtonStates();

    // Auto-slide functionality (optional)
    startAutoSlide();
}

function updateItemsPerView() {
    const width = window.innerWidth;
    const containerWidth = Math.min(1200, width - 160); // Max width minus padding for buttons

    // Calculate based on card width (320px) + gap (32px)
    const cardWithGap = 352;
    const calculatedItems = Math.floor(containerWidth / cardWithGap);

    if (width < 768) {
        itemsPerView = 1;
    } else if (width < 1024) {
        itemsPerView = Math.max(1, Math.min(2, calculatedItems));
    } else {
        itemsPerView = Math.max(1, Math.min(3, calculatedItems));
    }

    if (document.getElementById('carouselTrack')) {
        updateSlidePosition();
        updateButtonStates();
        createIndicators(); // Recreate indicators when items per view changes
    }
}

function loadBlogCards() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    carouselTrack.innerHTML = blogData.map(blog => `
        <div class="carousel-blog-card">
            <div class="carousel-blog-header">
                <div>
                    <h3 class="carousel-blog-title">${blog.title}</h3>
                    <div class="carousel-blog-owner">${blog.owner}</div>
                </div>
                <div class="carousel-blog-status ${blog.status}">${blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}</div>
            </div>
            <p class="carousel-blog-content">${blog.content}</p>
            <button class="carousel-read-btn" onclick="openBlogModal('${blog.moduleId}')">📖 Read Full Article</button>
            <div class="carousel-blog-date">📅 ${formatDate(blog.date)}</div>
        </div>
    `).join('');
}

function createIndicators() {
    const indicatorsContainer = document.getElementById('carouselIndicators');
    if (!indicatorsContainer) return;

    const totalSlides = Math.ceil(blogData.length / itemsPerView);
    indicatorsContainer.innerHTML = '';

    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === currentSlide ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

function nextSlide() {
    const maxSlides = Math.ceil(blogData.length / itemsPerView);
    if (currentSlide < maxSlides - 1) {
        currentSlide++;
        updateSlidePosition();
        updateButtonStates();
        updateIndicators();
    }
}

function previousSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateSlidePosition();
        updateButtonStates();
        updateIndicators();
    }
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlidePosition();
    updateButtonStates();
    updateIndicators();
}

function updateSlidePosition() {
    const carouselTrack = document.getElementById('carouselTrack');
    if (!carouselTrack) return;

    // Get the actual card width and gap from the rendered elements
    const firstCard = document.querySelector('.carousel-blog-card');
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 32; // 2rem gap as defined in CSS
    const containerWidth = carouselTrack.parentElement.offsetWidth - 120; // Account for button padding

    // Calculate how many cards can fit completely in the viewport
    const cardsPerView = Math.floor((containerWidth + gap) / (cardWidth + gap));
    itemsPerView = Math.max(1, cardsPerView);

    // Calculate translate value to show complete cards only
    const translateX = -currentSlide * (cardWidth + gap) * itemsPerView;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
}

function updateButtonStates() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const maxSlides = Math.ceil(blogData.length / itemsPerView);

    if (prevBtn) {
        prevBtn.disabled = currentSlide === 0;
        prevBtn.style.opacity = currentSlide === 0 ? '0.5' : '1';
    }

    if (nextBtn) {
        nextBtn.disabled = currentSlide >= maxSlides - 1;
        nextBtn.style.opacity = currentSlide >= maxSlides - 1 ? '0.5' : '1';
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

let autoSlideInterval;

function startAutoSlide() {
    // Auto-slide every 5 seconds
    autoSlideInterval = setInterval(() => {
        const maxSlides = Math.ceil(blogData.length / itemsPerView);
        if (currentSlide < maxSlides - 1) {
            nextSlide();
        } else {
            currentSlide = 0;
            updateSlidePosition();
            updateButtonStates();
            updateIndicators();
        }
    }, 5000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Pause auto-slide on hover
document.addEventListener('DOMContentLoaded', () => {
    const carouselSection = document.getElementById('blog-carousel');
    if (carouselSection) {
        carouselSection.addEventListener('mouseenter', stopAutoSlide);
        carouselSection.addEventListener('mouseleave', startAutoSlide);
    }
});

// Blog modal functionality
let modalScrollPositions = {}; // Store scroll positions for each blog

// Load saved scroll positions from localStorage
function loadScrollPositions() {
    const saved = localStorage.getItem('blogScrollPositions');
    if (saved) {
        modalScrollPositions = JSON.parse(saved);
    }
}

// Save scroll positions to localStorage
function saveScrollPositions() {
    localStorage.setItem('blogScrollPositions', JSON.stringify(modalScrollPositions));
}

// Initialize scroll positions on page load
loadScrollPositions();

function openBlogModal(moduleId) {
    const modal = document.getElementById('home-blog-modal');
    const modalContent = document.getElementById('home-blog-modal-content');

    if (modal && modalContent) {
        const blogContent = getBlogModuleContent(moduleId);
        modalContent.innerHTML = blogContent;
        modal.style.display = 'block';

        // Prevent scrolling on the body while modal is open
        document.body.style.overflow = 'hidden';

        // Restore scroll position if it exists for this blog
        if (modalScrollPositions[moduleId]) {
            setTimeout(() => {
                modalContent.scrollTop = modalScrollPositions[moduleId];
                // Show a subtle notification that position was restored
                showNotification('📖 Resumed from where you left off', 'info');
            }, 10); // Small delay to ensure content is rendered
        } else {
            // If first time opening, scroll to top
            modalContent.scrollTop = 0;
        }

        // Close modal when clicking outside the content
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeBlogModal();
            }
        });

        // Add keyboard support to close modal with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeBlogModal();
            }
        });

        // Store scroll position when user scrolls
        modalContent.addEventListener('scroll', function() {
            modalScrollPositions[moduleId] = modalContent.scrollTop;
            saveScrollPositions(); // Save to localStorage
        });

        // Add a "Reset to Top" button if there's a saved position
        if (modalScrollPositions[moduleId]) {
            const resetButton = document.createElement('button');
            resetButton.innerHTML = '📖 Start from Beginning';
            resetButton.className = 'reset-scroll-btn';
            resetButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1001;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 12px;
                cursor: pointer;
                box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
            `;
            resetButton.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            resetButton.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
            resetButton.addEventListener('click', function() {
                modalContent.scrollTop = 0;
                modalScrollPositions[moduleId] = 0;
                saveScrollPositions(); // Save to localStorage
                this.remove();
                showNotification('📖 Started from beginning', 'info');
            });
            document.body.appendChild(resetButton);

            // The reset button will be removed by the closeBlogModal function
        }
    }
}

function closeBlogModal() {
    const modal = document.getElementById('home-blog-modal');
    const modalContent = document.getElementById('home-blog-modal-content');
    
    if (modal) {
        // Store current scroll position before closing
        if (modalContent) {
            const currentModuleId = getCurrentOpenBlogId();
            if (currentModuleId) {
                modalScrollPositions[currentModuleId] = modalContent.scrollTop;
                saveScrollPositions(); // Save to localStorage
            }
        }
        
        // Remove reset button if it exists
        const resetButton = document.querySelector('.reset-scroll-btn');
        if (resetButton) resetButton.remove();
        
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Helper function to get the currently open blog ID
function getCurrentOpenBlogId() {
    const modal = document.getElementById('home-blog-modal');
    if (modal && modal.style.display === 'block') {
        const modalContent = document.getElementById('home-blog-modal-content');
        if (modalContent) {
            // Find which blog is currently open by checking the content
            const blogModules = ['bias-ai-module', 'automl-module', 'scikit-learn-module', 
                               'confusion-matrix-module', 'ai-healthcare-module', 'ml-datasets-module'];
            
            for (let moduleId of blogModules) {
                const blogContent = getBlogModuleContent(moduleId);
                if (modalContent.innerHTML.includes(blogContent.split('<h2>')[1]?.split('</h2>')[0])) {
                    return moduleId;
                }
            }
        }
    }
    return null;
}

function getBlogModuleContent(moduleId) {
    // This function reuses the blog module data from dashboard.js
    const blogModules = {
        'bias-ai-module': `
            <div class="blog-module">
                <div class="blog-module-header">
                    <h2>Bias in AI: Can Machine Learning Be Truly Fair?</h2>
                    <div class="blog-meta">
                        <span class="author">By Pranjal</span>
                        <span class="date">February 15, 2024</span>
                    </div>
                </div>
                <div class="blog-module-content">
                    <p>When we think about bias, we can define it simply as discrimination. This means favoring one thing over another. But how does bias occur in AI? Is it really possible?</p>
                    <p>The answer is YES! It is possible.</p>
                    <p>Let's explore it.</p>
                    <p>We create various machine learning models to solve our business problems. But have we considered how the input data impacts the model? Bias in AI mainly arises from two factors:</p>
                    <ul>
                        <li>The model's design</li>
                        <li>The training data</li>
                    </ul>
                    <p>The data put into the model for predicting results is first analyzed by the AI. It studies the patterns to make certain predictions or outcomes.</p>
                    <p>Bias can also occur if the model is trained on an excessive amount of data from the same group. This means the AI will identify and analyze the common pattern, functioning according to what it recognized. Consequently, all conclusions will be biased. Even small biases can significantly affect a model's performance due to the large scale of machine learning.</p>
                    <p>Consider chatbots. They aim to improve program efficiency. But if bias exists within the human operator, there's a 99% chance the AI will show bias in its conclusions.</p>
                    <p>Thus, we must use these tools with caution because they can pose risks, especially for tech companies.</p>
                    <p>Last week, I heard an interesting story about Amazon's AI hiring tool. This model was designed to hire individuals based on specific criteria. As both men and women began submitting forms and resumes, an issue emerged.</p>
                    <p>The model favored only one gender: men.</p>
                    <p>The primary reason was that for over ten years, the model was trained on data where 90% of the resumes were from men. This led the AI to analyze a pattern that prioritized men over women.</p>
                    <p>There are many other examples in our daily lives.</p>
                    <p>A study by MIT Media Lab found that facial recognition systems from companies like IBM and Microsoft had over a 36% error rate in detecting dark-skinned women. This resulted from the systems being trained mainly to recognize light-skinned women, leaving them unable to identify an unrecognized group.</p>
                    <p>Interesting, right?</p>
                    <p>AI can be captivating if you delve into it. It resembles a vast, endless sea. No matter how deep you explore, there's always more to discover.</p>
                    <p>But the real question remains: Is machine learning truly fair?</p>
                    <p>The examples above demonstrate that machine learning cannot be completely fair. Numerous cases show that ML is not always just.</p>
                    <p>AI is created by us, humans.</p>
                    <p>We make mistakes, and that's common. Similarly, our machines will also make errors, though not as often. We are the ones feeding and training the data. Giving one-sided, biased data to the model for training is our responsibility.</p>
                    <p>If we had trained the model using all possible recognized categories, we might have avoided this issue, but we didn't.</p>
                    <p>Let's reflect on ourselves. We humans make many mistakes in our lives. If someone judges us solely based on past errors, they may miss our positive changes.</p>
                    <p>That's how machine learning operates. If a machine constantly analyzes the same old patterns, it will continue to judge data based on the past and struggle to recognize new data.</p>
                    <p>These biases in AI can cause significant problems for economic growth. Tech companies may face reduced profits and damage to their market reputation.</p>
                </div>
            </div>
        `,
        'automl-module': `
            <div class="blog-module">
                <div class="blog-module-header">
                    <h2>The Rise of Auto ML: Can You Build ML Models Without Coding?</h2>
                    <div class="blog-meta">
                        <span class="author">By Pranjal</span>
                        <span class="date">February 20, 2024</span>
                    </div>
                </div>
                <div class="blog-module-content">
                    <p>Automated Machine Learning, or AutoML, is transforming how we build predictive models. It automates the process of applying machine learning to real-world problems, making it accessible to people without extensive data science backgrounds.</p>
                    <p>In traditional machine learning workflows, data scientists manually select features, choose algorithms, tune hyperparameters, and evaluate models - a time-consuming and expertise-heavy process.</p>
                    <p>AutoML platforms handle these steps automatically:</p>
                    <ol>
                        <li>Data preprocessing and feature engineering</li>
                        <li>Algorithm selection</li>
                        <li>Hyperparameter optimization</li>
                        <li>Model evaluation and selection</li>
                        <li>Deployment preparation</li>
                    </ol>
                    <p>Leading AutoML tools like Google's Cloud AutoML, H2O.ai, DataRobot, and open-source options such as Auto-Sklearn and TPOT have democratized machine learning, allowing non-technical users to build sophisticated models.</p>
                    <p>But does this mean data scientists are becoming obsolete? Not at all.</p>
                    <p>While AutoML excels at standard problems with clean data, experienced data scientists remain essential for:</p>
                    <ul>
                        <li>Problem framing</li>
                        <li>Data quality assessment</li>
                        <li>Custom model architectures</li>
                        <li>Ethical and explainable AI considerations</li>
                    </ul>
                    <p>In conclusion, yes, you can build ML models without coding, but this does not replace data scientists. Instead, AutoML empowers more people to leverage machine learning while allowing data scientists to focus on more complex and innovative work.</p>
                </div>
            </div>
        `,
        'scikit-learn-module': `
            <div class="blog-module">
                <div class="blog-module-header">
                    <h2>How to Build Your First Machine Learning Model Using Scikit-Learn</h2>
                    <div class="blog-meta">
                        <span class="author">By Kapish</span>
                        <span class="date">July 1, 2024</span>
                    </div>
                </div>
                <div class="blog-module-content">
                    <p>The future belongs to those who learn more skills and combine them in creative ways. – Robert Greene</p>
                    <p>Machine learning is no longer just a buzzword. From Netflix recommendations to self-driving cars, it's transforming industries. If you have ever wondered how to take the plunge and jump into the field of machine learning, you are in the correct place.</p>
                    <p>In this simple, step-by-step guide, we will show you how to create your first machine learning model using Python's powerful library – Scikit-learn. Whether you are a student, a developer, or transitioning to tech, this tutorial is for you.</p>
                    <p><strong>Prerequisites:</strong></p>
                    <p>Before going to build your first machine learning model, make sure you all have the following installed:</p>
                    <ul>
                        <li>Python 3.x</li>
                        <li>Jupyter Notebook or any Python IDE</li>
                        <li>Basic understanding of Python (variables, lists, functions)</li>
                    </ul>
                    <p>Install required packages using pip: <code>pip install numpy pandas matplotlib scikit-learn</code></p>
                    <p><strong>What is Scikit-Learn?</strong></p>
                    <p>Scikit-learn is one of the most widely used machine learning libraries in Python. It is a simple and efficient tool for data mining and data analysis, as well as machine learning including classification, regression, clustering, etc.</p>
                    <p><strong>Step 1. Import necessary Libraries in python:</strong></p>
                    <p><code>import numpy as np<br>import pandas as pd<br>import matplotlib.pyplot as plt<br>from sklearn.model_selection import train_test_split<br>from sklearn.linear_model import LogisticRegression<br>from sklearn.metrics import accuracy_score</code></p>
                    <p><strong>Step 2. Load your Dataset:</strong></p>
                    <p>Let's use a popular built-in dataset: the Iris dataset, which contains measurements of iris flowers and their species-</p>
                    <p><code>from sklearn.datasets import load_iris<br>iris = load_iris()<br>X = iris.data <br>y = iris.target</code></p>
                    <p><strong>Step 3. Explore the Data:</strong></p>
                    <p><code>print("Feature names:", iris.feature_names)<br>print("Target names:", iris.target_names)<br>print("First 5 rows:\\n", X[:5])</code></p>
                    <p>This dataset contains 150 samples of 3 types of iris flowers: setosa, versicolor, and virginica, with 4 features: sepal length, sepal width, petal length, and petal width.</p>
                    <p><strong>Step 4. Split the Dataset:</strong></p>
                    <p><code>X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)</code></p>
                    <p><strong>Step 5. Train a Machine Learning Model:</strong></p>
                    <p>So let's use Logistic Regression, a popular and simple algorithm for classifying tasks.</p>
                    <p><code>model = LogisticRegression(max_iter=200)<br>model.fit(X_train, y_train)</code></p>
                    <p><strong>Step 6. Make Predictions:</strong></p>
                    <p><code>y_pred = model.predict(X_test)<br>print("Predicted labels:", y_pred)</code></p>
                    <p><strong>Step 7. Evaluate the model:</strong></p>
                    <p><code>accuracy = accuracy_score(y_test, y_pred)<br>print(f"Model Accuracy: {accuracy * 100:.2f}%")</code></p>
                    <p><strong>Step 8. Visualize the Data:</strong></p>
                    <p><code>plt.scatter(X[:, 0], X[:, 1], c=y, cmap='viridis')<br>plt.xlabel("Sepal length")<br>plt.ylabel("Sepal width")<br>plt.title("Iris Dataset Visualization")<br>plt.show()</code></p>
                    <p>You just built your first ML project using Scikit-learn.</p>
                    <p><strong>What You Have Done:</strong></p>
                    <p>You have seen the whole machine learning pipeline in this tutorial:</p>
                    <ul>
                        <li>Load and explore a dataset</li>
                        <li>Split the data into training data and testing data</li>
                        <li>Select and train a classification model</li>
                        <li>Produce predictions and evaluate performance</li>
                        <li>(Bonus) View data for better understanding</li>
                    </ul>
                    <p>This is an extremely capable foundation. Now, you can explore many different ML applications and move to more complex problems over time.</p>
                </div>
            </div>
        `,
        'confusion-matrix-module': `
            <div class="blog-module">
                <div class="blog-module-header">
                    <h2>Understanding Confusion Matrix: Why Accuracy Isn't Everything in Machine Learning</h2>
                    <div class="blog-meta">
                        <span class="author">By Kapish</span>
                        <span class="date">July 2, 2024</span>
                    </div>
                </div>
                <div class="blog-module-content">
                    <p>In the rapidly changing field of machine learning, when you've created a predictive model and received a high accuracy score it can feel as if you've won the lottery! Accuracy is just one measure, and focusing on accuracy alone can be misleading - especially in real-world and high-stakes situations.</p>
                    <p>For example, if you're building a cancer prediction model, a fraud detection system, or a spam classifier, focusing on accuracy presents an incomplete picture. This is why the confusion matrix (although it is simple, it is often overlooked) is an incredibly important tool as it gives you the complete performance picture of your classification model.</p>
                    <p><strong>Why can accuracy be misleading?</strong></p>
                    <p>To start with a simple example, you're building a machine learning model that predicts whether a patient has a rare disease that affects 1 in 100 people. If your model did nothing more than predict "no disease" for every patient, it would be 99% accurate. Awesome, right?</p>
                    <p>Think about that - if the model didn't help anyone where it mattered which was detecting the disease, it failed completely. This is the quintessential example of how a high accuracy can obscure failings with imbalanced datasets.</p>
                    <p>Accuracy just gives you a breakdown of the proportion of correct predictions, it does not differentiate between different kinds of errors. In many situations - particularly in healthcare or finance - there may be vastly different costs for false positives and false negatives. Because of this we need something more interesting than a number on a leaderboard.</p>
                    <p><strong>What is a Confusion Matrix?</strong></p>
                    <p>A confusion matrix is a table that allows you to visualize the performance of your classification algorithm. It breaks down your predictions into four categories whereas accuracy just gives you a number. The confusion matrix can tell you a complete story.</p>
                    <p>Here's how it looks for a binary classification problem:</p>
                    <ul>
                        <li><strong>True Positives (TP):</strong> The model predicted positive class cases, which are true positives. For example, the model predicted a person has the disease, and they actually have the disease.</li>
                        <li><strong>True Negatives (TN):</strong> The model predicted negative class cases, which are true negatives. So, it predicted no disease and the person does not have a disease.</li>
                        <li><strong>False Positives (FP):</strong> This represents a Type I error. The model predicted a positive result (detecting fraud), but the actual label was negative. This may cause erroneous alarms or unfortunate actions to be taken.</li>
                        <li><strong>False Negatives (FN):</strong> This represents a Type II error. The model predicted a negative result, but it was actually positive. This is usually more dangerous, e.g. failing to detect cancer or fail to detect fraudulent activity.</li>
                    </ul>
                    <p>From the confusion matrix, you can calculate several metrics including Precision, Recall, F1-Score, and Specificity, each giving you different insights into your model's performance on different types of errors.</p>
                    <p>Next time you build a classification model, look beyond accuracy and explore the full confusion matrix to understand your model's true performance.</p>
                </div>
            </div>
        `,
        'ai-healthcare-module': `
            <div class="blog-module">
                <div class="blog-module-header">
                    <h2>How AI Is Revolutionizing Healthcare Diagnostics</h2>
                    <div class="blog-meta">
                        <span class="author">By Tania</span>
                        <span class="date">April 15, 2024</span>
                    </div>
                </div>
                <div class="blog-module-content">
                    <p><strong>Introduction:</strong></p>
                    <p>When we think of the future, we may picture advanced artificial intelligence (AI) as it is represented in Science Fiction. In fact, AI is changing industries and healthcare is amongst the most impacted. AI is changing different facets of healthcare, but as far as new actually changing healthcare, diagnostics is the most paramount way in which AI is changing healthcare. AI is changing diagnostics in multiple and far-reaching ways, from predictably predicting complex diseases before the public even realizes they exist for example, to minimizing turnaround times for imaging assessments. AI is complementing healthcare workers, and in some cases saving lives. This blog will review how AI is changing healthcare diagnostics - including its current uses, pros and cons, and importantly, where the field is going.</p>
                    
                    <p><strong>What is AI, and how does AI work in healthcare?</strong></p>
                    <p>AI is generally understood as a broad term that describes a range of technologies, such as "machine learning" and "deep learning". In general, machine learning refers to computers' ability to learn without being programmed explicitly. "Basically, machine learning is the ability of the computer to learn from data without being explicitly programmed," This means machines can detect patterns, make predictions, and gain insight over time. Deep learning refers to the advanced algorithms, inspired by how the human brain functions, used to perform steps of machine learning with larger amounts of data. For example, deep learning is used in image data and image-based analytics.</p>
                    <p>AI analyzes huge amounts of data for healthcare systems - private medical records, laboratory and imaging results, clinical data, even genetic information.</p>
                    
                    <p><strong>Finding Patterns and Trends</strong></p>
                    <p>As discussed, AI is able to identify connections that humans may miss, which can result in earlier diagnoses and recommendations for treatments, and even from a population standpoint, can lead to the identification of disease.</p>
                    
                    <p><strong>Making Predictive Analyses</strong></p>
                    <p>Given the data it assesses, AI is also able to analyze the risk of disease in patients, whether a certain treatment may work, and maybe even if a patient may experience a complication from surgery.</p>
                    
                    <p><strong>Automate Multiple Tasks</strong></p>
                    <p>AI can perform standard functions like booking an appointment or "invoicing", and other repetitively demanding functions like creation of reports and applying data to medical records or research, which provides time for doctors and nurses to do what they do best - Patient care.</p>
                    
                    <p><strong>Real-World Applications of AI in Diagnostics</strong></p>
                    
                    <p><strong>Medical Imaging</strong></p>
                    <p>AI tools are tested to analyze imaging scans with rapid speed and sometimes more accurately than human radiologists! For example: Zebra Medical Vision offers a number of algorithms that can identify conditions such as breast cancer, osteoporosis, and fatty liver disease based on radiological images. These tools can help to reduce human error, expedite the diagnosis, and let radiologists focus on more complex cases.</p>
                    
                    <p><strong>Pathology and Diagnostic Labs</strong></p>
                    <p>Digital pathology plus AI means that we can scan and then analyze scanned tissue samples. AI provides the ability to identify cancerous cells, distinguish between types of tumors, and predict the outcome of patients. For instance: PathAI offers AI-powered pathology solutions that increase the speed and accuracy of pathology diagnoses.</p>
                    
                    <p><strong>Early Discovery of Disease</strong></p>
                    <p>AI can identify small indicators in patient data which frequently indicates some form of disease is present. For instance: AI can discover early indicators for things like: Alzheimer's, Diabetes, Heart Disease. If caught earlier in disease progression, doctors can start patient interventions sooner enabling better patient outcomes.</p>
                    
                    <p><strong>COVID-19 Detection</strong></p>
                    <p>During the COVID-19 pandemic, AI was critical to:</p>
                    <ul>
                        <li>Identify patients likely to be seriously ill.</li>
                        <li>Speed up the discovery of drugs to treat COVID-19.</li>
                        <li>Analyze chest CT scans for any signs of the virus.</li>
                    </ul>
                    <p>Companies like startup Qure.ai created AI models to detect lung infections related to COVID-19 (and other conditions) in X-rays.</p>
                    
                    <p><strong>Benefits for Patients, Doctors and Healthcare System</strong></p>
                    <p>The widespread adoption of artificial intelligence into healthcare affords many advantages to patients, providers, and healthcare systems more broadly:</p>
                    <ul>
                        <li><strong>Patients:</strong> Get diagnosed quicker and more accurately, receive a customized treatment plan tailored to their personal profiles, and be assisted by AI based chatbots who provide 24/7 trustworthy health information and schedule visits.</li>
                        <li><strong>Doctors:</strong> AI will help doctors/app providers who are determining a clinical decision by helping to analyze complicated data, who have many administrative details to keep track of, and reduce the risk of human error. All of this can increase visits, more appropriate care, and the capacity for a doctor to have more quality time with patients and time for high-level clinical decisions.</li>
                        <li><strong>Healthcare systems:</strong> Efficiency and productivity is increased, by automating repetitive tasks and potentially decreasing overall healthcare costs through earlier intervention and targeted personalized interventions.</li>
                    </ul>
                    
                    <p><strong>Challenges and Ethical Issues</strong></p>
                    <p>AI in diagnostics has potential benefits, but there are challenges:</p>
                    
                    <p><strong>Data Privacy and Security</strong></p>
                    <p>Medical data is among the most sensitive personal information. AI systems often require access to large volumes of patient data, including medical histories, imaging, genetic information, and more.</p>
                    
                    <p><strong>Bias in AI Models</strong></p>
                    <p>AI is only as good as the data it learns from. If the datasets used to train an AI system are not diverse, the results can be biased.</p>
                    
                    <p><strong>Not Enough Human Oversight</strong></p>
                    <p>AI is a powerful resource but cannot substitute human judgment. Relying too much on the AI could lead to misdiagnosis.</p>
                    
                    <p><strong>Regulatory and Legal Challenges</strong></p>
                    <p>Getting approval from FDA or similar agencies for AI systems is complicated, varies globally, and may delay implementation.</p>
                    
                    <p><strong>The Future of Artificial Intelligence in Diagnostics</strong></p>
                    <p>The next few years will likely offer:</p>
                    <ul>
                        <li>Integration of AI into the fabric of usual clinical workflows</li>
                        <li>More usable explainable AI (XAI) to allow doctors to interpret AI-generated results</li>
                        <li>Federated learning to allow AI training on decentralized data that will safely protect and use a patient's privacy.</li>
                        <li>Wearable devices monitored by AI to assess vital signs and predict medical emergencies.</li>
                    </ul>
                    <p>AI isn't to replace doctors, but to assist doctors to be more empowered as providers. Better tools, faster insights and more precise, AI is shaping a path to better health in the future.</p>
                    
                    <p><strong>Conclusion:</strong></p>
                    <p>AI is not only identifying illnesses earlier but also assisting doctors in scanning images quickly, like an x-ray or MRI, even predicting health risks, and changing the manner and process of pathology. With early detection and understanding of the healthcare challenge, AI is ushering in total change. AI is not going to replace doctors, it's going to provide support for doctors in smarter diagnostic tools, in order to gain speed, accuracy, and health care personalization. AI is humanizing healthcare in all aspects of service, as it relates to reading medical imaging, understanding health records, and planning a treatment regimen based on our own DNA. AI is helping to get healthcare right for everyone.</p>
                </div>
            </div>
        `,
        'ml-datasets-module': `
            <div class="blog-module">
                <div class="blog-module-header">
                    <h2>Top 5 Open Datasets for Practicing Machine Learning</h2>
                    <div class="blog-meta">
                        <span class="author">By Tania</span>
                        <span class="date">April 20, 2024</span>
                    </div>
                </div>
                <div class="blog-module-content">
                    <p><strong>Introduction: The Role of Data in Machine Learning</strong></p>
                    <p>Data drives machine learning (ML) model performance. Whether you're a student new to ML or an experienced developer polishing up a model, having access to datasets is important. There are hundreds of thousands of open datasets to explore on the internet! But, like a double-espresso, open datasets aren't made equal. Some are massive, sprawling, and messy, and some are neat and well-documented for practice and portfolio project purposes. This post will examine five of the best open datasets to help you develop your ML skills, from datasets for beginners to more complex real world industry data.</p>
                    
                    <p><strong>The Importance of Open Datasets</strong></p>
                    <p>Open datasets are datasets that are available for free to the public, typically maintained by governments, organizations or researchers. This is why open datasets are useful to machine learning:</p>
                    <ul>
                        <li>They provide real-world data for you to train and test ML models.</li>
                        <li>They allow you to practice data cleaning, visualization and feature engineering.</li>
                        <li>Projects based on open datasets illustrate your project/work in your portfolio and increase your chances of getting a job.</li>
                        <li>They allow you to explore multiple domains—healthcare, finance, sports, social media, etc.</li>
                    </ul>
                    <p>Now let's get started with the top 5 open datasets that you should be aware of</p>
                    
                    <p><strong>TOP 5 DATASETS</strong></p>
                    
                    <p><strong>1. Climate Change AI Dataset Hub</strong></p>
                    <p><strong>Domain:</strong> Climate, Earth Science, Environmental ML</p>
                    <p><strong>Dataset:</strong> Visit Dataset Hub</p>
                    <p>This dataset hub contains a curated collection of datasets in climate modelling, rainforest loss, carbon emissions, air quality, and renewable energy generation. A great place for sustainability-focused ML projects.</p>
                    <p><strong>Why It Is Trending:</strong></p>
                    <ul>
                        <li>Global focus on climate tech and sustainability</li>
                        <li>Supports satellite image classification, anomaly detection, and forecasting</li>
                        <li>Commonly used in Kaggle projects and academic research</li>
                    </ul>
                    <p><strong>Project Idea:</strong> Use satellite images to show the loss of a rainforest in a set timeframe using deep learning.</p>
                    
                    <p><strong>2. LLM Safety & Bias Dataset (Anthropic, Hugging Face)</strong></p>
                    <p><strong>Domain:</strong> AI Ethics / LLMs / Prompt Evaluation</p>
                    <p><strong>Dataset:</strong> Anthropic HH-RLHF Dataset</p>
                    <p>This dataset is made to train and evaluate language models' alignment and safety. It includes human feedback on chatgpt's or other LLM's responses, to train, fine-tune, or evaluate prompts for safety.</p>
                    <p><strong>Why It Is Popular:</strong></p>
                    <ul>
                        <li>LLMs (e.g., Chatbot, Claude, Gemini) are all the rage right now</li>
                        <li>There is strong interest in AI Safety and Bias detection and responsible AI</li>
                        <li>It is useful for RLHF (reinforcement learning with human feedback)</li>
                    </ul>
                    <p><strong>Project Idea:</strong> To build a system that scores and filters toxic or biased chatbot responses with supervised fine-tuning.</p>
                    
                    <p><strong>3. Fake News Detection Dataset – Twitter & News APIs</strong></p>
                    <p><strong>Domain:</strong> NLP / Misinformation / Social Media Analysis</p>
                    <p><strong>Dataset:</strong> LIAR-PLUS & COVID FACT DATASET</p>
                    <p>These newest datasets contain real and fake news from news articles and tweets that have been hand annotated with labels (true, partially true, false). They are intended for work with misinformation detection.</p>
                    <p><strong>Why the Trend:</strong></p>
                    <ul>
                        <li>Increasing concern about election misinformation, AI-generated fake news</li>
                        <li>Great opportunity to learn text classification, NLP, BERT-based models</li>
                        <li>Good source for real-time fake news detection systems</li>
                    </ul>
                    <p><strong>Project idea:</strong> Build a BERT-based classifier to detect fake political news from headlines.</p>
                    
                    <p><strong>4. ImageBind – Meta AI's Multimodal Learning Dataset</strong></p>
                    <p><strong>Domain:</strong> Multimodal AI / Computer Vision + Audio + Text</p>
                    <p><strong>Dataset:</strong> Meta AI imagebind</p>
                    <p>ImageBind is a dataset and model that learns joint representations of images, audio, depth, thermal, and text, without requiring explicit alignment. It is a great option for working on multimodal learning.</p>
                    <p><strong>Why It Is Trending:</strong></p>
                    <ul>
                        <li>Is part of next-gen Multimodal AI research</li>
                        <li>Allows you to build models understanding multiple sensory modalities</li>
                        <li>Huge possibilities in robotics, AR/VR, and accessibility</li>
                    </ul>
                    <p><strong>Project Idea:</strong> Train a system that can recognize an object by not only an image, but also the sound it makes, and its description.</p>
                    
                    <p><strong>5. Google DeepMind has released a new dataset called GORILLA (Generative Open Retrieval Instruction-trained Language Learning Assistant)</strong></p>
                    <p><strong>Domain:</strong> Generative AI / Knowledge Retrieval / LLM Evaluation</p>
                    <p><strong>Dataset:</strong> GitHub – GORILLA Project</p>
                    <p>The GORILLA dataset is a benchmark dataset and an open project from DeepMind and Berkeley researchers that enables evaluation of retrieval-augmented generation (RAG) systems. The dataset is comprised of instructions, factual queries, API call prompts, and responses.</p>
                    <p><strong>Why are researchers looking at GORILLA:</strong></p>
                    <ul>
                        <li>Focuses on the hot area of RAG (used in ChatGPT, Claude, etc.)</li>
                        <li>Useful in evaluating and fine tuning LLMs</li>
                        <li>Includes multi-step instructions, factual QA, tool-using prompts</li>
                    </ul>
                    <p><strong>Great For:</strong></p>
                    <ul>
                        <li>Building chatbots that retrieve correct information from documents or APIs</li>
                        <li>Experimenting with LLM grounding and reducing hallucination, or in research memory for LLMs</li>
                    </ul>
                    <p><strong>Project Idea:</strong> Fine-tune a small LLM to answer factual queries using the GORILLA dataset and production and evaluate against OpenAI GPT outputs.</p>
                    
                    <p><strong>Use These Platforms to Find Fresh Datasets</strong></p>
                    <ul>
                        <li>Hugging Face Datasets Hub</li>
                        <li>Google Dataset Search</li>
                        <li>Kaggle Trending Datasets</li>
                        <li>Awesome Public Datasets GitHub</li>
                    </ul>
                    
                    <p><strong>Conclusion:</strong></p>
                    <p>As machine learning platforms and services become ever more prevalent, the real experience of interfacing and working with real, pertinent data is more important than ever. The datasets we worked on in this book—from healthcare ICU records to climate models, to fake news detection, multimodal learning, and language model safety—are not just valuable datasets for purposes of practice or learning; they are fundamentally linked to the biggest challenges we face in technology and society today. Whether your goal is to build your portfolio, ace interviews, or make impactful contributions to research—engaging with these trending datasets will hone your skills and develop your ability to solve industry-relevant challenges. They will provide a distinct advantage as you prepare to take on modern domains such as generative AI, retrieval systems, and responsible AI. Forget reading about working with real-world machine learning—work with real-world data. Find a dataset that's meaningful to you, examine the data, and develop all the ideas that lead to building genuine, intelligent solutions.</p>
                </div>
            </div>
        `
    };

    return blogModules[moduleId] || `
        <div class="blog-module">
            <div class="blog-module-header">
                <h2>Content Not Found</h2>
            </div>
            <div class="blog-module-content">
                <p>Sorry, the blog content you're looking for is not available.</p>
            </div>
        </div>
    `;
}

// Utility functions


function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}
