document.addEventListener('DOMContentLoaded', () => {
    // Initialize contact page
    initializeContactPage();
});

function initializeContactPage() {
    // Initialize form handling
    initializeContactForm();
    
    // Initialize FAQ functionality
    initializeFAQ();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add form validation
    addFormValidation();
}

function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const subject = formData.get('subject');
    const message = formData.get('message').trim();
    
    // Validate form
    if (!validateForm(name, email, subject, message)) {
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showSuccessMessage();
        
        // Reset form
        e.target.reset();
        
        // Reset button state
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        submitBtn.disabled = false;
        
        // Log form data (in real app, send to server)
        console.log('Form submitted:', {
            name,
            email,
            subject,
            message
        });
    }, 2000);
}

function validateForm(name, email, subject, message) {
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate name
    if (!name) {
        showFieldError('name', 'Name is required');
        isValid = false;
    } else if (name.length < 2) {
        showFieldError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate email
    if (!email) {
        showFieldError('email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate subject
    if (!subject) {
        showFieldError('subject', 'Please select a subject');
        isValid = false;
    }
    
    // Validate message
    if (!message) {
        showFieldError('message', 'Message is required');
        isValid = false;
    } else if (message.length < 10) {
        showFieldError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function clearFormErrors() {
    const formGroups = document.querySelectorAll('.form-group');
    
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorMessage = group.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
}

function showSuccessMessage() {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <strong>Thank you!</strong> Your message has been sent successfully. 
        We'll get back to you within 24 hours.
    `;
    
    // Insert before form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(successDiv, form);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

function addScrollAnimations() {
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
    const animatedElements = document.querySelectorAll('.contact-method, .faq-item, .location-card, .social-link');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function addFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            // Clear error when user starts typing
            const formGroup = input.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                formGroup.classList.remove('error');
                const errorMessage = formGroup.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                showFieldError('name', 'Name is required');
            } else if (value.length < 2) {
                showFieldError('name', 'Name must be at least 2 characters');
            }
            break;
            
        case 'email':
            if (!value) {
                showFieldError('email', 'Email is required');
            } else if (!isValidEmail(value)) {
                showFieldError('email', 'Please enter a valid email address');
            }
            break;
            
        case 'subject':
            if (!value) {
                showFieldError('subject', 'Please select a subject');
            }
            break;
            
        case 'message':
            if (!value) {
                showFieldError('message', 'Message is required');
            } else if (value.length < 10) {
                showFieldError('message', 'Message must be at least 10 characters');
            }
            break;
    }
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key to go back to home
    if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
    
    // Enter key to submit form when focused on submit button
    if (e.key === 'Enter' && document.activeElement.classList.contains('submit-btn')) {
        document.getElementById('contactForm').dispatchEvent(new Event('submit'));
    }
});

// Add loading animation
function addLoadingAnimation() {
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        body.style.opacity = '1';
    });
}

// Add copy to clipboard functionality for contact info
function addCopyToClipboard() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach(method => {
        method.addEventListener('click', () => {
            const content = method.querySelector('.method-content');
            const text = content.textContent.trim();
            
            // Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                showNotification('Contact information copied to clipboard!', 'success');
            }).catch(() => {
                showNotification('Failed to copy to clipboard', 'error');
            });
        });
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '10px';
    notification.style.color = 'white';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '1000';
    notification.style.transform = 'translateX(100%)';
    notification.style.transition = 'transform 0.3s ease';
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#27ae60';
            break;
        case 'error':
            notification.style.background = '#e74c3c';
            break;
        default:
            notification.style.background = '#3498db';
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
    addLoadingAnimation();
    addCopyToClipboard();
}); 