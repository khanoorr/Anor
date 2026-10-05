"use client";

import React, { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
  color: string;
}

export const HeroWebGL: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener("resize", handleResize);

    // Mouse coordinates
    const mouse = {
      x: width / 2,
      y: height / 2,
      targetX: width / 2,
      targetY: height / 2,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Create technical grid node network
    let nodes: Point[] = [];
    const colors = ["#246BFF", "#7137FF", "#E500C7", "#E8E8EC"];

    const initNodes = () => {
      nodes = [];
      const cols = Math.floor(width / 140) + 1;
      const rows = Math.floor(height / 140) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Add subtle jitter
          const x = (i + 0.5) * 140 + (Math.random() - 0.5) * 60;
          const y = (j + 0.5) * 140 + (Math.random() - 0.5) * 60;

          nodes.push({
            x,
            y,
            originX: x,
            originY: y,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            connections: [],
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.02 + Math.random() * 0.03,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }

      // Connect nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180 && Math.random() > 0.4) {
            nodes[i].connections.push(j);
          }
        }
      }
    };

    initNodes();

    // Pulse signals moving along lines
    interface Signal {
      fromIndex: number;
      toIndex: number;
      progress: number;
      speed: number;
      color: string;
    }

    const signals: Signal[] = [];

    const spawnSignal = () => {
      if (nodes.length < 2) return;
      const fromIndex = Math.floor(Math.random() * nodes.length);
      const node = nodes[fromIndex];
      if (node.connections.length > 0) {
        const toIndex =
          node.connections[
            Math.floor(Math.random() * node.connections.length)
          ];
        signals.push({
          fromIndex,
          toIndex,
          progress: 0,
          speed: 0.008 + Math.random() * 0.015,
          color: node.color,
        });
      }
    };

    let frame = 0;

    const render = () => {
      frame++;
      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // Render dark subtle ambient gradient behind
      const bgGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        width * 0.6
      );
      bgGlow.addColorStop(0, "rgba(36, 107, 255, 0.06)");
      bgGlow.addColorStop(0.5, "rgba(113, 55, 255, 0.02)");
      bgGlow.addColorStop(1, "rgba(11, 11, 16, 0)");
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, width, height);

      // Render subtle background grid lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      const gridSize = 80;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update node positions and mouse reaction
      nodes.forEach((node) => {
        // Floating drift
        node.x += node.vx;
        node.y += node.vy;

        // Return force to origin
        node.x += (node.originX - node.x) * 0.02;
        node.y += (node.originY - node.y) * 0.02;

        // Mouse repulsion / reaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 220) {
          const force = (1 - dist / 220) * 35;
          const angle = Math.atan2(dy, dx);
          node.x -= Math.cos(angle) * force * 0.1;
          node.y -= Math.sin(angle) * force * 0.1;
        }

        node.pulse += node.pulseSpeed;
      });

      // Draw connections
      nodes.forEach((node, i) => {
        node.connections.forEach((targetIndex) => {
          const target = nodes[targetIndex];
          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const alpha = (1 - dist / 200) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(115, 115, 125, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      // Spawn new pulse signals periodically
      if (frame % 20 === 0 && signals.length < 25) {
        spawnSignal();
      }

      // Update and draw pulse signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const sig = signals[i];
        sig.progress += sig.speed;

        const from = nodes[sig.fromIndex];
        const to = nodes[sig.toIndex];

        if (!from || !to || sig.progress >= 1) {
          signals.splice(i, 1);
          continue;
        }

        const currX = from.x + (to.x - from.x) * sig.progress;
        const currY = from.y + (to.y - from.y) * sig.progress;

        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.shadowColor = sig.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw nodes
      nodes.forEach((node) => {
        const glowRadius = 2 + Math.sin(node.pulse) * 1;

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Subtle crosshair marker on some nodes
        if ((node.originX + node.originY) % 3 === 0) {
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(node.x - 5, node.y);
          ctx.lineTo(node.x + 5, node.y);
          ctx.moveTo(node.x, node.y - 5);
          ctx.lineTo(node.x, node.y + 5);
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};
