import { motion } from 'framer-motion';
import { useState } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const solutionNodes = [
  { label: 'Apps',        solved: 'Mobilidade para seus clientes' },
  { label: 'Automações',  solved: 'Processos executados automaticamente' },
  { label: 'Sites',       solved: 'Presença digital e geração de leads' },
  { label: 'Sistemas',    solved: 'Operações integradas e escaláveis' },
  { label: 'Softwares',   solved: 'Soluções sob medida para seu negócio' },
  { label: 'Plataformas', solved: 'Infraestrutura cloud robusta e segura' },
  { label: 'CRM',         solved: 'Relacionamento e vendas otimizados' },
  { label: 'ERP',         solved: 'Gestão completa em um só lugar' },
  { label: 'Dashboards',  solved: 'Decisões baseadas em dados reais' },
  { label: 'IA',          solved: 'Inteligência artificial aplicada ao negócio' },
];

const CX = 450;
const CY = 240;
const RADIUS = 160;

function getPos(index: number, total: number) {
  const angle = (index * (360 / total) - 90) * (Math.PI / 180);
  return {
    x: CX + RADIUS * Math.cos(angle),
    y: CY + RADIUS * Math.sin(angle),
  };
}

const leftLabels = solutionNodes.slice(0, 5);
const rightLabels = solutionNodes.slice(5, 10);

export default function SolutionSection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mb-8"
        >
          <h2 className="text-section text-foreground">CONECTAMOS AS</h2>
          <div className="divider-line my-4" />
          <h2 className="text-section text-foreground">PEÇAS CERTAS</h2>
        </motion.div>

        {/* Desktop layout: labels + network + labels */}
        <div className="hidden lg:flex items-center gap-8">
          {/* Left labels */}
          <div className="flex flex-col gap-4 w-[200px] shrink-0">
            {leftLabels.map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                className="flex items-center gap-3 cursor-default"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <span
                  className="text-label transition-colors duration-300"
                  style={{
                    color: hovered === i ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(0 0% 75%)' : 'hsl(0 0% 40%)',
                  }}
                >
                  {node.label}
                </span>
                <div
                  className="flex-1 h-px transition-all duration-300"
                  style={{ background: hovered === i ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.08)' : 'hsl(261 79% 47% / 0.2)' }}
                />
                <div
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{ background: hovered === i ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.2)' : 'hsl(261 79% 47% / 0.5)' }}
                />
              </motion.div>
            ))}
          </div>

          {/* Center SVG Network */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="flex-1"
          >
            <svg viewBox="0 0 900 480" className="w-full" style={{ overflow: 'visible' }}>
              {/* Connection lines */}
              {solutionNodes.map((_, i) => {
                const pos = getPos(i, solutionNodes.length);
                const isHov = hovered === i;
                return (
                  <line
                    key={i}
                    x1={CX} y1={CY}
                    x2={pos.x} y2={pos.y}
                    stroke={isHov ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.06)' : 'hsl(261 79% 47% / 0.2)'}
                    strokeWidth={isHov ? 2 : 1}
                    style={{ transition: 'all 0.3s ease' }}
                  />
                );
              })}

              {/* Outer nodes */}
              {solutionNodes.map((node, i) => {
                const pos = getPos(i, solutionNodes.length);
                const isHov = hovered === i;

                // Position for solved label
                const angle = (i * (360 / solutionNodes.length) - 90) * (Math.PI / 180);
                const labelR = RADIUS + 48;
                const lx = CX + labelR * Math.cos(angle);
                const ly = CY + labelR * Math.sin(angle);
                const anchor = Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle';

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'default' }}
                  >
                    {isHov && (
                      <circle cx={pos.x} cy={pos.y} r={22} fill="none"
                        stroke="hsl(261 79% 47%)" strokeWidth="2" opacity="0.3" />
                    )}
                    <circle
                      cx={pos.x} cy={pos.y}
                      r={isHov ? 18 : 14}
                      fill={isHov ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.05)' : 'hsl(261 79% 47% / 0.2)'}
                      stroke={isHov ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.2)' : 'hsl(261 79% 47%)'}
                      strokeWidth="1.5"
                      style={{ transition: 'all 0.3s ease' }}
                    />
                    {isHov && (
                      <text
                        x={lx} y={ly + 5}
                        textAnchor={anchor}
                        fontSize="12"
                        fontWeight="600"
                        fill="hsl(261 79% 47%)"
                        style={{ pointerEvents: 'none' }}
                      >
                        {node.solved}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Center node with AXYR */}
              <circle cx={CX} cy={CY} r={65} fill="hsl(261 79% 47%)" />
              <circle cx={CX} cy={CY} r={74} fill="none"
                stroke="hsl(261 79% 47% / 0.3)" strokeWidth="2" />
              <image
                href="/images/logo-branca.svg"
                x={CX - 48} y={CY - 14}
                width={96} height={28}
                style={{ pointerEvents: 'none' }}
              />
            </svg>
          </motion.div>

          {/* Right labels */}
          <div className="flex flex-col gap-4 w-[200px] shrink-0">
            {rightLabels.map((node, i) => {
              const idx = i + 5;
              return (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease }}
                  className="flex items-center gap-3 cursor-default"
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{ background: hovered === idx ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.2)' : 'hsl(261 79% 47% / 0.5)' }}
                  />
                  <div
                    className="flex-1 h-px transition-all duration-300"
                    style={{ background: hovered === idx ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(261 79% 47% / 0.08)' : 'hsl(261 79% 47% / 0.2)' }}
                  />
                  <span
                    className="text-label transition-colors duration-300"
                    style={{
                      color: hovered === idx ? 'hsl(261 79% 47%)' : hovered !== null ? 'hsl(0 0% 75%)' : 'hsl(0 0% 40%)',
                    }}
                  >
                    {node.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
          >
            <svg viewBox="200 20 500 460" className="w-full" style={{ overflow: 'visible' }}>
              {solutionNodes.map((_, i) => {
                const pos = getPos(i, solutionNodes.length);
                return (
                  <line key={i} x1={CX} y1={CY} x2={pos.x} y2={pos.y}
                    stroke="hsl(261 79% 47% / 0.25)" strokeWidth="1.5" />
                );
              })}
              {solutionNodes.map((node, i) => {
                const pos = getPos(i, solutionNodes.length);
                const angle = (i * (360 / solutionNodes.length) - 90) * (Math.PI / 180);
                const labelR = RADIUS + 48;
                const lx = CX + labelR * Math.cos(angle);
                const ly = CY + labelR * Math.sin(angle);
                const anchor = Math.cos(angle) > 0.1 ? 'start' : Math.cos(angle) < -0.1 ? 'end' : 'middle';
                return (
                  <g key={i}>
                    <circle cx={pos.x} cy={pos.y} r={16}
                      fill="hsl(261 79% 47% / 0.2)"
                      stroke="hsl(261 79% 47%)" strokeWidth="1.5" />
                    <text x={lx} y={ly + 4} textAnchor={anchor}
                      fontSize="14" fontWeight="500" fill="hsl(0 0% 40%)">
                      {node.label}
                    </text>
                  </g>
                );
              })}
              <circle cx={CX} cy={CY} r={70} fill="hsl(261 79% 47%)" />
              <image
                href="/images/logo-branca.svg"
                x={CX - 48} y={CY - 14}
                width={96} height={28}
                style={{ pointerEvents: 'none' }}
              />
            </svg>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="text-body-lg text-muted-foreground text-center max-w-2xl mx-auto mt-8"
        >
          Implementamos tecnologia inteligente que integra todos os aspectos do seu negócio
        </motion.p>
      </div>
    </section>
  );
}
