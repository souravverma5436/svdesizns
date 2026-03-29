import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Services from './pages/Services'
import Contact from './pages/Contact'

const CustomCursor = lazy(() => import('./components/CustomCursor'))
const ParticleBackground = lazy(() => import('./components/ParticleBackground'))

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-dark relative">
        <Suspense fallback={null}>
          <CustomCursor />
          <ParticleBackground />
        </Suspense>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              border: '1px solid rgba(99, 102, 241, 0.3)'
            }
          }}
        />
      </div>
    </Router>
  )
}

export default App
