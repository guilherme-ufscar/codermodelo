import { Suspense, useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768;

const solutionNodes = [
  { label: 'Apps',        solved: 'Atendimento inteligente 24/7' },
  { label: 'Plataformas', solved: 'Dados em Segurança e estruturado' },
  { label: 'Sistemas',    solved: 'Fluxos da empresa bem definidos - Processos claros' },
  { label: 'CRM',         solved: 'Aumento das vendas e crescimento previsível' },
  { label: 'Dashboards',  solved: 'Decisões baseadas em dados em tempo real' },
  { label: 'ERP',         solved: 'Informações Centralizadas - Controle Total do Negócio' },
  { label: 'Sites',       solved: 'Estrutura que gera leads reais' },
  { label: 'Automações',  solved: 'Processos executados automaticamente' },
  { label: 'Softwares',   solved: 'Soluções sob medida para seu negócio' },
  { label: 'IA',          solved: 'Inteligência artificial aplicada ao negócio' },
];

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

const FIXED_CONNECTIONS: [number, number][] = [];
for (let i = 0; i < FIXED_NODES.length; i++) {
  for (let j = i + 1; j < FIXED_NODES.length; j++) {
    const [ax, ay, az] = FIXED_NODES[i];
    const [bx, by, bz] = FIXED_NODES[j];
    const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
    if (dist < 1.5) FIXED_CONNECTIONS.push([i, j]);
  }
}

type PillPos = { x: number; y: number; tx: string; ty: string } | null;

function NeuronNode({ position, color, hovered, onPointerOver, onPointerOut, onClick, nodeIndex, onPillPos }: {
  position: [number, number, number];
  color: string;
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
        color={color}
        emissive={color}
        emissiveIntensity={hovered ? 0.5 : 0.3}
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  );
}

function ConnectionLine({ start, end, highlight }: {
  start: [number, number, number];
  end: [number, number, number];
  highlight: boolean;
}) {
  const geometry = useMemo(() => {
    const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [start, end]);

  const material = useMemo(() => new THREE.LineBasicMaterial({
    color: '#541ccc',
    transparent: true,
    opacity: highlight ? 0.5 : 0.2,
  }), [highlight]);

  return <primitive object={new THREE.Line(geometry, material)} />;
}

function ParticleField({ count, color, radius }: { count: number; color: string; radius: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const r = radius * (0.6 + (i % 7) * 0.058);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.08;
      pointsRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.04) * 0.08;
    }
  });
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.025} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function NeuronScene({ onPillPos, hoveredIndex, setHoveredIndex }: {
  onPillPos: (pos: PillPos) => void;
  hoveredIndex: number | null;
  setHoveredIndex: (i: number | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { gl, viewport } = useThree();
  const scale = Math.min(1.4, viewport.width * 0.35);
  const handlePillPos = useCallback((pos: PillPos) => onPillPos(pos), [onPillPos]);

  useEffect(() => {
    gl.domElement.style.cursor = hoveredIndex !== null ? 'pointer' : 'default';
  }, [hoveredIndex, gl]);

  useFrame(() => {
    if (groupRef.current && hoveredIndex === null) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.0004;
    }
  });

  return (
    <group ref={groupRef} scale={scale} onPointerMissed={() => setHoveredIndex(null)}>
      {FIXED_CONNECTIONS.map(([a, b], i) => (
        <ConnectionLine
          key={`conn-${i}`}
          start={FIXED_NODES[a]}
          end={FIXED_NODES[b]}
          highlight={hoveredIndex === a || hoveredIndex === b}
        />
      ))}
      {FIXED_NODES.map((pos, i) => (
        <NeuronNode
          key={`node-${i}`}
          position={pos}
          color="#541ccc"
          hovered={hoveredIndex === i}
          onPointerOver={() => setHoveredIndex(i)}
          onPointerOut={() => { setHoveredIndex(null); onPillPos(null); }}
          onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
          nodeIndex={i}
          onPillPos={hoveredIndex === i ? handlePillPos : () => {}}
        />
      ))}
      <ParticleField count={50} color="#ed7c3a" radius={2.2} />
    </group>
  );
}

export default function NeuronCanvas({ className = '' }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [pillPos, setPillPos] = useState<PillPos>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className={`${className} bg-muted rounded-3xl`} />;

  const node = hoveredIndex !== null ? solutionNodes[hoveredIndex] : null;

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
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#541ccc" />
          <pointLight position={[-3, -2, 4]} intensity={0.3} color="#ed7c3a" />
          <pointLight position={[0, -5, -3]} intensity={0.2} color="#ffffff" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <NeuronScene
              onPillPos={setPillPos}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={(i) => { setHoveredIndex(i); if (i === null) setPillPos(null); }}
            />
          </Float>
        </Canvas>
      </Suspense>

      {node && pillPos && (
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
          {node.solved}
        </div>
      )}
    </div>
  );
}
