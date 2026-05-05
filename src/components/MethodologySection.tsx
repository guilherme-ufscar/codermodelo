import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

const phases = [
  {
    num: '01', title: 'ENTENDIMENTO',
    desc: 'Compreendemos o problema do cliente, onde estão os gargalos e por que não está escalando',
    items: ['Imersão no negócio', 'Mapeamento de processos', 'Identificação de oportunidades', 'Análise competitiva'],
  },
  {
    num: '02', title: 'SOLUÇÃO',
    desc: 'Desenhamos a arquitetura ideal combinando tecnologias que resolvem os problemas identificados',
    items: ['Arquitetura técnica', 'Definição de stack', 'Roadmap de entregas', 'Estimativa de ROI'],
  },
  {
    num: '03', title: 'DESIGN DO PRODUTO',
    desc: 'Criamos interfaces intuitivas focadas em conversão e experiência do usuário',
    items: ['UX Research', 'UI Design System', 'Prototipação interativa', 'Testes de usabilidade'],
  },
  {
    num: '04', title: 'DESENVOLVIMENTO',
    desc: 'Código limpo, testado e escalável entregue em sprints com visibilidade total',
    items: ['Sprints quinzenais', 'Code review rigoroso', 'CI/CD automatizado', 'Testes automatizados'],
  },
  {
    num: '05', title: 'SUSTENTAÇÃO CONTÍNUA',
    desc: 'Monitoramento proativo, melhorias contínuas e suporte dedicado pós-lançamento',
    items: ['Monitoramento 24/7', 'Atualizações de segurança', 'Otimização de performance', 'Evolução de features'],
  },
];

export default function MethodologySection() {
  return (
    <section id="metodologia" className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="text-center mb-10"
        >
          <h2 className="text-section text-foreground">NOSSA METODOLOGIA</h2>
          <div className="w-16 h-[2px] mx-auto my-4" style={{ background: 'hsl(261 79% 47% / 0.25)' }} />
          <h2 className="text-section text-foreground">DE TRANSFORMAÇÃO</h2>
          <p className="text-label text-muted-foreground mt-6">(05) Fases estruturadas</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease }}
              className="phase-card"
            >
              <span className="block text-7xl font-extralight text-primary/20 mb-4">({phase.num})</span>
              <div className="w-6 h-[2px] mb-4" style={{ background: 'hsl(261 79% 47% / 0.2)' }} />
              <h3 className="text-lg font-bold text-foreground mb-3">{phase.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{phase.desc}</p>
              <ul className="space-y-2">
                {phase.items.map(item => (
                  <li key={item} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
