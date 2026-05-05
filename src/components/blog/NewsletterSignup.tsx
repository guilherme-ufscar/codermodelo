import { useState } from 'react';
import { subscribe } from '@/lib/api';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await subscribe(email);
      setMessage('Inscrito com sucesso! Você receberá os próximos artigos.');
      setStatus('success');
      setEmail('');
    } catch (err: any) {
      if (err.message === 'already_subscribed') {
        setMessage('Este email já está inscrito!');
        setStatus('success');
      } else {
        setMessage('Erro ao inscrever. Tente novamente.');
        setStatus('error');
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-muted border border-primary/20 rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto"
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">Newsletter</h3>
      <p className="text-muted-foreground mb-6">
        Receba novos artigos diretamente no seu email.
      </p>

      {status === 'success' ? (
        <div className="flex items-center justify-center gap-2 text-primary font-semibold">
          <CheckCircle className="w-5 h-5" />
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn-cta-primary px-6 py-3 text-sm whitespace-nowrap disabled:opacity-60"
          >
            {status === 'loading' ? 'Inscrevendo...' : 'Quero receber →'}
          </button>
        </form>
      )}
      {status === 'error' && <p className="text-red-400 text-sm mt-3">{message}</p>}
    </motion.div>
  );
}
