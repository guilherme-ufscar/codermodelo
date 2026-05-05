import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPosts, type Post } from '@/lib/api';
import PostCard from '@/components/blog/PostCard';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then((data) => { setPosts(data); setLoading(false); });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-16"
          >
            <h1 className="text-section text-foreground">NEWSLETTERS</h1>
            <div className="divider-line my-4" />
            <p className="text-body-lg text-muted-foreground max-w-xl">
              Insights, artigos e conteúdos sobre transformação digital para o seu negócio.
            </p>
          </motion.div>

          <div className="mb-10">
            <NewsletterSignup />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => <div key={i} className="h-80 rounded-2xl bg-muted animate-pulse" />)}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-32 text-muted-foreground">
              <p className="text-xl font-semibold mb-2">Nenhum artigo publicado ainda.</p>
              <p className="text-sm">Volte em breve!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
