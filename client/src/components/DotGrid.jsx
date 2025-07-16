'use client';
import { useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import "./DotGrid.css";

gsap.registerPlugin(InertiaPlugin);

const throttle = (func, limit) => {
  let lastCall = 0;
  return function (...args) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

// Hook per rilevare dispositivi mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
}) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const dotsRef = useRef([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  // Rileva se è mobile
  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
  }, []);

  // Parametri adattivi per mobile
  const responsiveParams = useMemo(() => {
    if (isMobile) {
      return {
        dotSize: Math.max(dotSize * 0.6, 8), // Riduce la dimensione dei dots
        gap: Math.max(gap * 0.7, 16), // Riduce il gap
        proximity: Math.max(proximity * 0.6, 80), // Riduce la zona di prossimità
        speedTrigger: speedTrigger * 0.8, // Riduce la soglia di velocità
        shockRadius: Math.max(shockRadius * 0.6, 120), // Riduce il raggio shock
        shockStrength: shockStrength * 0.7, // Riduce la forza
        maxSpeed: maxSpeed * 0.6, // Riduce la velocità massima
        resistance: resistance * 1.2, // Aumenta la resistenza
        returnDuration: returnDuration * 0.8, // Riduce la durata ritorno
        throttleLimit: 100, // Aumenta il throttle per performance
      };
    }
    return {
      dotSize,
      gap,
      proximity,
      speedTrigger,
      shockRadius,
      shockStrength,
      maxSpeed,
      resistance,
      returnDuration,
      throttleLimit: 50,
    };
  }, [isMobile, dotSize, gap, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, resistance, returnDuration]);

  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;

    const p = new window.Path2D();
    p.arc(0, 0, responsiveParams.dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [responsiveParams.dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = isMobile ? 1 : (window.devicePixelRatio || 1); // Riduce DPR su mobile

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height+100}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const { dotSize: rDotSize, gap: rGap } = responsiveParams;
    const cols = Math.floor((width + rGap) / (rDotSize + rGap));
    const rows = Math.floor((height + rGap) / (rDotSize + rGap));
    const cell = rDotSize + rGap;

    const gridW = cell * cols - rGap;
    const gridH = cell * rows - rGap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + rDotSize / 2;
    const startY = extraY / 2 + rDotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        dots.push({ cx, cy, xOffset: 0, yOffset: 0, _inertiaApplied: false });
      }
    }
    dotsRef.current = dots;
  }, [responsiveParams, isMobile]);

  useEffect(() => {
    if (!circlePath) return;

    let rafId;
    const proxSq = responsiveParams.proximity * responsiveParams.proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / responsiveParams.proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          style = `rgb(${r},${g},${b})`;
        }

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;
        ctx.fill(circlePath);
        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [responsiveParams.proximity, baseColor, activeRgb, baseRgb, circlePath]);

  useEffect(() => {
    buildGrid();
    let ro = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > responsiveParams.maxSpeed) {
        const scale = responsiveParams.maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = responsiveParams.maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current.getBoundingClientRect();
      pr.x = e.clientX - rect.left;
      pr.y = e.clientY - rect.top;

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > responsiveParams.speedTrigger && dist < responsiveParams.proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance: responsiveParams.resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: responsiveParams.returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const onClick = (e) => {
      const rect = canvasRef.current.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < responsiveParams.shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / responsiveParams.shockRadius);
          const pushX = (dot.cx - cx) * responsiveParams.shockStrength * falloff;
          const pushY = (dot.cy - cy) * responsiveParams.shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance: responsiveParams.resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: responsiveParams.returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    // Supporto touch per mobile
    const onTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        onMove({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    const onTouchStart = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        onClick({ clientX: touch.clientX, clientY: touch.clientY });
      }
    };

    const throttledMove = throttle(onMove, responsiveParams.throttleLimit);
    const throttledTouchMove = throttle(onTouchMove, responsiveParams.throttleLimit);

    // Eventi mouse
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);
    
    // Eventi touch per mobile
    if (isMobile) {
      window.addEventListener("touchmove", throttledTouchMove, { passive: true });
      window.addEventListener("touchstart", onTouchStart, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
      if (isMobile) {
        window.removeEventListener("touchmove", throttledTouchMove);
        window.removeEventListener("touchstart", onTouchStart);
      }
    };
  }, [responsiveParams, isMobile]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;