const BASE = '/api';

function getToken() {
  return localStorage.getItem('admin_token');
}

function authHeaders(): Record<string, string> {
  return { Authorization: `Bearer ${getToken() ?? ''}`, 'Content-Type': 'application/json' };
}

// ── Tipos ──────────────────────────────────────────
export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_url: string | null;
  content: string;
  published: number;
  created_at: string;
  updated_at: string;
};

export type Ebook = {
  id: string;
  title: string;
  description: string | null;
  file_url: string | null;
  external_link: string | null;
  created_at: string;
};

// ── Auth ───────────────────────────────────────────
export async function login(email: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  localStorage.setItem('admin_token', data.token);
}

export function logout() {
  localStorage.removeItem('admin_token');
}

export async function verifyAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/auth/verify`, { headers: authHeaders() });
    return res.ok;
  } catch { return false; }
}

// ── Posts (público) ────────────────────────────────
export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts`);
  return res.json();
}

export async function getPost(slug: string): Promise<Post | null> {
  const res = await fetch(`${BASE}/posts/${slug}`);
  if (!res.ok) return null;
  return res.json();
}

// ── Posts (admin) ──────────────────────────────────
export async function getAllPosts(): Promise<Post[]> {
  const res = await fetch(`${BASE}/posts/all`, { headers: authHeaders() });
  return res.json();
}

export async function createPost(data: Partial<Post>): Promise<Post> {
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updatePost(id: string, data: Partial<Post>): Promise<Post> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deletePost(id: string) {
  await fetch(`${BASE}/posts/${id}`, { method: 'DELETE', headers: authHeaders() });
}

// ── Subscribers ────────────────────────────────────
export async function subscribe(email: string) {
  const res = await fetch(`${BASE}/subscribers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }
}

// ── Ebooks ─────────────────────────────────────────
export async function getEbooks(): Promise<Ebook[]> {
  const res = await fetch(`${BASE}/ebooks`);
  return res.json();
}

export async function createEbook(data: Partial<Ebook>): Promise<Ebook> {
  const res = await fetch(`${BASE}/ebooks`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteEbook(id: string) {
  await fetch(`${BASE}/ebooks/${id}`, { method: 'DELETE', headers: authHeaders() });
}

// ── Upload ─────────────────────────────────────────
export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append('file', file);
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken() ?? ''}` },
    body: form,
  });
  const data = await res.json();
  return data.url as string;
}

// ── Notificar ──────────────────────────────────────
export async function notifySubscribers(postId: string) {
  await fetch(`${BASE}/notify`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({ postId }),
  });
}

// ── Helpers ────────────────────────────────────────
export function slugify(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}
