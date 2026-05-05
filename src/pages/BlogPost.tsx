import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { generateHTML } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Youtube from '@tiptap/extension-youtube';
import TiptapLink from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { getPost, type Post } from '@/lib/api';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { ArrowLeft } from 'lucide-react';

const extensions = [
  StarterKit,
  Underline,
  Highlight,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
  TiptapLink.configure({ openOnClick: false }),
  Image,
  Youtube.configure({ nocookie: true }),
];

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (!slug) return;
    getPost(slug).then((data) => {
      setPost(data);
      if (data?.content) {
        try { setHtml(generateHTML(JSON.parse(data.content), extensions)); }
        catch { setHtml(data.content); }
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-64 bg-muted rounded-2xl" />
          <div className="h-4 bg-muted rounded w-full" />
        </div>
      </main>
    </>
  );

  if (!post) return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-foreground">Artigo não encontrado.</p>
        <Link to="/blog" className="text-primary hover:underline">← Voltar às newsletters</Link>
      </main>
      <FooterSection />
    </>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" /> Voltar às newsletters
            </Link>
            <time className="block text-xs text-muted-foreground uppercase tracking-widest mb-3">
              {format(new Date(post.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </time>
            <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight mb-6">{post.title}</h1>
            {post.excerpt && (
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 border-l-2 border-primary pl-4">{post.excerpt}</p>
            )}
            {post.cover_url && (
              <div className="rounded-2xl overflow-hidden mb-12">
                <img src={post.cover_url} alt={post.title} className="w-full object-cover max-h-[500px]" />
              </div>
            )}
            <div
              className="prose prose-invert prose-lg max-w-none mb-20 [&_img]:rounded-xl [&_iframe]:rounded-xl [&_iframe]:w-full [&_iframe]:aspect-video [&_a]:text-primary"
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div className="border-t border-border pt-16">
              <NewsletterSignup />
            </div>
          </motion.div>
        </div>
      </main>
      <FooterSection />
    </>
  );
}
