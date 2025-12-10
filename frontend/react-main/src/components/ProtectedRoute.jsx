import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { usuarioActual } = useContext(AppContext)

  if (!usuarioActual) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && !usuarioActual.isAdmin) {
    return <Navigate to="/" replace />
  }

  return children
}