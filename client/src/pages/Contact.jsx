import { motion } from 'framer-motion'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white"
    >
      <div className="pt-20">
        {/* Contact Section */}
        <section className="bg-gradient-to-b from-white to-neutral-50 py-20 px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12 text-center"
            >
              <h1 className="mb-4 text-5xl font-light tracking-tight text-neutral-900 md:text-6xl">
                Get in Touch
              </h1>
              <p className="text-lg text-neutral-600 md:text-xl">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid gap-8 md:grid-cols-2"
            >
              {/* Contact Form */}
              <div className="rounded-2xl bg-white p-8 shadow-lg">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full rounded-lg border border-neutral-300 px-4 py-3 focus:border-neutral-900 focus:outline-none"
                      placeholder="Your message"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full rounded-full bg-neutral-900 px-6 py-3 text-white transition-all hover:bg-neutral-800"
                  >
                    Send Message
                  </motion.button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-neutral-50 p-8">
                  <h3 className="mb-4 text-xl font-semibold text-neutral-900">Contact Information</h3>
                  <div className="space-y-4 text-neutral-600">
                    <div>
                      <p className="font-medium text-neutral-900">Address</p>
                      <p>123 Fashion Street</p>
                      <p>New York, NY 10001</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Phone</p>
                      <p>+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Email</p>
                      <p>info@ideeopticals.com</p>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">Hours</p>
                      <p>Mon - Sat: 9:00 AM - 7:00 PM</p>
                      <p>Sunday: 11:00 AM - 5:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </motion.div>
  )
}

