import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function DataParticles({ count = 3000 }) {
  const points = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30; // x
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20; // y
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20; // z
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!points.current || !points.current.geometry) return;
    
    // Flowing effect moving towards the viewer
    const time = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      points.current.geometry.attributes.position.array[i3 + 2] += 0.05;
      if (points.current.geometry.attributes.position.array[i3 + 2] > 10) {
        points.current.geometry.attributes.position.array[i3 + 2] = -10;
      }
      
      // Slight wavy motion on y axis
      points.current.geometry.attributes.position.array[i3 + 1] += Math.sin(time + points.current.geometry.attributes.position.array[i3]) * 0.002;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
    
    points.current.rotation.x = Math.sin(time * 0.1) * 0.1;
    points.current.rotation.y = Math.cos(time * 0.1) * 0.1;
  });

  return (
    <Points ref={points} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#1e40af"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

function GlowingGrid() {
  const gridRef = useRef();
  
  useFrame((state) => {
    if (!gridRef.current) return;
    // Parallax scrolling grid
    gridRef.current.position.z = (state.clock.getElapsedTime() * 0.8) % 2;
  });

  return (
    <gridHelper
      ref={gridRef}
      args={[100, 100, '#00f2ff', '#111111']}
      position={[0, -3, -10]}
      rotation={[0, 0, 0]}
    />
  );
}

const Background3D = () => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <fog attach="fog" args={['#f8fafc', 5, 15]} />
        <color attach="background" args={['#f8fafc']} />
        <ambientLight intensity={1.5} />
        <DataParticles />
        <gridHelper
          args={[100, 100, '#1e40af', '#ffffff']}
          position={[0, -3, -10]}
        />
      </Canvas>
      {/* Light Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-blue-100/30"></div>
    </div>
  );
};

export default Background3D;
