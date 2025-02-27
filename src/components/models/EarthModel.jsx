import React, { useState, useEffect, useRef, useMemo  } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function EarthModel() {
  const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <SceneContent setLoadingProgress={setLoadingProgress}/>
        <OrbitControls enableZoom={false} enablePan={false} />
        <EffectComposer>
          <Bloom 
            luminanceThreshold={0.7} 
            luminanceSmoothing={0.9} 
            intensity={1.5} 
          />
        </EffectComposer>
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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // mise à jour toutes les minutes

    return () => clearInterval(interval); // nettoyage à la désinscription du composant
  }, []);

  // Obtenir l'heure actuelle de l'utilisateur
  const hours = currentTime.getHours();
  //const hours = 14;
  const isDaytime = hours > 6 && hours < 18;

  const manager = useMemo(() => {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const percentage = (itemsLoaded / itemsTotal) * 100;
      setLoadingProgress(percentage);
    };
    return loadingManager;
  }, [setLoadingProgress]);

  const { cloudTexture, DayTexture, NightTexture, bumpTexture } = useMemo(() => {
    const textureLoader = new THREE.TextureLoader(manager);
    return {
      cloudTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/cloud-texture.jpg`),
      DayTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/8k_earth_daymap.jpg`),
      NightTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/8k_earth_nightmap.jpg`),
      bumpTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/8k_earth_specular_map.jpg`),
    };
  }, [manager]);

  const currentTexture = isDaytime ? DayTexture : NightTexture;
  const currentCloudOpacity = isDaytime ? 0.5 : 0.3;
  const currentIntensity = isDaytime ? 4 : 6;

  const meshRef = React.useRef();
  const meshRef2 = React.useRef();

  useFrame(() => {

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
    if (meshRef2.current) {
      meshRef2.current.rotation.y += 0.0007;
    }
  });
  
    return (
    <>
      <directionalLight color='#ffffff' position={[180, -8, -10]} intensity={currentIntensity} />
      <directionalLight color='#ffffff' position={[-5, 5, 5]} intensity={currentIntensity} />
      <directionalLight color='#ffffff' position={[5, 7, 1]} intensity={0.5} />
      <pointLight color='#00d0e3' position={[5, 7, 1]} intensity={currentIntensity} />
      <pointLight color='#00d0e3' position={[0, 5, 10]} intensity={currentIntensity} />
      <directionalLight color='#ffffff' position={[-10, -5, -10]} intensity={1} />
      <directionalLight color='#ffffff' position={[-180, 180, 180]} intensity={5} />
      
      <pointLight color='#00d0e3' position={[1, 5, 5]} intensity={30} />
      <pointLight color='#00d0e3' position={[180, 180, 5]} intensity={10} />
   
    {/* Terre */}
    <mesh position={[0, 0, 0]}
          ref={meshRef}>
    <sphereGeometry args={[4,  64, 64]} />
    <meshPhongMaterial
        map={currentTexture}
        bumpMap={bumpTexture}
        bumpScale={0.1}
      />
    </mesh>

    {/* Nuages */}
    <mesh position={[0, 0, 0]}
          ref={meshRef2}>
    <sphereGeometry args={[4.12,  64, 64]} />
    <meshPhongMaterial
      map={cloudTexture}
      transparent={true}
      opacity={currentCloudOpacity}
      depthWrite={false}
      alphaTest={0.01}
    />
    </mesh>

</>
);
}