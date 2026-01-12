import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// 3D Eyeglass Model Component
function EyeglassModel({ rotationSpeed = 0.5 }) {
  const meshRef = useRef(null)
  const frameRef = useRef(null)
  const lensRef1 = useRef(null)
  const lensRef2 = useRef(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01
    }
  })

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Frame */}
      <mesh ref={frameRef} position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.05]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Bridge */}
      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.15, 0.05, 0.05]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>

      {/* Left Lens */}
      <mesh ref={lensRef1} position={[-0.2, 0, 0.02]}>
        <cylinderGeometry args={[0.12, 0.12, 0.01, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Right Lens */}
      <mesh ref={lensRef2} position={[0.2, 0, 0.02]}>
        <cylinderGeometry args={[0.12, 0.12, 0.01, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          thickness={0.5}
        />
      </mesh>

      {/* Temples (arms) */}
      <mesh position={[-0.3, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0.3, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
    </group>
  )
}

// Camera Controller for smooth movement
function CameraController() {
  const cameraRef = useRef(null)

  useFrame((state) => {
    if (cameraRef.current) {
      const time = state.clock.elapsedTime
      cameraRef.current.position.x = Math.sin(time * 0.2) * 0.5
      cameraRef.current.position.z = 3 + Math.cos(time * 0.2) * 0.3
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 3]} fov={50} />
}

export default function Hero() {
  const navigate = useNavigate()

  const handleExploreClick = () => {
    navigate('/collection')
  }

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-white to-neutral-50">
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          <CameraController />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />
          <EyeglassModel rotationSpeed={0.5} />
          <Environment preset="city" />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="mb-6 text-5xl font-light tracking-tight text-neutral-900 md:text-7xl lg:text-8xl"
          >
            Vision Meets
            <br />
            <span className="font-normal">Elegance</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="mb-12 text-lg text-neutral-600 md:text-xl"
          >
            Discover premium eyewear crafted with precision and style
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          >
            <motion.button
              onClick={handleExploreClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative overflow-hidden rounded-full bg-neutral-900 px-8 py-4 text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)]"
            >
              <span className="relative z-10 text-base font-medium tracking-wide">
                Explore Collection
              </span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-neutral-700 to-neutral-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                initial={false}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="h-8 w-0.5 bg-neutral-400"
        />
      </motion.div>
    </section>
  )
}

