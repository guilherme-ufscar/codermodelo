import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const faqs = [
  {
    q: 'Como tecnologia pode escalar meu negócio?',
    a: 'Através de automações inteligentes, sistemas integrados e dados acionáveis, eliminamos gargalos operacionais e criamos capacidade de crescimento exponencial sem aumentar proporcionalmente a equipe.',
    service: 'Automações',
  },
  {
    q: 'Que tipos de tarefas podem ser automatizadas em uma empresa?',
    a: 'Em todas as áreas de uma empresa é possível automatizar processos, desde um atendimento humanizado até automações complexas, aumentando eficiência e reduzindo erros.\n\nExemplos por setor:\n• Finanças: emissão de boletos, conciliação bancária, controle de despesas e relatórios financeiros automáticos.\n• Recursos Humanos (RH): gerenciamento de ponto, integração de novos colaboradores, envio de comunicados e relatórios de desempenho.\n• Marketing: disparo de e-mails, campanhas segmentadas, análise de leads, postagens em redes sociais.\n• Vendas: acompanhamento de leads, envio de propostas, atualização automática de CRM e follow-up de clientes.\n• Agronegócio / Produção: monitoramento de estoque, alertas de manutenção, coleta e análise de dados de campo, controle de produtividade.',
    service: 'Automações',
  },
  {
    q: 'O que é um dashboard e para que ele serve?',
    a: 'Um dashboard exibe indicadores e métricas de negócios em tempo real, permitindo decisões rápidas e baseadas em dados.',
    service: 'Dashboards',
  },
  {
    q: 'O que é um CRM e por que minha empresa precisa?',
    a: 'CRM (Customer Relationship Management) organiza contatos, vendas e relacionamento com clientes, aumentando eficiência comercial e fidelização. Com um CRM, sua empresa pode aumentar a eficiência comercial, gerar mais leads qualificados e tomar decisões baseadas em dados, fortalecendo vendas, marketing e atendimento de forma integrada.',
    service: 'CRM',
  },
  {
    q: 'É possível integrar o CRM com meu site ou redes sociais?',
    a: 'Sim, a integração permite capturar leads, acompanhar interações e centralizar dados, otimizando vendas e marketing digital.',
    service: 'CRM',
  },
  {
    q: 'Qual a diferença entre ERP e CRM?',
    a: 'ERP gerencia processos internos como estoque, financeiro e produção; CRM foca em clientes, vendas e marketing.',
    service: 'ERP',
  },
  {
    q: 'Posso controlar estoque, vendas e financeiro em um só sistema?',
    a: 'Sim, sistemas ERP integrados permitem gerenciar estoque, vendas e finanças em uma única plataforma eficiente.',
    service: 'ERP',
  },
  {
    q: 'Como um site ajuda a gerar leads e vendas?',
    a: 'Um site otimizado não apenas atrai visitantes, mas funciona como uma central estratégica para gerar leads e aumentar vendas. Com formulários inteligentes, chatbots, integrações com CRM e automações de marketing, ele captura potenciais clientes, organiza informações e permite ações direcionadas e personalizadas. Além disso, um site pode ser integrado a sistemas internos, dashboards e plataformas de análise, oferecendo dados em tempo real que ajudam a tomar decisões estratégicas e identificar oportunidades.',
    service: 'Sites',
  },
  {
    q: 'Vocês dão suporte após o lançamento?',
    a: 'Sim, oferecemos sustentação contínua com monitoramento 24/7, atualizações de segurança, otimização de performance e evolução de features conforme seu negócio cresce.',
    service: null,
  },
  {
    q: 'Vocês atendem empresas de qual porte?',
    a: 'De startups early-stage a grandes corporações. Nossa metodologia se adapta ao porte e maturidade digital de cada cliente.',
    service: null,
  },
  {
    q: 'É possível integrar com sistemas existentes?',
    a: 'Sim, especialidade nossa. Conectamos ERPs, CRMs, gateways de pagamento, APIs de terceiros e sistemas legados através de integrações robustas e documentadas.',
    service: 'Sistemas',
  },
];

function FAQItem({ q, a, service, index }: { q: string; a: string; service: string | null; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.04, ease }}
      className="faq-item cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground pr-4">{q}</h3>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 shrink-0 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{a}</p>
          {service && open && (
            <a
              href="/#servicos"
              className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              Ver mais sobre {service} <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FAQSection() {
  return (
    <section className="pt-16 md:pt-24 pb-0 px-6 md:px-16 bg-muted">
      <div className="max-w-[900px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-8"
        >
          <h2 className="text-section text-foreground">PERGUNTAS FREQUENTES</h2>
          <div className="divider-line my-4" />
          <p className="text-label text-muted-foreground">({faqs.length.toString().padStart(2, '0')}) Respostas diretas</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} service={faq.service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
