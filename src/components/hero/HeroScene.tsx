"use client";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

/** Slow camera drift + pointer parallax. Compositor-friendly and paused when
 * the hero leaves the viewport (handled by the Canvas frameloop). */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const step = Math.min(1, delta * 1.4);

    const targetX = Math.sin(time * 0.14) * 0.45 + state.pointer.x * 0.95;
    const targetY = 2 + Math.cos(time * 0.11) * 0.26 + state.pointer.y * 0.42;

    camera.position.x += (targetX - camera.position.x) * step;
    camera.position.y += (targetY - camera.position.y) * step;
    camera.lookAt(state.pointer.x * 0.42, 0.25 + state.pointer.y * 0.2, 0);
  });

  return null;
}

/** A floating island chunk built from primitive geometry. */
function Island({
  position,
  scale = 1,
  color = 0x172b43,
}: {
  position: [number, number, number];
  scale?: number;
  color?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) return;
    const time = state.clock.elapsedTime;
    group.position.y = position[1] + Math.sin(time * 0.7 + position[0]) * 0.9;
    group.rotation.z = Math.sin(time * 0.35 + position[2]) * 0.025;
    group.rotation.x = Math.cos(time * 0.28 + position[1]) * 0.015;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[2.6, 1.5, 2.6]} />
        <meshStandardMaterial color={color} flatShading roughness={0.85} />
      </mesh>
      <mesh position={[0, 1.25, 0]}>
        <coneGeometry args={[1.9, 2.3, 6]} />
        <meshStandardMaterial color={color} flatShading roughness={0.85} />
      </mesh>
      <mesh position={[1.5, 0.6, 0]}>
        <boxGeometry args={[0.65, 0.95, 0.65]} />
        <meshStandardMaterial color={0x223c5a} flatShading roughness={0.9} />
      </mesh>
      <mesh position={[-1.5, 0.55, 0]}>
        <boxGeometry args={[0.5, 0.7, 0.5]} />
        <meshStandardMaterial color={0x223c5a} flatShading roughness={0.9} />
      </mesh>
    </group>
  );
}

/** Floating crystal shard. */
function Shard({
  position,
  color = 0xff791f,
  speed = 1,
}: {
  position: [number, number, number];
  color?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    mesh.position.y =
      position[1] + Math.sin(time * 1.1 * speed + position[0]) * 0.55;
    mesh.rotation.y += 0.012 * speed;
    mesh.rotation.x += 0.008 * speed;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <octahedronGeometry args={[0.75, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.55}
        flatShading
        roughness={0.35}
      />
    </mesh>
  );
}

/** A large, tilted orbital ring that frames the scene. */
function Ring({
  position,
  radius = 8,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const time = state.clock.elapsedTime;
    mesh.rotation.y = time * 0.18;
    mesh.rotation.z = Math.sin(time * 0.24) * 0.12;
    mesh.position.y = position[1] + Math.sin(time * 0.6) * 0.45;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <torusGeometry args={[radius, 0.12, 10, 96]} />
      <meshBasicMaterial
        color={0x168bff}
        transparent
        opacity={0.38}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * The hero's orbital core: a faceted crystal wrapped in three counter-rotating
 * rings, with a soft halo. It sits behind the avatar and reads as a portal.
 */
function OrbitalCore({ position }: { position: [number, number, number] }) {
  const coreRef = useRef<THREE.Group>(null);
  const ringARef = useRef<THREE.Group>(null);
  const ringBRef = useRef<THREE.Group>(null);
  const ringCRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const core = coreRef.current;

    if (core) {
      core.rotation.y = time * 0.18;
      core.rotation.z = Math.sin(time * 0.24) * 0.05;
      core.position.y = position[1] + Math.sin(time * 0.52) * 0.24;
    }

    if (ringARef.current) ringARef.current.rotation.z = time * 0.3;
    if (ringBRef.current) {
      ringBRef.current.rotation.y = -time * 0.24;
      ringBRef.current.rotation.x = Math.sin(time * 0.2) * 0.16;
    }
    if (ringCRef.current) ringCRef.current.rotation.z = -time * 0.18;

    if (glowRef.current) {
      const pulse = 1 + Math.sin(time * 0.7) * 0.035;
      glowRef.current.scale.setScalar(pulse);
    }
  });

  return (
    <group ref={coreRef} position={position}>
      {/* Faceted heart */}
      <mesh>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshStandardMaterial
          color={0x16314d}
          emissive={0xff791f}
          emissiveIntensity={0.22}
          metalness={0.55}
          roughness={0.22}
          flatShading
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh scale={1.16}>
        <icosahedronGeometry args={[1.45, 1]} />
        <meshBasicMaterial
          color={0xffb27a}
          wireframe
          transparent
          opacity={0.26}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Halo */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.35, 24, 24]} />
        <meshBasicMaterial
          color={0xff791f}
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner orbit — orange */}
      <group ref={ringARef}>
        <mesh rotation={[Math.PI / 2.15, 0, 0.12]}>
          <torusGeometry args={[2.5, 0.035, 8, 96]} />
          <meshBasicMaterial
            color={0xff791f}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[2.5, 0, 0]}>
          <sphereGeometry args={[0.09, 12, 12]} />
          <meshBasicMaterial color={0xffb27a} toneMapped={false} />
        </mesh>
      </group>

      {/* Middle orbit — blue */}
      <group ref={ringBRef}>
        <mesh rotation={[Math.PI / 2.6, 0.5, 0.2]}>
          <torusGeometry args={[3.25, 0.028, 8, 96]} />
          <meshBasicMaterial
            color={0x168bff}
            transparent
            opacity={0.78}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
        <mesh position={[-3.25, 0, 0]}>
          <sphereGeometry args={[0.075, 12, 12]} />
          <meshBasicMaterial color={0x8dc7ff} toneMapped={false} />
        </mesh>
      </group>

      {/* Outer orbit — red, very faint */}
      <group ref={ringCRef}>
        <mesh rotation={[0.4, 0.1, Math.PI / 2.7]}>
          <torusGeometry args={[4.1, 0.022, 8, 96]} />
          <meshBasicMaterial
            color={0xef4148}
            transparent
            opacity={0.34}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Camera-facing outer halo ring */}
      <mesh position={[0, 0, -0.6]}>
        <ringGeometry args={[4.72, 4.76, 128]} />
        <meshBasicMaterial
          color={0x168bff}
          transparent
          opacity={0.2}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

/** Sparse dust field with a mix of orange, blue and paper motes. */
function Particles({ count = 160 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, velocities, colors } = useMemo(() => {
    const nextPositions = new Float32Array(count * 3);
    const nextVelocities = new Float32Array(count * 3);
    const nextColors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#ff791f"),
      new THREE.Color("#168bff"),
      new THREE.Color("#f7f9fc"),
    ];

    for (let i = 0; i < count; i += 1) {
      nextPositions[i * 3] = (Math.random() - 0.5) * 38;
      nextPositions[i * 3 + 1] = (Math.random() - 0.5) * 28;
      nextPositions[i * 3 + 2] = (Math.random() - 0.5) * 38;
      nextVelocities[i * 3] = (Math.random() - 0.5) * 0.016;
      nextVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.016;
      nextVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.016;

      const color = palette[Math.floor(Math.random() * palette.length)];
      nextColors[i * 3] = color.r;
      nextColors[i * 3 + 1] = color.g;
      nextColors[i * 3 + 2] = color.b;
    }

    return {
      positions: nextPositions,
      velocities: nextVelocities,
      colors: nextColors,
    };
  }, [count]);

  useFrame((state) => {
    const points = pointsRef.current;
    if (!points) return;

    const attribute = points.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      array[i * 3] += velocities[i * 3];
      array[i * 3 + 1] += velocities[i * 3 + 1] + Math.sin(time + i) * 0.004;
      array[i * 3 + 2] += velocities[i * 3 + 2];

      if (array[i * 3] > 20) array[i * 3] = -20;
      if (array[i * 3] < -20) array[i * 3] = 20;
      if (array[i * 3 + 1] > 16) array[i * 3 + 1] = -16;
      if (array[i * 3 + 1] < -16) array[i * 3 + 1] = 16;
      if (array[i * 3 + 2] > 20) array[i * 3 + 2] = -20;
      if (array[i * 3 + 2] < -20) array[i * 3 + 2] = 20;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.12}
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export interface HeroSceneProps {
  reducedMotion?: boolean;
}

export default function HeroScene({ reducedMotion }: HeroSceneProps) {
  return (
    <>
      <fog attach="fog" args={["#0a1420", 20, 50]} />

      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#168bff", "#0a1420", 0.28]} />
      <pointLight
        position={[10, 8, 8]}
        color="#FF791F"
        intensity={1.55}
        distance={46}
      />
      <pointLight
        position={[-10, 4, -10]}
        color="#168BFF"
        intensity={1.35}
        distance={46}
      />
      <pointLight
        position={[4, -6, 2]}
        color="#EF4148"
        intensity={0.45}
        distance={28}
      />
      <pointLight
        position={[0, 12, 0]}
        color="#F7F9FC"
        intensity={0.5}
        distance={34}
      />

      <CameraRig />

      <Stars
        radius={55}
        depth={40}
        count={190}
        factor={3}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.55}
      />

      <Island position={[-9.5, 2.2, -7]} scale={1.1} color={0x172b43} />
      <Island position={[10, 1.8, -9]} scale={1.05} color={0x101c2d} />
      <Island position={[-3, -2.4, -12]} scale={0.85} color={0x172b43} />

      <OrbitalCore position={[4.9, 0.2, -4.5]} />
      <Ring position={[0, 0.1, -8]} radius={8.6} />

      <Shard position={[-6.5, 3.4, -2]} color={0xff791f} />
      <Shard position={[8.2, 3.1, -5]} color={0x168bff} speed={0.8} />
      <Shard position={[-4.6, -1.2, 5]} color={0xff791f} speed={1.2} />
      <Shard position={[6.4, -2.6, -3]} color={0x168bff} speed={0.9} />
      <Shard position={[2.2, 4.6, -9]} color={0xef4148} speed={0.7} />

      <Particles count={170} />
    </>
  );
}

export function HeroCanvas({
  reducedMotion,
  frameloop = "always",
}: HeroSceneProps & { frameloop?: "always" | "demand" | "never" }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={frameloop}
      camera={{ position: [0, 2, 14], fov: 42 }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "block",
      }}
    >
      <HeroScene reducedMotion={reducedMotion} />
    </Canvas>
  );
}
