import { motion } from 'framer-motion'
import FramesCollection from '../components/FramesCollection'

export default function Collection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="pt-20">
        <FramesCollection />
      </div>
    </motion.div>
  )
}

