import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const year = new Date().getFullYear()

  function handleNewsletter(e) {
    e.preventDefault()
    const email = e.target.elements.email.value.trim()
    if (!email) {
      alert('Ingresa un correo válido')
      return
    }
    // Aquí podrías integrar una API o guardar en localStorage si quieres
    alert(`¡Gracias! Nos veremos en tu correo: ${email}`)
    e.target.reset()
  }

  return (
    <footer className="footer footer-site">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">Level-Up Gamer</div>
          <p className="footer-desc">
            Tienda y comunidad para gamers. Productos, reviews y ofertas en Chile.
          </p>
        </div>

        <nav className="footer-nav">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>

        <div className="footer-newsletter">
          <h4>Suscríbete</h4>
          <form onSubmit={handleNewsletter} className="newsletter-form">
            <input name="email" type="email" placeholder="Tu correo" aria-label="Correo" />
            <button type="submit" className="btn">Suscribirse</button>
          </form>

          <div className="social">
            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M23.498 6.186s-.232-1.636-.945-2.356c-.903-.956-1.917-.96-2.383-1.01C16.88 2.5 12 2.5 12 2.5s-4.88 0-8.17.32c-.466.05-1.48.054-2.383 1.01C.732 4.55.5 6.186.5 6.186S.25 8.02.25 9.854v4.293c0 1.834.25 3.668.25 3.668s.232 1.636.945 2.356c.903.956 2.089.926 2.613 1.028C7.12 21.5 12 21.5 12 21.5s4.88 0 8.17-.32c.524-.102 1.71-.072 2.613-1.028.713-.72.945-2.356.945-2.356s.25-1.834.25-3.668V9.854c0-1.834-.25-3.668-.25-3.668zM9.75 15.02V8.98l6 3.02-6 3.04z"/>
              </svg>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M22 5.92c-.66.3-1.37.5-2.11.6.76-.46 1.35-1.2 1.63-2.08-.71.42-1.5.72-2.34.88C18.5 4.2 17.3 3.5 16 3.5c-2.4 0-4.35 1.95-4.35 4.35 0 .34.04.67.11.99C7.7 8.64 4.07 6.8 1.64 3.9c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.93 3.6-.62-.02-1.2-.19-1.7-.48v.05c0 2.1 1.5 3.86 3.48 4.26-.36.1-.74.16-1.13.16-.28 0-.55-.03-.82-.08.55 1.72 2.1 2.98 3.95 3.02-1.45 1.14-3.28 1.81-5.27 1.81-.34 0-.68-.02-1.01-.06 1.87 1.2 4.09 1.88 6.48 1.88 7.76 0 12.02-6.43 12.02-12.02 0-.18 0-.35-.01-.53.82-.6 1.52-1.35 2.08-2.2-.76.34-1.57.57-2.42.67z"/>
              </svg>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 7.2A4.8 4.8 0 1 0 12 16.8 4.8 4.8 0 1 0 12 7.2zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2zM17.7 6.1a1.12 1.12 0 1 1-2.24 0 1.12 1.12 0 0 1 2.24 0z"/><path d="M20.5 3H3.5A2.5 2.5 0 0 0 1 5.5v15A2.5 2.5 0 0 0 3.5 23h17a2.5 2.5 0 0 0 2.5-2.5v-15A2.5 2.5 0 0 0 20.5 3zm0 2.5v3.3c-.1.1-.2.2-.4.3-.5.2-.9.3-1.4.4-.5.1-1 .2-1.6.2-1.1.1-2.2.2-3.3.2s-2.2-.1-3.3-.2c-.6-.1-1.1-.1-1.6-.2-.5-.1-.9-.2-1.4-.4-.2-.1-.3-.2-.4-.3V5.5H20.5z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {year} Level-Up Gamer. Todos los derechos reservados.</small>
      </div>
    </footer>
  )
}