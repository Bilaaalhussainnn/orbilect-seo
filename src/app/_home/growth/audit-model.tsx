"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";
import styles from "./audit-preview.module.css";

const blue = "#004AAD";
type Point = [number, number, number];

const visibility: Point[] = [
  [-2.05, .37, 0], [-1.23, .72, 0], [-.41, .58, 0],
  [.41, 1.15, 0], [1.23, 1.03, 0], [2.05, 1.74, 0],
];

const crawlRoutes: Point[][] = [
  [[-1.7, .15, 0], [-.65, .15, 0], [-.65, .15, -.85], [.6, .15, -.85]],
  [[-.65, .15, 0], [-.65, .15, .85], [.6, .15, .85]],
  [[.6, .15, -.85], [1.65, .15, -.85], [1.65, .15, 0]],
  [[.6, .15, .85], [1.65, .15, .85], [1.65, .15, 0]],
];

function Tile({
  position, size, color = blue,
}: {
  position: Point;
  size: Point;
  color?: string;
}) {
  return (
    <RoundedBox
      position={position}
      args={size}
      radius={Math.min(.08, ...size.map((side) => side / 3))}
      smoothness={4}
    >
      <meshStandardMaterial color={color} metalness={.28} roughness={.32} />
    </RoundedBox>
  );
}

function VisibilityModel() {
  return (
    <>
      {visibility.map(([x, height], index) => (
        <group key={x}>
          <Tile position={[x, height / 2, 0]} size={[.49, height, .9]}
            color={index === 5 ? "#e1e7ef" : blue} />
          <mesh position={[x, height + .17, 0]}>
            <sphereGeometry args={[.085, 16, 12]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
      ))}
      <Line points={visibility.map(([x, y, z]): Point => [x, y + .17, z])}
        color="#fff" lineWidth={2} />
    </>
  );
}

function TechnicalModel() {
  const nodes: Point[] = [
    [-1.7, .29, 0], [-.65, .29, 0], [.6, .29, -.85],
    [.6, .29, .85], [1.65, .29, 0],
  ];

  return (
    <>
      {crawlRoutes.map((route, index) => (
        <Line key={index} points={route} color="#dfe8f5" lineWidth={2} />
      ))}
      {nodes.map(([x, y, z], index) => (
        <group key={index} position={[x, y, z]}>
          <Tile position={[0, 0, 0]} size={[.62, .36, .55]} />
          <Tile position={[0, .21, 0]} size={[.36, .06, .29]}
            color={index === 4 ? "#fff" : "#9da9ba"} />
        </group>
      ))}
    </>
  );
}

function OnPageModel() {
  return (
    <group position={[0, .99, 0]}>
      <Tile position={[.14, -.12, -.37]} size={[3.4, 1.85, .12]} color="#27364b" />
      <Tile position={[0, 0, 0]} size={[3.4, 1.85, .16]} color="#dce4ed" />
      <Tile position={[0, .69, .11]} size={[2.98, .17, .1]} />
      <Tile position={[-.87, .02, .12]} size={[1.22, .9, .1]} />
      {[.32, .04, -.24, -.53].map((y, index) => (
        <Tile key={y} position={[.65, y, .12]}
          size={[1.39 - index * .15, .1, .1]} color="#5b6d85" />
      ))}
    </group>
  );
}

function Scene({ selected, scan, reduced }: {
  selected: number;
  scan: number;
  reduced: boolean;
}) {
  const model = useRef<Group>(null);
  const beam = useRef<Group>(null);
  const elapsed = useRef(0);

  useEffect(() => {
    elapsed.current = 0;
  }, [selected, scan]);

  useFrame(({ pointer }, delta) => {
    if (!model.current || !beam.current) return;

    elapsed.current = Math.min(1.4, elapsed.current + delta);
    const progress = reduced ? 1 : elapsed.current / 1.4;
    const ease = 1 - (1 - progress) ** 3;
    const damping = 1 - Math.exp(-delta * 6);
    const tilt = reduced ? 0 : pointer.x * .15;

    model.current.scale.y = .12 + ease * .88;
    model.current.rotation.y += (tilt - model.current.rotation.y) * damping;
    beam.current.visible = !reduced && progress < 1;
    beam.current.position.x = -2.35 + progress * 4.7;
  });

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 5, 5]} intensity={2.5} />
      <directionalLight position={[-4, 2, -2]} color={blue} intensity={3} />
      <Tile position={[0, -.16, 0]} size={[5, .28, 2.8]} color="#172438" />

      <group ref={model}>
        {selected === 0 ? <VisibilityModel /> :
          selected === 1 ? <TechnicalModel /> : <OnPageModel />}
      </group>

      <group ref={beam} visible={false}>
        <mesh position={[0, .94, 0]}>
          <planeGeometry args={[2.75, 1.9]} />
          <meshBasicMaterial
            color={blue} side={2} transparent opacity={.17} depthWrite={false}
          />
          <group rotation={[0, Math.PI / 2, 0]} />
        </mesh>
        <mesh position={[0, .025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[.04, 2.7]} />
          <meshBasicMaterial color="#e3edff" transparent opacity={.75} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

export default function AuditModel({ selected, scan }: {
  selected: number;
  scan: number;
}) {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return (
    <div className={styles.model} aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [5.2, 4.3, 7.6], zoom: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ camera }) => camera.lookAt(0, .6, 0)}
        fallback={<div className={styles.modelFallback}>Explore the audit checks below</div>}
      >
        <Scene selected={selected} scan={scan} reduced={reduced} />
      </Canvas>
    </div>
  );
}
