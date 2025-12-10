import React, { createContext, useEffect, useState } from 'react'

// Context central para usuarios, productos, carrito y funciones
export const AppContext = createContext()

export function AppProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    const fromLs = localStorage.getItem('usuarios')
    return fromLs ? JSON.parse(fromLs) : [
      { nombre: "Administrador", email: "admin@levelup.com", password: "admin123", isAdmin: true, puntos: 0 }
    ]
  })

  const [productos, setProductos] = useState(() => {
    const fromLs = localStorage.getItem('productos')
    if (fromLs) return JSON.parse(fromLs)
    return [
      {id:"JM001", categoria:"Juegos de Mesa", nombre:"Catan", precio:29990, img:"/img/catan.jpg", descripcion:"Juego de estrategia para 3-4 jugadores."},
      {id:"JM002", categoria:"Juegos de Mesa", nombre:"Carcassonne", precio:24990, img:"/img/carcassonne.jpg", descripcion:"Juego de colocación de fichas para 2-5 jugadores."},
      {id:"AC001", categoria:"Accesorios", nombre:"Controlador Xbox Series X", precio:59990, img:"/img/controlador.jpg", descripcion:"Cómodo y con botones mapeables."},
      {id:"AC002", categoria:"Accesorios", nombre:"Auriculares HyperX Cloud II", precio:79990, img:"/img/auriculares.jpg", descripcion:"Sonido envolvente con micrófono desmontable."},
      {id:"CO001", categoria:"Consolas", nombre:"PlayStation 5", precio:549990, img:"/img/ps5.jpg", descripcion:"Consola de última generación Sony."},
      {id:"CG001", categoria:"Computadores Gamers", nombre:"PC Gamer ASUS ROG Strix", precio:1299990, img:"/img/pc.jpg", descripcion:"Rendimiento excepcional para gamers exigentes."},
      {id:"SG001", categoria:"Sillas Gamers", nombre:"Silla Gamer Secretlab Titan", precio:349990, img:"/img/silla.jpg", descripcion:"Máximo confort y soporte ergonómico."},
      {id:"MS001", categoria:"Mouse", nombre:"Logitech G502 HERO", precio:49990, img:"/img/mouse.jpg", descripcion:"Sensor de alta precisión, botones personalizables."},
      {id:"MP001", categoria:"Mousepad", nombre:"Razer Goliathus Chroma", precio:29990, img:"/img/mousepad.jpg", descripcion:"Superficie suave con iluminación RGB."},
      {id:"PP001", categoria:"Poleras Personalizadas", nombre:"Polera Gamer Level-Up", precio:14990, img:"/img/polera.jpg", descripcion:"Personalizable con tu gamer tag."}
    ]
  })

  const [carrito, setCarrito] = useState(() => {
    const fromLs = localStorage.getItem('carrito')
    return fromLs ? JSON.parse(fromLs) : []
  })

  const [usuarioActual, setUsuarioActual] = useState(() => {
    const fromLs = localStorage.getItem('usuarioActual')
    return fromLs ? JSON.parse(fromLs) : null
  })

  // sincronizar con localStorage
  useEffect(() => localStorage.setItem('usuarios', JSON.stringify(usuarios)), [usuarios])
  useEffect(() => localStorage.setItem('productos', JSON.stringify(productos)), [productos])
  useEffect(() => localStorage.setItem('carrito', JSON.stringify(carrito)), [carrito])
  useEffect(() => localStorage.setItem('usuarioActual', JSON.stringify(usuarioActual)), [usuarioActual])

  // FUNCIONES: registro / login / logout
  function registrarUsuario({ nombre, email, password }) {
    if (usuarios.find(u => u.email === email)) {
      throw new Error('Usuario ya registrado')
    }
    const nuevo = { nombre, email, password, isAdmin: false, puntos: 0 }
    setUsuarios(prev => [...prev, nuevo])
  }

  function loginUsuario({ email, password }) {
    const user = usuarios.find(u => u.email === email && u.password === password)
    if (!user) throw new Error('Usuario o contraseña incorrecta')
    setUsuarioActual(user)
    return user
  }

  function logoutUsuario() {
    setUsuarioActual(null)
  }

  // CARRITO
  function agregarAlCarrito(idProducto) {
    if (!usuarioActual) {
      throw new Error('Debes iniciar sesión para agregar productos al carrito')
    }
    const producto = productos.find(p => p.id === idProducto)
    if (!producto) return
    setCarrito(prev => {
      const exists = prev.find(i => i.id === idProducto)
      if (exists) return prev.map(i => i.id === idProducto ? { ...i, cantidad: i.cantidad + 1 } : i)
      return [...prev, { ...producto, cantidad: 1 }]
    })
  }

  function eliminarDelCarrito(index) {
    setCarrito(prev => prev.filter((_, i) => i !== index))
  }

  // ADMIN: CRUD productos & usuarios
  function agregarProducto(productoData) {
    // crear id simple (mejorar en prod)
    const id = (productoData.categoria?.slice(0,2).toUpperCase() || 'PR') + (Math.floor(Math.random()*900)+100)
    const nuevo = { id, ...productoData }
    setProductos(prev => [...prev, nuevo])
  }

  function editarProducto(id, data) {
    setProductos(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  function eliminarProducto(id) {
    setProductos(prev => prev.filter(p => p.id !== id))
  }

  function toggleAdmin(index) {
    setUsuarios(prev => prev.map((u, i) => i === index ? { ...u, isAdmin: !u.isAdmin } : u))
  }

  function eliminarUsuario(index) {
    setUsuarios(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <AppContext.Provider value={{
      usuarios, productos, carrito, usuarioActual,
      registrarUsuario, loginUsuario, logoutUsuario,
      agregarAlCarrito, eliminarDelCarrito,
      agregarProducto, editarProducto, eliminarProducto,
      toggleAdmin, eliminarUsuario
    }}>
      {children}
    </AppContext.Provider>
  )
}