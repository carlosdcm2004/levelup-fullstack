import React from 'react'
import { Link } from 'react-router-dom'
// Si pones la imagen en public/img/banner-gamer.jpg usa la ruta '/img/banner-gamer.jpg'
// Si la pones en src/assets importala: import banner from '../assets/banner-gamer.jpg'
const banner = '/img/banner-gamer.jpg'

export default function Banner() {
  return (
    <section className="banner">
      <div className="rainbow-border">
        <div className="banner-texto">
          <h2>¡Desafía tus límites con Level-Up Gamer!</h2>
          <p>Explora, juega y gana con nosotros. Productos premium para gamers en Chile.</p>
          <Link to="/productos" className="btn">Ver Productos</Link>
        </div>
      </div>
      <img src={banner} alt="Banner Gamer" className="banner-img" />
    </section>
  )
}