import React from 'react'
import { useParams } from 'react-router-dom'

const VIDEOS = {
  '1': 'https://www.youtube.com/embed/wf95Av3y00w',
  '2': 'https://www.youtube.com/embed/wJg9LuIsamA',
  '3': 'https://www.youtube.com/embed/XWKZqhBx1XA'
}

export default function Blog() {
  const { id } = useParams()
  const src = VIDEOS[id] || VIDEOS['1']

  return (
    <section>
      <h1>Blog</h1>
      <div style={{ width: '100%', borderRadius: 15, overflow: 'hidden' }}>
        <iframe
          width="100%"
          height="400"
          src={src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: 15 }}
        />
      </div>
      <p style={{ color: '#D3D3D3' }}>Explora los mejores accesorios gamer para maximizar tu rendimiento en los juegos.</p>
    </section>
  )
}