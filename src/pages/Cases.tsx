import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Zap, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FooterSection from '@/components/FooterSection';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const ease = [0.16, 1, 0.3, 1] as const;

const cases = [
  {
    category: 'Automação',
    title: 'Automação de Atendimento para Clínica Médica',
    desc: 'Implementamos um sistema de agendamento automático e atendimento via WhatsApp, eliminando filas e reduzindo o tempo de espera dos pacientes.',
    results: [
      { icon: TrendingUp, label: 'Aumento de agendamentos', value: '+60%' },
      { icon: Zap, label: 'Redução de tarefas manuais', value: '80%' },
      { icon: Clock, label: 'Tempo de resposta', value: '< 1 min' },
    ],
    tags: ['WhatsApp API', 'n8n', 'CRM'],
  },
  {
    category: 'ERP Customizado',
    title: 'Sistema de Gestão para Distribuidora',
    desc: 'Desenvolvemos um ERP completo integrando estoque, financeiro e logística, substituindo planilhas e sistemas desconectados por uma plataforma unificada.',
    results: [
      { icon: TrendingUp, label: 'Eficiência operacional', value: '+5×' },
      { icon: Zap, label: 'Redução de erros', value: '95%' },
      { icon: Clock, label: 'Fechamento mensal', value: '1 dia' },
    ],
    tags: ['Node.js', 'PostgreSQL', 'React'],
  },
  {
    category: 'Dashboard & BI',
    title: 'Central de Inteligência para Rede de Franquias',
    desc: 'Criamos um dashboard centralizado que consolida dados de todas as unidades em tempo real, permitindo tomada de decisão rápida e baseada em dados.',
    results: [
      { icon: TrendingUp, label: 'Visibilidade operacional', value: '100%' },
      { icon: Zap, label: 'Relatórios automáticos', value: '12/mês' },
      { icon: Clock, label: 'Tempo de análise', value: '-70%' },
    ],
    tags: ['Power BI', 'Python', 'AWS'],
  },
  {
    category: 'CRM',
    title: 'Pipeline de Vendas Automatizado para Imobiliária',
    desc: 'Implementamos um CRM customizado com automação de follow-up, integração com portais imobiliários e scoring de leads por IA.',
    results: [
      { icon: TrendingUp, label: 'Taxa de conversão', value: '+45%' },
      { icon: Zap, label: 'Leads respondidos automaticamente', value: '100%' },
      { icon: Clock, label: 'Ciclo de vendas', value: '-30%' },
    ],
    tags: ['HubSpot', 'Automação', 'AI'],
  },
  {
    category: 'App Mobile',
    title: 'App de Fidelidade para Rede de Restaurantes',
    desc: 'Desenvolvemos um aplicativo de fidelização com gamificação, pedidos integrados e notificações personalizadas para aumentar a recorrência de clientes.',
    results: [
      { icon: TrendingUp, label: 'Retenção de clientes', value: '+55%' },
      { icon: Zap, label: 'Ticket médio', value: '+28%' },
      { icon: Clock, label: 'Downloads em 30 dias', value: '10k+' },
    ],
    tags: ['React Native', 'Firebase', 'Stripe'],
  },
  {
    category: 'Site + SEO',
    title: 'Plataforma de Geração de Leads para Escritório Jurídico',
    desc: 'Criamos um site institucional otimizado para SEO com landing pages segmentadas por área do direito, integrado a CRM e automações de nutrição.',
    results: [
      { icon: TrendingUp, label: 'Tráfego orgânico', value: '+300%' },
      { icon: Zap, label: 'Leads mensais', value: '150+' },
      { icon: Clock, label: 'Posição no Google', value: 'Top 3' },
    ],
    tags: ['Next.js', 'SEO', 'HubSpot'],
  },
];

export default function Cases() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-32 px-6 md:px-16">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-16"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao início
            </Link>
            <h1 className="text-section text-foreground">EXEMPLOS DE</h1>
            <div className="divider-line my-4" />
            <h1 className="text-section text-foreground">SOLUÇÕES ADOTADAS</h1>
            <p className="text-body-lg text-muted-foreground mt-6 max-w-2xl">
              Veja como ajudamos empresas a crescer com tecnologia inteligente.
              Cada solução é construída para o contexto único do cliente.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cases.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease }}
                className="bg-muted rounded-2xl p-8 md:p-10 flex flex-col"
              >
                <span className="tag-tech mb-4 self-start">{c.category}</span>
                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{c.desc}</p>

                <div className="space-y-3 mb-6">
                  {c.results.map(r => (
                    <div key={r.label} className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <r.icon className="w-4 h-4 text-primary" />
                        {r.label}
                      </div>
                      <span className="text-sm font-bold text-primary">{r.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.tags.map(t => (
                    <span key={t} className="tag-tech text-xs">{t}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="text-center mt-24"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Quer um resultado assim na sua empresa?</h2>
            <p className="text-muted-foreground mb-8">Agende uma conversa gratuita e descubra como podemos ajudar.</p>
            <a href="/#contato" className="btn-cta-primary">
              Descubra como reduzir custos →
            </a>
          </motion.div>
        </div>
      </main>
      <FooterSection />
      <WhatsAppFloat />
    </>
  );
}
