// DOM Elements
const landingSection = document.getElementById('landing');
const formSection = document.getElementById('form');
const thankYouSection = document.getElementById('thankYou');
const mortgageForm = document.getElementById('mortgageForm');
const calendarDays = document.querySelectorAll('.calendar-day');
const progressFill = document.querySelector('.progress-fill');

// Form Data Storage
let formData = {
  fullName: '',
  email: '',
  phone: '',
  income: '',
  creditScore: ''
};

// Initialize the application
function init() {
  // Set up event listeners
  mortgageForm.addEventListener('submit', handleFormSubmit);
  calendarDays.forEach(day => {
    day.addEventListener('click', handleCalendarDayClick);
  });
  
  // Load any saved form data from localStorage
  loadFormData();
}

// Show the form section
function showForm() {
  landingSection.classList.remove('active-section');
  formSection.classList.add('active-section');
  window.scrollTo(0, 0);
}

// Show the landing section
function showLanding() {
  formSection.classList.remove('active-section');
  landingSection.classList.add('active-section');
  window.scrollTo(0, 0);
}

// Show the thank you section
function showThankYou() {
  formSection.classList.remove('active-section');
  thankYouSection.classList.add('active-section');
  window.scrollTo(0, 0);
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Validate form
  if (!validateForm()) {
    return;
  }
  
  // Save form data
  saveFormData();
  
  // Show thank you section
  showThankYou();
  
  // Update progress bar to 100%
  progressFill.style.width = '100%';
  
  // In a real app, you would send the data to your server here
  console.log('Form submitted:', formData);
  
  // Simulate API call
  simulateAPICall();
}

// Validate form fields
function validateForm() {
  const fullName = document.getElementById('fullName').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const income = document.getElementById('income').value;
  
  // Simple validation
  if (!fullName || !email || !phone || !income) {
    alert('Please fill in all required fields');
    return false;
  }
  
  // Email validation
  if (!validateEmail(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  // Phone validation (very basic)
  if (phone.replace(/\D/g, '').length < 10) {
    alert('Please enter a valid phone number');
    return false;
  }
  
  return true;
}

// Validate email format
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Handle calendar day selection
function handleCalendarDayClick(event) {
  // Remove selected class from all days
  calendarDays.forEach(day => {
    day.classList.remove('bg-blue-100', 'border-blue-500');
  });
  
  // Add selected class to clicked day
  const selectedDay = event.currentTarget;
  selectedDay.classList.add('bg-blue-100', 'border-blue-500');
  
  // In a real app, you would store the selected appointment time
  console.log('Selected appointment:', selectedDay.textContent.trim());
}

// Save form data to localStorage
function saveFormData() {
  formData = {
    fullName: document.getElementById('fullName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    income: document.getElementById('income').value,
    creditScore: document.getElementById('creditScore').value
  };
  
  localStorage.setItem('mortgageFormData', JSON.stringify(formData));
}

// Load form data from localStorage
function loadFormData() {
  const savedData = localStorage.getItem('mortgageFormData');
  if (savedData) {
    formData = JSON.parse(savedData);
    
    // Populate form fields
    document.getElementById('fullName').value = formData.fullName || '';
    document.getElementById('email').value = formData.email || '';
    document.getElementById('phone').value = formData.phone || '';
    document.getElementById('income').value = formData.income || '';
    document.getElementById('creditScore').value = formData.creditScore || '';
  }
}

// Simulate API call (for demo purposes)
function simulateAPICall() {
  // Show loading state
  const submitBtn = document.querySelector('#mortgageForm button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Processing...';
  
  // Simulate network delay
  setTimeout(() => {
    // In a real app, you would handle the API response here
    console.log('API call successful');
    
    // Reset form after successful submission
    mortgageForm.reset();
    localStorage.removeItem('mortgageFormData');
    
    // Reset button state
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane mr-2"></i> Submit';
    
    // Show success message (in a real app, you might do this after the API responds)
    showSuccessNotification();
    
  }, 2000);
}

// Show success notification
function showSuccessNotification() {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center';
  notification.innerHTML = `
    <i class="fas fa-check-circle mr-2"></i>
    <span>Your information has been submitted successfully!</span>
  `;
  
  document.body.appendChild(notification);
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
