"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Decal } from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "../store";

interface MugProps {
  scale?: number;
  position?: [number, number, number];
  dispose?: null;
}

export function Mug(props: MugProps) {
  const snap = useSnapshot(state);
  const texture = useTexture(`/${snap.decal}.png`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF("/mug.glb") as any;

  // Set all materials to white
  useFrame((_, delta) => {
    if (materials && materials["01___Default"]) {
      easing.dampC(materials["01___Default"].color, "#ffffff", 0.25, delta);
    }
    if (materials && materials["01___Default-2"]) {
      easing.dampC(materials["01___Default-2"].color, "#ffffff", 0.25, delta);
    }
    if (materials && materials["02___Default"]) {
      easing.dampC(materials["02___Default"].color, "#ffffff", 0.25, delta);
    }
    if (materials && materials["02___Default-2"]) {
      easing.dampC(materials["02___Default-2"].color, "#ffffff", 0.25, delta);
    }
  });

  return (
    <group {...props} scale={0.1} position={[0, -0.5, 0]} dispose={null}>
      {/* Main mug body */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arc001_1?.geometry}
        material={materials["01___Default-2"]}
      />

      {/* Mug handle and other parts */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arc001_1_1?.geometry}
        material={materials["02___Default-2"]}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arc001_1_2?.geometry}
        material={materials["02___Default"]}
      />

      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Arc001_1_3?.geometry}
        material={materials["01___Default"]}
      />

      {/* Decal surface */}
      <mesh geometry={nodes.Arc001_1_4?.geometry}>
        <meshBasicMaterial transparent opacity={0} />
        <Decal
          position={[0, 1.8, 1]}
          rotation={[0, 0, 0]}
          scale={[1.5, 1.5, 1.5]}
        >
          <meshStandardMaterial
            map={texture}
            toneMapped={false}
            transparent
            polygonOffset
            polygonOffsetFactor={-1}
          />
        </Decal>
      </mesh>
    </group>
  );
}

// Preload the mug model
useGLTF.preload("/mug.glb");
// Preload textures
["/react.png", "/three2.png", "/pmndrs.png"].forEach(useTexture.preload);
