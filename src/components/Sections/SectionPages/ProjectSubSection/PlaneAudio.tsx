import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PlaneAudioProps {
  keys: { w: boolean; a: boolean; s: boolean; d: boolean; shift: boolean };
}

class AudioTrack {
  context: AudioContext;
  gainNode: GainNode;
  sourceNode: AudioBufferSourceNode | null = null;
  buffer: AudioBuffer | null = null;
  playing: boolean = false;

  constructor(context: AudioContext, buffer: AudioBuffer | null, initialVolume: number = 1) {
    this.context = context;
    this.buffer = buffer;
    this.gainNode = context.createGain();
    this.gainNode.gain.value = initialVolume;
    this.gainNode.connect(context.destination);
  }

  play() {
    if (this.playing || !this.buffer) return;
    this.sourceNode = this.context.createBufferSource();
    this.sourceNode.buffer = this.buffer;
    this.sourceNode.loop = true;
    this.sourceNode.connect(this.gainNode);
    this.sourceNode.start();
    this.playing = true;
  }

  pause() {
    if (!this.playing || !this.sourceNode) return;
    try {
      this.sourceNode.stop();
    } catch (e) {
      // Bỏ qua lỗi nếu node đã dừng
    }
    this.sourceNode.disconnect();
    this.sourceNode = null;
    this.playing = false;
  }

  get volume() {
    return this.gainNode.gain.value;
  }

  set volume(v: number) {
    this.gainNode.gain.value = v;
  }
}

const PlaneAudio: React.FC<PlaneAudioProps> = ({ keys }) => {
  const tracksRef = useRef<{
    idle: AudioTrack | null;
    accelerate: AudioTrack | null;
    environment: AudioTrack | null;
    context: AudioContext | null;
  }>({
    idle: null,
    accelerate: null,
    environment: null,
    context: null
  });

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    tracksRef.current.context = ctx;

    const loadBuffers = async () => {
      try {
        // Chuyển sang định dạng .ogg có sẵn trong thư mục vì .ogg loop mượt hơn .mp3 rất nhiều
        const [idleRes, accRes, envRes] = await Promise.all([
          fetch("/sounds/engine_idle.ogg"),
          fetch("/sounds/engine_high.ogg"),
          fetch("/sounds/environment_wind.mp3")
        ]);

        const [idleBuf, accBuf, envBuf] = await Promise.all([
          idleRes.arrayBuffer().then(b => ctx.decodeAudioData(b)),
          accRes.arrayBuffer().then(b => ctx.decodeAudioData(b)),
          envRes.arrayBuffer().then(b => ctx.decodeAudioData(b))
        ]);

        if (ctx.state === "closed") return;

        tracksRef.current.idle = new AudioTrack(ctx, idleBuf, 0.3);
        tracksRef.current.accelerate = new AudioTrack(ctx, accBuf, 0);
        tracksRef.current.environment = new AudioTrack(ctx, envBuf, 0.2);

        // Bắt đầu phát lập tức, track sẽ câm hoặc phát tùy vào initialVolume (gain)
        tracksRef.current.idle.play();
        tracksRef.current.accelerate.play();
        tracksRef.current.environment.play();
        
        setLoaded(true);
      } catch (err) {
        console.error("Lỗi khi tải âm thanh qua Web Audio API:", err);
      }
    };

    loadBuffers();

    // Context có thể bị suspend bởi trình duyệt do chưa có tương tác từ user
    const handleInteraction = () => {
      if (ctx.state === "suspended") {
        ctx.resume();
      }
    };
    
    window.addEventListener("click", handleInteraction);
    window.addEventListener("keydown", handleInteraction);

    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      if (tracksRef.current.idle) tracksRef.current.idle.pause();
      if (tracksRef.current.accelerate) tracksRef.current.accelerate.pause();
      if (tracksRef.current.environment) tracksRef.current.environment.pause();
      ctx.close();
    };
  }, []);

  useFrame(() => {
    if (!loaded) return;
    const { idle, accelerate } = tracksRef.current;
    
    // Tăng giá trị lên lớn hơn 0 để có hiệu ứng fade mềm mượt, thay vì 0 như file cũ (lerp factor = 0 thì không bao giờ thay đổi)
    const lerpFactor = 0.05; 

    if (keys.d) {
      // Đang tăng tốc
      if (accelerate) {
        accelerate.volume = THREE.MathUtils.lerp(accelerate.volume, 0.6, lerpFactor);
      }
      if (idle) {
        idle.volume = THREE.MathUtils.lerp(idle.volume, 0.1, lerpFactor);
      }
    } else {
      // Không tăng tốc
      if (accelerate) {
        accelerate.volume = THREE.MathUtils.lerp(accelerate.volume, 0, lerpFactor);
      }
      if (idle) {
        idle.volume = THREE.MathUtils.lerp(idle.volume, 0.3, lerpFactor);
      }
    }
  });

  return null;
};

export default PlaneAudio;