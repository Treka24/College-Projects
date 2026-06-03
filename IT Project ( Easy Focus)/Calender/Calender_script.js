const calendar = document.getElementById('calendar');
const popup = document.getElementById('note-popup');
const noteText = document.getElementById('note-text');
const monthSelect = document.getElementById('month-select');
const yearSelect = document.getElementById('year-select');

let selectedDate = null;
let currentDate = new Date();
let notes = JSON.parse(localStorage.getItem('calendar-notes')) || {};

function populateSelectors() {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    monthSelect.innerHTML = '';
    months.forEach((month, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.text = month;
        monthSelect.appendChild(option);
    });

    const thisYear = new Date().getFullYear();
    yearSelect.innerHTML = '';
    for (let y = thisYear - 50; y <= thisYear + 50; y++) {
        const option = document.createElement('option');
        option.value = y;
        option.text = y;
        yearSelect.appendChild(option);
    }
}

function updateSelectors() {
    monthSelect.value = currentDate.getMonth();
    yearSelect.value = currentDate.getFullYear();
}

function createCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    calendar.innerHTML = '';

    const daysRow = document.createElement('div');
    daysRow.className = 'days-row';
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(d => {
        const day = document.createElement('div');
        day.className = 'day-name';
        day.innerText = d;
        daysRow.appendChild(day);
    });
    calendar.appendChild(daysRow);

    const grid = document.createElement('div');
    grid.className = 'calendar-grid';

    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'day empty';
        grid.appendChild(emptyCell);
    }

    for (let d = 1; d <= lastDate; d++) {
        const cell = document.createElement('div');
        cell.className = 'day';
        cell.innerText = d;

        const dateKey = `${year}-${month + 1}-${d}`;

        const today = new Date();
        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            cell.classList.add('today');
        }

        cell.addEventListener('click', () => {
            selectedDate = dateKey;
            const noteList = notes[selectedDate] || [];
            noteText.value = '';
            const existingNotes = noteList.map((n, i) => `• ${n}`).join('\n');
            if (existingNotes) {
                alert(`📌 Notes for ${selectedDate}:\n\n${existingNotes}`);
            }
            popup.classList.remove('hidden');
        });

        if (notes[dateKey] && notes[dateKey].length > 0) {
            cell.classList.add('has-note');
            cell.title = notes[dateKey].join('\n');
        }

        grid.appendChild(cell);
    }

    calendar.appendChild(grid);
    updateSelectors();
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    createCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    createCalendar();
}

function changeMonth() {
    currentDate.setMonth(parseInt(monthSelect.value));
    createCalendar();
}

function changeYear() {
    currentDate.setFullYear(parseInt(yearSelect.value));
    createCalendar();
}

function saveNote() {
    const newNote = noteText.value.trim();
    if (selectedDate && newNote !== '') {
        if (!notes[selectedDate]) {
            notes[selectedDate] = [];
        }
        notes[selectedDate].push(newNote);
        localStorage.setItem('calendar-notes', JSON.stringify(notes));
        popup.classList.add('hidden');
        createCalendar();
    }
}

function clearNotes() {
    if (selectedDate && notes[selectedDate]) {
        if (confirm(`Are you sure you want to delete all notes for ${selectedDate}?`)) {
            delete notes[selectedDate];
            localStorage.setItem('calendar-notes', JSON.stringify(notes));
            popup.classList.add('hidden');
            createCalendar();
        }
    }
}

function closePopup() {
    popup.classList.add('hidden');
}

populateSelectors();
createCalendar();
