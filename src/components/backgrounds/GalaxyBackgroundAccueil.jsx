import React, { useEffect, useRef } from 'react';
import { TextureLoader } from 'three';
import * as THREE from 'three';

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


function GalaxyBackgroundAccueil() {
  const containerRef = useRef(null);

  useEffect(() => {
    const textureLoader = new TextureLoader();
    const circleTexture = textureLoader.load(`${process.env.PUBLIC_URL}/img/circle.png`);

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

    camera.position.z = 40;

    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      2,
      0.4, 
      0.85
    );

    composer.addPass(bloomPass);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i+=3) {
      posArray[i] = (Math.random() - 0.5) * 200;
      posArray[i + 1] = (Math.random() - 0.5) * 100;
      posArray[i + 2] = (Math.random() - 0.5) * 100;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: '#ffffff',
      map: circleTexture,
      transparent: true,
      alphaTest: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    function animate() {
      requestAnimationFrame(animate);
      composer.render();
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
    backgroundColor: 'black',
}}></div>;

}

export default GalaxyBackgroundAccueil;
