"use client";

import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import { useSettings } from "./SettingsProvider";
import { useTheme } from "next-themes";

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isAnimationEnabled } = useSettings();
  const { resolvedTheme } = useTheme();

  const sceneRef = useRef<{
    scene: THREE.Scene;
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    particles: THREE.Points;
    particles2: THREE.Points;
    plane: THREE.Mesh;
    animationId: number;
    time: number;
    count: number;
  } | null>(null);

  const updateThemeColors = useCallback((isDark: boolean) => {
    const s = sceneRef.current;
    if (!s) return;
    const bgColor = isDark ? 0x020617 : 0xffffff;
    (s.scene.fog as THREE.FogExp2).color.setHex(bgColor);
    const planeMat = s.plane.material as THREE.MeshBasicMaterial;
    planeMat.color.setHex(isDark ? 0x0f172a : 0xe2e8f0);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    if (sceneRef.current) {
      updateThemeColors(resolvedTheme === "dark");
      return;
    }

    const isDark = resolvedTheme === "dark";
    const bgColor = isDark ? 0x020617 : 0xffffff;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(bgColor, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;
    camera.position.y = 10;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const count = 1500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 150;
      const z = (Math.random() - 0.5) * 100;
      const y = Math.sin(x * 0.1) * 5 + (Math.random() - 0.5) * 10;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      scales[i] = Math.random();
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.4,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const geometry2 = new THREE.BufferGeometry();
    const count2 = 500;
    const positions2 = new Float32Array(count2 * 3);
    for (let i = 0; i < count2; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 150;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    geometry2.setAttribute("position", new THREE.BufferAttribute(positions2, 3));
    const material2 = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.5,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    const particles2 = new THREE.Points(geometry2, material2);
    scene.add(particles);
    scene.add(particles2);

    const planeGeo = new THREE.PlaneGeometry(200, 200, 40, 40);
    const planeMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x0f172a : 0xe2e8f0,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -10;
    scene.add(plane);

    const state = {
      scene,
      renderer,
      camera,
      particles,
      particles2,
      plane,
      animationId: 0,
      time: 0,
      count,
    };
    sceneRef.current = state;

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(state.animationId);
      sceneRef.current = null;
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      planeGeo.dispose();
      planeMat.dispose();
      renderer.dispose();
    };
    // Only run once on mount, theme changes handled separately
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateThemeColors(resolvedTheme === "dark");
  }, [resolvedTheme, updateThemeColors]);

  useEffect(() => {
    const s = sceneRef.current;
    if (!s) return;

    let running = true;

    function animate() {
      if (!running || !sceneRef.current) return;
      sceneRef.current.animationId = requestAnimationFrame(animate);

      if (isAnimationEnabled) {
        sceneRef.current.time += 0.001;
        const t = sceneRef.current.time;

        sceneRef.current.particles.rotation.y = t * 0.5;
        sceneRef.current.particles2.rotation.y = t * 0.3;

        const pos = sceneRef.current.particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < sceneRef.current.count; i++) {
          const x = pos[i * 3];
          pos[i * 3 + 1] += Math.sin(x * 0.1 + t * 10) * 0.02;
        }
        sceneRef.current.particles.geometry.attributes.position.needsUpdate = true;

        sceneRef.current.camera.position.x = Math.sin(t) * 2;
        sceneRef.current.camera.lookAt(0, 0, 0);
      }

      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
    }

    animate();

    return () => {
      running = false;
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
    };
  }, [isAnimationEnabled]);

  return <div id="canvas-container" ref={containerRef} />;
}
