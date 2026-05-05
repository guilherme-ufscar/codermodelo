import { motion } from 'framer-motion';
import NeuronCanvas from './NeuronCanvas';
import { ArrowDown } from 'lucide-react';

const servicesRow1 = ['Apps', 'Automações', 'Sistemas', 'Sites', 'Softwares'];
const servicesRow2 = ['Plataformas', 'CRM', 'ERP', 'Dashboards'];

const ease = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-6 md:px-16">
      <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
        {/* Left */}
        <div className="w-full lg:w-[55%] space-y-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
          >
            <h1 className="text-hero text-foreground">
              Negócios que<br />
              crescem
            </h1>
            <div className="divider-line my-4 lg:mx-0 mx-auto" />
            <h1 className="text-hero text-foreground">
              Sistemas que<br />
              pensam
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease }}
            className="flex flex-col gap-y-1 items-center lg:items-start"
          >
            <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center lg:justify-start">
              {servicesRow1.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease }}
                  className="text-label text-muted-foreground"
                >
                  • {s}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 justify-center lg:justify-start">
              {servicesRow2.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.08, ease }}
                  className="text-label text-muted-foreground"
                >
                  • {s}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="text-body-lg text-muted-foreground max-w-lg mx-auto lg:mx-0"
          >
            Reduzimos seus custos operacionais e aceleramos o crescimento da sua empresa com tecnologia.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <a href="#contato" className="btn-cta-primary">
              Descubra como reduzir custos →
            </a>
          </motion.div>
        </div>

        {/* Right - Neuron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="w-full lg:w-[45%] h-[500px] lg:h-[700px] relative overflow-visible"
        >
          <NeuronCanvas className="w-full h-full" />
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="tag-tech">Seu negócio transformado</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
