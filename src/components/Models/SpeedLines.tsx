import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpeedLinesProps {
  keys: { w: boolean; a: boolean; s: boolean; d: boolean };
}

const SpeedLines: React.FC<SpeedLinesProps> = ({ keys }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const speedLinesDataRef = useRef<
    Array<{
      x: number;
      y: number;
      z: number;
      velocity: number;
    }>
  >([]);

  const SPEED_LINES_COUNT = 5;
  const BASE_SPEED = 0.1;
  const MAX_SPEED = 0.5;

  // Tạo dữ liệu cho các speed lines
  useMemo(() => {
    const data = [];
    for (let i = 0; i < SPEED_LINES_COUNT; i++) {
      data.push({
        x: Math.random() * 80 - 40, // Vị trí X ngẫu nhiên
        y: Math.random() * 20 - 10, // Vị trí Y ngẫu nhiên
        z: Math.random() * 80 - 40, // Vị trí Z (xa hơn máy bay)
        velocity: BASE_SPEED,
      });
    }
    speedLinesDataRef.current = data;
  }, []);

  useFrame(() => {
    if (!meshRef.current) return;

    // Tính tốc độ dựa trên phím D
    const currentSpeed = keys.d
      ? BASE_SPEED + (MAX_SPEED - BASE_SPEED) * 0.8 // Khi D: nhanh
      : BASE_SPEED * 0.5; // Khi không D: chậm hoặc dừng

    const data = speedLinesDataRef.current;

    data.forEach((line, index) => {
      // Cập nhật vị trí: trôi từ phải sang trái (X giảm)
      line.x -= currentSpeed;

      // Reset về phía phải khi vượt qua phía trái
      if (line.x < -50) {
        line.x = 50;
        line.y = Math.random() * 20 - 10;
        line.z = Math.random() * 80 - 40;
      }

      // Cập nhật matrix position
      const matrix = new THREE.Matrix4();
      matrix.setPosition(line.x, line.y, line.z);

      meshRef.current?.setMatrixAt(index, matrix);
    });

    // Cập nhật instance buffer
    if (meshRef.current?.instanceMatrix) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  // Tính độ opacity dựa trên tốc độ - mờ dần khi D không được ấn
  const opacity = keys.d ? 0.5 : 0.2;

  return (
    <instancedMesh
      ref={meshRef}
      args={[
        new THREE.BoxGeometry(25, 0.2, 0.15), // Dài (X), mỏng (Y), mỏng (Z)
        new THREE.MeshStandardMaterial({
          color: 0x6366f1, // Màu indigo
          emissive: 0x818cf8, // Glow
          toneMapped: false,
          transparent: true,
          opacity: opacity,
          wireframe: false,
          depthTest: true,
        }),
        SPEED_LINES_COUNT,
      ]}
    />
  );
};

export default SpeedLines;
