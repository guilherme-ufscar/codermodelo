import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPost, updatePost, getAllPosts, uploadFile, notifySubscribers, slugify, type Post } from '@/lib/api';
import TipTapEditor from '@/components/blog/TipTapEditor';
import { ArrowLeft, Save, Eye, EyeOff, Upload } from 'lucide-react';

export default function AdminPostEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [published, setPublished] = useState(0);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [msg, setMsg] = useState('');
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isNew) return;
    getAllPosts().then((posts) => {
      const post = posts.find((p: Post) => p.id === id);
      if (!post) return;
      setTitle(post.title);
      setExcerpt(post.excerpt ?? '');
      setContent(post.content);
      setCoverUrl(post.cover_url ?? '');
      setPublished(post.published);
    });
  }, [id, isNew]);

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    const url = await uploadFile(file);
    setCoverUrl(url);
    setUploadingCover(false);
  }

  async function handleSave(forcePublish?: number) {
    if (!title) { setMsg('O título é obrigatório.'); return; }
    setSaving(true);
    setMsg('');

    const shouldPublish = forcePublish !== undefined ? forcePublish : published;
    const payload: Partial<Post> = {
      title,
      slug: slugify(title),
      excerpt: excerpt || null,
      cover_url: coverUrl || null,
      content,
      published: shouldPublish,
    };

    let postId = id;
    if (isNew) {
      const created = await createPost(payload);
      postId = created.id;
    } else {
      await updatePost(id!, payload);
    }

    if (shouldPublish && postId) await notifySubscribers(postId);

    setPublished(shouldPublish);
    setSaving(false);
    setMsg('Salvo com sucesso!');
    if (isNew && postId) navigate(`/admin/post/${postId}`, { replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur px-6 py-3 flex items-center justify-between gap-4">
        <button onClick={() => navigate('/admin')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Painel
        </button>
        <div className="flex items-center gap-3">
          {msg && <span className={`text-xs ${msg.startsWith('Erro') ? 'text-red-400' : 'text-green-400'}`}>{msg}</span>}
          <button onClick={() => handleSave(0)} disabled={saving}
            className="inline-flex items-center gap-2 text-sm border border-border rounded-lg px-4 py-2 text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" /> Salvar rascunho
          </button>
          <button onClick={() => handleSave(published ? 0 : 1)} disabled={saving}
            className="inline-flex items-center gap-2 text-sm btn-cta-primary px-5 py-2 disabled:opacity-50">
            {published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {published ? 'Despublicar' : 'Publicar'}
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Capa */}
        <div>
          {coverUrl ? (
            <div className="relative rounded-2xl overflow-hidden h-64 group">
              <img src={coverUrl} alt="Capa" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button onClick={() => coverInputRef.current?.click()}
                  className="text-sm text-white border border-white/50 rounded-lg px-4 py-2 hover:bg-white/10 transition-colors">
                  Trocar imagem
                </button>
                <button onClick={() => setCoverUrl('')}
                  className="text-sm text-red-400 border border-red-400/50 rounded-lg px-4 py-2 hover:bg-red-400/10 transition-colors">
                  Remover
                </button>
              </div>
            </div>
          ) : (
            <button type="button" onClick={() => coverInputRef.current?.click()} disabled={uploadingCover}
              className="w-full h-48 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors disabled:opacity-50">
              <Upload className="w-6 h-6" />
              <span className="text-sm">{uploadingCover ? 'Enviando...' : 'Adicionar imagem de capa'}</span>
            </button>
          )}
          <input ref={coverInputRef} type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); e.target.value = ''; }} />
        </div>

        {/* Título */}
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título do artigo"
          className="w-full bg-transparent border-none outline-none text-4xl font-black text-foreground placeholder:text-muted-foreground/40" />

        {/* Resumo */}
        <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Resumo do artigo (aparece na listagem e no email)" rows={2}
          className="w-full bg-transparent border-none outline-none text-lg text-muted-foreground placeholder:text-muted-foreground/40 resize-none" />

        <div className="border-t border-border pt-6">
          <TipTapEditor content={content} onChange={setContent} />
        </div>
      </div>
    </div>
  );
}
