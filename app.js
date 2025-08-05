// EDUTECH SPA JavaScript
const mainContent = document.getElementById('main-content');
const popup = document.getElementById('popup');

// Mock Data
let courses = [
    { id: 1, name: 'JavaScript Essentials', creator: 'Alice', rating: 4.7, price: 49, level: 'Beginner' },
    { id: 2, name: 'Advanced Python', creator: 'Bob', rating: 4.9, price: 99, level: 'Advanced' },
    { id: 3, name: 'React for Beginners', creator: 'Carol', rating: 4.5, price: 59, level: 'Beginner' },
    { id: 4, name: 'Data Science Bootcamp', creator: 'Dave', rating: 4.8, price: 129, level: 'Intermediate' },
    { id: 5, name: 'UI/UX Design', creator: 'Eve', rating: 4.6, price: 79, level: 'Intermediate' },
];
let cart = [];
let purchasedCourses = [];
let userPerformance = {
    progress: 72,
    quizScores: 88,
    completedCourses: 3,
};

// SPA Navigation
function navigate(page) {
    window.location.hash = page;
    renderPage(page);
}

function renderPage(page) {
    switch(page) {
        case 'home':
            renderHome(); break;
        case 'courses':
            renderCourses(); break;
        case 'analytics':
            renderAnalytics(); break;
        case 'cart':
            renderCart(); break;
        case 'payment':
            renderPayment(); break;
        default:
            renderHome();
    }
    setActiveNav(page);
}

function setActiveNav(page) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) link.classList.add('active');
    });
}

// Home Section
function renderHome() {
    mainContent.innerHTML = `
        <section class="section">
            <h1>Welcome to <span style="color:var(--accent)">EDUTECH</span></h1>
            <p>Empowering your learning journey with top-rated courses, analytics, and seamless experience.</p>
            <div style="margin-top:2rem;">
                <button class="btn" onclick="navigate('courses')">Browse Courses</button>
                <button class="btn" onclick="navigate('analytics')">View Analytics</button>
            </div>
        </section>
    `;
}

// Courses Section
function renderCourses(filteredCourses = null) {
    const courseList = filteredCourses || courses;
    mainContent.innerHTML = `
        <section class="section">
            <h2>Courses</h2>
            <div class="courses-grid">
                ${courseList.map(course => `
                    <div class="course-card">
                        <div class="course-title">${course.name}</div>
                        <div class="course-creator">By ${course.creator}</div>
                        <div class="course-rating">${course.rating} / 5 ⭐</div>
                        <div class="course-price">$${course.price}</div>
                        <div class="course-level">Level: ${course.level}</div>
                        <button class="add-cart-btn" onclick="addToCart(${course.id})">Add to Cart</button>
                    </div>
                `).join('')}
            </div>
        </section>
    `;
}

// Analytics Section
function renderAnalytics() {
    mainContent.innerHTML = `
        <section class="section">
            <h2>Performance Analytics</h2>
            <div class="analytics-dashboard">
                <div class="analytics-card">
                    <div class="analytics-title">Progress</div>
                    <div class="analytics-value">${userPerformance.progress}%</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-title">Quiz Scores</div>
                    <div class="analytics-value">${userPerformance.quizScores}%</div>
                </div>
                <div class="analytics-card">
                    <div class="analytics-title">Completed Courses</div>
                    <div class="analytics-value">${userPerformance.completedCourses}</div>
                </div>
            </div>
        </section>
    `;
}

// Cart Section
function renderCart() {
    mainContent.innerHTML = `
        <section class="section">
            <h2>Shopping Cart</h2>
            <ul class="cart-list">
                ${cart.length === 0 ? '<li>Your cart is empty.</li>' : cart.map(item => `
                    <li class="cart-item">
                        <span class="cart-item-title">${item.name}</span>
                        <span>$${item.price}</span>
                        <button class="remove-cart-btn" onclick="removeFromCart(${item.id})">Remove</button>
                    </li>
                `).join('')}
            </ul>
            ${cart.length > 0 ? `<button class="btn payment-btn" onclick="navigate('payment')">Proceed to Payment</button>` : ''}
        </section>
    `;
}

// Payment Section
function renderPayment() {
    mainContent.innerHTML = `
        <section class="payment-section">
            <h2>Payment Options</h2>
            <p>Total: <strong>$${cart.reduce((sum, c) => sum + c.price, 0)}</strong></p>
            <button class="payment-btn" onclick="processPayment()">Pay Now</button>
        </section>
    `;
}

// Add to Cart
window.addToCart = function(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (!cart.some(c => c.id === courseId)) {
        cart.push(course);
        showPopup('Course added to cart!');
    } else {
        showPopup('Course already in cart.');
    }
}

// Remove from Cart
window.removeFromCart = function(courseId) {
    cart = cart.filter(c => c.id !== courseId);
    renderCart();
    showPopup('Course removed from cart.');
}

// Payment Processing
window.processPayment = function() {
    if (cart.length === 0) {
        showPopup('Cart is empty!');
        return;
    }
    purchasedCourses = [...purchasedCourses, ...cart];
    cart = [];
    renderCart();
    showPopup('Transaction successful! Courses added to your account.');
}

// Navigation
window.navigate = navigate;

// SPA Routing
window.addEventListener('hashchange', () => {
    const page = window.location.hash.replace('#', '') || 'home';
    renderPage(page);
});

// Initial Load
window.addEventListener('DOMContentLoaded', () => {
    const page = window.location.hash.replace('#', '') || 'home';
    renderPage(page);
    setupNavEvents();
    setupSearchAndFilter();
});

function setupNavEvents() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            navigate(link.dataset.page);
        });
    });
    document.getElementById('loginBtn').addEventListener('click', () => {
        showPopup('Login functionality coming soon!');
    });
}

function setupSearchAndFilter() {
    document.getElementById('searchBtn').addEventListener('click', () => {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filtered = courses.filter(c => c.name.toLowerCase().includes(query));
        renderCourses(filtered);
    });
    document.getElementById('filterBtn').addEventListener('click', () => {
        showFilterPopup();
    });
}

function showPopup(message) {
    popup.textContent = message;
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 2200);
}

function showFilterPopup() {
    const filterHtml = `
        <div style="padding:1rem;">
            <h3>Filter Courses</h3>
            <div style="margin:1rem 0;">
                <label>Sort by Price: </label>
                <select id="sortPrice">
                    <option value="none">None</option>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
            </div>
            <div style="margin:1rem 0;">
                <label>Level: </label>
                <select id="filterLevel">
                    <option value="all">All</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
            </div>
            <button class="btn" id="applyFilterBtn">Apply</button>
        </div>
    `;
    popup.innerHTML = filterHtml;
    popup.classList.add('show');
    document.getElementById('applyFilterBtn').onclick = () => {
        let filtered = [...courses];
        const sort = document.getElementById('sortPrice').value;
        const level = document.getElementById('filterLevel').value;
        if (sort === 'asc') filtered.sort((a,b) => a.price - b.price);
        if (sort === 'desc') filtered.sort((a,b) => b.price - a.price);
        if (level !== 'all') filtered = filtered.filter(c => c.level === level);
        renderCourses(filtered);
        popup.classList.remove('show');
    };
    setTimeout(() => popup.classList.remove('show'), 8000);
}