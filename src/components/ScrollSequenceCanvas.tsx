"use client";

import { useEffect, useRef } from "react";

interface ScrollSequenceCanvasProps {
  basePath: string;
  frameCount: number;
  /** Progress normalized in [0, 1]. */
  progress: number;
  posterSrc: string;
  posterAlt: string;
  /** Nearby sliding cache window radius and hard LRU cap in memory. */
  preloadRadius?: number;
  maxCachedFrames?: number;
  className?: string;
}

function formatFrameUrl(basePath: string, oneBasedIndex: number): string {
  const num = String(oneBasedIndex).padStart(3, "0");
  return `${basePath}/f_${num}.webp`;
}

export function ScrollSequenceCanvas({
  basePath,
  frameCount,
  progress,
  posterSrc,
  posterAlt,
  preloadRadius = 14,
  maxCachedFrames = 36,
  className,
}: ScrollSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cacheRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const inFlightRef = useRef<Set<number>>(new Set());
  const renderedIdxRef = useRef<number>(-1);
  const targetIdxRef = useRef<number>(1);
  const hasDrawnAnyRef = useRef<boolean>(false);

  const clampedProgress = Math.max(0, Math.min(1, progress));
  const targetIndex =
    Math.min(frameCount, Math.max(1, Math.round(clampedProgress * (frameCount - 1)) + 1));
  targetIdxRef.current = targetIndex;

  const drawNearestAvailable = (desiredIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cache = cacheRef.current;
    let bestImg: HTMLImageElement | undefined = cache.get(desiredIdx);
    let drawnIdx = desiredIdx;

    if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
      let bestDist = Infinity;
      for (const [idx, img] of cache.entries()) {
        if (img.complete && img.naturalWidth > 0) {
          const dist = Math.abs(idx - desiredIdx);
          if (dist < bestDist) {
            bestDist = dist;
            bestImg = img;
            drawnIdx = idx;
          }
        }
      }
    }

    if (!bestImg || !bestImg.complete || bestImg.naturalWidth === 0) {
      return;
    }

    if (renderedIdxRef.current === drawnIdx && hasDrawnAnyRef.current) {
      return;
    }

    // Touch LRU order
    if (cache.has(drawnIdx)) {
      const ref = cache.get(drawnIdx)!;
      cache.delete(drawnIdx);
      cache.set(drawnIdx, ref);
    }

    if (canvas.width !== bestImg.naturalWidth || canvas.height !== bestImg.naturalHeight) {
      canvas.width = bestImg.naturalWidth;
      canvas.height = bestImg.naturalHeight;
    }

    ctx.drawImage(bestImg, 0, 0, canvas.width, canvas.height);
    renderedIdxRef.current = drawnIdx;
    hasDrawnAnyRef.current = true;
  };

  useEffect(() => {
    const cache = cacheRef.current;
    const inFlight = inFlightRef.current;

    const evictIfNeeded = () => {
      while (cache.size > maxCachedFrames) {
        let farthestKey: number | null = null;
        let farthestDist = -1;
        for (const key of cache.keys()) {
          if (key === 1 || key === frameCount) continue;
          const dist = Math.abs(key - targetIdxRef.current);
          if (dist > farthestDist) {
            farthestDist = dist;
            farthestKey = key;
          }
        }
        if (farthestKey === null) break;
        cache.delete(farthestKey);
      }
    };

    const ensureFrame = (idx: number) => {
      if (idx < 1 || idx > frameCount) return;
      if (cache.has(idx) || inFlight.has(idx)) return;

      inFlight.add(idx);
      const img = new window.Image();
      img.decoding = "async";
      img.src = formatFrameUrl(basePath, idx);
      img.onload = () => {
        inFlight.delete(idx);
        cache.set(idx, img);
        evictIfNeeded();
        if (
          idx === targetIdxRef.current ||
          !hasDrawnAnyRef.current ||
          Math.abs(idx - targetIdxRef.current) <
            Math.abs(renderedIdxRef.current - targetIdxRef.current)
        ) {
          drawNearestAvailable(targetIdxRef.current);
        }
      };
      img.onerror = () => {
        inFlight.delete(idx);
      };
    };

    // Pin boundary frames + immediate window around current scroll target
    ensureFrame(targetIndex);
    ensureFrame(1);
    ensureFrame(frameCount);
    for (let d = 1; d <= preloadRadius; d++) {
      ensureFrame(targetIndex + d);
      ensureFrame(targetIndex - d);
    }

    drawNearestAvailable(targetIndex);
  }, [basePath, frameCount, maxCachedFrames, preloadRadius, targetIndex]);

  useEffect(() => {
    const cache = cacheRef.current;
    const inFlight = inFlightRef.current;
    return () => {
      cache.clear();
      inFlight.clear();
      renderedIdxRef.current = -1;
      hasDrawnAnyRef.current = false;
    };
  }, [basePath]);

  return (
    <div className={`sequence-renderer ${className ?? ""}`}>
      <img
        src={posterSrc}
        alt={posterAlt}
        width={1280}
        height={720}
        className="sequence-poster-fallback"
        decoding="async"
      />
      <canvas
        ref={canvasRef}
        width={1024}
        height={576}
        aria-hidden="true"
        className="sequence-canvas-layer"
      />
    </div>
  );
}
