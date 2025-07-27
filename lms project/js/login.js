document.addEventListener('DOMContentLoaded', () => {
    // Initialize login page
    initializeLoginPage();
});

let currentLoginType = null; // 'user' or 'admin'

function initializeLoginPage() {
    // Add click event listeners to option cards
    const userOption = document.querySelector('.user-option');
    const adminOption = document.querySelector('.admin-option');
    
    if (userOption) {
        userOption.addEventListener('click', selectUserLogin);
    }
    
    if (adminOption) {
        adminOption.addEventListener('click', selectAdminLogin);
    }
    
    // Add form submission handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    // Initialize form validation
    addFormValidation();
}

function selectUserLogin() {
    currentLoginType = 'user';
    showLoginForm('Student Login');
}

function selectAdminLogin() {
    currentLoginType = 'admin';
    showLoginForm('Admin Login');
}

function showLoginForm(title) {
    const optionsContainer = document.querySelector('.login-options');
    const formContainer = document.getElementById('loginFormContainer');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    
    // Update form title and button text
    formTitle.textContent = title;
    submitBtn.textContent = title;
    
    // Hide options and show form
    optionsContainer.style.display = 'none';
    formContainer.style.display = 'block';
    
    // Clear form fields
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    
    // Focus on email field
    document.getElementById('email').focus();
}

function goBack() {
    const optionsContainer = document.querySelector('.login-options');
    const formContainer = document.getElementById('loginFormContainer');
    
    // Show options and hide form
    optionsContainer.style.display = 'grid';
    formContainer.style.display = 'none';
    
    currentLoginType = null;
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    
    // Basic validation
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    setButtonLoading(submitBtn, true);
    
    // Simulate login validation with delay
    setTimeout(() => {
        if (currentLoginType === 'user') {
            validateUserLogin(email, password);
        } else if (currentLoginType === 'admin') {
            validateAdminLogin(email, password);
        }
        setButtonLoading(submitBtn, false);
    }, 1000);
}

function validateUserLogin(email, password) {
    // Demo user credentials
    const validCredentials = {
        'student@demo.com': 'password123',
        'demo@example.com': 'password123'
    };
    
    if (validCredentials[email] && validCredentials[email] === password) {
        // Store login info
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', 'user');
        localStorage.setItem('userName', email.split('@')[0]);
        
        showNotification('Login successful! Redirecting to student page...', 'success');
        
        // Redirect to user page
        setTimeout(() => {
            window.location.href = 'user.html';
        }, 1500);
    } else {
        showNotification('Invalid student credentials. Please use student@demo.com / password123', 'error');
    }
}

function validateAdminLogin(email, password) {
    // Demo admin credentials
    const validCredentials = {
        'admin@demo.com': 'admin123'
    };
    
    if (validCredentials[email] && validCredentials[email] === password) {
        // Store login info
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userType', 'admin');
        localStorage.setItem('userName', 'Admin');
        
        showNotification('Login successful! Redirecting to admin page...', 'success');
        
        // Redirect to admin page
        setTimeout(() => {
            window.location.href = 'admin.html';
        }, 1500);
    } else {
        showNotification('Invalid admin credentials. Please use admin@demo.com / admin123', 'error');
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    // Clear existing notification
    notification.className = 'notification';
    notification.textContent = '';
    
    // Set new notification
    notification.textContent = message;
    notification.classList.add(type, 'show');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const formContainer = document.getElementById('loginFormContainer');
        if (formContainer.style.display !== 'none') {
            goBack();
        }
    }
});

// Add loading state to buttons
function setButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.textContent = 'Logging in...';
        button.style.opacity = '0.7';
    } else {
        button.disabled = false;
        button.textContent = button.dataset.originalText || 'Login';
        button.style.opacity = '1';
    }
}

// Enhanced form validation with real-time feedback
function addFormValidation() {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            if (email && !isValidEmail(email)) {
                emailInput.style.borderColor = '#ff4757';
                showFieldError(emailInput, 'Please enter a valid email address');
            } else {
                emailInput.style.borderColor = '';
                clearFieldError(emailInput);
            }
        });
        
        emailInput.addEventListener('input', () => {
            if (emailInput.style.borderColor === 'rgb(255, 71, 87)') {
                emailInput.style.borderColor = '';
                clearFieldError(emailInput);
            }
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', () => {
            const password = passwordInput.value.trim();
            if (password && password.length < 6) {
                passwordInput.style.borderColor = '#ff4757';
                showFieldError(passwordInput, 'Password must be at least 6 characters');
            } else {
                passwordInput.style.borderColor = '';
                clearFieldError(passwordInput);
            }
        });
        
        passwordInput.addEventListener('input', () => {
            if (passwordInput.style.borderColor === 'rgb(255, 71, 87)') {
                passwordInput.style.borderColor = '';
                clearFieldError(passwordInput);
            }
        });
    }
}

function showFieldError(input, message) {
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.color = '#ff4757';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.25rem';
    
    // Insert error message after input
    input.parentNode.appendChild(errorElement);
}

function clearFieldError(input) {
    const errorElement = input.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
} 