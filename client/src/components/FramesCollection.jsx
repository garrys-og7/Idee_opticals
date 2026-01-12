import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// Simple 3D Frame Model for Modal
function FrameModel3D({ color = '#2a2a2a' }) {
  const meshRef = useRef(null)

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return (
    <group ref={meshRef}>
      <mesh>
        <boxGeometry args={[0.5, 0.3, 0.05]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-0.2, 0, 0.02]}>
        <cylinderGeometry args={[0.12, 0.12, 0.01, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          transmission={0.9}
        />
      </mesh>
      <mesh position={[0.2, 0, 0.02]}>
        <cylinderGeometry args={[0.12, 0.12, 0.01, 32]} />
        <meshPhysicalMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.3}
          transmission={0.9}
        />
      </mesh>
    </group>
  )
}

// Frame Card Component
function FrameCard({ frame, index, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className="group cursor-pointer"
      onClick={() => onSelect(frame)}
    >
      <div className="relative overflow-hidden rounded-lg bg-neutral-100 p-8 transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
        {/* Placeholder for frame image */}
        <div className="mb-4 aspect-square w-full rounded bg-gradient-to-br from-neutral-200 to-neutral-300 flex items-center justify-center">
          <div className="text-6xl">👓</div>
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl font-medium text-neutral-900">{frame.name}</h3>
          <p className="text-sm text-neutral-500">{frame.category}</p>
          <p className="text-lg font-semibold text-neutral-900">{frame.price}</p>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-neutral-900/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          initial={false}
        />
      </div>
    </motion.div>
  )
}

// Modal Component
function FrameModal({ frame, onClose }) {
  if (!frame) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-4xl rounded-2xl bg-white p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-neutral-400 transition-colors hover:text-neutral-900"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="grid gap-8 md:grid-cols-2">
            {/* 3D Model */}
            <div className="aspect-square rounded-lg bg-neutral-100">
              <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={50} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <FrameModel3D color={frame.color} />
                <Environment preset="city" />
              </Canvas>
            </div>

            {/* Details */}
            <div className="flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-light text-neutral-900">{frame.name}</h2>
              <p className="text-neutral-500">{frame.category}</p>
              <p className="text-2xl font-semibold text-neutral-900">{frame.price}</p>
              <p className="text-neutral-600">
                Premium eyewear crafted with precision and attention to detail. 
                Experience the perfect blend of style and functionality.
              </p>
              <button className="mt-4 rounded-full bg-neutral-900 px-6 py-3 text-white transition-all hover:bg-neutral-800">
                Add to Cart
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function FramesCollection() {
  const [selectedFrame, setSelectedFrame] = useState(null)

  const frames = [
    { id: 1, name: 'Classic Aviator', category: 'Men', price: '$299', color: '#1a1a1a' },
    { id: 2, name: 'Modern Round', category: 'Women', price: '$349', color: '#3a3a3a' },
    { id: 3, name: 'Bold Square', category: 'Men', price: '$279', color: '#2a2a2a' },
    { id: 4, name: 'Elegant Cat-Eye', category: 'Women', price: '$379', color: '#4a4a4a' },
    { id: 5, name: 'Sporty Wrap', category: 'Men', price: '$329', color: '#1a1a1a' },
    { id: 6, name: 'Vintage Tortoise', category: 'Women', price: '$399', color: '#5a3a2a' },
    { id: 7, name: 'Kids Explorer', category: 'Kids', price: '$199', color: '#2a4a6a' },
    { id: 8, name: 'Teen Trend', category: 'Kids', price: '$229', color: '#3a2a4a' },
    { id: 9, name: 'Professional', category: 'Men', price: '$359', color: '#2a2a2a' },
  ]

  const categories = ['All', 'Men', 'Women', 'Kids']
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredFrames = activeCategory === 'All' 
    ? frames 
    : frames.filter(frame => frame.category === activeCategory)

  return (
    <section id="collection" className="min-h-screen bg-white py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-light tracking-tight text-neutral-900 md:text-5xl">
            Our Collection
          </h2>
          <p className="text-lg text-neutral-600">
            Discover frames that match your style and personality
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 flex justify-center gap-4"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Frames Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFrames.map((frame, index) => (
            <FrameCard
              key={frame.id}
              frame={frame}
              index={index}
              onSelect={setSelectedFrame}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <FrameModal frame={selectedFrame} onClose={() => setSelectedFrame(null)} />
    </section>
  )
}

