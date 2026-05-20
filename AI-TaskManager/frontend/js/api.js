// Базовый URL нашего бэкенда
const API_URL = 'http://localhost:3000/api/tasks';

export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error('Не удалось загрузить задачи');
  return await response.json();
}

export async function createTask(taskData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Не удалось создать задачу');
  return await response.json();
}

export async function updateTask(id, taskData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData)
  });
  if (!response.ok) throw new Error('Не удалось обновить задачу');
  return await response.json();
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Не удалось удалить задачу');
  return await response.json();
}