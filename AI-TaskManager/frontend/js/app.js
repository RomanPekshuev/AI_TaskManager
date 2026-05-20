import { getTasks, updateTask, deleteTask } from './api.js';

const taskList = document.getElementById('task-list');
const filterButtons = document.querySelectorAll('.filters button');

function renderTasks(tasks) {
  if (tasks.length === 0) {
    taskList.innerHTML = '<p>Задач пока нет. Создай первую!</p>';
    return;
  }

  taskList.innerHTML = tasks.map(task => `
    <div class="task-card" data-id="${task.id}">
      <input 
        type="checkbox" 
        class="task-check" 
        ${task.completed ? 'checked' : ''}
        data-id="${task.id}"
      >
      <div class="task-info">
        <h3>${task.title}</h3>
        <p>${task.description || 'Без описания'}</p>
        <small>${task.deadline || 'Нет дедлайна'}</small>
      </div>
      <span class="priority ${task.priority}">
        ${task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} 
        ${task.priority}
      </span>
      <button class="btn-delete" data-id="${task.id}">🗑️</button>
    </div>
  `).join('');

  attachTaskEvents();
}

function attachTaskEvents() {
  document.querySelectorAll('.task-check').forEach(checkbox => {
    checkbox.addEventListener('change', async (e) => {
      const id = e.target.dataset.id;
      const completed = e.target.checked;
      try {
        await updateTask(id, { completed });
        console.log('Задача обновлена');
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Не удалось обновить задачу');
      }
    });
  });

  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async (e) => {
      const id = e.target.dataset.id;
      if (confirm('Удалить эту задачу?')) {
        try {
          await deleteTask(id);
          loadTasks();
        } catch (error) {
          console.error('Ошибка:', error);
          alert('Не удалось удалить задачу');
        }
      }
    });
  });
}

export async function loadTasks() {
  try {
    taskList.innerHTML = '<p>Загрузка...</p>';
    const tasks = await getTasks();
    renderTasks(tasks);
  } catch (error) {
    console.error('Ошибка загрузки:', error);
    taskList.innerHTML = '<p class="error">Не удалось загрузить задачи. Убедитесь, что сервер запущен.</p>';
  }
}

filterButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const filter = e.target.dataset.filter;
    console.log('Фильтр:', filter);
  });
});

document.addEventListener('DOMContentLoaded', loadTasks);