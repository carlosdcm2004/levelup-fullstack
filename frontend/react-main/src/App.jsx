import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Nosotros from './pages/Nosotros'
import Blog from './pages/Blog'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import './App.css'
import './styles/styles.css'
import './styles/admin.css'
import './index.css'
import './styles/footer.css'



export default function App() {
  return (
    <>
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </main>
    </>
  )
}