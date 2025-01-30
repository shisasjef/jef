const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
const hoursRange = Array.from({ length: 5 }, (_, i) => `${16 + i}:00 - ${16 + i}:45`);
let selectedDay = null;
let blockedSlots = JSON.parse(localStorage.getItem('blockedSlots')) || [];
let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
let currentUser = null;

const daysContainer = document.getElementById('days');
const hoursContainer = document.getElementById('hours');
const confirmBookingButton = document.getElementById('confirmBooking');
const registerNameInput = document.getElementById('registerName');
const registerPhoneInput = document.getElementById('registerPhone');
const registerEmailInput = document.getElementById('registerEmail');
const registerUserButton = document.getElementById('registerUser');
const reservationsTableBody = document.querySelector('#reservationsTable tbody');
const blockDaySelect = document.getElementById('blockDay');
const blockHourSelect = document.getElementById('blockHour');
const blockSlotButton = document.getElementById('blockSlot');
const bookingSection = document.querySelector('.booking-section');
const registerSection = document.querySelector('.register-section');

// Renderizar días
function renderDays() {
    daysContainer.innerHTML = '';
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.textContent = day;
        dayElement.addEventListener('click', () => selectDay(dayElement, day));
        daysContainer.appendChild(dayElement);
    });
}

// Renderizar horarios
function renderHours() {
    hoursContainer.innerHTML = '';
    hoursRange.forEach(hour => {
        const hourElement = document.createElement('div');
        hourElement.className = 'hour';
        hourElement.textContent = hour;

        if (blockedSlots.some(slot => slot.day === selectedDay.textContent && slot.hour === hour)) {
            hourElement.classList.add('reserved');
        } else {
            hourElement.addEventListener('click', () => selectHour(hourElement, hour));
        }

        hoursContainer.appendChild(hourElement);
    });
}

// Seleccionar día
function selectDay(element, day) {
    if (selectedDay) {
        selectedDay.classList.remove('selected');
    }
    selectedDay =