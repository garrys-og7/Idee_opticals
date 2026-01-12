import { motion } from 'framer-motion'
import WhyChooseUs from '../components/WhyChooseUs'
import Testimonials from '../components/Testimonials'

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-neutral-50 py-20 px-4">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 text-5xl font-light tracking-tight text-neutral-900 md:text-6xl"
            >
              About Idée Opticals
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-neutral-600 md:text-xl"
            >
              Crafting premium eyewear with precision, style, and uncompromising quality since 2010.
            </motion.p>
          </div>
        </section>

        <WhyChooseUs />
        <Testimonials />
      </div>
    </motion.div>
  )
}

