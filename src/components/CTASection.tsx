import { motion } from 'framer-motion';
import { Mail, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import NeuronCanvas from './NeuronCanvas';

const ease = [0.16, 1, 0.3, 1] as const;

const cards = [
  {
    icon: Mail,
    title: 'Newsletter',
    desc: 'Transforme sua empresa com insights semanais.',
    href: '/blog',
    cta: 'Acessar →',
  },
  {
    icon: BookOpen,
    title: 'Ebook gratuito para o seu setor',
    desc: 'Guia completo de transformação digital para empresas',
    href: '/ebooks',
    cta: 'Baixar ebook →',
  },
];

export default function CTASection() {
  return (
    <section id="contato" className="relative pb-16 md:pb-24 pt-0 px-6 md:px-16 overflow-visible bg-muted">
      <div className="max-w-[1200px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease }}
          className="w-full max-w-[900px] h-[480px] md:h-[560px] mx-auto mb-0 overflow-visible"
        >
          <NeuronCanvas className="w-full h-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
        >
          <h2 className="text-section text-foreground">PRONTO PARA</h2>
          <h2 className="text-section text-foreground">TRANSFORMAR</h2>
          <div className="divider-line mx-auto my-4" />
          <h2 className="text-section text-foreground">SEU NEGÓCIO?</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
          className="mt-12 space-y-4"
        >
          <a href="#" className="btn-cta-primary text-lg px-12 py-5">
            Descubra como reduzir custos →
          </a>
          <p className="text-muted-foreground text-sm mt-4">
            💬 Ou tire dúvidas pelo WhatsApp
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 max-w-2xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease }}
              className="bg-background border border-border rounded-2xl p-8 text-left flex flex-col gap-3 hover:border-primary/40 transition-colors duration-300"
            >
              <card.icon className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-bold text-foreground">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.desc}</p>
              <Link to={card.href} className="inline-flex items-center text-sm font-semibold text-primary hover:gap-2 transition-all duration-300 mt-2">
                {card.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
