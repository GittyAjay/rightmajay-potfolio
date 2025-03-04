import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import * as THREE from 'three';

const TreeContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const ProjectTree = ({ projects }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create tree trunk
        const createTrunk = () => {
            const trunkGeometry = new THREE.CylinderGeometry(0.5, 1, 4, 8);
            const trunkMaterial = new THREE.MeshPhongMaterial({
                color: 0x4a3429,
                roughness: 0.8,
                metalness: 0.2
            });
            const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
            trunk.position.y = 0;
            return trunk;
        };

        // Create branch
        const createBranch = (length, thickness, angle, color) => {
            const branchGeometry = new THREE.CylinderGeometry(thickness * 0.7, thickness, length, 8);
            const branchMaterial = new THREE.MeshPhongMaterial({
                color: color || 0x4a3429,
                roughness: 0.7,
                metalness: 0.1
            });
            const branch = new THREE.Mesh(branchGeometry, branchMaterial);
            branch.rotation.z = angle;
            return branch;
        };

        // Create leaf cluster
        const createLeafCluster = (position) => {
            const leaves = new THREE.Group();
            const leafGeometry = new THREE.SphereGeometry(0.5, 8, 8);
            const leafMaterial = new THREE.MeshPhongMaterial({
                color: 0x4CAF50,
                roughness: 0.5,
                metalness: 0.1
            });

            for (let i = 0; i < 5; i++) {
                const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
                leaf.position.set(
                    Math.random() * 0.5 - 0.25,
                    Math.random() * 0.5 - 0.25,
                    Math.random() * 0.5 - 0.25
                );
                leaf.scale.set(0.3, 0.3, 0.3);
                leaves.add(leaf);
            }

            leaves.position.copy(position);
            return leaves;
        };

        // Create project marker
        const createProjectMarker = (position, color) => {
            const markerGeometry = new THREE.SphereGeometry(0.3, 16, 16);
            const markerMaterial = new THREE.MeshPhongMaterial({
                color: color || 0xf4d03f,
                roughness: 0.3,
                metalness: 0.8,
                emissive: color || 0xf4d03f,
                emissiveIntensity: 0.2
            });
            const marker = new THREE.Mesh(markerGeometry, markerMaterial);
            marker.position.copy(position);
            return marker;
        };

        // Build tree
        const buildTree = () => {
            const treeGroup = new THREE.Group();

            // Add trunk
            const trunk = createTrunk();
            treeGroup.add(trunk);

            // Add main branches
            const branchAngles = [-Math.PI / 4, Math.PI / 4, 0];
            branchAngles.forEach((angle, index) => {
                const branch = createBranch(3, 0.3, angle);
                branch.position.y = 2;
                branch.position.x = Math.sin(angle) * 0.5;

                // Add sub-branches
                const subBranch1 = createBranch(2, 0.2, angle / 2);
                subBranch1.position.y = 2;
                subBranch1.position.x = Math.sin(angle / 2) * 0.3;
                branch.add(subBranch1);

                // Add leaves
                const leafCluster = createLeafCluster(new THREE.Vector3(0, 1.5, 0));
                subBranch1.add(leafCluster);

                // Add project markers
                const marker = createProjectMarker(new THREE.Vector3(0, 2, 0));
                subBranch1.add(marker);

                treeGroup.add(branch);
            });

            return treeGroup;
        };

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Add tree to scene
        const tree = buildTree();
        scene.add(tree);

        // Position camera
        camera.position.z = 15;
        camera.position.y = 5;
        camera.lookAt(new THREE.Vector3(0, 5, 0));

        // Animation
        const animate = () => {
            requestAnimationFrame(animate);
            tree.rotation.y += 0.002;
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
            window.removeEventListener('resize', handleResize);
            containerRef.current?.removeChild(renderer.domElement);
            renderer.dispose();
        };
    }, [projects]);

    return <TreeContainer ref={containerRef} />;
};

export default ProjectTree; 