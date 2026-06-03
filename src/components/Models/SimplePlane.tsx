import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useRef } from "react";
import * as THREE from "three";

const SimplePlane = forwardRef<THREE.Group, any>((props, ref) => {
  const { scene, animations } = useGLTF("/3dmodels/SimplePlane.glb");
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionRef = useRef<THREE.AnimationAction | null>(null);

  useEffect(() => {
    if (!scene || !animations || animations.length === 0) return;

    mixerRef.current = new THREE.AnimationMixer(scene);

    if (animations[0]) {
      actionRef.current = mixerRef.current.clipAction(animations[0]);
      actionRef.current.loop = THREE.LoopRepeat;
      actionRef.current.timeScale = 0.2; // Tăng tốc độ quay của cánh quạt
      actionRef.current.clampWhenFinished = false;
      actionRef.current.play();
    }

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
        mixerRef.current.uncacheRoot(scene);
      }
    };
  }, [scene, animations]);

  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    if (ref && typeof ref !== "function" && ref.current) {
      const rotationSpeed = 0.2; // Tốc độ xoay
      const rotationAmplitude = Math.PI / 8; // Biên độ xoay (ví dụ: 22.5 độ)
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * rotationSpeed) * rotationAmplitude;
    }
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      {...props}
      scale={[0.25, 0.25, 0.25]}
      rotation={[0, -Math.PI / 4, 0]}
      position={[0, 0, -1]}
    />
  );
});

useGLTF.preload("/3dmodels/SimplePlane.glb");

export default SimplePlane;
