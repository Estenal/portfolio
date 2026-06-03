import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Sparkles, Stars } from "@react-three/drei"; //thêm tí màu tí mè
import CartoonPlane from "../../Models/CartoonPlane";
import ProjectBox from "../../Models/ProjectBox";
import ProjectDetail from "./ProjectSubSection/ProjectDetail";
import InstructionPlane from "../../Models/InstructionPlane";
import CloudLayers from "../../Models/CloudLayers";
import FlightSettings from "./ProjectSubSection/FlightSettings";
import ProjectInfo from "./ProjectSubSection/ProjectInfo";
import PlaneAudio from "./ProjectSubSection/PlaneAudio";
import { projects } from "../../../models/Project";
import * as THREE from "three";
import { playPopSound } from "../../common/playUiSound";
import Loader from "../Layout/Loader";

const CinematicCamera = ({ planeRef }: { planeRef: React.RefObject<THREE.Group> }) => {
  const cameraDamping = 0.1;

  useFrame(({ camera }) => {
    if (!planeRef.current) return;

    const plane = planeRef.current;
    const planeVelocity = (plane.userData.velocity || new THREE.Vector3()) as THREE.Vector3;

    // --- 1. Camera Position Damping (Lag) ---
    // Camera sẽ mượt mà đi theo vị trí của máy bay
    const targetPosition = new THREE.Vector3(
      plane.position.x,
      plane.position.y,
      camera.position.z // Giữ nguyên khoảng cách Z
    );
    camera.position.lerp(targetPosition, cameraDamping);

    // --- 2. Camera LookAt ---
    // Camera nhìn vào một điểm hơi phía trước máy bay theo hướng di chuyển
    const lookAtTarget = new THREE.Vector3().copy(plane.position);
    lookAtTarget.x += planeVelocity.x * 5; // Nhìn về phía trước theo chiều ngang
    lookAtTarget.y += planeVelocity.y * 5; // Nhìn về phía trước theo chiều dọc
    camera.lookAt(lookAtTarget);

    // --- 3. Dynamic FOV ---
    // FOV (góc nhìn) thay đổi dựa trên tốc độ ngang của máy bay để tạo cảm giác "tăng tốc"
    const horizontalSpeed = Math.abs(planeVelocity.x);
    const targetFov = 40 + horizontalSpeed * 30; // Tăng FOV lên tối đa 40 + 0.3*30 = 49
    const perspCamera = camera as THREE.PerspectiveCamera;
    if (Math.abs(perspCamera.fov - targetFov) > 0.1) {
      perspCamera.fov = THREE.MathUtils.lerp(perspCamera.fov, targetFov, 0.01);
      perspCamera.updateProjectionMatrix();
    }

    // --- 4. Camera Roll ---
    // Camera nghiêng nhẹ theo hướng máy bay nghiêng để tăng cảm giác "nhập vai"
    const targetRoll = plane.rotation.x * 0.4; // Nghiêng bằng 40% độ nghiêng của máy bay
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRoll, 0.1);
  });
  return null;
};

/**
 * Component này quản lý logic "game" chính trong mỗi frame:
 * 1. Giới hạn vùng bay của máy bay trong không gian thế giới.
 * 2. Kiểm tra khoảng cách giữa máy bay và các project box (đứng yên) để xác định trạng thái hover.
 */
interface GameLogicProps {
  planeRef: React.RefObject<THREE.Group>;
  projectPositions: { [key: string]: [number, number, number] };
  activeProjectIds: Set<string>;
  setHoveredProjectId: React.Dispatch<React.SetStateAction<string | null>>;
  worldBounds: { x: [number, number]; y: [number, number] };
}

const GameLogic = ({
  planeRef,
  projectPositions,
  activeProjectIds,
  setHoveredProjectId,
  worldBounds,
}: GameLogicProps) => {
  const v1 = useRef(new THREE.Vector3()).current;
  const v2 = useRef(new THREE.Vector3()).current;

  useFrame(() => {
    if (!planeRef.current) return;
    const plane = planeRef.current;

    // 1. Giới hạn vị trí của máy bay trong thế giới
    plane.position.x = THREE.MathUtils.clamp(
      plane.position.x,
      worldBounds.x[0],
      worldBounds.x[1]
    );
    plane.position.y = THREE.MathUtils.clamp(
      plane.position.y,
      worldBounds.y[0],
      worldBounds.y[1]
    );

    // 2. Kiểm tra hover bằng tọa độ tuyệt đối
    v1.copy(plane.position);
      let nearestProjectId = null;
    let minDistance = 6; // Khoản cách hover

      for (const projectId in projectPositions) {
        if (!activeProjectIds.has(projectId)) continue;
        const pos = projectPositions[projectId];

      v2.set(pos[0], pos[1], pos[2]); // Tọa độ thế giới tĩnh

        const distance = v1.distanceTo(v2);

        if (distance < minDistance) {
          minDistance = distance;
          nearestProjectId = projectId;
        }
      }

      setHoveredProjectId((prev) =>
        prev !== nearestProjectId ? nearestProjectId : prev
      );
  });
  return null;
};


interface ProjectsProps {
  onReady?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onReady }) => {
  const readyNotifiedRef = useRef(false);
  // 1. Quản lý trạng thái bàn phím
  const [keys, setKeys] = useState({ w: false, a: false, s: false, d: false, shift: false });
  const planeRef = useRef<THREE.Group>(null!);

  // 2. Quản lý dự án được chọn
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // 4. Cài đặt bay
  const [flightSpeed, setFlightSpeed] = useState(1);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRerendering, setIsRerendering] = useState(false);

  const projectTypes = useMemo(() => {
    return Array.from(new Set(projects.map((p) => p.type))).filter(Boolean);
  }, []);

  const [enabledTypes, setEnabledTypes] = useState<Set<string>>(() => new Set(projectTypes));

  const activeProjectIds = useMemo(() => {
    return new Set(projects.filter((p) => enabledTypes.has(p.type)).map((p) => p.id));
  }, [enabledTypes]);

  const { projectPositions, worldBounds } = useMemo(() => {
    const positions: { [key: string]: [number, number, number] } = {};
    const activeProjects = projects.filter(p => activeProjectIds.has(p.id)).reverse();

    if (activeProjects.length === 0) {
      return { 
        projectPositions: {}, 
        worldBounds: { x: [-5, 5] as [number, number], y: [-3, 3] as [number, number] } 
      };
    }

    activeProjects.forEach((project, index) => {
      const x = 15 + index * 15; // Tăng khoảng cách giữa các dự án
      const y = -5 + (index % 2) * 8;
      positions[project.id] = [x, y, -1 - index * 0.1] as [number, number, number];
    });

    const xValues = Object.values(positions).map(p => p[0]);
    const yValues = Object.values(positions).map(p => p[1]);
    const bounds: { x: [number, number]; y: [number, number] } = {
      x: [Math.min(...xValues) - 10, Math.max(...xValues) + 10] as [number, number],
      // Làm cho ranh giới Y linh hoạt theo vị trí các dự án
      y: [Math.min(...yValues) - 5, Math.max(...yValues) + 5] as [number, number]
    };

    return { projectPositions: positions, worldBounds: bounds };
  }, [activeProjectIds]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "enter") {
        if (hoveredProjectId) {
          // Tìm project từ model
          const project = projects.find((p) => p.id === hoveredProjectId);
          if (project) {
            setSelectedProjectId(hoveredProjectId);
            playPopSound();
            setShowProjectDetail(true);
          }
        }
        return;
      }
      if (key in keys) setKeys((prev) => ({ ...prev, [key]: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in keys) setKeys((prev) => ({ ...prev, [key]: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys, hoveredProjectId]);

  useEffect(() => {
    // Nếu filter khiến hovered bị ẩn -> reset
    if (hoveredProjectId && !activeProjectIds.has(hoveredProjectId)) {
      setHoveredProjectId(null);
    }
  }, [activeProjectIds, hoveredProjectId]);

  const [canvasReady, setCanvasReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (canvasReady && modelReady && !readyNotifiedRef.current) {
      readyNotifiedRef.current = true;
      onReady?.();
    }
  }, [canvasReady, modelReady, onReady]);

  const applyFilterWithLoader = (next: Set<string>) => {
    setEnabledTypes(next);
    setHoveredProjectId(null);
    setSelectedProjectId(null);
    setShowProjectDetail(false);
    setIsRerendering(true);
    window.setTimeout(() => setIsRerendering(false), 250);
  };

  return (
    <section className="w-full h-full">
      {/* CANVAS - 3D SPACE sky gradient*/}
      <div className="w-full h-full relative bg-gradient-to-b from-blue-300 to-indigo-500 overflow-hidden">
        <img
          src="/UI/clouds/layer2.png"
          alt="Background Gradient"
          className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
        />
        {/* Decorative Sparkles Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-screen opacity-20 blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-400 rounded-full mix-blend-screen opacity-15 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />

          {/* Floating particles SVG */}
          <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Animated star particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <g key={i}>
                <circle
                  cx={`${(i * 67 + 13) % 100}%`}
                  cy={`${(i * 43 + 7) % 100}%`}
                  r={`${1 + (i % 3)}px`}
                  fill="white"
                  filter="url(#glow)"
                  opacity={0.6}
                  style={{
                    animation: `twinkle ${2 + (i % 3)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              </g>
            ))}

            {/* Flowing lines */}
            <polyline
              points="0,0 100,50 200,30 300,70 400,40"
              stroke="rgba(139, 92, 246, 0.3)"
              strokeWidth="2"
              fill="none"
              style={{
                animation: "flowLine 8s ease-in-out infinite",
              }}
            />
          </svg>
        </div>

        <Canvas
          key="projects-unique-canvas"
          performance={{ min: 0.1, max: 0.5 }} //giảm lag trên máy yếu, cartoon style không cần render quá mượt
          camera={{ position: [0, 5, 20], fov: 40 }}
          dpr={[1, 2]} // Giới hạn pixel ratio để mượt hơn trên màn hình 4K
          onCreated={() => setCanvasReady(true)}
        >
          <Suspense fallback={null}>
            <CinematicCamera planeRef={planeRef} />
            <PlaneAudio keys={keys} />  
            <ambientLight intensity={1.5} />
            <directionalLight position={[5, 10, 10]} intensity={0.5} />

            {/* Cloud layers để tạo chiều sâu */}
            <CloudLayers
              keys={keys} offsetX={0} offsetY={0} />
            <CartoonPlane ref={planeRef} keys={keys} onModelLoaded={() => setModelReady(true)} />

            
              <Sparkles count={100} size={16} speed={0.4} opacity={0.5} scale={[100, 50, 100]} position={[0, 0, -5]} color="#ffffff" />
              <Sparkles count={100} size={24} speed={0.2} opacity={0.6} scale={[50, 30, 50]} position={[20, -2, -10]} color="#fbfbfb" />
              <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
              

            {/* Instruction Plane - Static guide image */}
            <InstructionPlane
              position={[2, 0, -10]}
              scale={[25, 12, 1]}
              imageUrl="/UI/icons/help.png"
            />

            {/* Component quản lý logic game trong mỗi frame */}
            <GameLogic
              planeRef={planeRef}
              projectPositions={projectPositions}
              activeProjectIds={activeProjectIds}
              setHoveredProjectId={setHoveredProjectId}
              worldBounds={worldBounds}
            />

            {/* Render Project Boxes với tọa độ thế giới tuyệt đối */}
            {Object.entries(projectPositions).map(([projectId, position]) => {
              if (!activeProjectIds.has(projectId)) return null;
              const isActive = hoveredProjectId === projectId;
              const project = projects.find((p) => p.id === projectId);

              return (
                <ProjectBox
                  key={projectId}
                  projectId={projectId}
                  title={project?.title || `Project ${projectId}`}
                  position={position as [number, number, number]}
                  imgUrl={`/projects/ProjectBox.png`}
                  isHovered={isActive}
                />
              );
            })}

            <Environment preset="forest" />
          </Suspense>
        </Canvas>

        {/* Flight Settings Panel */}
        <FlightSettings
          speed={flightSpeed}
          onSpeedChange={setFlightSpeed}
          isOpen={isSettingsOpen}
          onToggle={() => setIsSettingsOpen(!isSettingsOpen)}
          filter={{
            types: projectTypes,
            enabledTypes,
            onToggleType: (t) => {
              const next = new Set(enabledTypes);
              if (next.has(t)) next.delete(t);
              else next.add(t);
              applyFilterWithLoader(next);
            },
            onSelectAll: () => applyFilterWithLoader(new Set(projectTypes)),
            onClearAll: () => applyFilterWithLoader(new Set()),
          }}
        />

        {/* Project Info Overlay */}
        <ProjectInfo
          projectId={hoveredProjectId}
          onOpenDetail={() => {
            if (!hoveredProjectId) return;
            setSelectedProjectId(hoveredProjectId);
            setShowProjectDetail(true);
            playPopSound();
          }}
        />

        {isRerendering && (
          <div className="absolute inset-0 z-[500] flex items-center justify-center bg-slate-900/20 backdrop-blur-sm">
            <Loader />
          </div>
        )}
      </div>

      {/* Project Detail Modal */}
      <ProjectDetail
        projectId={selectedProjectId}
        isVisible={showProjectDetail}
        onClose={() => setShowProjectDetail(false)}
        onSelectProject={setSelectedProjectId}
      />

      {/* Global Animations */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes flowLine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            transform: translateX(100vw);
            opacity: 0;
          }
        }

        /* Smooth hover effect for UI elements */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        /* Pulse effect */
        @keyframes softPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;