import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture, Center, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const BusinessCard = ({ rotationSpeed }) => {
  const cardRef = useRef();

  // Load textures for front and back
  const frontTexture = useTexture('/images/frontside.jpeg');
  const backTexture = useTexture('/images/backside.jpeg');

  // Animation: Constant 360 rotation controlled by prop
  useFrame((state) => {
    if (cardRef.current) {
      cardRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <Center>
      <mesh ref={cardRef} castShadow>
        <boxGeometry args={[5, 2.85, 0.1]} />

        {/* Side edges: Off-white for realism */}
        <meshStandardMaterial attach="material-0" color="#f8f8f8" roughness={0.5} />
        <meshStandardMaterial attach="material-1" color="#f8f8f8" roughness={0.5} />
        <meshStandardMaterial attach="material-2" color="#f8f8f8" roughness={0.5} />
        <meshStandardMaterial attach="material-3" color="#f8f8f8" roughness={0.5} />

        {/* FRONT SIDE - High Glossy */}
        <meshPhysicalMaterial
          attach="material-4"
          map={frontTexture}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />

        {/* BACK SIDE - High Glossy */}
        <meshPhysicalMaterial
          attach="material-5"
          map={backTexture}
          roughness={0.1}
          metalness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Center>
  );
};

const BusinessCardViewer = () => {
  const [rotSpeed, setRotSpeed] = useState(0.005);

  return (
    <div style={{
      width: '100%',
      height: 'min(500px, 70vh)',
      background: 'transparent',
      position: 'relative',
      overflow: 'hidden',
      touchAction: 'pan-y'
    }}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 10], fov: 40 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{
          pointerEvents: 'none',
          touchAction: 'pan-y'
        }}
      >
        <ambientLight intensity={0.7} />

        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-5, 2, 2]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -5, -5]} intensity={0.6} color="#6366f1" />
        <pointLight position={[10, 5, -5]} intensity={0.6} color="#a855f7" />

        <Environment preset="studio" />

        <BusinessCard rotationSpeed={rotSpeed} />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          disablePan={true}
        />
      </Canvas>

      {/* Professional Navigation Arrows */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center items-center gap-8 pointer-events-auto">
        <button
          onClick={() => setRotSpeed(rotSpeed > 0 ? -rotSpeed : -0.005)}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 active:scale-90 shadow-lg"
          aria-label="Rotate Left"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={() => setRotSpeed(rotSpeed < 0 ? -rotSpeed : 0.005)}
          className="w-10 h-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 active:scale-90 shadow-lg"
          aria-label="Rotate Right"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BusinessCardViewer;
