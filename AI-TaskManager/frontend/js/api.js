const API_URL = 'http://localhost:3000/api/tasks';

function getHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  };
}

export async function getTasks() {
  const res = await fetch(API_URL, { headers: getHeaders() });
  if (!res.ok) throw new Error('Не удалось загрузить задачи');
  return await res.json();
}

export async function createTask(taskData) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(taskData)
  });
  if (!res.ok) throw new Error('Не удалось создать задачу');
  return await res.json();
}

export async function updateTask(id, taskData) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(taskData)
  });
  if (!res.ok) throw new Error('Не удалось обновить задачу');
  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Не удалось удалить задачу');
  return await res.json();
}

export function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}