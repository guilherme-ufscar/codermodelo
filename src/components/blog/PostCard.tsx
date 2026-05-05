import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Post } from '@/lib/api';

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col bg-muted border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-colors duration-300"
    >
      {post.cover_url ? (
        <div className="overflow-hidden h-52">
          <img
            src={post.cover_url}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div className="h-52 bg-primary/10 flex items-center justify-center">
          <span className="text-4xl font-black text-primary/30 tracking-widest">AXYR</span>
        </div>
      )}
      <div className="flex flex-col flex-1 p-6 gap-3">
        <time className="text-xs text-muted-foreground uppercase tracking-widest">
          {format(new Date(post.created_at), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </time>
        <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}
        <div className="mt-auto pt-4">
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all duration-300"
          >
            Ler artigo →
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
