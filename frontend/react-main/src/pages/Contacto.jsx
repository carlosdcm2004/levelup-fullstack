import React from 'react'

export default function Contacto() {
  return (
    <section>
      <h1>Contacto</h1>
      <form>
        <div>
          <label>Nombre: <input type="text" name="nombre" /></label>
        </div>
        <div>
          <label>Correo: <input type="email" name="correo" /></label>
        </div>
        <div>
          <label>Mensaje: <textarea name="mensaje" /></label>
        </div>
        <button type="submit" className="btn">Enviar</button>
      </form>
    </section>
  )
}