import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import HomePage from './pages/HomePage'
import MenuPage from './pages/MenuPage'
import CategoryPage from './pages/CategoryPage'
import DinoPage from './pages/DinoPage' 
import AboutPage from './pages/AboutPage'
import CustomCursor from './components/CustomCursor'

function App() {
  // Show preloader only on first visit per session
  const [loading, setLoading] = useState(() => !sessionStorage.getItem('rita_visited'))

  const handlePreloaderDone = () => {
    sessionStorage.setItem('rita_visited', '1')
    setLoading(false)
  }

  return (
    <Router>
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderDone} />}
      </AnimatePresence>

      <motion.div
        className="min-h-screen bg-rita-black grain-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CustomCursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/menu/:slug" element={<CategoryPage />} />
          <Route path="/dino" element={<DinoPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1e1c1b',
              color: '#f0ebe3',
              border: '1px solid rgba(232,87,122,0.3)',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '14px',
            },
          }}
        />
      </motion.div>
    </Router>
  )
}
export default App
