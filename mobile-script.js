// Digital Labour Chowk Mobile App JavaScript

// Screen Management
let currentScreen = 'home-screen';
let screenHistory = [];

function showScreen(screenId) {
    // Hide current screen
    const currentScreenElement = document.getElementById(currentScreen);
    if (currentScreenElement) {
        currentScreenElement.classList.remove('active');
    }
    
    // Add to history
    screenHistory.push(currentScreen);
    
    // Show new screen
    const newScreenElement = document.getElementById(screenId);
    if (newScreenElement) {
        newScreenElement.classList.add('active');
        currentScreen = screenId;
        
        // Update bottom navigation
        updateBottomNavigation(screenId);
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Update phone display for OTP screens
        if (screenId === 'worker-otp' || screenId === 'employer-otp') {
            updatePhoneDisplay();
        }
        
        // Announce screen change for accessibility
        announceScreenChange(screenId);
    }
}

function goBack() {
    if (screenHistory.length > 0) {
        const previousScreen = screenHistory.pop();
        showScreen(previousScreen);
    } else {
        showScreen('home-screen');
    }
}

function updateBottomNavigation(screenId) {
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to corresponding nav item
    const navMapping = {
        'home-screen': 0,
        'job-matching': 1,
        'notifications': 2,
        'welfare': 3,
        'support': 4
    };
    
    const navIndex = navMapping[screenId];
    if (navIndex !== undefined) {
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[navIndex]) {
            navItems[navIndex].classList.add('active');
        }
    }
}

// Accessibility Features
function announceScreenChange(screenId) {
    const screenNames = {
        'home-screen': 'Home screen',
        'worker-dashboard': 'Worker dashboard',
        'employer-dashboard': 'Employer dashboard',
        'job-matching': 'Job matching screen',
        'registration': 'Registration and verification',
        'welfare': 'Support and welfare',
        'notifications': 'Notifications and announcements'
    };
    
    const screenName = screenNames[screenId] || 'New screen';
    
    // Create announcement for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    announcement.textContent = `Navigated to ${screenName}`;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// View Toggle for Job Matching
let currentView = 'list';

function toggleView(view) {
    currentView = view;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    event.target.closest('.view-btn').classList.add('active');
    
    // Update results display
    const resultsList = document.querySelector('.results-list');
    if (resultsList) {
        if (view === 'map') {
            resultsList.innerHTML = `
                <div class="map-placeholder">
                    <i class="fas fa-map"></i>
                    <p>Map view coming soon</p>
                    <p class="hindi">मानचित्र दृश्य जल्द आ रहा है</p>
                </div>
            `;
        } else {
            // Restore list view
            resultsList.innerHTML = `
                <div class="result-card">
                    <div class="result-info">
                        <h4>Construction Helper - Masonry</h4>
                        <p class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            2.5 km away
                        </p>
                        <p class="wage">₹800/day</p>
                        <p class="duration">2 weeks project</p>
                    </div>
                    <div class="result-actions">
                        <button class="contact-btn">Contact</button>
                    </div>
                </div>
            `;
        }
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            filterResults(query);
        });
    }
}

function filterResults(query) {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(query) || query === '') {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.3s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter Functionality
function initializeFilters() {
    const filterSelects = document.querySelectorAll('.filters select');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            applyFilters();
        });
    });
}

function applyFilters() {
    const locationFilter = document.querySelector('.filters select:nth-child(1)').value;
    const skillFilter = document.querySelector('.filters select:nth-child(2)').value;
    const wageFilter = document.querySelector('.filters select:nth-child(3)').value;
    
    // Simulate filtering logic
    console.log('Applying filters:', { locationFilter, skillFilter, wageFilter });
    
    // Show loading state
    const resultsList = document.querySelector('.results-list');
    if (resultsList) {
        resultsList.innerHTML = `
            <div class="loading-state">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Filtering results...</p>
            </div>
        `;
        
        // Simulate API call
        setTimeout(() => {
            resultsList.innerHTML = `
                <div class="result-card">
                    <div class="result-info">
                        <h4>Construction Helper - Masonry</h4>
                        <p class="location">
                            <i class="fas fa-map-marker-alt"></i>
                            2.5 km away
                        </p>
                        <p class="wage">₹800/day</p>
                        <p class="duration">2 weeks project</p>
                    </div>
                    <div class="result-actions">
                        <button class="contact-btn">Contact</button>
                    </div>
                </div>
            `;
        }, 1000);
    }
}

// Availability Toggle
function initializeAvailabilityToggle() {
    const toggle = document.querySelector('.availability-toggle input');
    const text = document.querySelector('.availability-text');
    
    if (toggle && text) {
        toggle.addEventListener('change', function() {
            if (this.checked) {
                text.textContent = 'Available';
                text.style.color = '#4CAF50';
            } else {
                text.textContent = 'Not Available';
                text.style.color = '#f44336';
            }
        });
    }
}

// Contact Functionality
function initializeContactButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('contact-btn')) {
            handleContactClick(e.target);
        }
    });
}

function handleContactClick(button) {
    // Show contact options
    const contactModal = createContactModal();
    document.body.appendChild(contactModal);
    
    // Animate in
    setTimeout(() => {
        contactModal.classList.add('show');
    }, 10);
}

function createContactModal() {
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeContactModal()"></div>
        <div class="modal-content">
            <h3>Contact Worker</h3>
            <p>Choose how you'd like to contact this worker:</p>
            <div class="contact-options">
                <button class="contact-option" onclick="makeCall()">
                    <i class="fas fa-phone"></i>
                    <span>Call</span>
                </button>
                <button class="contact-option" onclick="sendMessage()">
                    <i class="fas fa-message"></i>
                    <span>Message</span>
                </button>
                <button class="contact-option" onclick="sendWhatsApp()">
                    <i class="fab fa-whatsapp"></i>
                    <span>WhatsApp</span>
                </button>
            </div>
            <button class="close-btn" onclick="closeContactModal()">Close</button>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .contact-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .contact-modal.show {
            opacity: 1;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
        }
        
        .modal-content {
            background: white;
            border-radius: 15px;
            padding: 2rem;
            max-width: 300px;
            width: 90%;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        }
        
        .contact-modal.show .modal-content {
            transform: scale(1);
        }
        
        .contact-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin: 1.5rem 0;
        }
        
        .contact-option {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 2px solid #e0e0e0;
            border-radius: 10px;
            background: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .contact-option:hover {
            border-color: #ff6b35;
            background: #fff5f0;
        }
        
        .contact-option i {
            font-size: 1.2rem;
            color: #ff6b35;
        }
        
        .close-btn {
            width: 100%;
            padding: 0.8rem;
            background: #f0f0f0;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
        }
    `;
    
    if (!document.querySelector('#contact-modal-styles')) {
        style.id = 'contact-modal-styles';
        document.head.appendChild(style);
    }
    
    return modal;
}

function closeContactModal() {
    const modal = document.querySelector('.contact-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

function makeCall() {
    alert('Calling worker... (This would initiate a phone call in a real app)');
    closeContactModal();
}

function sendMessage() {
    alert('Opening messaging app... (This would open SMS/messaging in a real app)');
    closeContactModal();
}

function sendWhatsApp() {
    alert('Opening WhatsApp... (This would open WhatsApp in a real app)');
    closeContactModal();
}

// Registration Actions
function initializeRegistrationButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('reg-btn')) {
            handleRegistrationClick(e.target);
        }
    });
}

function handleRegistrationClick(button) {
    const card = button.closest('.reg-card');
    const title = card.querySelector('h3').textContent;
    
    // Simulate registration process
    button.textContent = 'Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        alert(`${title} registration initiated. You will be redirected to the official government portal.`);
        button.textContent = 'Register Now';
        button.disabled = false;
    }, 2000);
}

// Welfare Actions
function initializeWelfareButtons() {
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('welfare-btn')) {
            handleWelfareClick(e.target);
        }
    });
}

function handleWelfareClick(button) {
    const card = button.closest('.welfare-card');
    const title = card.querySelector('h3').textContent;
    
    // Simulate welfare action
    button.textContent = 'Loading...';
    button.disabled = true;
    
    setTimeout(() => {
        alert(`${title} information is being loaded. You will be redirected to the relevant section.`);
        button.textContent = button.textContent.replace('Loading...', 'View Schedule');
        button.disabled = false;
    }, 1500);
}

// Notification Management
function initializeNotifications() {
    // Mark notifications as read when clicked
    document.addEventListener('click', function(e) {
        const notificationItem = e.target.closest('.notification-item');
        if (notificationItem) {
            notificationItem.style.opacity = '0.7';
            notificationItem.style.backgroundColor = '#f8f9fa';
        }
    });
}

// Accessibility Enhancements
function initializeAccessibility() {
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            closeContactModal();
        }
    });
    
    // Add focus indicators
    const style = document.createElement('style');
    style.textContent = `
        .user-type-btn:focus,
        .action-btn:focus,
        .quick-link:focus,
        .contact-btn:focus {
            outline: 3px solid #ff6b35;
            outline-offset: 2px;
        }
        
        .screen {
            scroll-behavior: smooth;
        }
    `;
    document.head.appendChild(style);
}


// Offline Support
function initializeOfflineSupport() {
    // Check if app is online
    function updateOnlineStatus() {
        const status = navigator.onLine ? 'online' : 'offline';
        console.log('App is', status);
        
        if (!navigator.onLine) {
            showOfflineMessage();
        } else {
            hideOfflineMessage();
        }
    }
    
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    updateOnlineStatus();
}

function showOfflineMessage() {
    const message = document.createElement('div');
    message.id = 'offline-message';
    message.innerHTML = `
        <div class="offline-banner">
            <i class="fas fa-wifi"></i>
            <span>You're offline. Some features may not be available.</span>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .offline-banner {
            background: #ff6b35;
            color: white;
            padding: 0.8rem;
            text-align: center;
            font-size: 0.9rem;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            z-index: 1500;
        }
        
        .offline-banner i {
            margin-right: 0.5rem;
        }
    `;
    
    if (!document.querySelector('#offline-styles')) {
        style.id = 'offline-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
}

function hideOfflineMessage() {
    const message = document.getElementById('offline-message');
    if (message) {
        message.remove();
    }
}

// Authentication Functions
let otpTimer = null;
let otpCountdown = 0;

function initializeAuthentication() {
    // Worker login form
    const workerLoginForm = document.getElementById('worker-login-form');
    if (workerLoginForm) {
        workerLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleWorkerLogin();
        });
    }

    // Employer login form
    const employerLoginForm = document.getElementById('employer-login-form');
    if (employerLoginForm) {
        employerLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmployerLogin();
        });
    }

    // Worker OTP form
    const workerOTPForm = document.getElementById('worker-otp-form');
    if (workerOTPForm) {
        workerOTPForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleWorkerOTPVerification();
        });
    }

    // Employer OTP form
    const employerOTPForm = document.getElementById('employer-otp-form');
    if (employerOTPForm) {
        employerOTPForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmployerOTPVerification();
        });
    }

    // Worker registration form
    const workerRegForm = document.getElementById('worker-registration-form');
    if (workerRegForm) {
        workerRegForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleWorkerRegistration();
        });
    }

    // Employer registration form
    const employerRegForm = document.getElementById('employer-registration-form');
    if (employerRegForm) {
        employerRegForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleEmployerRegistration();
        });
    }

    // Phone number validation
    initializePhoneValidation();
    
    // OTP input handling
    initializeOTPInputs();
}

function handleWorkerLogin() {
    const phoneInput = document.getElementById('worker-phone');
    const submitBtn = document.getElementById('worker-login-btn');
    const btnText = document.getElementById('worker-btn-text');
    const spinner = document.getElementById('worker-spinner');

    // Send OTP
    if (validatePhoneNumber(phoneInput.value)) {
        showLoading(submitBtn, btnText, spinner);
        
        // Simulate OTP sending
        setTimeout(() => {
            hideLoading(submitBtn, btnText, spinner);
            // Store phone number for OTP screen
            localStorage.setItem('workerPhone', phoneInput.value);
            showScreen('worker-otp');
            startOTPTimer('worker');
        }, 2000);
    } else {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
    }
}

function handleEmployerLogin() {
    const phoneInput = document.getElementById('employer-phone');
    const submitBtn = document.getElementById('employer-login-btn');
    const btnText = document.getElementById('employer-btn-text');
    const spinner = document.getElementById('employer-spinner');

    // Send OTP
    if (validatePhoneNumber(phoneInput.value)) {
        showLoading(submitBtn, btnText, spinner);
        
        // Simulate OTP sending
        setTimeout(() => {
            hideLoading(submitBtn, btnText, spinner);
            // Store phone number for OTP screen
            localStorage.setItem('employerPhone', phoneInput.value);
            showScreen('employer-otp');
            startOTPTimer('employer');
        }, 2000);
    } else {
        showError(phoneInput, 'Please enter a valid 10-digit phone number');
    }
}

function handleWorkerRegistration() {
    const form = document.getElementById('worker-registration-form');
    const submitBtn = form.querySelector('.submit-btn');
    const spinner = document.getElementById('worker-reg-spinner');
    
    if (validateWorkerForm()) {
        showLoading(submitBtn, submitBtn.querySelector('span'), spinner);
        
        // Simulate registration
        setTimeout(() => {
            hideLoading(submitBtn, submitBtn.querySelector('span'), spinner);
            showSuccessMessage('Registration successful! Please login to continue.');
            setTimeout(() => {
                showScreen('worker-login');
            }, 2000);
        }, 3000);
    }
}

function handleEmployerRegistration() {
    const form = document.getElementById('employer-registration-form');
    const submitBtn = form.querySelector('.submit-btn');
    const spinner = document.getElementById('employer-reg-spinner');
    
    if (validateEmployerForm()) {
        showLoading(submitBtn, submitBtn.querySelector('span'), spinner);
        
        // Simulate registration
        setTimeout(() => {
            hideLoading(submitBtn, submitBtn.querySelector('span'), spinner);
            showSuccessMessage('Registration successful! Please login to continue.');
            setTimeout(() => {
                showScreen('employer-login');
            }, 2000);
        }, 3000);
    }
}

function validatePhoneNumber(phone) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
}

function validateOTP(otp) {
    const otpRegex = /^\d{6}$/;
    return otpRegex.test(otp);
}

function validateWorkerForm() {
    const requiredFields = [
        'worker-name',
        'worker-phone-reg',
        'worker-skill',
        'worker-experience',
        'worker-location',
        'worker-id-proof',
        'worker-id-number',
        'worker-terms'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field.type === 'checkbox') {
            if (!field.checked) {
                showError(field, 'Please accept the terms and conditions');
                isValid = false;
            }
        } else if (field.type === 'tel') {
            if (!validatePhoneNumber(field.value)) {
                showError(field, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        } else if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    return isValid;
}

function validateEmployerForm() {
    const requiredFields = [
        'employer-name',
        'employer-phone-reg',
        'employer-type',
        'employer-location',
        'employer-industry',
        'employer-id-proof',
        'employer-id-number',
        'employer-terms'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field.type === 'checkbox') {
            if (!field.checked) {
                showError(field, 'Please accept the terms and conditions');
                isValid = false;
            }
        } else if (field.type === 'tel') {
            if (!validatePhoneNumber(field.value)) {
                showError(field, 'Please enter a valid 10-digit phone number');
                isValid = false;
            }
        } else if (!field.value.trim()) {
            showError(field, 'This field is required');
            isValid = false;
        } else {
            clearError(field);
        }
    });
    
    return isValid;
}

function showOTPGroup(otpGroup) {
    otpGroup.style.display = 'block';
    otpGroup.style.animation = 'fadeIn 0.3s ease';
}

function startOTPTimer(type) {
    otpCountdown = 60;
    const timerElement = document.getElementById(type + '-timer');
    const resendBtn = document.querySelector(`#${type}-otp-group .resend-btn`);
    
    resendBtn.disabled = true;
    
    otpTimer = setInterval(() => {
        otpCountdown--;
        timerElement.textContent = `Resend OTP in ${otpCountdown} seconds`;
        
        if (otpCountdown <= 0) {
            clearInterval(otpTimer);
            timerElement.textContent = '';
            resendBtn.disabled = false;
            resendBtn.textContent = 'Resend OTP';
        }
    }, 1000);
}

function resendOTP(type) {
    const phoneInput = document.getElementById(type + '-phone');
    const resendBtn = document.querySelector(`#${type}-otp-group .resend-btn`);
    
    if (validatePhoneNumber(phoneInput.value)) {
        resendBtn.textContent = 'Sending...';
        resendBtn.disabled = true;
        
        // Simulate resending OTP
        setTimeout(() => {
            resendBtn.textContent = 'Resend OTP';
            startOTPTimer(type);
            showSuccessMessage('OTP resent successfully');
        }, 1500);
    } else {
        showError(phoneInput, 'Please enter a valid phone number first');
    }
}

function showLoading(button, textElement, spinnerElement) {
    button.disabled = true;
    textElement.style.display = 'none';
    spinnerElement.style.display = 'inline-block';
}

function hideLoading(button, textElement, spinnerElement) {
    button.disabled = false;
    textElement.style.display = 'inline';
    spinnerElement.style.display = 'none';
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function showSuccessMessage(message) {
    // Remove existing success messages
    const existingMessages = document.querySelectorAll('.success-message');
    existingMessages.forEach(msg => msg.remove());
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.querySelector('.login-form, .registration-form');
    if (form) {
        form.insertBefore(successDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

function handleWorkerOTPVerification() {
    const otpDigits = document.querySelectorAll('#worker-otp-form .otp-digit');
    const submitBtn = document.getElementById('worker-verify-btn');
    const spinner = document.getElementById('worker-verify-spinner');
    const errorElement = document.getElementById('worker-otp-error');
    
    const otp = Array.from(otpDigits).map(input => input.value).join('');
    
    if (validateOTP(otp)) {
        showLoading(submitBtn, submitBtn.querySelector('span'), spinner);
        
        // Simulate OTP verification
        setTimeout(() => {
            hideLoading(submitBtn, submitBtn.querySelector('span'), spinner);
            showSuccessMessage('Login successful!');
            setTimeout(() => {
                showScreen('worker-dashboard');
            }, 1000);
        }, 1500);
    } else {
        showOTPError('worker', 'Please enter a valid 6-digit OTP');
    }
}

function handleEmployerOTPVerification() {
    const otpDigits = document.querySelectorAll('#employer-otp-form .otp-digit');
    const submitBtn = document.getElementById('employer-verify-btn');
    const spinner = document.getElementById('employer-verify-spinner');
    const errorElement = document.getElementById('employer-otp-error');
    
    const otp = Array.from(otpDigits).map(input => input.value).join('');
    
    if (validateOTP(otp)) {
        showLoading(submitBtn, submitBtn.querySelector('span'), spinner);
        
        // Simulate OTP verification
        setTimeout(() => {
            hideLoading(submitBtn, submitBtn.querySelector('span'), spinner);
            showSuccessMessage('Login successful!');
            setTimeout(() => {
                showScreen('employer-dashboard');
            }, 1000);
        }, 1500);
    } else {
        showOTPError('employer', 'Please enter a valid 6-digit OTP');
    }
}

function initializeOTPInputs() {
    // Handle OTP input navigation and validation
    document.addEventListener('input', function(e) {
        if (e.target.classList.contains('otp-digit')) {
            const input = e.target;
            const index = parseInt(input.dataset.index);
            const value = input.value;
            
            // Only allow numbers
            input.value = value.replace(/[^0-9]/g, '');
            
            // Add filled class when digit is entered
            if (input.value) {
                input.classList.add('filled');
                input.classList.remove('error');
                
                // Move to next input
                if (index < 5) {
                    const nextInput = document.querySelector(`[data-index="${index + 1}"]`);
                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            } else {
                input.classList.remove('filled');
            }
            
            // Auto-submit when all digits are filled
            const allDigits = document.querySelectorAll('.otp-digit');
            const allFilled = Array.from(allDigits).every(digit => digit.value);
            if (allFilled) {
                const form = input.closest('form');
                if (form) {
                    form.dispatchEvent(new Event('submit'));
                }
            }
        }
    });
    
    // Handle backspace navigation
    document.addEventListener('keydown', function(e) {
        if (e.target.classList.contains('otp-digit') && e.key === 'Backspace') {
            const input = e.target;
            const index = parseInt(input.dataset.index);
            
            if (!input.value && index > 0) {
                const prevInput = document.querySelector(`[data-index="${index - 1}"]`);
                if (prevInput) {
                    prevInput.focus();
                }
            }
        }
    });
}

function showOTPError(type, message) {
    const errorElement = document.getElementById(type + '-otp-error');
    if (errorElement) {
        errorElement.textContent = message;
        
        // Add error class to all OTP inputs
        const otpInputs = document.querySelectorAll(`#${type}-otp-form .otp-digit`);
        otpInputs.forEach(input => {
            input.classList.add('error');
        });
        
        // Remove error class after 3 seconds
        setTimeout(() => {
            errorElement.textContent = '';
            otpInputs.forEach(input => {
                input.classList.remove('error');
            });
        }, 3000);
    }
}

function updatePhoneDisplay() {
    // Update phone display on OTP screens
    const workerPhone = localStorage.getItem('workerPhone');
    const employerPhone = localStorage.getItem('employerPhone');
    
    if (workerPhone) {
        const display = document.getElementById('worker-phone-display');
        if (display) {
            display.textContent = `+91 ${workerPhone}`;
        }
    }
    
    if (employerPhone) {
        const display = document.getElementById('employer-phone-display');
        if (display) {
            display.textContent = `+91 ${employerPhone}`;
        }
    }
}

function initializePhoneValidation() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Only allow numbers
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Clear any existing errors
            clearError(this);
        });
    });
}

// Worker Details Modal Functions
function showWorkerDetails(workerId) {
    const modal = document.getElementById('worker-details-modal');
    
    // Sample worker data - in real app, this would come from API
    const workerData = {
        'worker1': {
            name: 'Rajesh Kumar',
            skill: 'Masonry Work',
            location: 'New Delhi, India',
            experience: '5 years',
            rate: '₹850/day',
            availability: 'Available Now',
            rating: '4.9 (127 reviews)',
            skills: ['Masonry', 'Concrete Work', 'Brick Laying', 'Plastering'],
            experienceHistory: [
                {
                    title: 'Senior Mason',
                    duration: '2020 - Present',
                    company: 'ABC Construction Pvt Ltd',
                    description: 'Led masonry work for residential and commercial projects'
                },
                {
                    title: 'Mason',
                    duration: '2018 - 2020',
                    company: 'XYZ Builders',
                    description: 'Worked on various construction projects'
                }
            ],
            reviews: [
                {
                    reviewer: 'Amit Sharma',
                    text: 'Excellent work quality and punctual. Highly recommended!',
                    date: '2 days ago'
                }
            ]
        },
        'worker2': {
            name: 'Priya Sharma',
            skill: 'Electrical Work',
            location: 'Gurgaon, Haryana',
            experience: '3 years',
            rate: '₹1200/day',
            availability: 'Available Now',
            rating: '4.8 (89 reviews)',
            skills: ['Electrical Wiring', 'Panel Installation', 'Troubleshooting', 'Safety Systems'],
            experienceHistory: [
                {
                    title: 'Electrician',
                    duration: '2021 - Present',
                    company: 'Power Solutions Ltd',
                    description: 'Handled electrical work for commercial buildings'
                }
            ],
            reviews: [
                {
                    reviewer: 'Ravi Singh',
                    text: 'Professional and reliable electrician. Great work!',
                    date: '1 week ago'
                }
            ]
        },
        'worker3': {
            name: 'Amit Singh',
            skill: 'Plumbing Work',
            location: 'Noida, Uttar Pradesh',
            experience: '4 years',
            rate: '₹900/day',
            availability: 'Available Now',
            rating: '4.7 (156 reviews)',
            skills: ['Pipe Repair', 'Water Systems', 'Drainage', 'Fixture Installation'],
            experienceHistory: [
                {
                    title: 'Plumber',
                    duration: '2020 - Present',
                    company: 'Water Works Co',
                    description: 'Specialized in residential plumbing solutions'
                }
            ],
            reviews: [
                {
                    reviewer: 'Suresh Kumar',
                    text: 'Quick response and excellent plumbing work.',
                    date: '3 days ago'
                }
            ]
        }
    };
    
    const worker = workerData[workerId];
    if (worker) {
        // Update modal content
        document.getElementById('worker-detail-name').textContent = worker.name;
        document.getElementById('worker-detail-skill').textContent = worker.skill;
        document.getElementById('worker-detail-location').textContent = worker.location;
        document.getElementById('worker-detail-experience').textContent = worker.experience;
        document.getElementById('worker-detail-rate').textContent = worker.rate;
        document.getElementById('worker-detail-availability').textContent = worker.availability;
        document.getElementById('worker-detail-rating').textContent = worker.rating;
        
        // Update skills
        const skillsContainer = document.querySelector('.skills-tags');
        skillsContainer.innerHTML = '';
        worker.skills.forEach(skill => {
            const skillTag = document.createElement('span');
            skillTag.className = 'skill-tag';
            skillTag.textContent = skill;
            skillsContainer.appendChild(skillTag);
        });
        
        // Update experience history
        const experienceContainer = document.querySelector('.worker-experience');
        const experienceItems = experienceContainer.querySelectorAll('.experience-item');
        experienceItems.forEach((item, index) => {
            if (worker.experienceHistory[index]) {
                const exp = worker.experienceHistory[index];
                item.querySelector('.exp-title').textContent = exp.title;
                item.querySelector('.exp-duration').textContent = exp.duration;
                item.querySelector('.exp-company').textContent = exp.company;
                item.querySelector('.exp-description').textContent = exp.description;
            }
        });
        
        // Update reviews
        const reviewContainer = document.querySelector('.worker-reviews .review-item');
        if (worker.reviews[0]) {
            const review = worker.reviews[0];
            reviewContainer.querySelector('.reviewer').textContent = review.reviewer;
            reviewContainer.querySelector('.review-text').textContent = review.text;
            reviewContainer.querySelector('.review-date').textContent = review.date;
        }
    }
    
    modal.classList.add('show');
}

function closeWorkerDetails() {
    const modal = document.getElementById('worker-details-modal');
    modal.classList.remove('show');
}

function contactWorker() {
    closeWorkerDetails();
    // Show contact modal or initiate contact
    alert('Contacting worker... (This would open contact options in a real app)');
}

// Job Details Modal Functions
function showJobDetails(jobId) {
    const modal = document.getElementById('job-details-modal');
    
    // Sample job data - in real app, this would come from API
    const jobData = {
        'job1': {
            title: 'Construction Helper - Masonry',
            location: 'Gurgaon, Haryana',
            rate: '₹800/day',
            duration: '2 weeks',
            workers: '2 workers',
            status: 'Active',
            description: 'We need skilled masonry workers for a residential construction project. Work includes brick laying, concrete work, and plastering. Must have experience in residential construction.',
            requirements: [
                'Minimum 2 years experience in masonry',
                'Knowledge of construction tools and materials',
                'Physical fitness for construction work',
                'Valid ID proof required'
            ],
            employer: 'ABC Construction',
            employerType: 'Construction Company',
            employerRating: '4.8 (45 reviews)',
            startDate: 'March 15, 2024',
            endDate: 'March 29, 2024'
        }
    };
    
    const job = jobData[jobId];
    if (job) {
        // Update modal content
        document.getElementById('job-detail-title').textContent = job.title;
        document.getElementById('job-detail-location').textContent = job.location;
        document.getElementById('job-detail-rate').textContent = job.rate;
        document.getElementById('job-detail-duration').textContent = job.duration;
        document.getElementById('job-detail-workers').textContent = job.workers;
        document.getElementById('job-detail-status').textContent = job.status;
        document.getElementById('job-detail-description').textContent = job.description;
        document.getElementById('job-detail-employer').textContent = job.employer;
        
        // Update requirements
        const requirementsList = document.getElementById('job-detail-requirements');
        requirementsList.innerHTML = '';
        job.requirements.forEach(req => {
            const li = document.createElement('li');
            li.textContent = req;
            requirementsList.appendChild(li);
        });
        
        // Update timeline
        const timelineItems = document.querySelectorAll('.timeline-item');
        if (timelineItems[0]) {
            timelineItems[0].querySelector('.timeline-date').textContent = job.startDate;
        }
        if (timelineItems[1]) {
            timelineItems[1].querySelector('.timeline-date').textContent = job.endDate;
        }
    }
    
    modal.classList.add('show');
}

function closeJobDetails() {
    const modal = document.getElementById('job-details-modal');
    modal.classList.remove('show');
}

function applyForJob() {
    closeJobDetails();
    // Show application form or process
    alert('Applying for job... (This would open application form in a real app)');
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAuthentication();
    initializeSearch();
    initializeFilters();
    initializeAvailabilityToggle();
    initializeContactButtons();
    initializeRegistrationButtons();
    initializeWelfareButtons();
    initializeNotifications();
    initializeAccessibility();
    initializeOfflineSupport();
    
    // Set initial screen
    showScreen('home-screen');
    
    console.log('Digital Labour Chowk Mobile App initialized successfully!');
});

// Service Worker Registration for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}
