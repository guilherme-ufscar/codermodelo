import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getEbooks, type Ebook } from '@/lib/api';
import NewsletterSignup from '@/components/blog/NewsletterSignup';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import { BookOpen, Download, ExternalLink } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Ebooks() {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEbooks().then((data) => { setEbooks(data); setLoading(false); });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-24 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mb-16">
            <h1 className="text-section text-foreground">EBOOKS</h1>
            <div className="divider-line my-4" />
            <p className="text-body-lg text-muted-foreground max-w-xl">
              Materiais gratuitos para acelerar a transformação digital da sua empresa.
            </p>
          </motion.div>

          <div className="mb-10">
            <NewsletterSignup />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => <div key={i} className="h-48 rounded-2xl bg-muted animate-pulse" />)}
            </div>
          ) : ebooks.length === 0 ? (
            <div className="text-center py-32 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p className="text-xl font-semibold mb-2">Nenhum ebook disponível ainda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ebooks.map((ebook, i) => (
                <motion.div
                  key={ebook.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex flex-col bg-muted border border-border rounded-2xl p-8 hover:border-primary/40 transition-colors duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">{ebook.title}</h2>
                  {ebook.description && <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{ebook.description}</p>}
                  <a
                    href={ebook.file_url ?? ebook.external_link ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-auto btn-cta-primary text-sm px-5 py-3"
                  >
                    {ebook.file_url ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                    {ebook.file_url ? 'Baixar PDF' : 'Acessar material'}
                  </a>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
      <FooterSection />
    </>
  );
}
