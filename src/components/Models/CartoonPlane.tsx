import React, { forwardRef, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CartoonPlaneProps {
  keys?: { w: boolean; a: boolean; s: boolean; d: boolean };
  onModelLoaded?: () => void;
}

const CartoonPlane = forwardRef<THREE.Group, CartoonPlaneProps>((props, ref) => {
  // 1. Load model
  const { scene, animations } = useGLTF("/3dmodels/SimplePlane.glb");
  const notifiedLoadedRef = useRef(false);
  
  // 2. Thiết lập Animations
  const { actions } = useAnimations(animations, ref as React.MutableRefObject<THREE.Group>);
  
  // Tạo một ref nội bộ để giữ Group xoay hướng model gốc
  const modelOffsetRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (scene && props.onModelLoaded && !notifiedLoadedRef.current) {
      notifiedLoadedRef.current = true;
      props.onModelLoaded();
    }
  }, [scene, props.onModelLoaded]);

  // Chạy animation nền (ví dụ: cánh quạt)
  useEffect(() => {
    if (actions && animations.length > 0) {
      const firstAction = actions[animations[0].name];
      if (firstAction) {
        firstAction.play();
      }
    }
  }, [actions, animations]);

  // 3. Logic điều khiển & Nghiêng (Tilt) - Chạy 60 frame/s
  useFrame(() => {
    if (!ref || !("current" in ref) || !ref.current) return;
 
    const planeGroup = ref.current; // Group tổng (dùng để di chuyển vị trí)
    const keys = props.keys ?? { w: false, a: false, s: false, d: false };
 
    // --- NEW: Physics-based movement ---
    // Khởi tạo velocity nếu chưa có
    if (!planeGroup.userData.velocity) {
      planeGroup.userData.velocity = new THREE.Vector3();
    }
    const velocity = planeGroup.userData.velocity as THREE.Vector3;
 
    // Cấu hình vật lý
    const acceleration = 0.015; // Giảm gia tốc để cảm giác "đầm" hơn
    const damping = 0.93; // Lực cản, càng gần 1 càng trôi xa
    const maxSpeed = 0.22; // Giảm tốc độ tối đa
    const tiltSpeed = 0.07;
    const maxTilt = 0.4;
 
    // --- A. Cập nhật Velocity dựa trên phím bấm ---
    if (keys.w) velocity.y += acceleration;
    if (keys.s) velocity.y -= acceleration;
    if (keys.a) velocity.x -= acceleration;
    if (keys.d) velocity.x += acceleration;
 
    // --- B. Áp dụng lực cản (Damping) để tạo quán tính ---
    velocity.multiplyScalar(damping);
 
    // Giới hạn tốc độ tối đa
    if (velocity.length() > maxSpeed) {
      velocity.setLength(maxSpeed);
    }
 
    // --- C. Cập nhật vị trí & giới hạn vùng bay ---
    planeGroup.position.add(velocity);
    // Giới hạn X và Y sẽ được quản lý bởi logic game trong scene chính để phù hợp với kích thước thế giới.
 
    // --- D. Cập nhật góc nghiêng (Rotation) dựa trên Velocity ---
    // 1. Nghiêng mũi Lên/Xuống (Pitch) theo tốc độ dọc
    const targetRotationZ = velocity.y * 2.5; // Đã sửa: dương để mũi hướng lên khi bay lên (W)
    planeGroup.rotation.z = THREE.MathUtils.lerp(planeGroup.rotation.z, THREE.MathUtils.clamp(targetRotationZ, -maxTilt, maxTilt), tiltSpeed);
 
    // 2. Nghiêng cánh (Roll) theo tốc độ ngang
    const targetRotationX = velocity.x * 1.5; // Đã sửa: Đảo dấu để chiều nghiêng đúng với hướng di chuyển A/D
    planeGroup.rotation.x = THREE.MathUtils.lerp(planeGroup.rotation.x, THREE.MathUtils.clamp(targetRotationX, -maxTilt, maxTilt), tiltSpeed);
  });
 
  return (
    // Group ngoài cùng (Ref chính): Dùng để di chuyển Position XY và xử lý logic xoay nghiêng (Rotation)
    <group ref={ref} {...props} dispose={null}>
      
      {/* Group nội bộ: CHỈ DÙNG ĐỂ ĐIỀU CHỈNH HƯỚNG GỐC CỦA MODEL */}
      <group 
        ref={modelOffsetRef} 
        // XOAY 90 ĐỘ TRÊN TRỤC Y: Để mũi máy bay hướng sang phải (+X) thay vì chĩa vào màn hình (-Z)
        rotation={[0, Math.PI / 2, 0]} 
        
        // Có thể cần điều chỉnh Scale nếu model quá to/nhỏ
        scale={0.3} 
      >
        {/* Reset position, rotation, scale to default in case another component (like SimplePlane) mutated the cached scene */}
        <primitive object={scene} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={[1, 1, 1]} />
      </group>

    </group>
  );
});

// Preload model
useGLTF.preload("/3dmodels/SimplePlane.glb");

export default CartoonPlane;