import React, { useState, useRef, useMemo  } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';
import { vertexShader, fragmentShader } from './shaders';

export default function SunModel() {
  const [loadingProgress, setLoadingProgress] = useState(0);

    return (
      <div style={{ width: '100%', height: '100%' }}>
      <Canvas style={{ width: '100%', height: '100%'}} camera={{ position: [0, 0, 10], fov: 50 }}>
        <EffectComposer>
            <SceneContent setLoadingProgress={setLoadingProgress} />
          <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.4} intensity={1.5} kernelSize={5}/>
        </EffectComposer>
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

function SceneContent({ setLoadingProgress, flareCount = 30 }) {
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
      currentTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/8k_sun.jpg`),
      bumpTexture: textureLoader.load(`${process.env.PUBLIC_URL}/data/textures/sunBump.jpg`),
    };
  }, [manager]);

    const meshRef = React.useRef();
    const meshRef2 = React.useRef();

    useFrame((state) => {
        if (meshRef.current) {
        meshRef.current.rotation.y += 0.0005;
        meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
        }
        if (meshRef2.current) {
        meshRef2.current.rotation.y += 0.0007;
        }
    });

    const { positions, velocities, lifetimes } = generateSolarFlaresData(flareCount, 3.7);
    const geometry = new BufferGeometry();
    const positionAttribute = new Float32BufferAttribute(positions, 3);
    geometry.setAttribute('position', positionAttribute);

    useFrame(() => {
      for (let i = 0; i < lifetimes.length; i++) {
          lifetimes[i]--;
  
          // Déplacer la particule selon sa vitesse
          const velocity = velocities[i];
          positionAttribute.setXYZ(
              i,
              positionAttribute.getX(i) + velocity.x,
              positionAttribute.getY(i) + velocity.y,
              positionAttribute.getZ(i) + velocity.z
          );
  
          // Vérifier la distance de la particule par rapport au centre
          const distance = Math.sqrt(
              Math.pow(positionAttribute.getX(i), 2) +
              Math.pow(positionAttribute.getY(i), 2) +
              Math.pow(positionAttribute.getZ(i), 2)
          );
  
          // Si la particule est trop éloignée, ou si sa durée de vie est écoulée, la réinitialiser
          if (distance > 4.5 || lifetimes[i] <= 0) {
              const phi = Math.random() * Math.PI * 2;
              const theta = Math.random() * Math.PI;
              const r = 3.7 + (Math.random() * 0.2);
  
              positionAttribute.setXYZ(
                  i,
                  r * Math.sin(theta) * Math.cos(phi),
                  r * Math.sin(theta) * Math.sin(phi),
                  r * Math.cos(theta)
              );
              lifetimes[i] = 10 + Math.floor(Math.random() * 100);
          }
      }
      positionAttribute.needsUpdate = true;
  });  

  return (
    <>
      <directionalLight color='#fdbd4f' position={[180, -8, -10]} intensity={1.5} />
      <directionalLight color='#fdbd4f' position={[-5, 5, 5]} intensity={2} />
      <directionalLight color='#ffffff' position={[5, 7, 1]} intensity={3} />
      <pointLight color='#fdbd4f' position={[5, 7, 1]} intensity={2} />
      <pointLight color='#fdbd4f' position={[0, 5, 10]} intensity={4} />
      <directionalLight color='#ffffff' position={[-10, -5, -10]} intensity={2} />
      
      <pointLight color='#fdbd4f' position={[-2, 5, 5]} intensity={10} />
      <pointLight color='#fdbd4f' position={[-5, 5, 5]} intensity={5} />

    {/* Sun */}
    <mesh position={[0, 0, 0]} ref={meshRef}>
    <sphereGeometry args={[3.7, 64, 64]} />
    <meshPhongMaterial
        map={currentTexture}
        bumpMap={bumpTexture}
        bumpScale={1.5}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uTexture: { value: currentTexture }
        }}
      />
    </mesh>

    {/* Solar Flares */}
    <points geometry={geometry} ref={meshRef2}>
    <pointsMaterial
      color='#ffbf51'
      size={0.06}
      transparent
      opacity={0.5}
    />
    </points>

    </>
  );

  function generateSolarFlaresData(count, radius) {
    const positions = [];
    const velocities = [];
    const lifetimes = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.random() * Math.PI * 2;
      const theta = Math.random() * Math.PI;
      const r = radius + (Math.random() * 0.2);
      
      const position = new Vector3(
        r * Math.sin(theta) * Math.cos(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(theta)
      );
  
      const velocityDirection = new Vector3(
        Math.random() * 2 - 1,  // aléatoire entre -1 et 1
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();  // normalise le vecteur pour avoir une longueur de 1
      const speed = 0.005 + Math.random() * 0.007;
      const velocity = velocityDirection.multiplyScalar(speed);  // la vitesse aléatoire dans une direction aléatoire
      
      const lifetime = 50 + Math.floor(Math.random() * 100);  // entre 5 et 105 frames
  
      positions.push(position.x, position.y, position.z);
      velocities.push(velocity);
      lifetimes.push(lifetime);
    }
    return { positions, velocities, lifetimes };
  }
  
}
