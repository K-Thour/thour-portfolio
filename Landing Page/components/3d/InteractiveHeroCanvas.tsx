'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * 3D Interactive Ambient Scene built with Three.js
 * Strictly follows Apple Design principles:
 * - Fluid, physics-based pointer tracking with spring easing
 * - 60fps display-synced rAF loop
 * - Full reduced-motion awareness
 * - Zero WebGL memory leaks with lifecycle cleanup
 */
export function InteractiveHeroCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Geometry & Materials (Apple-inspired translucent wireframe + particles)
    const group = new THREE.Group();
    scene.add(group);

    // Core Geometric Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.2, 0.35, 100, 16);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan brand tone
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.2,
      metalness: 0.8,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knotMesh);

    // Inner Glowing Core
    const coreGeometry = new THREE.IcosahedronGeometry(0.7, 2);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(coreMesh);

    // Particle Cloud Surrounding Structure
    const particlesCount = 120;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlePoints);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 2, 20);
    pointLight.position.set(3, 3, 4);
    scene.add(pointLight);

    // 4. Interactive Tracking State with Critically Damped Spring Smoothing
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: MouseEvent) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      targetX = (e.clientX - halfW) / halfW;
      targetY = (e.clientY - halfH) / halfH;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    // 5. Responsive Resize
    const onResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || 500;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!prefersReducedMotion) {
        // Spring easing toward pointer (Apple direct manipulation)
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        const elapsedTime = clock.getElapsedTime();

        // Subtle continuous rotation blended with pointer offset
        group.rotation.x = mouseY * 0.4 + elapsedTime * 0.15;
        group.rotation.y = mouseX * 0.4 + elapsedTime * 0.2;
        group.rotation.z = elapsedTime * 0.05;

        particlePoints.rotation.y = elapsedTime * 0.04;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 7. Cleanup on Unmount (Memory safety)
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);

      knotGeometry.dispose();
      knotMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}

export default InteractiveHeroCanvas;

