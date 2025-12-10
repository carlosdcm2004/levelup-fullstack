import React, { useContext, useMemo, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from './ProductCard'

export default function ProductList() {
  const { productos } = useContext(AppContext)
  const [categoria, setCategoria] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const categorias = useMemo(() => {
    const set = new Set(productos.map(p => p.categoria))
    return Array.from(set)
  }, [productos])

  const listaFiltrada = productos.filter(p => {
    if (categoria && p.categoria !== categoria) return false
    if (busqueda) {
      const b = busqueda.toLowerCase()
      return p.nombre.toLowerCase().includes(b) || (p.descripcion && p.descripcion.toLowerCase().includes(b))
    }
    return true
  })

  return (
    <section>
      <div className="filtros">
        <select value={categoria} onChange={e => setCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          placeholder="Buscar..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
        />
      </div>

      <div id="productos" className="productos-grid">
        {listaFiltrada.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  )
}