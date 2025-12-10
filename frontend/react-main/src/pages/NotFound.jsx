import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section>
      <h1>404 — Página no encontrada</h1>
      <p>La ruta que buscas no existe. <Link to="/">Volver al inicio</Link></p>
    </section>
  )
}