// Client-side application logic
const API_BASE_URL = window.location.origin;

// Function to load API data
async function loadApiData() {
    const dataElement = document.getElementById('api-data');

    try {
        const response = await fetch(`${API_BASE_URL}/api/data`);
        const data = await response.json();

        if (response.ok) {
            dataElement.innerHTML = `
                <h4>API Response:</h4>
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
            dataElement.style.display = 'block';
            dataElement.style.backgroundColor = '#2ecc71';
        } else {
            throw new Error(data.message || 'Failed to fetch data');
        }
    } catch (error) {
        dataElement.innerHTML = `
            <h4>Error:</h4>
            <p>${error.message}</p>
        `;
        dataElement.style.display = 'block';
        dataElement.style.backgroundColor = '#e74c3c';
    }
}

// Function to load user data
async function loadUsers() {
    const usersElement = document.getElementById('users-data');

    if (!usersElement) return;

    try {
        const response = await fetch(`${API_BASE_URL}/api/users`);
        const data = await response.json();

        if (response.ok) {
            const users = data.data || [];
            usersElement.innerHTML = `
                <h4>Users (${users.length}):</h4>
                <ul>
                    ${users.map(user => `<li><strong>${user.name}</strong> - ${user.email}</li>`).join('')}
                </ul>
            `;
            usersElement.style.display = 'block';
        } else {
            throw new Error(data.error || 'Failed to fetch users');
        }
    } catch (error) {
        usersElement.innerHTML = `
            <h4>Error:</h4>
            <p>${error.message}</p>
        `;
        usersElement.style.display = 'block';
        usersElement.style.backgroundColor = '#e74c3c';
    }
}

// Add some users section to the about page if it exists
function addUsersSection() {
    const container = document.querySelector('.container');
    if (container && !document.getElementById('users-section')) {
        const usersSection = document.createElement('div');
        usersSection.id = 'users-section';
        usersSection.className = 'api-section';
        usersSection.innerHTML = `
            <h3>Users API</h3>
            <button onclick="loadUsers()">Load Users</button>
            <div id="users-data" class="api-response"></div>
        `;
        container.appendChild(usersSection);
    }
}

// Initialize the application
function initApp() {
    // Add users section if we're on about page
    addUsersSection();

    // Set up any event listeners
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            nav a {
                display: block;
                margin: 0.5rem 0;
            }
            .container {
                padding: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}