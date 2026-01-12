import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import FramesCollection from '../components/FramesCollection'
import Showcase3D from '../components/Showcase3D'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

// Lazy load heavy components for better performance
const LazyShowcase3D = lazy(() => Promise.resolve({ default: Showcase3D }))

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FramesCollection />
      <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white" />}>
        <LazyShowcase3D />
      </Suspense>
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </motion.div>
  )
}

