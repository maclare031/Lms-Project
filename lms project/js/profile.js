document.addEventListener('DOMContentLoaded', () => {
    // Profile image upload functionality
    const profileImageUpload = document.getElementById('profileImageUpload');
    const fileNameSpan = document.querySelector('.file-name');
    const profileImage = document.getElementById('profileImage');

    if (profileImageUpload) {
        profileImageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                fileNameSpan.textContent = file.name;
                
                // Preview the image
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            } else {
                fileNameSpan.textContent = 'No file chosen';
            }
        });
    }

    // Sidebar image upload functionality
    const sidebarImageUpload = document.getElementById('sidebarImageUpload');
    if (sidebarImageUpload) {
        sidebarImageUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                updateProfileImage(file);
                // Also update the main form file input
                if (profileImageUpload) {
                    profileImageUpload.files = e.target.files;
                    if (fileNameSpan) {
                        fileNameSpan.textContent = file.name;
                    }
                }
                showNotification('Profile photo updated successfully!', 'success');
            }
        });
    }

    // Function to update profile image preview
    function updateProfileImage(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const profileImage = document.getElementById('profileImage');
            if (profileImage) {
                profileImage.src = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }

    // Form submission
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(profileForm);
            const profileData = {};
            
            // Get all form inputs
            const inputs = profileForm.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.type === 'file') return;
                profileData[input.id] = input.value;
            });
            
            // Show success message
            showNotification('Profile updated successfully!', 'success');
            
            // Here you would typically send the data to your backend
            console.log('Profile data:', profileData);
        });
    }

    // Add more functionality for education
    const addMoreBtns = document.querySelectorAll('.add-more-btn');
    addMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Determine which section this button belongs to
            const section = btn.closest('.form-section');
            const sectionTitle = section.querySelector('h3').textContent;
            
            if (sectionTitle.includes('Education')) {
                addEducationEntry(section);
            } else if (sectionTitle.includes('Projects')) {
                addProjectEntry(section);
            }
        });
    });

    // Sidebar menu functionality
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all items
            menuItems.forEach(menuItem => menuItem.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // Handle navigation based on menu item
            const menuText = item.textContent.trim().replace(/\s+/g, ' ');
            console.log('Menu item clicked:', menuText);
            
            // Extract just the text part without emoji
            let actionText = '';
            if (menuText.includes('Edit Profile')) {
                actionText = 'Edit Profile';
            } else if (menuText.includes('My Courses')) {
                actionText = 'My Courses';
            } else if (menuText.includes('Reports & Insights')) {
                actionText = 'Reports & Insights';
            } else if (menuText.includes('Settings')) {
                actionText = 'Settings';
            } else if (menuText.includes('Logout')) {
                actionText = 'Logout';
            }
            
            switch(actionText) {
                case 'Edit Profile':
                    // Already on profile page, do nothing
                    console.log('Staying on Edit Profile page');
                    break;
                case 'My Courses':
                    // Navigate to dashboard and show courses tab
                    console.log('Navigating to My Courses');
                    window.location.href = 'user.html';
                    break;
                case 'Reports & Insights':
                    // Future feature - show notification
                    console.log('Reports & Insights clicked');
                    showNotification('Reports & Insights feature coming soon!', 'info');
                    break;
                case 'Settings':
                    // Future feature - show notification
                    console.log('Settings clicked');
                    showNotification('Settings feature coming soon!', 'info');
                    break;
                case 'Logout':
                    console.log('Logout clicked');
                    if (confirm('Are you sure you want to logout?')) {
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userEmail');
                        showNotification('Logged out successfully!', 'success');
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1000);
                    }
                    break;
                default:
                    console.log('Unknown menu item:', menuText);
            }
        });
    });

    // Navbar logout functionality
    const navLogoutBtn = document.querySelector('.logout-btn');
    if (navLogoutBtn) {
        navLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Are you sure you want to logout?')) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('userEmail');
                showNotification('Logged out successfully!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }

    // Multi-select interests functionality (if still using select)
    const interestsSelect = document.getElementById('interests');
    if (interestsSelect && interestsSelect.tagName === 'SELECT') {
        interestsSelect.addEventListener('change', () => {
            const selectedOptions = Array.from(interestsSelect.selectedOptions);
            console.log('Selected interests:', selectedOptions.map(option => option.value));
        });
    }

    function addEducationEntry(section) {
        const educationEntry = document.createElement('div');
        educationEntry.className = 'education-entry';
        educationEntry.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Institution Name</label>
                    <input type="text" placeholder="Institution Name">
                </div>
                <div class="form-group">
                    <label>Department</label>
                    <input type="text" placeholder="Department">
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Year Of Passing</label>
                    <input type="number" placeholder="Year Of Passing">
                </div>
                <div class="form-group">
                    <button type="button" class="remove-btn">Remove</button>
                </div>
            </div>
        `;
        
        // Insert before the add more button
        const addMoreBtn = section.querySelector('.add-more-btn');
        addMoreBtn.parentNode.insertBefore(educationEntry, addMoreBtn);
        
        // Add remove functionality
        const removeBtn = educationEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            educationEntry.remove();
        });
    }

    function addProjectEntry(section) {
        const projectEntry = document.createElement('div');
        projectEntry.className = 'project-entry';
        projectEntry.innerHTML = `
            <div class="form-row">
                <div class="form-group full-width">
                    <textarea placeholder="Additional Project Details" rows="4"></textarea>
                </div>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        // Insert before the add more button
        const addMoreBtn = section.querySelector('.add-more-btn');
        addMoreBtn.parentNode.insertBefore(projectEntry, addMoreBtn);
        
        // Add remove functionality
        const removeBtn = projectEntry.querySelector('.remove-btn');
        removeBtn.addEventListener('click', () => {
            projectEntry.remove();
        });
    }

    // Notification function (if not already available globally)
    function showNotification(message, type = 'info') {
        // Check if notification function exists globally
        if (typeof window.showNotification === 'function') {
            window.showNotification(message, type);
            return;
        }
        
        // Create notification if global function doesn't exist
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 5px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s ease;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
});
