"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, RoundedBox } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import { OrthographicCamera } from "three";
import type { Group } from "three";

const blue = "#004AAD";
type Point = [number, number, number];

function Panel({ position, size, color }: {
  position: Point;
  size: Point;
  color: string;
}) {
  return (
    <RoundedBox args={size} position={position}
      radius={Math.min(.09, Math.min(...size) / 3)} smoothness={4}>
      <meshStandardMaterial color={color} metalness={.25} roughness={.35} />
    </RoundedBox>
  );
}

function SearchResults({ lens }: { lens: React.RefObject<Group | null> }) {
  return (
    <>
      <Panel position={[0, 0, 0]} size={[3.8, 2.75, .19]} color="#162337" />
      <Panel position={[0, .99, .13]} size={[3.13, .27, .12]} color="#415671" />
      {[.46, -.12, -.7].map((y, index) => (
        <group key={y} position={[0, y, .17]}>
          <Panel position={[-1.28, 0, 0]} size={[.34, .3, .09]}
            color={index === 0 ? blue : "#435572"} />
          <Panel position={[-.12, .07, 0]} size={[1.55, .09, .09]}
            color={index === 0 ? "#fff" : "#a1afc2"} />
          <Panel position={[-.31, -.09, 0]} size={[1.15, .065, .08]} color="#6b809d" />
        </group>
      ))}
      <group ref={lens} position={[.74, .42, .43]}>
        <mesh>
          <torusGeometry args={[.48, .075, 16, 48]} />
          <meshStandardMaterial color="#e4edf9" metalness={.55} roughness={.25} />
        </mesh>
        <group position={[.46, -.46, 0]} rotation={[0, 0, .79]}>
          <Panel position={[0, 0, 0]} size={[.14, .46, .13]} color={blue} />
        </group>
      </group>
    </>
  );
}

const sources: Point[] = [
  [-1.9, .82, .25], [-1.48, -.95, -.24],
  [1.87, .72, -.26], [1.48, -.85, .38],
];

function SourceNetwork({ pulses }: { pulses: React.RefObject<Group | null> }) {
  return (
    <>
      {sources.map(([x, y, z], index) => (
        <group key={x}>
          <Line points={[[x, y, z], [x * .54, y * .65, .15], [0, 0, .15]]}
            color="#7c9bc1" lineWidth={2} />
          <Panel position={[x, y, z]} size={[.77, .56, .16]}
            color={index % 2 === 0 ? "#dce8f6" : "#6c83a1"} />
          <Panel position={[x, y + .07, z + .11]} size={[.41, .045, .045]} color={blue} />
          <Panel position={[x - .07, y - .08, z + .11]} size={[.27, .045, .045]} color="#172945" />
        </group>
      ))}
      <mesh position={[0, 0, .15]}>
        <icosahedronGeometry args={[.65, 1]} />
        <meshStandardMaterial color={blue} metalness={.45} roughness={.28} />
      </mesh>
      <group ref={pulses}>
        {sources.map(([x, y, z]) => (
          <mesh key={x} position={[x * .6, y * .6, z * .6 + .06]}>
            <sphereGeometry args={[.065, 12, 12]} />
            <meshBasicMaterial color="#f5f9ff" />
          </mesh>
        ))}
      </group>
    </>
  );
}

function AnswerCards({ answer }: { answer: React.RefObject<Group | null> }) {
  return (
    <>
      <group position={[-.56, .68, -.17]}>
        <Panel position={[0, 0, 0]} size={[2.65, .83, .18]} color="#344860" />
        <Panel position={[-.24, .09, .13]} size={[1.54, .075, .08]} color="#c2d2e6" />
        <Panel position={[-.51, -.11, .13]} size={[1, .065, .08]} color="#8ba0bb" />
        <Line points={[[.71, .14, .18], [.84, .23, .18], [1, .16, .18],
          [1, .03, .18], [.86, -.07, .18], [.86, -.13, .18]]}
          color="#fff" lineWidth={3} />
        <mesh position={[.86, -.23, .18]}>
          <sphereGeometry args={[.035, 12, 12]} />
          <meshBasicMaterial color="#fff" />
        </mesh>
      </group>

      <group ref={answer} position={[.42, -.57, .28]}>
        <Panel position={[0, 0, 0]} size={[2.9, 1.18, .2]} color={blue} />
        <Line points={[[-1.14, .11, .16], [-.96, -.09, .16], [-.62, .24, .16]]}
          color="#fff" lineWidth={4} />
        <Panel position={[.27, .19, .15]} size={[1.48, .085, .08]} color="#fff" />
        <Panel position={[.1, -.02, .15]} size={[1.14, .07, .08]} color="#c6ddfa" />
        <Panel position={[.19, -.23, .15]} size={[1.32, .065, .08]} color="#c6ddfa" />
      </group>
    </>
  );
}

function Scene({ selected, reduced }: { selected: number; reduced: boolean }) {
  const root = useRef<Group>(null);
  const lens = useRef<Group>(null);
  const pulses = useRef<Group>(null);
  const answer = useRef<Group>(null);
  const elapsed = useRef(0);
  const { camera, size } = useThree();

  useEffect(() => {
    if (!(camera instanceof OrthographicCamera)) return;
    camera.zoom = Math.min(size.width / 5.9, size.height / 3.65);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  useFrame(({ pointer }, delta) => {
    if (!root.current) return;

    elapsed.current += Math.min(delta, .05);
    const time = elapsed.current;
    const reveal = reduced ? 1 : 1 - (1 - Math.min(time / .9, 1)) ** 3;
    const damping = 1 - Math.exp(-delta * 6);
    const tilt = reduced ? 0 : pointer.x * .18;

    root.current.scale.setScalar(.82 + reveal * .18);
    root.current.rotation.y += (tilt - root.current.rotation.y) * damping;
    root.current.position.y = reduced ? 0 : Math.sin(time * 1.4) * .055;

    if (lens.current) {
      lens.current.position.y = reduced ? .42 : .12 + Math.cos(time * 1.55) * .47;
    }

    pulses.current?.children.forEach((pulse, index) => {
      const [x, y, z] = sources[index];
      const progress = reduced ? .4 : (time * .65 + index * .22) % 1;
      pulse.position.set(x * (1 - progress), y * (1 - progress), z * (1 - progress) + .15 * progress);
    });

    if (answer.current) {
      answer.current.position.z = .28 + reveal * .24;
      answer.current.position.y = -.72 + reveal * .15;
    }
  });

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[3, 5, 6]} intensity={2.4} />
      <directionalLight position={[-3, 1, -3]} color="#004AAD" intensity={3} />
      <group ref={root}>
        {selected === 0 && <SearchResults lens={lens} />}
        {selected === 1 && <SourceNetwork pulses={pulses} />}
        {selected === 2 && <AnswerCards answer={answer} />}
      </group>
    </>
  );
}

export default function SearchModel({ selected, scan }: {
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
    <div style={{ width: "100%", touchAction: "pan-y" }} aria-hidden="true">
      <Canvas orthographic camera={{ position: [1.8, 1.35, 7] }}
        dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}
        style={{ touchAction: "pan-y" }}>
        <Scene key={[selected, scan, reduced].join("-")} selected={selected} reduced={reduced} />
      </Canvas>
    </div>
  );
}
