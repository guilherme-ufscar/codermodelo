import { motion } from 'framer-motion';
import DiagnosisCanvas from './DiagnosisCanvas';

const ease = [0.16, 1, 0.3, 1] as const;

export default function DiagnosisSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-8"
        >
          <h2 className="text-section text-foreground">
            IDENTIFICAMOS OS GARGALOS
          </h2>
          <div className="divider-line mx-auto my-4" />
          <h2 className="text-section text-foreground">
            QUE IMPEDEM SEU CRESCIMENTO
          </h2>
          <p className="text-label text-muted-foreground mt-6 hidden md:block">
            Passe o mouse sobre os pontos para identificar os problemas e soluções
          </p>
          <p className="text-label text-muted-foreground mt-6 md:hidden">
            Toque nos pontos para identificar os problemas e soluções
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease }}
          className="flex flex-col items-center gap-4"
        >
          <DiagnosisCanvas className="w-full max-w-5xl h-[650px] mx-auto" />
          <span className="tag-tech">Seu negócio hoje</span>
        </motion.div>
      </div>
    </section>
  );
}
