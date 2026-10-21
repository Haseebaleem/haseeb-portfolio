import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Network() {
  const g = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!g.current || reduce) return;
    g.current.rotation.y += delta * 0.2;
    g.current.rotation.x += (state.pointer.y * 0.5 - g.current.rotation.x) * 0.05;
  });
  return (
    <group ref={g}>
      <mesh>
        <icosahedronGeometry args={[1.7, 2]} />
        <meshBasicMaterial color="#2f5bea" wireframe />
      </mesh>
      <points>
        <icosahedronGeometry args={[1.7, 2]} />
        <pointsMaterial color="#db2777" size={0.07} />
      </points>
      <mesh>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#7c3aed" wireframe />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas camera={{ position: [0, 0, 5.2], fov: 45 }} dpr={[1, 1.5]}>
      <Network />
    </Canvas>
  );
}
