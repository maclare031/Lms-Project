// Admin Panel JavaScript for AlgoForgeStudios

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    const navItems = document.querySelectorAll('.admin-nav-item');
    const sections = document.querySelectorAll('.admin-section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item
            item.classList.add('active');
            
            // Show corresponding section
            const sectionId = item.getAttribute('data-section') + '-section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });

    // Simulate real-time data updates
    updateDashboardStats();
    loadUserData();
    
    // Update stats every 30 seconds
    setInterval(updateDashboardStats, 30000);
});

// Update user management statistics
function updateDashboardStats() {
    const stats = {
        totalUsers: Math.floor(Math.random() * 100) + 1200,
        activeUsers: Math.floor(Math.random() * 50) + 1050,
        newUsers: Math.floor(Math.random() * 20) + 35,
        pendingUsers: Math.floor(Math.random() * 10) + 15
    };

    // Update user stats
    const totalUsersElement = document.getElementById('total-users');
    const activeUsersElement = document.getElementById('active-users');
    const newUsersElement = document.getElementById('new-users');
    const pendingUsersElement = document.getElementById('pending-users');

    if (totalUsersElement) totalUsersElement.textContent = stats.totalUsers.toLocaleString();
    if (activeUsersElement) activeUsersElement.textContent = stats.activeUsers.toLocaleString();
    if (newUsersElement) newUsersElement.textContent = stats.newUsers;
    if (pendingUsersElement) pendingUsersElement.textContent = stats.pendingUsers;
}

// Load user data for user management
function loadUserData() {
    const users = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            status: 'active',
            courses: 5,
            joinDate: '2024-01-15',
            avatar: 'JD'
        },
        {
            name: 'Sarah Johnson',
            email: 'sarah.j@example.com',
            status: 'active',
            courses: 8,
            joinDate: '2024-02-20',
            avatar: 'SJ'
        },
        {
            name: 'Mike Wilson',
            email: 'mike.w@example.com',
            status: 'inactive',
            courses: 2,
            joinDate: '2024-03-10',
            avatar: 'MW'
        },
        {
            name: 'Emily Davis',
            email: 'emily.d@example.com',
            status: 'active',
            courses: 12,
            joinDate: '2024-01-05',
            avatar: 'ED'
        }
    ];

    const tbody = document.getElementById('users-tbody');
    if (tbody) {
        tbody.innerHTML = users.map(user => `
            <tr>
                <td>
                    <div class="user-info">
                        <img src="https://via.placeholder.com/40x40/8000ff/ffffff?text=${user.avatar}" alt="User">
                        <span>${user.name}</span>
                    </div>
                </td>
                <td>${user.email}</td>
                <td><span class="status ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
                <td>${user.courses}</td>
                <td>${user.joinDate}</td>
                <td>
                    <button class="action-btn edit" onclick="editUser('${user.email}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteUser('${user.email}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
}

// User management functions
function editUser(email) {
    alert(`Edit user: ${email}`);
    // In a real application, this would open a modal or navigate to an edit page
}

function deleteUser(email) {
    if (confirm(`Are you sure you want to delete user: ${email}?`)) {
        alert(`User ${email} deleted successfully!`);
        // In a real application, this would make an API call to delete the user
        loadUserData(); // Refresh the user list
    }
}

// Course management functions
function editCourse(courseId) {
    alert(`Edit course: ${courseId}`);
    // In a real application, this would open a course editor
}

function manageCourseAccess(courseId) {
    alert(`Manage access for course: ${courseId}`);
    // In a real application, this would open an access management modal
}

function deleteCourse(courseId) {
    if (confirm(`Are you sure you want to delete this course?`)) {
        alert(`Course deleted successfully!`);
        // In a real application, this would make an API call to delete the course
    }
}

function publishCourse(courseId) {
    alert(`Course published successfully!`);
    // In a real application, this would update the course status
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const userRows = document.querySelectorAll('#users-tbody tr');
            
            userRows.forEach(row => {
                const userName = row.querySelector('.user-info span').textContent.toLowerCase();
                const userEmail = row.cells[1].textContent.toLowerCase();
                
                if (userName.includes(searchTerm) || userEmail.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Filter functionality
function setupFilters() {
    const filterSelect = document.querySelector('.filter-select');
    if (filterSelect) {
        filterSelect.addEventListener('change', (e) => {
            const filterValue = e.target.value;
            const userRows = document.querySelectorAll('#users-tbody tr');
            
            userRows.forEach(row => {
                const status = row.querySelector('.status').textContent.toLowerCase();
                
                if (filterValue === '' || status === filterValue) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

// Initialize search and filters
document.addEventListener('DOMContentLoaded', function() {
    setupSearch();
    setupFilters();
});

// Logout functionality
const logoutBtn = document.querySelector('.logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to logout from admin panel?')) {
            // Clear admin session
            localStorage.removeItem('adminLoggedIn');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('userEmail');
            
            // Redirect to main page
            window.location.href = 'index.html';
        }
    });
}

// Notification system for admin actions
function showAdminNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Add notification styles if not already present
    if (!document.querySelector('style[data-admin-notification-styles]')) {
        const style = document.createElement('style');
        style.setAttribute('data-admin-notification-styles', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                top: 80px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 10px;
                color: white;
                font-weight: 500;
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 10px;
                min-width: 300px;
                backdrop-filter: blur(10px);
                animation: slideInAdmin 0.3s ease;
            }
            .notification.success { 
                background: linear-gradient(135deg, #27ae60, #2ecc71);
                border: 1px solid rgba(39, 174, 96, 0.3);
            }
            .notification.error { 
                background: linear-gradient(135deg, #e74c3c, #c0392b);
                border: 1px solid rgba(231, 76, 60, 0.3);
            }
            .notification.info { 
                background: var(--accent-gradient);
                border: 1px solid rgba(255, 0, 255, 0.3);
            }
            .notification button {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
            }
            @keyframes slideInAdmin {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}

// Sample chart data (in a real app, this would come from your backend)
function initializeCharts() {
    // This is where you would initialize Chart.js or another charting library
    // For now, we'll just show placeholder text
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    chartPlaceholders.forEach(placeholder => {
        if (!placeholder.querySelector('canvas')) {
            placeholder.innerHTML = '<p style="color: var(--text-muted);">Chart visualization will be displayed here</p>';
        }
    });
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCharts);
