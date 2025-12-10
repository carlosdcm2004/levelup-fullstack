import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function normalizeImg(img) {
  if (!img) return ''
  if (img.startsWith('/') || img.startsWith('http')) return img
  return `/${img}`
}

export default function ProductCard({ product }) {
  const { agregarAlCarrito } = useContext(AppContext)

  const handleAdd = () => {
    try {
      agregarAlCarrito(product.id)
      alert(`${product.nombre} agregado al carrito 🛒`)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="producto-card">
      <img src={normalizeImg(product.img)} alt={product.nombre} />
      <h3>{product.nombre}</h3>
      <p>${product.precio.toLocaleString()} CLP</p>
      <p className="descripcion">{product.descripcion}</p>
      <button className="btn" onClick={handleAdd}>Agregar al carrito</button>
    </div>
  )
}