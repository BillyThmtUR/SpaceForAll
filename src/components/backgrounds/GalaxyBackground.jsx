import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function GalaxyBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const pointLight = new THREE.PointLight(0xffffff, 1, 500);
    pointLight.position.set(0, 0, 50);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x404040); 
    scene.add(ambientLight);


    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true  });

    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Position de la caméra
    camera.position.z = 40;

    // Géométrie de particules pour la galaxie
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 3000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i+=3) {
      posArray[i] = (Math.random() - 0.5) * 200; // x-axis: spread particles between -100 to 100
      posArray[i + 1] = (Math.random() - 0.5) * 100; // y-axis
      posArray[i + 2] = (Math.random() - 0.5) * 100; // z-axis
    }
    

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 'white',
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Fonction de rendu
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      particlesMesh.rotation.x += 0.0004;
      particlesMesh.rotation.y += 0.0003;
    }

    animate();
  }, []);

  return <div ref={containerRef} style={{ 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    zIndex: -99, 
    width: '100vw', 
    height: '100vh', 
    background: 'linear-gradient(-70deg,#121620,#232c39,#121620,#232c39)'
}}></div>;

}

export default GalaxyBackground;