import React from 'react'
import Banner from '../components/Banner'
import ProductList from '../components/ProductList'

export default function Home() {
  return (
    <section>
      <Banner />
      <h2 style={{ marginTop: 16 }}>Productos Destacados</h2>
      <ProductList />
    </section>
  )
}