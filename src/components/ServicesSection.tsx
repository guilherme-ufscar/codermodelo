import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Smartphone, Cog, Boxes, Globe, Code2, Cloud, Users, Building2, BarChart3, ChevronDown, Brain } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    icon: Smartphone,
    title: 'APPS',
    desc: 'Aplicativos nativos e cross-platform que seus usuários vão amar',
    tags: ['React Native', 'Flutter', 'Swift', 'Kotlin'],
    num: '001',
    problems: ['Ausência de canal mobile', 'Baixo engajamento do cliente', 'Processos manuais no atendimento'],
    solutions: ['App nativo ou híbrido personalizado', 'Notificações e automações integradas', 'Experiência fluida em iOS e Android'],
  },
  {
    icon: Cog,
    title: 'AUTOMAÇÕES',
    desc: 'Processos automatizados que eliminam trabalho manual e erros',
    tags: ['n8n', 'Zapier', 'Python', 'APIs'],
    num: '002',
    problems: ['Tarefas repetitivas drenando produtividade', 'Erros humanos em processos críticos', 'Fluxos de trabalho desconectados'],
    solutions: ['Automação de ponta a ponta', 'Integração entre sistemas e plataformas', 'Redução drástica de retrabalho'],
  },
  {
    icon: Boxes,
    title: 'SISTEMAS',
    desc: 'Sistemas robustos que escalam com seu negócio',
    tags: ['Node.js', 'Go', 'AWS', 'Docker'],
    num: '003',
    problems: ['Sistemas legados limitando o crescimento', 'Falta de integração entre ferramentas', 'Lentidão operacional'],
    solutions: ['Sistemas customizados e escaláveis', 'APIs robustas e documentadas', 'Integração com sistemas existentes'],
  },
  {
    icon: Globe,
    title: 'SITES',
    desc: 'Experiências web que convertem visitantes em clientes',
    tags: ['Next.js', 'React', 'Webflow', 'SEO'],
    num: '004',
    problems: ['Baixa presença digital', 'Site lento ou desatualizado', 'Poucos leads gerados online'],
    solutions: ['Sites rápidos e otimizados para SEO', 'Design focado em conversão', 'Integração com CRM e analytics'],
  },
  {
    icon: Code2,
    title: 'SOFTWARES',
    desc: 'Software sob medida para problemas únicos do seu negócio',
    tags: ['TypeScript', 'Python', 'Rust', 'Cloud'],
    num: '005',
    problems: ['Nenhuma solução de mercado atende suas necessidades', 'Processos manuais sem ferramenta adequada', 'Alta dependência de planilhas'],
    solutions: ['Software desenvolvido do zero para seu contexto', 'Interface intuitiva e adaptada à sua equipe', 'Evolução contínua conforme o negócio cresce'],
  },
  {
    icon: Cloud,
    title: 'PLATAFORMAS',
    desc: 'Infraestrutura cloud escalável e segura',
    tags: ['AWS', 'GCP', 'Azure', 'Kubernetes'],
    num: '006',
    problems: ['Infraestrutura cara e pouco escalável', 'Risco de downtime', 'Falta de visibilidade sobre custos de cloud'],
    solutions: ['Arquitetura cloud moderna e econômica', 'Alta disponibilidade e redundância', 'Monitoramento e controle de custos'],
  },
  {
    icon: Users,
    title: 'CRM',
    desc: 'Gestão de relacionamento personalizada para cada etapa',
    tags: ['Salesforce', 'HubSpot', 'Custom', 'AI'],
    num: '007',
    problems: ['Leads perdidos por falta de acompanhamento', 'Histórico de clientes disperso', 'Vendas sem previsibilidade'],
    solutions: ['Pipeline de vendas automatizado', 'Visão 360° de cada cliente', 'Follow-up automático e inteligente'],
  },
  {
    icon: Building2,
    title: 'ERP',
    desc: 'Integração total de processos empresariais',
    tags: ['SAP', 'Oracle', 'Custom', 'API'],
    num: '008',
    problems: ['Estoque, financeiro e vendas desconectados', 'Relatórios manuais e demorados', 'Decisões sem dados consolidados'],
    solutions: ['Gestão unificada em uma única plataforma', 'Relatórios automáticos em tempo real', 'Integração entre todos os setores'],
  },
  {
    icon: BarChart3,
    title: 'DASHBOARDS',
    desc: 'Visualizações que transformam dados em decisões',
    tags: ['Power BI', 'Grafana', 'Custom', 'Real-time'],
    num: '009',
    problems: ['Dados espalhados e difíceis de interpretar', 'Decisões baseadas em intuição', 'Reuniões longas para alinhamento'],
    solutions: ['Painéis visuais e interativos', 'Dados em tempo real de todas as fontes', 'KPIs que orientam decisões estratégicas'],
  },
  {
    icon: Brain,
    title: 'INTELIGÊNCIA ARTIFICIAL',
    desc: 'Soluções de Inteligência Artificial para empresas, incluindo análise preditiva, otimização de processos, atendimento inteligente e decisões baseadas em dados.',
    tags: ['Machine Learning', 'OpenAI', 'LLMs', 'Python'],
    num: '010',
    problems: ['Leads não qualificados ou perdidos', 'Integração e análise de dados fragmentados', 'Marketing ineficiente', 'Gestão operacional complexa', 'Atendimento ao cliente demorado ou ineficiente'],
    solutions: ['Identificação de oportunidades com maior probabilidade de conversão', 'Consolidação de dados de múltiplos sistemas', 'Otimização contínua com base em resultados e comportamento do usuário', 'Triagem de solicitações para direcionamento à equipe correta'],
  },
];

function ServiceCard({ s, i }: { s: typeof services[0]; i: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      key={s.title}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: i * 0.08, ease }}
      className="card-service group cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      <s.icon className="w-12 h-12 text-primary mb-8 transition-transform duration-700 group-hover:rotate-12" />
      <h3 className="text-xl font-bold text-foreground mb-1">{s.title}</h3>
      <div className="divider-line my-3 w-8" />
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {s.tags.map(t => (
          <span key={t} className="tag-tech">{t}</span>
        ))}
      </div>

      <button
        className="flex items-center gap-2 text-sm font-semibold text-primary mt-2 select-none"
        onClick={e => { e.stopPropagation(); setExpanded(!expanded); }}
      >
        {expanded ? 'Fechar' : 'Ver soluções e problemas resolvidos'}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-bold text-destructive uppercase tracking-widest mb-3">Problemas que resolvemos</p>
                <ul className="space-y-2">
                  {s.problems.map(p => (
                    <li key={p} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mb-3">O que entregamos</p>
                <ul className="space-y-2">
                  {s.solutions.map(sol => (
                    <li key={sol} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}

export default function ServicesSection() {
  return (
    <section id="servicos" className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-8"
        >
          <h2 className="text-section text-foreground">SOLUÇÕES COMPLETAS</h2>
          <div className="divider-line my-4" />
          <p className="text-label text-muted-foreground">(10) Serviços especializados — clique para ver detalhes</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.slice(0, 9).map((s, i) => (
            <ServiceCard key={s.title} s={s} i={i} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <div className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]">
            <ServiceCard s={services[9]} i={9} />
          </div>
        </div>
      </div>
    </section>
  );
}
