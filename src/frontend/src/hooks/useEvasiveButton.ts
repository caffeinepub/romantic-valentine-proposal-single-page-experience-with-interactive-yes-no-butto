import { useState, useCallback, useRef, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

interface BoundingBox {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

interface UseEvasiveButtonOptions {
  containerRef: React.RefObject<HTMLElement | null>;
  buttonRef: React.RefObject<HTMLElement | null>;
  obstacleRefs?: React.RefObject<HTMLElement | null>[];
  enabled: boolean;
  minSeparation?: number;
  maxAttempts?: number;
}

export function useEvasiveButton({ 
  containerRef, 
  buttonRef, 
  obstacleRefs = [],
  enabled,
  minSeparation = 20,
  maxAttempts = 50
}: UseEvasiveButtonOptions) {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const isEvading = useRef(false);

  const checkCollision = useCallback((
    candidateBox: BoundingBox,
    obstacleBox: BoundingBox,
    separation: number
  ): boolean => {
    // Expand obstacle box by separation distance
    const expandedObstacle = {
      left: obstacleBox.left - separation,
      top: obstacleBox.top - separation,
      right: obstacleBox.right + separation,
      bottom: obstacleBox.bottom + separation
    };

    // Check if boxes intersect
    return !(
      candidateBox.right < expandedObstacle.left ||
      candidateBox.left > expandedObstacle.right ||
      candidateBox.bottom < expandedObstacle.top ||
      candidateBox.top > expandedObstacle.bottom
    );
  }, []);

  const calculateSafePosition = useCallback((): Position => {
    if (!containerRef.current || !buttonRef.current) {
      return { x: 0, y: 0 };
    }

    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();

    // Get obstacle bounding boxes in container coordinate space
    const obstacles: BoundingBox[] = obstacleRefs
      .map(ref => {
        if (!ref.current) return null;
        const rect = ref.current.getBoundingClientRect();
        return {
          left: rect.left - container.left,
          top: rect.top - container.top,
          right: rect.right - container.left,
          bottom: rect.bottom - container.top
        };
      })
      .filter((box): box is BoundingBox => box !== null);

    // Calculate safe bounds accounting for current scale
    const padding = 10;
    const effectiveWidth = button.width * scale;
    const effectiveHeight = button.height * scale;
    
    const maxX = (container.width - effectiveWidth) / 2 - padding;
    const maxY = (container.height - effectiveHeight) / 2 - padding;

    // Try to find a non-colliding position
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Generate random position within safe bounds
      const candidateX = (Math.random() * 2 - 1) * maxX;
      const candidateY = (Math.random() * 2 - 1) * maxY;

      // Calculate the button's bounding box at this candidate position
      // Position is relative to center of container
      const centerX = container.width / 2;
      const centerY = container.height / 2;
      
      const candidateBox: BoundingBox = {
        left: centerX + candidateX - effectiveWidth / 2,
        top: centerY + candidateY - effectiveHeight / 2,
        right: centerX + candidateX + effectiveWidth / 2,
        bottom: centerY + candidateY + effectiveHeight / 2
      };

      // Check collision with all obstacles
      let hasCollision = false;
      for (const obstacle of obstacles) {
        if (checkCollision(candidateBox, obstacle, minSeparation)) {
          hasCollision = true;
          break;
        }
      }

      // If no collision, use this position
      if (!hasCollision) {
        return { x: candidateX, y: candidateY };
      }
    }

    // Fallback: find a deterministic safe position
    // Try corners of the arena
    const fallbackPositions = [
      { x: maxX * 0.8, y: maxY * 0.8 },
      { x: -maxX * 0.8, y: maxY * 0.8 },
      { x: maxX * 0.8, y: -maxY * 0.8 },
      { x: -maxX * 0.8, y: -maxY * 0.8 },
      { x: 0, y: maxY * 0.9 },
      { x: 0, y: -maxY * 0.9 }
    ];

    const centerX = container.width / 2;
    const centerY = container.height / 2;

    for (const fallback of fallbackPositions) {
      const candidateBox: BoundingBox = {
        left: centerX + fallback.x - effectiveWidth / 2,
        top: centerY + fallback.y - effectiveHeight / 2,
        right: centerX + fallback.x + effectiveWidth / 2,
        bottom: centerY + fallback.y + effectiveHeight / 2
      };

      let hasCollision = false;
      for (const obstacle of obstacles) {
        if (checkCollision(candidateBox, obstacle, minSeparation)) {
          hasCollision = true;
          break;
        }
      }

      if (!hasCollision) {
        return fallback;
      }
    }

    // Last resort: return a position far from center
    return { x: maxX * 0.9, y: maxY * 0.9 };
  }, [containerRef, buttonRef, obstacleRefs, scale, minSeparation, maxAttempts, checkCollision]);

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
