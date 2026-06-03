import React, { useRef } from "react";
import { useTexture, Text } from "@react-three/drei"; // Import thêm Text
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ProjectBoxProps {
  position: [number, number, number];
  projectId: string;
  title: string;
  isHovered: boolean;
  imgUrl?: string;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
  position,
  title, // Sử dụng title để hiển thị văn bản
  isHovered,
  imgUrl = "/projects/default.png", 
}) => {
  const texture = useTexture(imgUrl);
  const enterIcon = useTexture("/UI/icons/enter1.png");

  const mainPlaneRef = useRef<THREE.Mesh>(null);
  const indicatorRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<any>(null); // Ref cho văn bản

  useFrame((state) => {
    if (!mainPlaneRef.current || !indicatorRef.current) return;

    // --- Hiệu ứng cho Plane chính ---
    const targetScale = isHovered ? 1.75 : 1.5;
    const targetOpacity = isHovered ? 1 : 0.8;
    mainPlaneRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    
    const mainMat = mainPlaneRef.current.material as THREE.MeshStandardMaterial;
    mainMat.opacity = THREE.MathUtils.lerp(mainMat.opacity, targetOpacity, 0.5);

    // --- Hiệu ứng cho Indicator (Icon Enter) ---
    const indicatorMat = indicatorRef.current.material as THREE.MeshBasicMaterial;
    indicatorMat.opacity = THREE.MathUtils.lerp(indicatorMat.opacity, isHovered ? 1 : 0, 0.1);

    //icon scale và bobbing nhẹ khi hover
    const targetIndicatorScale = isHovered ? 2.5 : 2.2;
    indicatorRef.current.scale.lerp(new THREE.Vector3(targetIndicatorScale, targetIndicatorScale, 1), 0.1);

    if (isHovered) {
      indicatorRef.current.position.y = 1.8 + Math.sin(state.clock.elapsedTime * 4) * 0.1;
    }

    // --- Hiệu ứng cho Text ---
    if (textRef.current) {
      // Lerp opacity cho text (fillOpacity)
      const targetTextOpacity = isHovered ? 1 : 0;
      textRef.current.fillOpacity = THREE.MathUtils.lerp(textRef.current.fillOpacity, targetTextOpacity, 0.1);
      
      // Hiệu ứng dịch chuyển nhẹ từ dưới lên khi hiện ra
      const targetTextY = isHovered ? -1.5 : -3; // Vị trí khoảng -2/3 hoặc thấp hơn tùy scale
      textRef.current.position.y = THREE.MathUtils.lerp(textRef.current.position.y, targetTextY, 0.1);
    }
  });

  return (
    <group position={position}>
      {/* 1. PLANE CHÍNH */}
      <mesh ref={mainPlaneRef} castShadow receiveShadow>
        <planeGeometry args={[5, 3]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true} 
          opacity={0} 
          side={THREE.DoubleSide}
          depthWrite={true} 
        />
      </mesh>

      {/* 2. INDICATOR PLANE */}
      <mesh 
        ref={indicatorRef} 
        position={[2.8, 1.8, 0.05]} 
      >
        <planeGeometry args={[1.8, 0.7]} />
        <meshBasicMaterial 
          map={enterIcon} 
          transparent={true} 
          opacity={0} 
        />
      </mesh>

      {/* 3. TEXT HIỂN THỊ KHI HOVER */}
<Text
  ref={textRef}
  position={[-0.7, -5, 0.1]} 
  color={THREE.RedFormat}
  fontSize={0.4}
  maxWidth={8} // Giới hạn độ rộng để text tự xuống dòng nếu title quá dài
  textAlign="center"
  anchorY="top" 
  fillOpacity={0}
>
  {title}
</Text>

      {/* 4. GLOW EFFECT */}
      {isHovered && (
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[5.4, 3.4]} />
          <meshBasicMaterial color="#fdfdfd" transparent opacity={0} 
                    alphaTest={0.01}
          depthWrite={false}
          toneMapped={false}/> 
        </mesh>
      )}
    </group>
  );
};

export default ProjectBox;