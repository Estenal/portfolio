import React from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

interface InstructionPlaneProps {
  imageUrl: string;
  position?: [number, number, number];
  scale?: [number, number, number];
}

const InstructionPlane: React.FC<InstructionPlaneProps> = ({
  imageUrl,
  position = [0, 0, -5],
  scale = [8, 8, 1],
}) => {
  const texture = useTexture(imageUrl);

  return (
    <mesh position={position} scale={scale}>
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        toneMapped={false}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default InstructionPlane;
