import { Suspense, useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const bubbles = [
  { label: 'Equipe Sobrecarregada',                  solution: 'Time sobrecarregado perde produtividade e comete mais erros' },
  { label: 'Poucas Vendas',                          solution: 'Funil desorganizado deixando dinheiro na mesa todo mês' },
  { label: 'Informações espalhadas',                 solution: 'Dados em planilhas, e-mails e sistemas diferentes travam decisões' },
  { label: 'Atendimento lento e inconsistente',      solution: 'Clientes insatisfeitos migrando para a concorrência' },
  { label: 'Decisão no achismo',                     solution: 'Decisões sem dados reais aumentam o risco de erro' },
  { label: 'Faturamento instável',                   solution: 'Receita imprevisível dificulta planejamento e crescimento' },
  { label: 'Sistemas que não se conversam',          solution: 'Integrações inexistentes geram retrabalho e falhas operacionais' },
  { label: 'Dados desprotegidos e desorganizados',   solution: 'Informações sensíveis expostas e difíceis de acessar' },
  { label: 'Falta de clareza nos processos',         solution: 'Sem processos definidos, cada um faz do seu jeito' },
  { label: 'Retrabalho Constante',                   solution: 'Horas desperdiçadas corrigindo o que poderia ter sido feito certo' },
];

const RED = '#ff2020';

function fibonacciSphere(count: number, radius: number): [number, number, number][] {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  return Array.from({ length: count }, (_, i) => {
    const theta = (2 * Math.PI * i) / goldenRatio;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    return [
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ] as [number, number, number];
  });
}

const FIXED_NODES = fibonacciSphere(10, 1.2);

type PillPos = { x: number; y: number; tx: string; ty: string } | null;

function DiagnosisNode({ position, hovered, onPointerOver, onPointerOut, onClick, nodeIndex, onPillPos }: {
  position: [number, number, number];
  hovered: boolean;
  onPointerOver: () => void;
  onPointerOut: () => void;
  onClick: () => void;
  nodeIndex: number;
  onPillPos: (pos: PillPos) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();
  const baseScale = hovered ? 0.18 : 0.13;
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    if (!hovered) {
      const target = baseScale + Math.sin(clock.elapsedTime * 2 + nodeIndex) * 0.008;
      meshRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.1);
    }

    if (hovered) {
      meshRef.current.getWorldPosition(tempVec);
      const projected = tempVec.clone().project(camera);
      const rect = gl.domElement.getBoundingClientRect();
      const px = (projected.x * 0.5 + 0.5) * rect.width + rect.left;
      const py = (-projected.y * 0.5 + 0.5) * rect.height + rect.top;

      onPillPos({ x: px, y: py - 38, tx: '-50%', ty: '-100%' });
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      scale={baseScale}
      onPointerOver={(e) => { e.stopPropagation(); onPointerOver(); }}
      onPointerOut={onPointerOut}
      onClick={(e) => { e.stopPropagation(); onClick(); }}
    >
      <sphereGeometry args={[1, 24, 24]} />
      <meshStandardMaterial
        color={RED}
        emissive={RED}
        emissiveIntensity={hovered ? 0.6 : 0.35}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const count = 50;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = 2.2 * (0.6 + (i % 7) * 0.058);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={50} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={RED} size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function DiagnosisScene({ onPillPos, hoveredIndex, setHoveredIndex }: {
  onPillPos: (pos: PillPos) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl, viewport } = useThree();
  const scale = Math.min(1.4, viewport.width * 0.35);

  useEffect(() => {
    gl.domElement.style.cursor = hoveredIndex !== null ? 'pointer' : 'default';
  }, [hoveredIndex, gl]);

  useFrame(() => {
    if (groupRef.current && hoveredIndex === null) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.0004;
    }
  });

  const handlePillPos = useCallback((pos: PillPos) => onPillPos(pos), [onPillPos]);

  return (
    <group ref={groupRef} scale={scale} onPointerMissed={() => setHoveredIndex(null)}>
      {FIXED_NODES.map((pos, i) => (
        <DiagnosisNode
          key={`node-${i}`}
          position={pos}
          hovered={hoveredIndex === i}
          onPointerOver={() => setHoveredIndex(i)}
          onPointerOut={() => { setHoveredIndex(null); onPillPos(null); }}
          onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
          nodeIndex={i}
          onPillPos={hoveredIndex === i ? handlePillPos : () => {}}
        />
      ))}
      <ParticleField />
    </group>
  );
}

export default function DiagnosisCanvas({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillPos, setPillPos] = useState<PillPos>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={`${className} bg-muted rounded-3xl`} />;

  const bubble = hoveredIndex !== null ? bubbles[hoveredIndex] : null;

  return (
    <div className={className} style={{ overflow: 'visible', position: 'relative' }}>
      <Suspense fallback={<div className="w-full h-full bg-muted rounded-3xl animate-pulse" />}>
        <Canvas
          camera={{ position: [0, 0, 7], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent', overflow: 'visible' }}
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={1.5} color={RED} />
          <pointLight position={[-3, -2, 4]} intensity={0.3} color="#ff6644" />
          <pointLight position={[0, -5, -3]} intensity={0.2} color="#ffffff" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <DiagnosisScene
              onPillPos={setPillPos}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={(i) => { setHoveredIndex(i); if (i === null) setPillPos(null); }}
            />
          </Float>
        </Canvas>
      </Suspense>

      {bubble && pillPos && (
        <div
          style={{
            position: 'fixed',
            left: pillPos.x,
            top: pillPos.y,
            transform: `translate(${pillPos.tx}, ${pillPos.ty})`,
            pointerEvents: 'none',
            zIndex: 9999,
            padding: isMobile() ? '4px 10px' : '5px 14px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.35)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.15)',
            color: 'rgba(10, 6, 25, 0.9)',
            fontSize: isMobile() ? '10px' : '11px',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            lineHeight: '1.4',
            letterSpacing: '0.02em',
            textAlign: 'center',
          }}
        >
          {bubble.label}
        </div>
      )}
    </div>
  );
}
