import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const letters = [
  { letter: 'A', img: '/images/a.webp', word: 'ADVANCED', translation: 'Avançado', desc: 'Utilizamos as ferramentas e práticas mais modernas para garantir soluções future-proof' },
  { letter: 'X', img: '/images/x.webp', word: 'EXECUTION', translation: 'Execução', desc: 'Não paramos no planejamento. Entregamos resultados concretos com velocidade e qualidade' },
  { letter: 'Y', img: '/images/y.webp', word: 'YIELD', translation: 'Resultado', desc: 'Cada linha de código, cada automação é projetada para gerar retorno mensurável' },
  { letter: 'R', img: '/images/r.webp', word: 'REVOLUTION', translation: 'Revolução', desc: 'Transformamos negócios tradicionais em potências digitais escaláveis' },
];

export default function MeaningSection() {
  return (
    <section id="sobre" className="py-16 md:py-24 px-6 md:px-16 bg-muted">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-10 text-center md:text-left"
        >
          <h2 className="text-section text-foreground">O SIGNIFICADO</h2>
          <div className="w-16 h-[2px] bg-primary my-4 mx-auto md:mx-0" />
          <h2 className="text-section text-foreground">POR TRÁS DO NOME</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20">
          {letters.map((l, i) => (
            <motion.div
              key={l.letter}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1, delay: i * 0.15, ease }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="flex items-end gap-6 mb-4">
                <img
                  src={l.img}
                  alt={l.letter}
                  className="w-[100px] md:w-[140px] lg:w-[180px] h-auto object-contain select-none"
                />
                <div className="pb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-wide">{l.word}</h3>
                  <p className="text-base text-muted-foreground mt-1 uppercase tracking-[0.15em]">{l.translation}</p>
                </div>
              </div>
              <p className="text-base text-foreground/70 leading-relaxed max-w-md border-l-2 border-primary/30 pl-4 text-left">
                {l.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
