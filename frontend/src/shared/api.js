const BASE_URL = 'http://localhost:3000';

async function request(method, path, body = null) {
  const token = localStorage.getItem('access_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = { method, headers };
  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, config);

  if (response.status === 401) {
    localStorage.clear();
    document.querySelector('ion-router').push('/login', 'forward');
    throw new Error('Sessão expirada');
  }

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Erro ${response.status}`);
  }

  return response.json();
}

export const api = {
  get:    (path) => request('GET', path),
  post:   (path, body) => request('POST', path, body),
  patch:  (path, body) => request('PATCH', path, body),
  delete: (path) => request('DELETE', path),
};
