const API_URL = 'http://localhost:3000/api/auth';

// Регистрация
const regForm = document.getElementById('register-form');
if (regForm) {
  regForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('reg-message');
    msg.textContent = 'Регистрация...';
    msg.className = 'message loading';

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: document.getElementById('reg-username').value,
          email: document.getElementById('reg-email').value,
          password: document.getElementById('reg-password').value
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      
      msg.textContent = 'Аккаунт создан! Перенаправление...';
      msg.className = 'message success';
      setTimeout(() => window.location.href = 'login.html', 1500);
    } catch (err) {
      msg.textContent = '❌ ' + err.message;
      msg.className = 'message error';
    }
  });
}

// Вход
const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = document.getElementById('login-message');
    msg.textContent = 'Вход...';
    msg.className = 'message loading';

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: document.getElementById('login-email').value,
          password: document.getElementById('login-password').value
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      msg.textContent = 'Успешно! Загрузка...';
      msg.className = 'message success';
      setTimeout(() => window.location.href = 'index.html', 1000);
    } catch (err) {
      msg.textContent = '❌ ' + err.message;
      msg.className = 'message error';
    }
  });
}

const token = localStorage.getItem('token');
const protectedPages = ['index.html', 'create.html', 'settings.html'];
const currentPage = window.location.pathname.split('/').pop();

if (protectedPages.includes(currentPage) && !token) {
  window.location.href = 'login.html';
}