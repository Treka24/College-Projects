const jsConfetti = new JSConfetti();

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('addTaskBtn').addEventListener('click', addTask);
});

function addTask() {
  const taskInput = document.getElementById('taskInput').value.trim();
  const priorityInput = document.getElementById('priorityInput').value;
  const categoryInput = document.getElementById('categoryInput').value.trim();

  if (!taskInput) {
    alert('Please enter a task!');
    return;
  }

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');

  li.innerHTML = `
    <div class="task-info">
      <input type="checkbox" class="check-complete" />
      <span class="priority-flag ${priorityInput}"></span>
    </div>
    <div class="task-content">
      <div class="task-title">${taskInput}</div>
      <div class="task-details">Category: ${categoryInput || "General"}</div>
    </div>
    <button class="deleteBtn">Delete</button>
  `;

  taskList.appendChild(li);

  document.getElementById('taskInput').value = '';
  document.getElementById('categoryInput').value = '';

  const checkbox = li.querySelector('.check-complete');
  checkbox.addEventListener('change', () => {
    li.classList.toggle('completed');
    if (checkbox.checked) {
      celebrate();
    }
  });

  li.querySelector('.deleteBtn').addEventListener('click', () => {
    taskList.removeChild(li);
    sortTasks();
  });

  sortTasks();
}

function sortTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = Array.from(taskList.getElementsByTagName('li'));

  tasks.sort((a, b) => {
    const priorityA = a.querySelector('.priority-flag').classList[1];
    const priorityB = b.querySelector('.priority-flag').classList[1];
    const priorityOrder = { low: 3, medium: 2, high: 1 };
    return priorityOrder[priorityA] - priorityOrder[priorityB];
  });

  tasks.forEach(task => taskList.appendChild(task));
}

function celebrate() {
  const sound = document.getElementById('celebration-sound');
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    sound.pause();
    sound.currentTime = 0;
  }, 3000);

  jsConfetti.addConfetti();

  const smiley = document.getElementById('smile');
  smiley.classList.add('clap');
  smiley.classList.remove('hidden');

  setTimeout(() => smiley.classList.remove('clap'), 500);
  setTimeout(() => smiley.classList.add('hidden'), 2000);
}