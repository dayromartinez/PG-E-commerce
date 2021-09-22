import React from 'react'
import { Link } from 'react-router-dom'
import './opcionesAdmin.css'

export default function OpcionesAdmin (){

    return (
        <div className="opcionesAdmin">
            <h1>Bienvenido Admin</h1>
             <Link to='/ordenes' style={{textDecoration:'none'}}><p className="ordenes">Órdenes de Compras</p></Link>
             <Link to='/profiles' style={{textDecoration:'none'}}><p className="perfiles">Perfiles de Usuarios</p></Link>
             <Link to='/add' style={{textDecoration:'none'}}><p className="agregar">Agregar Producto</p></Link>
             <Link to='/categorias' style={{textDecoration:'none'}}><p className="categorias">Categorias</p></Link>
             <Link to='/add_promo' style={{textDecoration:'none'}}><p className="categorias">Crear promocion</p></Link>
             <Link to='/promos' style={{textDecoration:'none'}}><p className="categorias">Promos vigentes</p></Link>
        </div>
    )
}