import { useState, useCallback, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface UseEvasiveButtonOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  buttonRef: React.RefObject<HTMLElement | null>;
  enabled: boolean;
}

export function useEvasiveButton({ containerRef, buttonRef, enabled }: UseEvasiveButtonOptions) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const isEvading = useRef(false);

  const calculateSafePosition = useCallback((): Position => {
    if (!containerRef.current || !buttonRef.current) {
      return { x: 0, y: 0 };
    }

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    // Calculate safe bounds (keep button within container with padding)
    const padding = 20;
    const maxX = container.width - button.width - padding * 2;
    const maxY = container.height - button.height - padding * 2;

    // Generate random position within safe bounds
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;

    return { x: newX, y: newY };
  }, [containerRef, buttonRef]);

  const evade = useCallback(() => {
    if (!enabled || isEvading.current) return;

    isEvading.current = true;

    // Move to new position
    const newPosition = calculateSafePosition();
    setPosition(newPosition);

    // Briefly shrink the button
    setScale(0.8);
    setTimeout(() => {
      setScale(1);
      isEvading.current = false;
    }, 200);
  }, [enabled, calculateSafePosition]);

  // Reset position when disabled
  useEffect(() => {
    if (!enabled) {
      setPosition({ x: 0, y: 0 });
      setScale(1);
      isEvading.current = false;
    }
  }, [enabled]);

  return {
    position,
    scale,
    evade
  };
}
