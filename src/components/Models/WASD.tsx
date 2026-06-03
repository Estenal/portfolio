import { useTexture } from "@react-three/drei";
import React, { useRef } from "react";
import * as THREE from "three";


const WASD: React.FC = ({
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const WASDIcon = useTexture("/icons/help.png");

  return (
    <mesh
      ref={meshRef}
      position={[0,0,0]}
      castShadow
      receiveShadow
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial map={WASDIcon} />
    </mesh>
  );
};

export default WASD;
