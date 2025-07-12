"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  AccumulativeShadows,
  RandomizedLight,
  Environment,
  Center,
} from "@react-three/drei";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { state } from "../store";
import { Mug } from "./Mug";
import * as THREE from "three";

export const CanvasComponent = ({
  position = [0, 0, 2.5] as [number, number, number],
  fov = 25,
}) => (
  <Canvas
    shadows
    camera={{ position, fov }}
    gl={{ preserveDrawingBuffer: true }}
    className="canvas"
  >
    <ambientLight intensity={0.5 * Math.PI} />
    <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/potsdamer_platz_1k.hdr" />
    <CameraRig>
      <Backdrop />
      <Center>
        <Mug />
      </Center>
    </CameraRig>
  </Canvas>
);

function Backdrop() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shadows = useRef<any>(null);
  const snap = useSnapshot(state);
  useFrame((_, delta) => {
    if (shadows.current) {
      easing.dampC(
        shadows.current.getMesh().material.color,
        snap.color,
        0.25,
        delta
      );
    }
  });
  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={5}
      resolution={2048}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={4}
        radius={9}
        intensity={0.55 * Math.PI}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={4}
        radius={5}
        intensity={0.25 * Math.PI}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null!);
  const snap = useSnapshot(state);
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [snap.intro ? -state.viewport.width / 4 : 0, 0, 2],
      0.25,
      delta
    );
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

useGLTF.preload("/mug.glb");
["/react.png", "/three2.png", "/pmndrs.png"].forEach(useTexture.preload);
