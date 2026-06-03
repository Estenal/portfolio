import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CloudLayersProps {
  keys: { w: boolean; a: boolean; s: boolean; d: boolean };
  offsetX: number;
  offsetY: number;
}

const CloudLayers: React.FC<CloudLayersProps> = ({ keys, offsetX, offsetY }) => {
  const [layer0Texture, setLayer0Texture] = useState<THREE.Texture | null>(null);

  const layer0Ref = useRef<THREE.Mesh>(null);

  // Tốc độ di chuyển cùng thế giới (parallax speed)
  // Ví dụ: 0.6x nghĩa là mây sẽ trượt theo thế giới nhưng chậm hơn thế giới một chút (60%)
  const WORLD_PARALLAX_SPEED = 0.1;

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/UI/clouds/layer3.png', (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      // Pre-scale texture to prevent stretching if the aspect ratio differs from the plane
      // but since it's meant to repeat, we leave repeat at [1, 1] initially
      setLayer0Texture(texture);
    });
  }, []);

  useFrame((_state, delta) => {
    // layer0: slides right to left slightly on its own
    let layer0Speed = 0.01 * delta; 

    // d: fly forward -> slides faster leftwards
    if (keys.d) {
      layer0Speed += 0.05 * delta;
    }
    // a: fly backward -> slides slower or backwards
    if (keys.a) {
      layer0Speed -= 0.04 * delta; 
    }

    if (layer0Ref.current && layer0Texture) {
      layer0Texture.offset.x += layer0Speed;
    }
  });

  return (
    // Vị trí y gốc là -15, cộng thêm offset di chuyển theo thế giới với tỷ lệ WORLD_PARALLAX_SPEED
    <group position={[offsetX * WORLD_PARALLAX_SPEED + 25, -15 + (offsetY * WORLD_PARALLAX_SPEED), 4]}>
      {/* Layer 0 (Foreground) */}
      {layer0Texture && (
        <mesh ref={layer0Ref} position={[0, 0, 2]}>
          <planeGeometry args={[150, 16]} />
          <meshBasicMaterial map={layer0Texture} transparent={true} color="#fdfdfd"
                    alphaTest={0.01}
          depthWrite={false}
          toneMapped={false}/>

        </mesh>
      )}
    </group>
  );
};

export default CloudLayers;
