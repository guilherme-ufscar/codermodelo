import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  login, logout, verifyAuth, getAllPosts, deletePost as apiDeletePost,
  updatePost, getEbooks, createEbook, deleteEbook as apiDeleteEbook,
  uploadFile, type Post, type Ebook,
} from '@/lib/api';
import { LogOut, Plus, Pencil, Trash2, Eye, EyeOff, Upload, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ease = [0.16, 1, 0.3, 1] as const;

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      onLogin();
    } catch {
      setError('Email ou senha inválidos.');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className="w-full max-w-md bg-muted border border-border rounded-2xl p-10"
      >
        <img src="/images/logo-roxa.svg" alt="Axyr" className="h-8 mb-8" />
        <h1 className="text-2xl font-black text-foreground mb-1">Painel Administrativo</h1>
        <p className="text-sm text-muted-foreground mb-8">Acesso restrito</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
          </div>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button type="submit" disabled={loading} className="w-full btn-cta-primary py-3 disabled:opacity-60">
            {loading ? 'Entrando...' : 'Entrar →'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function Admin() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [tab, setTab] = useState<'posts' | 'ebooks'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    verifyAuth().then(setAuthed);
  }, []);

  useEffect(() => {
    if (!authed) return;
    fetchPosts();
    fetchEbooks();
  }, [authed]);

  async function fetchPosts() {
    const data = await getAllPosts();
    setPosts(data);
  }

  async function fetchEbooks() {
    const data = await getEbooks();
    setEbooks(data);
  }

  async function togglePublish(post: Post) {
    await updatePost(post.id, { ...post, published: post.published ? 0 : 1 });
    fetchPosts();
  }

  async function deletePost(id: string) {
    if (!confirm('Excluir este post?')) return;
    await apiDeletePost(id);
    fetchPosts();
  }

  async function deleteEbook(id: string) {
    if (!confirm('Excluir este ebook?')) return;
    await apiDeleteEbook(id);
    fetchEbooks();
  }

  async function handleLogout() {
    logout();
    setAuthed(false);
  }

  if (authed === null) return <div className="min-h-screen bg-background" />;
  if (!authed) return <LoginForm onLogin={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo-roxa.svg" alt="Axyr" className="h-7" />
          <span className="text-sm text-muted-foreground">/ Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Ver site</Link>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-400 transition-colors">
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-4 mb-8 border-b border-border">
          {(['posts', 'ebooks'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`pb-3 px-1 text-sm font-semibold capitalize border-b-2 transition-colors ${tab === t ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              {t === 'posts' ? 'Posts do Blog' : 'Ebooks'}
            </button>
          ))}
        </div>

        {tab === 'posts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-foreground">Posts</h2>
              <button onClick={() => navigate('/admin/post/new')} className="inline-flex items-center gap-2 btn-cta-primary text-sm px-5 py-2">
                <Plus className="w-4 h-4" /> Novo post
              </button>
            </div>
            {posts.length === 0 ? (
              <p className="text-muted-foreground text-center py-16">Nenhum post ainda.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center gap-4 bg-muted border border-border rounded-xl px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{post.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {format(new Date(post.created_at), 'dd/MM/yyyy', { locale: ptBR })} ·{' '}
                        <span className={post.published ? 'text-green-400' : 'text-yellow-400'}>
                          {post.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => togglePublish(post)} className="p-2 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors">
                        {post.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button onClick={() => navigate(`/admin/post/${post.id}`)} className="p-2 rounded-lg hover:bg-background text-muted-foreground hover:text-foreground transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => deletePost(post.id)} className="p-2 rounded-lg hover:bg-background text-muted-foreground hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'ebooks' && (
          <EbooksPanel ebooks={ebooks} onRefresh={fetchEbooks} onDelete={deleteEbook} />
        )}
      </div>
    </div>
  );
}

function EbooksPanel({ ebooks, onRefresh, onDelete }: {
  ebooks: Ebook[];
  onRefresh: () => void;
  onDelete: (id: string) => void;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState<'link' | 'file'>('link');

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;
    setSaving(true);

    let fileUrl: string | null = null;
    if (mode === 'file' && file) {
      fileUrl = await uploadFile(file);
    }

    await createEbook({
      title,
      description: description || null,
      file_url: fileUrl,
      external_link: mode === 'link' ? externalLink || null : null,
    });

    setTitle(''); setDescription(''); setExternalLink(''); setFile(null);
    setSaving(false);
    onRefresh();
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-6">Ebooks</h2>

      <form onSubmit={handleAdd} className="bg-muted border border-border rounded-2xl p-6 mb-8 space-y-4">
        <h3 className="font-semibold text-foreground">Adicionar ebook</h3>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição (opcional)" rows={2}
          className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none" />

        <div className="flex gap-3">
          {(['link', 'file'] as const).map((m) => (
            <button key={m} type="button" onClick={() => setMode(m)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${mode === m ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}>
              {m === 'file' ? <Upload className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
              {m === 'file' ? 'Upload PDF' : 'Link externo'}
            </button>
          ))}
        </div>

        {mode === 'link' ? (
          <input value={externalLink} onChange={(e) => setExternalLink(e.target.value)} placeholder="https://drive.google.com/..."
            className="w-full bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
        ) : (
          <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-border rounded-xl py-6 cursor-pointer hover:border-primary/40 transition-colors text-muted-foreground text-sm">
            <Upload className="w-4 h-4" />
            {file ? file.name : 'Selecionar PDF'}
            <input type="file" accept=".pdf" multiple className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
          </label>
        )}

        <button type="submit" disabled={saving} className="btn-cta-primary text-sm px-6 py-2 disabled:opacity-60">
          {saving ? 'Salvando...' : 'Adicionar ebook'}
        </button>
      </form>

      {ebooks.length === 0 ? (
        <p className="text-muted-foreground text-center py-16">Nenhum ebook ainda.</p>
      ) : (
        <div className="space-y-3">
          {ebooks.map((ebook) => (
            <div key={ebook.id} className="flex items-center gap-4 bg-muted border border-border rounded-xl px-5 py-4">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{ebook.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">
                  {ebook.file_url ? `PDF: ${ebook.file_url}` : `Link: ${ebook.external_link}`}
                </p>
              </div>
              <button onClick={() => onDelete(ebook.id)} className="p-2 rounded-lg hover:bg-background text-muted-foreground hover:text-red-400 transition-colors shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
