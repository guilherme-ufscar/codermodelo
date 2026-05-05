import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const app = express();
const PORT = 3001;
const JWT_SECRET = process.env.JWT_SECRET ?? 'axyr-local-secret-2024';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'admin@axyr.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin123';

// Diretório de uploads
const uploadsDir = path.join(ROOT, 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// SQLite
const db = new Database(path.join(ROOT, 'local.db'));
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    cover_url TEXT,
    content TEXT NOT NULL DEFAULT '',
    published INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS subscribers (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS ebooks (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    external_link TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

// Multer
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json({ limit: '50mb' }));

function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// Auth middleware
function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) { res.status(401).json({ error: 'Unauthorized' }); return; }
  try {
    jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// ── Auth ──────────────────────────────────────────
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    res.status(401).json({ error: 'Email ou senha inválidos' });
    return;
  }
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

app.get('/api/auth/verify', auth, (_req, res) => {
  res.json({ ok: true });
});

// ── Posts (público) ───────────────────────────────
app.get('/api/posts', (_req, res) => {
  const posts = db.prepare('SELECT * FROM posts WHERE published = 1 ORDER BY created_at DESC').all();
  res.json(posts);
});

app.get('/api/posts/all', auth, (_req, res) => {
  const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
  res.json(posts);
});

app.get('/api/posts/:slug', (req, res) => {
  const post = db.prepare('SELECT * FROM posts WHERE slug = ? AND published = 1').get(req.params.slug);
  if (!post) { res.status(404).json({ error: 'Post não encontrado' }); return; }
  res.json(post);
});

// ── Posts (admin) ─────────────────────────────────
app.post('/api/posts', auth, (req, res) => {
  const { title, slug, excerpt, cover_url, content, published } = req.body;
  const id = uid();
  db.prepare(
    `INSERT INTO posts (id, title, slug, excerpt, cover_url, content, published)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(id, title, slug, excerpt ?? null, cover_url ?? null, content ?? '', published ? 1 : 0);
  res.json(db.prepare('SELECT * FROM posts WHERE id = ?').get(id));
});

app.put('/api/posts/:id', auth, (req, res) => {
  const { title, slug, excerpt, cover_url, content, published } = req.body;
  db.prepare(
    `UPDATE posts SET title=?, slug=?, excerpt=?, cover_url=?, content=?, published=?, updated_at=datetime('now')
     WHERE id=?`
  ).run(title, slug, excerpt ?? null, cover_url ?? null, content ?? '', published ? 1 : 0, req.params.id);
  res.json(db.prepare('SELECT * FROM posts WHERE id = ?').get(req.params.id));
});

app.delete('/api/posts/:id', auth, (req, res) => {
  db.prepare('DELETE FROM posts WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ── Subscribers ───────────────────────────────────
app.post('/api/subscribers', (req, res) => {
  const { email } = req.body;
  try {
    db.prepare('INSERT INTO subscribers (id, email) VALUES (?, ?)').run(uid(), email);
    res.json({ ok: true });
  } catch (e: any) {
    if (e.message?.includes('UNIQUE')) {
      res.status(409).json({ error: 'already_subscribed' });
    } else {
      res.status(500).json({ error: 'Erro interno' });
    }
  }
});

app.get('/api/subscribers', auth, (_req, res) => {
  res.json(db.prepare('SELECT * FROM subscribers ORDER BY created_at DESC').all());
});

// ── Ebooks (público) ──────────────────────────────
app.get('/api/ebooks', (_req, res) => {
  res.json(db.prepare('SELECT * FROM ebooks ORDER BY created_at DESC').all());
});

// ── Ebooks (admin) ────────────────────────────────
app.post('/api/ebooks', auth, (req, res) => {
  const { title, description, file_url, external_link } = req.body;
  const id = uid();
  db.prepare(
    `INSERT INTO ebooks (id, title, description, file_url, external_link) VALUES (?, ?, ?, ?, ?)`
  ).run(id, title, description ?? null, file_url ?? null, external_link ?? null);
  res.json(db.prepare('SELECT * FROM ebooks WHERE id = ?').get(id));
});

app.delete('/api/ebooks/:id', auth, (req, res) => {
  db.prepare('DELETE FROM ebooks WHERE id = ?').run(req.params.id);
  res.json({ ok: true });
});

// ── Upload de arquivo ─────────────────────────────
app.post('/api/upload', auth, upload.single('file'), (req, res) => {
  if (!req.file) { res.status(400).json({ error: 'Nenhum arquivo enviado' }); return; }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// ── Notificar subscribers via email ───────────────
app.post('/api/notify', auth, async (req, res) => {
  const { postId } = req.body;
  const post = db.prepare('SELECT * FROM posts WHERE id = ?').get(postId) as any;
  if (!post) { res.status(404).json({ error: 'Post não encontrado' }); return; }

  const subscribers = db.prepare('SELECT email FROM subscribers').all() as { email: string }[];
  if (!subscribers.length) { res.json({ ok: true, sent: 0 }); return; }

  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    console.log('[Email] SMTP não configurado. Notificação ignorada.');
    res.json({ ok: true, sent: 0, note: 'SMTP não configurado' });
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  const SITE_URL = process.env.SITE_URL ?? 'http://localhost:8080';

  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    bcc: subscribers.map((s) => s.email).join(', '),
    subject: `Novo artigo: ${post.title}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#541ccc">${post.title}</h2>
        <p style="color:#555">${post.excerpt ?? ''}</p>
        <a href="${SITE_URL}/blog/${post.slug}"
           style="display:inline-block;padding:12px 24px;background:#541ccc;color:#fff;text-decoration:none;border-radius:8px;margin-top:16px">
          Ler artigo →
        </a>
        <hr style="margin-top:32px;border-color:#eee"/>
        <p style="font-size:12px;color:#999">Para cancelar inscrição, entre em contato.</p>
      </div>
    `,
  });

  res.json({ ok: true, sent: subscribers.length });
});

app.listen(PORT, () => {
  console.log(`\n✅ Servidor local: http://localhost:${PORT}\n`);
});
