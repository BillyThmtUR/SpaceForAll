import React, { useState, useRef, useMemo  } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function MarshModel() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <SceneContent setLoadingProgress={setLoadingProgress} />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      {loadingProgress < 100 && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
          <div style={{ width: '200px', background: 'rgba(35, 180, 196, 0.1)', overflow: 'hidden' }}>
            <div style={{ width: `${loadingProgress}%`, background: '#00d0e3', height: '8px' }}></div>
          </div>
          <div className='font-Orbitron' style={{ textAlign: 'center', marginTop: '8px' }}>Chargement: {loadingProgress}%</div>
        </div>
      )}
    </div>
  );
}

function SceneContent({ setLoadingProgress }) {
  const manager = useMemo(() => {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const percentage = (itemsLoaded / itemsTotal) * 100;
      setLoadingProgress(percentage);
    };
    return loadingManager;
  }, [setLoadingProgress]);

  const { currentTexture, bumpTexture } = useMemo(() => {
    const textureLoader = new THREE.TextureLoader(manager);
    return {
      currentTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/8k_mars.jpg`),
      bumpTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/marsBump.jpg`),
    };
  }, [manager]);

  const meshRef = React.useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <directionalLight color='#ffffff' position={[180, -8, -10]} intensity={1} />
      <directionalLight color='#ffffff' position={[-5, 5, 5]} intensity={1.2} />
      <directionalLight color='#ffffff' position={[5, 7, 1]} intensity={0.5} />
      <pointLight color='#00d0e3' position={[5, 7, 1]} intensity={2} />
      <pointLight color='#00d0e3' position={[0, 5, 10]} intensity={4} />
      <directionalLight color='#ffffff' position={[-10, -5, -10]} intensity={1} />
      <directionalLight color='#ffffff' position={[-180, 180, 180]} intensity={1} />
      
      <pointLight color='#ffffff' position={[-2, 5, 5]} intensity={10} />
      <pointLight color='#ffffff' position={[-5, 5, 5]} intensity={5} />

    {/* Mars */}
    <mesh position={[0, 0, 0]}
          ref={meshRef}>
    <sphereGeometry args={[4, 64, 64]} />
    <meshPhongMaterial
        map={currentTexture}
        bumpMap={bumpTexture}
        bumpScale={0.65}
      />
    </mesh>
    </>
  );
}
