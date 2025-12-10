import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function Nav() {
  const { usuarioActual, logoutUsuario } = useContext(AppContext)
  const navigate = useNavigate()

  function handleLogout() {
    logoutUsuario()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-top">
        <h1 className="logo">Level-Up Gamer</h1>
        <p id="usuarioActual">{usuarioActual ? `Hola, ${usuarioActual.nombre}` : ''}</p>
        {usuarioActual ? (
          <button onClick={handleLogout} className="btn">Cerrar Sesión</button>
        ) : null}
      </div>

      <nav className="nav" id="mainNav">
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito</Link>
        <Link to="/blog">Blogs</Link>
        <Link to="/nosotros">Nosotros</Link>
        {!usuarioActual && <Link to="/register">Registro</Link>}
        {!usuarioActual && <Link to="/login">Login</Link>}
        {usuarioActual && usuarioActual.isAdmin && <Link to="/admin">Admin</Link>}
      </nav>
    </header>
  )
}