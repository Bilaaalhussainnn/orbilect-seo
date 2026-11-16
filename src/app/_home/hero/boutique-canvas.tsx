"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import styles from "./storefront-scene.module.css";

const BLUE = "#004AAD";

type PersonSpec = {
  offset: number;
  lane: number;
  size: number;
  top: string;
  pants: string;
  skin: string;
  cap?: boolean;
  purse?: boolean;
  elderly?: boolean;
};

const people: PersonSpec[] = [
  { offset: 0, lane: -2.7, size: .84, top: "#d6d1c6", pants: "#344c70", skin: "#bb8a68", cap: true },
  { offset: 0, lane: 2.5, size: .8, top: "#b5a896", pants: "#30313c", skin: "#885d45", purse: true },
  { offset: 0, lane: -1.6, size: .81, top: "#778391", pants: "#343844", skin: "#c69c80", elderly: true },
  { offset: 0, lane: 1.65, size: .78, top: "#d2c7b5", pants: "#55505b", skin: "#92664e", elderly: true, purse: true },
  { offset: 0, lane: -.55, size: .85, top: "#5b687d", pants: "#232936", skin: "#a87556" },
  { offset: 0, lane: 0, size: .52, top: BLUE, pants: "#303d53", skin: "#b68667", cap: true },
  { offset: 0, lane: .55, size: .8, top: "#d2c3b0", pants: "#494451", skin: "#bd9072", purse: true },
  { offset: 0, lane: -3.2, size: .74, top: "#324c73", pants: "#777f8c", skin: "#704b39", cap: true },
  { offset: 0, lane: 3.1, size: .76, top: "#b1b5c2", pants: "#29394e", skin: "#d2aa8d", purse: true },
  { offset: 0, lane: 1.05, size: .6, top: "#aabaca", pants: "#3c4d65", skin: "#b28265" },
];

function Block({
  position,
  size,
  color,
  metalness = 0,
  roughness = .4,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
}) {
  return (
    <RoundedBox
      args={size}
      radius={Math.min(.12, Math.min(...size) / 3)}
      smoothness={4}
      position={position}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
      />
    </RoundedBox>
  );
}

function Glass({ x }: { x: number }) {
  return (
    <mesh position={[x, 1.6, 1.23]}>
      <boxGeometry args={[1.02, 2.3, .035]} />
      <meshPhysicalMaterial
        color="#a8bfd6"
        transparent
        opacity={.24}
        metalness={.2}
        roughness={.12}
        depthWrite={false}
      />
    </mesh>
  );
}


function ShopLogo() {
  const texture = useTexture("/brand/orbilect-seo-mark.svg");

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  return (
    <mesh position={[0, 3.68, 1.46]}>
      <planeGeometry args={[.82, .82]} />
      <meshBasicMaterial
        map={texture}
        transparent
        alphaTest={.01}
        depthWrite={false}
        toneMapped={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}


function Shop({ door }: { door: React.RefObject<THREE.Group | null> }) {
  return (
    <group>
      {/* Floating stone foundation */}
      <Block position={[0, -.17, 0]} size={[5.6, .25, 4]} color="#151c27" metalness={.35} />
      <Block position={[0, -.02, 0]} size={[5.25, .12, 3.75]} color="#a7a69f" roughness={.6} />

      {/* Interior and side walls */}
      <Block position={[0, 1.5, -1.45]} size={[4.5, 3, .18]} color="#b8b1a5" roughness={.75} />
      <Block position={[-2.15, 1.5, 0]} size={[.25, 3, 3]} color="#d0ccc3" roughness={.55} />
      <Block position={[2.15, 1.5, 0]} size={[.25, 3, 3]} color="#d0ccc3" roughness={.55} />

      {/* Thin, layered architectural canopy */}
      <RoundedBox args={[4.85, .28, 3.65]} radius={.13} smoothness={8}
        position={[0, 3.15, .12]} castShadow receiveShadow>
        <meshStandardMaterial color="#d5d2ca" roughness={.35} metalness={.12} />
      </RoundedBox>
      <Block position={[0, 2.97, .2]} size={[4.55, .08, 3.3]} color="#222d3c" metalness={.65} />
      <Block position={[0, 2.9, 1.71]} size={[4.6, .035, .05]} color="#004AAD" />

      {/* Dark fascia gives the actual logo contrast */}
      <Block position={[0, 2.6, 1.49]} size={[4.3, .55, .18]} color="#111a28" metalness={.4} />
      <ShopLogo />

      {/* Slender front frames */}
      {[-2.02, -.68, .68, 2.02].map((x) => (
        <Block key={x} position={[x, 1.18, 1.38]} size={[.065, 2.36, .08]}
          color="#727d8d" metalness={.8} roughness={.27} />
      ))}

      {/* Full-height display glass */}
      {[-1.35, 1.35].map((x) => (
        <mesh key={x} position={[x, 1.18, 1.37]}>
          <boxGeometry args={[1.26, 2.28, .025]} />
          <meshPhysicalMaterial color="#bdccdb" transparent opacity={.16}
            roughness={.08} metalness={.15} depthWrite={false} />
        </mesh>
      ))}

      {/* Sliding entrance doors */}
      <group ref={door}>
        {[-1, 1].map((side) => (
          <group key={side}>
            <mesh position={[side * .32, 1.18, 1.39]}>
              <boxGeometry args={[.63, 2.28, .025]} />
              <meshPhysicalMaterial color="#c8d6e3" transparent opacity={.14}
                roughness={.09} depthWrite={false} />
            </mesh>
            <Block position={[side * .045, 1.2, 1.43]}
              size={[.018, .38, .025]} color="#d6dbe2" metalness={.85} />
          </group>
        ))}
      </group>

      {/* Stone plinths with distinct display products */}
      {[-1.35, 1.35].map((x) => (
        <group key={x}>
          <Block position={[x, .38, .62]} size={[.78, .65, .65]} color="#bcb4a7" roughness={.75} />
          <mesh position={[x, .9, .62]} castShadow>
            <torusGeometry args={[.14, .045, 16, 40]} />
            <meshStandardMaterial color="#8f9fb5" metalness={.8} roughness={.25} />
          </mesh>
          {[.9, 1.65].map((y) => (
            <group key={y}>
              <Block position={[x, y, -1.05]} size={[.95, .045, .42]} color="#515c6a" metalness={.5} />
              <Block position={[x - .2, y + .19, -1.05]} size={[.2, .33, .18]} color="#d7d0c4" />
              <Block position={[x + .18, y + .15, -1.05]} size={[.22, .25, .2]} color="#004AAD" />
            </group>
          ))}
        </group>
      ))}

      {/* Vertical stone detailing */}
      {[-1.85, -1.65, -1.45, 1.45, 1.65, 1.85].map((x) => (
        <Block key={x} position={[x, 1.5, -1.32]} size={[.035, 2.65, .035]}
          color="#8f8a82" roughness={.8} />
      ))}

      <pointLight position={[-1.2, 2.45, .45]} intensity={4} color="#ffe2b6" distance={3.5} />
      <pointLight position={[1.2, 2.45, .45]} intensity={4} color="#ffe2b6" distance={3.5} />

      {/* Low sculptural planter beside the entrance */}
      <Block position={[-2.7, .27, .55]} size={[.55, .55, .6]} color="#3f4956" metalness={.2} />
      <mesh position={[-2.7, .79, .55]} scale={[.28, .47, .28]} castShadow>
        <sphereGeometry args={[1, 20, 20]} />
        <meshStandardMaterial color="#4a5c51" roughness={.9} />
      </mesh>
    </group>
  );
}

function Person({ spec }: { spec: PersonSpec }) {
  // The smile is built from a small curved tube so it remains real geometry.
  const curve = new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(-.035, -.025, .105),
    new THREE.Vector3(0, -.065, .112),
    new THREE.Vector3(.035, -.025, .105)
  );

  return (
    <group scale={spec.size}>
      <group name="legLeft" position={[-.085, .5, 0]}>
        <Block position={[0, -.21, 0]} size={[.12, .43, .13]} color={spec.pants} />
        <Block position={[0, -.43, .035]} size={[.14, .09, .23]} color="#d4d5d9" />
      </group>
      <group name="legRight" position={[.085, .5, 0]}>
        <Block position={[0, -.21, 0]} size={[.12, .43, .13]} color={spec.pants} />
        <Block position={[0, -.43, .035]} size={[.14, .09, .23]} color="#d4d5d9" />
      </group>

      <Block position={[0, .72, 0]} size={[.34, .46, .21]} color={spec.top} />
      <group name="armLeft" position={[-.22, .9, 0]}>
        <Block position={[0, -.19, 0]} size={[.09, .38, .1]} color={spec.top} />
        <mesh position={[0, -.4, 0]}>
          <sphereGeometry args={[.055, 12, 12]} />
          <meshStandardMaterial color={spec.skin} />
        </mesh>
        <group name="shoppingBag" position={[0, -.53, .03]} visible={false}>
          <Block position={[0, -.07, 0]} size={[.24, .28, .12]} color={BLUE} />
          <mesh position={[0, .1, 0]}>
            <torusGeometry args={[.055, .009, 8, 20, Math.PI]} />
            <meshStandardMaterial color="#dedede" />
          </mesh>
        </group>
      </group>

      <group name="armRight" position={[.22, .9, 0]}>
        <Block position={[0, -.19, 0]} size={[.09, .38, .1]} color={spec.top} />
        {spec.purse && (
          <group position={[.02, -.46, 0]}>
            <Block position={[0, 0, 0]} size={[.18, .2, .12]} color="#705448" />
            <mesh position={[0, .14, 0]}>
              <torusGeometry args={[.05, .009, 8, 20, Math.PI]} />
              <meshStandardMaterial color="#ae9273" />
            </mesh>
          </group>
        )}
      </group>

      <group position={[0, 1.12, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[.125, 20, 20]} />
          <meshStandardMaterial color={spec.skin} roughness={.65} />
        </mesh>
        <mesh position={[0, .065, -.025]} scale={[1, .7, 1]}>
          <sphereGeometry args={[.12, 16, 16]} />
          <meshStandardMaterial color={spec.elderly ? "#c7c9ce" : "#302a2c"} />
        </mesh>
        {spec.cap && (
          <>
            <mesh position={[0, .08, 0]}>
              <sphereGeometry args={[.132, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#22334c" />
            </mesh>
            <Block position={[0, .08, .12]} size={[.23, .025, .16]} color="#22334c" />
          </>
        )}
        {[-.044, .044].map((x) => (
          <mesh key={x} position={[x, .012, .113]}>
            <sphereGeometry args={[.009, 8, 8]} />
            <meshStandardMaterial color="#25252a" />
          </mesh>
        ))}
        <mesh name="smile" visible={false}>
          <tubeGeometry args={[curve, 12, .006, 5, false]} />
          <meshStandardMaterial color="#653f37" />
        </mesh>
      </group>
    </group>
  );
}


function World({ reduced }: { reduced: boolean }) {
  const elapsed = useRef(0);
  const crowd = useRef<THREE.Group>(null);
  const door = useRef<THREE.Group>(null);
  const waveCounts = [2, 4, 7, 10];


  useFrame((_, delta) => {
    if (!reduced) elapsed.current += Math.min(delta, .05) * 1.65;

    const waveLength = 23;
    const waveIndex = Math.floor(elapsed.current / waveLength) % waveCounts.length;
    const localTime = elapsed.current % waveLength;
    const count = waveCounts[waveIndex];
    let open = false;

    crowd.current?.children.forEach((person, index) => {
      const spec = people[index];
      const delay = index * 1.4;
      const duration = 10;
      const progress = (localTime - delay) / duration;
      const visible = index < count && progress >= 0 && progress < 1;

      person.visible = reduced ? index < 4 : visible;

      const lane = index % 2 === 0 ? -.24 : .24;
      const startX = spec.lane;
      const startZ = 4.9 + (index % 3) * .2;
      const t = THREE.MathUtils.clamp(progress, 0, 1);

      if (reduced) {
        person.position.set(startX, .08, 3.8 + index * .12);
        person.rotation.y = Math.PI;
      } else if (t < .62) {
        const approach = t / .62;
        person.position.set(
          THREE.MathUtils.lerp(startX, lane, approach),
          .08,
          THREE.MathUtils.lerp(startZ, 2.2, approach)
        );
        person.rotation.y = Math.atan2(lane - startX, 2.2 - startZ);
      } else {
        const entry = (t - .62) / .38;
        person.position.set(lane, .08, THREE.MathUtils.lerp(2.2, -.85, entry));
        person.rotation.y = Math.PI;
      }

      if (person.visible && person.position.z < 3) open = true;

      const stride = person.visible && !reduced
        ? Math.sin(elapsed.current * (spec.elderly ? 5.5 : 7) + index) * .29
        : 0;

      const left = person.getObjectByName("legLeft");
      const right = person.getObjectByName("legRight");
      const armLeft = person.getObjectByName("armLeft");
      const armRight = person.getObjectByName("armRight");

      if (left) left.rotation.x = stride;
      if (right) right.rotation.x = -stride;
      if (armLeft) armLeft.rotation.x = -stride * .4;
      if (armRight) armRight.rotation.x = stride * .4;

      const bag = person.getObjectByName("shoppingBag");
      if (bag) bag.visible = false;
    });

    if (door.current) {
      const amount = open ? .62 : 0;
      door.current.children[0].position.x = THREE.MathUtils.damp(
        door.current.children[0].position.x, -amount, 8, delta
      );
      door.current.children[1].position.x = THREE.MathUtils.damp(
        door.current.children[1].position.x, amount, 8, delta
      );
    }
  });

  return (
    <>
      <ambientLight intensity={.7} />
      <hemisphereLight args={["#d7e4ff", "#151d30", 1.3]} />
      <directionalLight
        position={[-4, 9, 5]}
        intensity={2.1}
        color="#fff0db"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-normalBias={.035}
      />
      <directionalLight position={[5, 6, -3]} intensity={1.2} color="#6c91d3" />
      <group position={[0, -.6, -.6]}>
        <Shop door={door} />
        <group ref={crowd}>
          {people.map((spec, index) => (
            <group key={index}>
              <Person spec={spec} />
            </group>
          ))}
        </group>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -.32, 1]} receiveShadow>
          <planeGeometry args={[200, 200]} />
          <shadowMaterial transparent opacity={.22} depthWrite={false} />
        </mesh>
      </group>
    </>
  );
}

function ResponsiveCamera() {
  const { camera, size, gl } = useThree();

  useEffect(() => {
    const perspective = camera as THREE.PerspectiveCamera;
    const aspect = size.width / Math.max(size.height, 1);
    const verticalFov = THREE.MathUtils.degToRad(36);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);

    // Fit the store and complete walking routes in both orientations.
    const radius = 4.55;
    const distance = radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2);
    const target = new THREE.Vector3(0, .8, 1.1);
    const direction = new THREE.Vector3(7, 5.5, 10).normalize();

    perspective.fov = 36;
    perspective.position.copy(target).addScaledVector(direction, distance);
    perspective.lookAt(target);
    perspective.updateProjectionMatrix();

    gl.setClearColor(0x000000, 0);
  }, [camera, size.width, size.height, gl]);

  return null;
}

export default function BoutiqueCanvas() {

  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  return (
    <div
      className={styles.canvas}
      role="img"
      aria-label="Animated boutique with visitors walking into the store."
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [8, 6.2, 10], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ camera }) => camera.lookAt(0, .65, .7)}
        fallback={<p className={styles.loading}>Explore our SEO services below.</p>}
      >
        <ResponsiveCamera />
        <Suspense fallback={null}>
          <World reduced={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
