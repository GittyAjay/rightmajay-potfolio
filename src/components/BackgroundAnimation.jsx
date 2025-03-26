import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const CanvasContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(to bottom, #000000, #0a0520);
`;

const BackgroundAnimation = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create stars with reduced count
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 800;
        const starPositions = new Float32Array(starCount * 3);
        const starColors = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const i3 = i * 3;
            starPositions[i3] = (Math.random() - 0.5) * 100;
            starPositions[i3 + 1] = (Math.random() - 0.5) * 100;
            starPositions[i3 + 2] = (Math.random() - 0.5) * 50;

            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.5, 0.5, 0.3);
            starColors[i3] = color.r;
            starColors[i3 + 1] = color.g;
            starColors[i3 + 2] = color.b;
        }

        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
        starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.4,
            blending: THREE.AdditiveBlending,
        });

        const stars = new THREE.Points(starGeometry, starMaterial);
        scene.add(stars);

        // Create nebula-like clouds
        const nebulaGeometry = new THREE.BufferGeometry();
        const nebulaCount = 400;
        const nebulaPositions = new Float32Array(nebulaCount * 3);
        const nebulaColors = new Float32Array(nebulaCount * 3);

        for (let i = 0; i < nebulaCount; i++) {
            const i3 = i * 3;
            const radius = Math.random() * 20;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            nebulaPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            nebulaPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            nebulaPositions[i3 + 2] = radius * Math.cos(phi);

            const color = new THREE.Color();
            color.setHSL(Math.random() * 0.2 + 0.5, 0.8, 0.3 + Math.random() * 0.2);
            nebulaColors[i3] = color.r;
            nebulaColors[i3 + 1] = color.g;
            nebulaColors[i3 + 2] = color.b;
        }

        nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
        nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));

        const nebulaMaterial = new THREE.PointsMaterial({
            size: 0.3,
            vertexColors: true,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending,
        });

        const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
        scene.add(nebula);

        camera.position.z = 30;

        // Handle mouse movement with smoother tracking
        const mouse = new THREE.Vector2();
        const targetMouse = new THREE.Vector2();
        const handleMouseMove = (event) => {
            targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation
        let time = 0;
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.0005;

            // Subtle mouse movement
            mouse.x += (targetMouse.x - mouse.x) * 0.01;
            mouse.y += (targetMouse.y - mouse.y) * 0.01;

            // Very slow rotation
            scene.rotation.y += 0.0001;
            scene.rotation.x += 0.00005;

            // Simplified star animation
            const starPositions = stars.geometry.attributes.position.array;
            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                starPositions[i3] += Math.sin(time + i) * 0.005;
                starPositions[i3 + 1] += Math.cos(time + i) * 0.005;
            }
            stars.geometry.attributes.position.needsUpdate = true;

            // Simplified nebula animation
            const nebulaPositions = nebula.geometry.attributes.position.array;
            for (let i = 0; i < nebulaCount; i++) {
                const i3 = i * 3;
                nebulaPositions[i3] += Math.sin(time + i * 0.1) * 0.01;
                nebulaPositions[i3 + 1] += Math.cos(time + i * 0.1) * 0.01;
            }
            nebula.geometry.attributes.position.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            starGeometry.dispose();
            starMaterial.dispose();
            nebulaGeometry.dispose();
            nebulaMaterial.dispose();
            renderer.dispose();
            containerRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <CanvasContainer ref={containerRef} />;
};

export default BackgroundAnimation; 