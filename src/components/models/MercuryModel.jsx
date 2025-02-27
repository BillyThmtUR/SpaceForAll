import React, { useState, useEffect, useRef, useMemo  } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { TextureLoader, LoadingManager } from 'three';

export default function MercuryModel({ texture  }) {
// eslint-disable-next-line no-unused-vars
const [loadingProgress, setLoadingProgress] = useState(0);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <Canvas camera={{ position: [0, 0, 10], fov: 50 }} >
        <SceneContent texturePath={texture} setLoadingProgress={setLoadingProgress}  />
        <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
    {loadingProgress < 100 && (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10 }}>
            <div style={{ width: '200px', background: '#ccc', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${loadingProgress}%`, background: '#00d0e3', height: '8px' }}></div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '8px' }}>Chargement: {loadingProgress}%</div>
        </div>
        )}
    </div>
  );
}

function SceneContent({ texturePath, setLoadingProgress }) {
  const manager = useMemo(() => {
    const loadingManager = new THREE.LoadingManager();
    loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const percentage = (itemsLoaded / itemsTotal) * 100;
      setLoadingProgress(percentage);
    };
    return loadingManager;
  }, [setLoadingProgress]);

  const [currentTexture, setCurrentTexture] = useState(null);
  const [bumpTexture, setBumpTexture] = useState(null);
  
  useEffect(() => {
      const textureLoader = new THREE.TextureLoader(manager);
      
      const loadedTexture = textureLoader.load(texturePath, () => {
          // Mettre à jour l'état une fois la texture chargée
          setCurrentTexture(loadedTexture);
          console.log("Texture chargée :", texturePath);
      });
  
      const loadedBumpTexture = textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/mercuryBump.jpg`, () => {
          // Mettre à jour l'état une fois la texture de bump chargée
          setBumpTexture(loadedBumpTexture);
      });
      
      return () => {
          // Nettoyer les textures pour éviter des fuites de mémoire
          if (loadedTexture) loadedTexture.dispose();
          if (loadedBumpTexture) loadedBumpTexture.dispose();
      };
  }, [texturePath, manager]);

  manager.onLoad = () => {
    setLoadingProgress(100);
};

  

  const meshRef = React.useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
      meshRef.current.material.needsUpdate = true;
    }
  });

  return (
    <>
      <directionalLight color='#ffffff' position={[180, -8, -10]} intensity={1} />
      <directionalLight color='#ffffff' position={[-5, 5, 5]} intensity={2} />
      <directionalLight color='#ffffff' position={[5, 7, 1]} intensity={1} />
      <pointLight color='#00d0e3' position={[5, 7, 1]} intensity={2} />
      <pointLight color='#00d0e3' position={[0, 5, 10]} intensity={4} />
      <directionalLight color='#ffffff' position={[-10, -5, -10]} intensity={1} />
      
      <pointLight color='#ffffff' position={[-2, 5, 5]} intensity={10} />
      <pointLight color='#ffffff' position={[-5, 5, 5]} intensity={5} />

    {/* Mercury */}
      <mesh position={[0, 0, 0]} ref={meshRef}>
        <sphereGeometry args={[4, 64, 64]} />
        <meshPhongMaterial
          map={currentTexture}
          bumpMap={bumpTexture}
          bumpScale={0.5}
        />
      </mesh>
    </>
  );
}
