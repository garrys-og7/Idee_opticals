import { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import { motion, useScroll, useTransform } from 'framer-motion'

// Enhanced 3D Eyeglass Model with better details
function ShowcaseEyeglass() {
  const meshRef = useRef(null)
  const [rotationSpeed, setRotationSpeed] = useState(0.5)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += rotationSpeed * 0.01
    }
  })

  // Adjust rotation speed based on scroll (handled by parent)
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const newSpeed = 0.5 + (scrollY * 0.0001)
      setRotationSpeed(Math.min(newSpeed, 1.5))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <group ref={meshRef} position={[0, 0, 0]}>
      {/* Main Frame */}
      <mesh>
        <boxGeometry args={[0.6, 0.35, 0.06]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.9} 
          roughness={0.15}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Bridge */}
      <mesh position={[0, 0, 0.04]}>
        <boxGeometry args={[0.18, 0.06, 0.06]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.9} 
          roughness={0.15}
        />
      </mesh>

      {/* Left Lens */}
      <mesh position={[-0.25, 0, 0.03]}>
        <cylinderGeometry args={[0.14, 0.14, 0.015, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.25}
          roughness={0.05}
          metalness={0.05}
          transmission={0.95}
          thickness={0.8}
          ior={1.5}
        />
      </mesh>

      {/* Right Lens */}
      <mesh position={[0.25, 0, 0.03]}>
        <cylinderGeometry args={[0.14, 0.14, 0.015, 64]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.25}
          roughness={0.05}
          metalness={0.05}
          transmission={0.95}
          thickness={0.8}
          ior={1.5}
        />
      </mesh>

      {/* Temples */}
      <mesh position={[-0.35, 0, 0]} rotation={[0, 0, Math.PI / 5]}>
        <boxGeometry args={[0.5, 0.025, 0.025]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.9} 
          roughness={0.15}
        />
      </mesh>
      <mesh position={[0.35, 0, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <boxGeometry args={[0.5, 0.025, 0.025]} />
        <meshStandardMaterial 
          color="#2a2a2a" 
          metalness={0.9} 
          roughness={0.15}
        />
      </mesh>
    </group>
  )
}

export default function Showcase3D() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return (
    <section 
      id="showcase"
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-neutral-50 to-white py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
            Experience in 3D
          </h2>
          <p className="text-lg text-neutral-600">
            Rotate, explore, and discover every detail
          </p>
        </motion.div>

        <motion.div
          style={{ opacity, scale }}
          className="relative mx-auto aspect-square w-full max-w-2xl rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 p-8 shadow-2xl"
        >
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0, 3.5]} fov={45} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
            <directionalLight position={[-5, -5, -5]} intensity={0.4} />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <ShowcaseEyeglass />
            <Environment preset="sunset" />
          </Canvas>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-neutral-600">
            Scroll to see the model respond to your movement
          </p>
        </motion.div>
      </div>
    </section>
  )
}

