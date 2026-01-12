import { motion } from 'framer-motion'

const features = [
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Crafted with the finest materials and precision engineering for lasting durability and comfort.'
  },
  {
    icon: '🎨',
    title: 'Design Excellence',
    description: 'Timeless designs that blend fashion-forward aesthetics with classic elegance.'
  },
  {
    icon: '👓',
    title: 'Expert Fitting',
    description: 'Professional opticians ensure the perfect fit for optimal comfort and vision correction.'
  },
  {
    icon: '🛡️',
    title: 'Lifetime Warranty',
    description: 'Comprehensive warranty coverage with exceptional customer service and support.'
  },
  {
    icon: '🌍',
    title: 'Sustainable',
    description: 'Eco-friendly materials and ethical manufacturing practices for a better future.'
  },
  {
    icon: '💎',
    title: 'Luxury Experience',
    description: 'From consultation to delivery, experience the premium service you deserve.'
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
}

export default function WhyChooseUs() {
  return (
    <section id="about" className="min-h-screen bg-white py-20 px-4">
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
            Why Choose Us
          </h2>
          <p className="text-lg text-neutral-600">
            Excellence in every detail, commitment in every frame
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group rounded-2xl bg-neutral-50 p-8 transition-all duration-300 hover:bg-neutral-100 hover:shadow-lg"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-3 text-xl font-medium text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

