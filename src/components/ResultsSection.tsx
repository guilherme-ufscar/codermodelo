import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Zap, PiggyBank } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

function easeOutSlow(t: number) {
  return 1 - Math.pow(1 - t, 1.6);
}

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -80px 0px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = performance.now();
    const raf = { id: 0 };
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(easeOutSlow(progress) * target));
      if (progress < 1) raf.id = requestAnimationFrame(animate);
    };
    raf.id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf.id);
  }, [isInView, target]);

  return <span ref={ref}>{value}{suffix}</span>;
}

const metrics = [
  {
    value: 300,
    suffix: '%',
    prefix: 'até ',
    label: 'Crescimento médio esperado',
    Icon: TrendingUp,
  },
  {
    value: 5,
    suffix: '×',
    prefix: 'até ',
    label: 'Aumento de eficiência operacional',
    Icon: Zap,
  },
  {
    value: 80,
    suffix: '%',
    prefix: 'até ',
    label: 'Redução de custos estimada',
    Icon: PiggyBank,
  },
];

export default function ResultsSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-4 text-center md:text-left"
        >
          <h2 className="text-section text-foreground">TRANSFORMAÇÃO COM</h2>
          <div className="divider-line my-4 mx-auto md:mx-0" />
          <h2 className="text-section text-foreground">RESULTADOS ESPERADOS</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-label text-muted-foreground mb-10 text-center md:text-left"
        >
          Resultados esperados para a sua empresa
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="card-metric"
            >
              <m.Icon className="w-7 h-7 text-primary mb-4" />
              <span className="text-base font-semibold text-primary block">até</span>
              <span className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary block mb-2">
                <AnimatedNumber target={m.value} suffix={m.suffix} />
              </span>
              <span className="text-sm font-medium text-foreground leading-snug">{m.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
