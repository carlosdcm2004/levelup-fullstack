import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Cart() {
  const { carrito = [], eliminarDelCarrito } = useContext(AppContext)

  if (!carrito || carrito.length === 0) {
    return <p>Tu carrito está vacío</p>
  }

  const total = carrito.reduce((acc, item) => acc + (item.precio || 0) * (item.cantidad || 1), 0)

  return (
    <section id="carrito">
      {carrito.map((item, idx) => (
        <div key={idx} className="carrito-item">
          <img src={item.img} alt={item.nombre} style={{ width: 60 }} />
          <span>{item.nombre} x{item.cantidad}</span>
          <span>${(item.precio * item.cantidad).toLocaleString()} CLP</span>
          <button onClick={() => eliminarDelCarrito(idx)}>❌</button>
        </div>
      ))}

      <p style={{ marginTop: 12 }}><strong>Total: ${total.toLocaleString()} CLP</strong></p>
    </section>
  )
}