document.addEventListener('DOMContentLoaded', () => {
    // Initialize dashboard
    initializeDashboard();
});

function initializeDashboard() {
    // Check login status
    checkLoginStatus();
    
    // Initialize tab functionality
    initializeTabs();
    
    // Initialize AI tutor
    initializeAITutor();
    
    // Add animations
    addAnimations();
    
    // Initialize quick actions
    initializeQuickActions();
    
    // Add keyboard shortcuts
    addKeyboardShortcuts();
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userType = localStorage.getItem('userType');
    
    if (!isLoggedIn || userType !== 'user') {
        // Redirect to login if not logged in as user
        window.location.href = 'login.html';
        return;
    }
    
    // Update user name if available
    const userName = localStorage.getItem('userName') || 'Student';
    const userNameElement = document.querySelector('.user-name');
    if (userNameElement) {
        userNameElement.textContent = userName;
    }
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const targetContent = document.getElementById(`${targetTab}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

function initializeAITutor() {
    const modal = document.getElementById('aiTutorModal');
    const chatInput = document.getElementById('chatInput');
    
    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeAI();
        }
    });
    
    // Handle Enter key in chat input
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

function openAI() {
    const modal = document.getElementById('aiTutorModal');
    modal.style.display = 'block';
    
    // Focus on input
    setTimeout(() => {
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.focus();
        }
    }, 300);
}

function closeAI() {
    const modal = document.getElementById('aiTutorModal');
    modal.style.display = 'none';
}

function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    if (!chatInput || !chatMessages) return;
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessage(aiResponse, 'ai');
    }, 1000);
}

function addMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = `<p>${text}</p>`;
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateAIResponse(userMessage) {
    const responses = {
        'hello': 'Hello! How can I help you with your learning today?',
        'help': 'I can help you with course materials, explain concepts, or answer questions about AI and machine learning. What would you like to know?',
        'python': 'Python is a great programming language for AI and machine learning! Would you like me to explain specific Python concepts or help you with coding exercises?',
        'machine learning': 'Machine learning is fascinating! I can help you understand algorithms, explain concepts, or guide you through practical exercises. What specific area interests you?',
        'data science': 'Data science combines statistics, programming, and domain knowledge. I can help you with data analysis, visualization, or statistical concepts. What would you like to learn?',
        'deep learning': 'Deep learning uses neural networks to solve complex problems. I can explain neural network architectures, help with implementation, or clarify concepts. What questions do you have?'
    };
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords in the message
    for (const [keyword, response] of Object.entries(responses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    // Default responses
    const defaultResponses = [
        "That's an interesting question! Let me help you understand that better.",
        "I'd be happy to help you with that. Could you provide more details?",
        "Great question! This relates to important concepts in AI and machine learning.",
        "I can help you with that. Would you like me to explain it step by step?",
        "That's a common topic in our courses. Let me break it down for you."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function initializeQuickActions() {
    // Add click handlers for quick action buttons
    const actionCards = document.querySelectorAll('.action-card');
    
    actionCards.forEach(card => {
        card.addEventListener('click', () => {
            // Add click animation
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
                card.style.transform = '';
            }, 150);
        });
    });
}

function scheduleSession() {
    showNotification('Scheduling feature coming soon! You\'ll be able to book 1-on-1 sessions with instructors.', 'info');
}

function viewProgress() {
    // Switch to analytics tab
    const analyticsTab = document.querySelector('[data-tab="analytics"]');
    if (analyticsTab) {
        analyticsTab.click();
    }
}

function joinCommunity() {
    showNotification('Community features coming soon! Connect with fellow learners and share knowledge.', 'info');
}

function addAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-card, .action-card, .course-card, .activity-item, .resource-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Animate progress bars
    animateProgressBars();
}

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            const modal = document.getElementById('aiTutorModal');
            if (modal && modal.style.display === 'block') {
                closeAI();
            }
        }
        
        // Ctrl/Cmd + K to open AI tutor
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openAI();
        }
        
        // Number keys to switch tabs
        if (e.key >= '1' && e.key <= '4') {
            const tabIndex = parseInt(e.key) - 1;
            const tabButtons = document.querySelectorAll('.tab-btn');
            if (tabButtons[tabIndex]) {
                tabButtons[tabIndex].click();
            }
        }
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        case 'warning':
            notification.style.background = '#f39c12';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

function logout() {
    // Clear login data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    localStorage.removeItem('userName');
    
    // Show logout notification
    showNotification('Successfully logged out!', 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Add course interaction functionality
function initializeCourseInteractions() {
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        const continueBtn = card.querySelector('.btn-primary');
        const detailsBtn = card.querySelector('.btn-secondary');
        
        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const courseTitle = card.querySelector('h3').textContent;
                showNotification(`Starting ${courseTitle}...`, 'success');
                // Here you would typically navigate to the course content
            });
        }
        
        if (detailsBtn) {
            detailsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const courseTitle = card.querySelector('h3').textContent;
                showNotification(`Opening details for ${courseTitle}...`, 'info');
                // Here you would typically show course details
            });
        }
    });
}

// Add loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        body.style.opacity = '1';
    });
}

// Initialize course interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCourseInteractions();
    addLoadingAnimation();
});

// Add session timeout warning
function addSessionTimeout() {
    let timeout;
    
    function resetTimeout() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            showNotification('Your session will expire soon. Please save your work.', 'warning');
            
            // Auto logout after 5 more minutes
            setTimeout(() => {
                logout();
            }, 300000);
        }, 25 * 60 * 1000); // 25 minutes
    }
    
    // Reset timeout on user activity
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetTimeout, true);
    });
    
    resetTimeout();
}

// Initialize session timeout
document.addEventListener('DOMContentLoaded', () => {
    addSessionTimeout();
}); 