import React, { useEffect, useState } from "react";

type KeyState = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

interface WASDOverlayProps {
  onChange?: (keys: KeyState) => void;
}

const WASDOverlay: React.FC<WASDOverlayProps> = ({ onChange }) => {
  const [keys, setKeys] = useState<KeyState>({
    w: false,
    a: false,
    s: false,
    d: false,
  });

  const updateKey = (key: keyof KeyState, pressed: boolean) => {
    setKeys((prev) => {
      const updated = {
        ...prev,
        [key]: pressed,
      };

      onChange?.(updated);
      return updated;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (["w", "a", "s", "d"].includes(key)) {
        updateKey(key as keyof KeyState, true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();

      if (["w", "a", "s", "d"].includes(key)) {
        updateKey(key as keyof KeyState, false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const buttonStyle = (active: boolean) =>
    `
    w-16 h-16
    rounded-2xl
    border border-white/20
    backdrop-blur-md
    transition-all duration-100
    flex items-center justify-center
    text-white font-black text-xl
    select-none
    shadow-xl
    ${
      active
        ? "bg-sky-400 scale-95 shadow-sky-400/50"
        : "bg-white/10 hover:bg-white/20"
    }
  `;

  const bindTouch = (key: keyof KeyState) => ({
    onMouseDown: () => updateKey(key, true),
    onMouseUp: () => updateKey(key, false),
    onMouseLeave: () => updateKey(key, false),

    onTouchStart: (e: React.TouchEvent) => {
      e.preventDefault();
      updateKey(key, true);
    },

    onTouchEnd: () => updateKey(key, false),
  });

  return (
    <div className="fixed bottom-8 left-8 z-[9999] flex flex-col gap-3">
      <div className="flex justify-center">
        <button className={buttonStyle(keys.w)} {...bindTouch("w")}>
          W
        </button>
      </div>

      <div className="flex gap-3">
        <button className={buttonStyle(keys.a)} {...bindTouch("a")}>
          A
        </button>

        <button className={buttonStyle(keys.s)} {...bindTouch("s")}>
          S
        </button>

        <button className={buttonStyle(keys.d)} {...bindTouch("d")}>
          D
        </button>
      </div>
    </div>
  );
};

export default WASDOverlay;