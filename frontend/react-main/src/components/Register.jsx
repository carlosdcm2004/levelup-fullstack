import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function Register() {
  const { registrarUsuario } = useContext(AppContext)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    try {
      registrarUsuario({ nombre, email, password })
      alert('Registro exitoso')
      navigate('/login')
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <input placeholder="Nombre" value={nombre} onChange={e=>setNombre(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button className="btn" type="submit">Registrar</button>
    </form>
  )
}