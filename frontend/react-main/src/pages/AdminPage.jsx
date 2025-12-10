import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function AdminPage() {
  const {
    usuarioActual, productos, usuarios,
    agregarProducto, editarProducto, eliminarProducto,
    toggleAdmin, eliminarUsuario
  } = useContext(AppContext)
  const navigate = useNavigate()

  // Si no hay usuario o no es admin, redirigir
  if (!usuarioActual || !usuarioActual.isAdmin) {
    navigate('/login')
    return null
  }

  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const categorias = useMemo(() => {
    const set = new Set(productos.map(p => p.categoria))
    return Array.from(set)
  }, [productos])

  const listaFiltrada = productos.filter(p => {
    if (filtroCategoria && p.categoria !== filtroCategoria) return false
    if (busqueda) {
      const b = busqueda.toLowerCase()
      return p.nombre.toLowerCase().includes(b) || p.descripcion.toLowerCase().includes(b)
    }
    return true
  })

  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoPrecio, setNuevoPrecio] = useState('')
  const [nuevaCategoria, setNuevaCategoria] = useState('')
  const [nuevaImagen, setNuevaImagen] = useState('')
  const [nuevaDescripcion, setNuevaDescripcion] = useState('')

  function handleAgregarProducto() {
    if (!nuevoNombre || !nuevoPrecio) {
      alert('Nombre y precio son requeridos')
      return
    }
    agregarProducto({
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      categoria: nuevaCategoria || 'Sin categoría',
      img: nuevaImagen || '/img/default.jpg',
      descripcion: nuevaDescripcion || ''
    })
    setNuevoNombre(''); setNuevoPrecio(''); setNuevaCategoria(''); setNuevaImagen(''); setNuevaDescripcion('')
  }

  function handleEditarProducto(id) {
    const producto = productos.find(p => p.id === id)
    if (!producto) return
    const nuevoNombre = prompt('Nuevo nombre:', producto.nombre)
    const nuevoPrecio = prompt('Nuevo precio:', producto.precio)
    const nuevaDesc = prompt('Nueva descripción:', producto.descripcion)
    editarProducto(id, {
      nombre: nuevoNombre || producto.nombre,
      precio: nuevoPrecio ? parseInt(nuevoPrecio) : producto.precio,
      descripcion: nuevaDesc || producto.descripcion
    })
  }

  return (
    <main>
      <h2>Panel de Administración</h2>

      <div className="filtros">
        <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input placeholder="Buscar..." value={busqueda} onChange={e => setBusqueda(e.target.value)} />
      </div>

      <div className="admin-form">
        <h3>Agregar nuevo producto</h3>
        <input value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} placeholder="Nombre del producto" />
        <input value={nuevoPrecio} onChange={e => setNuevoPrecio(e.target.value)} placeholder="Precio" type="number" />
        <input value={nuevaCategoria} onChange={e => setNuevaCategoria(e.target.value)} placeholder="Categoría" />
        <input value={nuevaImagen} onChange={e => setNuevaImagen(e.target.value)} placeholder="URL de la imagen (ej: /img/mi.jpg)" />
        <input value={nuevaDescripcion} onChange={e => setNuevaDescripcion(e.target.value)} placeholder="Descripción" />
        <button className="btn" onClick={handleAgregarProducto}>Agregar Producto</button>
      </div>

      <h3>Productos</h3>
      <div id="productosAdmin" className="productos-grid">
        {listaFiltrada.map(p => (
          <div key={p.id} className="producto-card">
            <img src={p.img} alt={p.nombre} />
            <h3>{p.nombre}</h3>
            <p>${p.precio.toLocaleString()} CLP</p>
            <p className="descripcion">{p.descripcion}</p>
            <button className="btn" onClick={() => handleEditarProducto(p.id)}>Editar</button>
            <button className="btn btn-danger" onClick={() => { if (confirm('¿Eliminar este producto?')) eliminarProducto(p.id) }}>Eliminar</button>
          </div>
        ))}
      </div>

      <h3>Usuarios Registrados</h3>
      <div id="usuariosAdmin">
        {usuarios.map((u, idx) => (
          <div key={idx} className="usuario-card">
            <p><strong>{u.nombre}</strong> - {u.email} - {u.isAdmin ? "ADMIN" : "Usuario"}</p>
            <button className="btn" onClick={() => {
              if (u.email === 'admin@levelup.com') return alert('No puedes modificar el admin principal')
              toggleAdmin(idx)
            }}>{u.isAdmin ? 'Quitar Admin' : 'Dar Admin'}</button>
            <button className="btn btn-danger" onClick={() => {
              if (u.email === 'admin@levelup.com') return alert('No puedes eliminar el admin principal')
              if (confirm(`¿Eliminar usuario ${u.nombre}?`)) eliminarUsuario(idx)
            }}>Eliminar Usuario</button>
          </div>
        ))}
      </div>
    </main>
  )
}