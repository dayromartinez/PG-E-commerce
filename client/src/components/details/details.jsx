import './details.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router";
import { getDetails, url, addCart, seeCart, getPromos} from '../../Actions';
import { NavLink } from 'react-router-dom';
import ReviewForm from './review/reviewForm/reviewForm';
import gif_carga from "../../img/libros_paginas.gif";
import {payloadJWT} from "../../funciones/storage/payloadJWT"
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';
import { deleteBook } from '../../funciones/delete';
// import { MdCompareArrows } from 'react-icons/md';






export default function Details() {
    
    const dispatch = useDispatch();
    const details = useSelector((state) => state.details);
    const { id } = useParams();
    const history= useHistory()
    var token=window.localStorage.getItem('token')
    const promo = useSelector((state) => state.promo);
    

    
    if(promo.length > 0) {
        var fechaInicio = promo.map(e=> e.fechaInicio.split('T')[0])
        
        
    }

   var date = new Date();
   date=date.toISOString().split('T')[0]
   

   if(details.generos) {

    
    function validarPromo ()  {  
    var promoValidate = {
        validate: false,
    };
    promo.forEach(p => { 
        p.genero.forEach(genero=> {
            
            details.generos.forEach(gen=> {
                
                if(gen === genero) {
                    if(date >= p.fechaInicio.split('T')[0] && date <= p.fechaFinal.split('T')[0]) {
                        promoValidate = {
                           validate: true,
                           descuento: p.porcentaje 
                        };
                        
                    }  
                }
            })
        })
    })
    return promoValidate;

    }
    var promoValida = validarPromo();
    
    console.log(promoValida)
}


    const { titulo, autor, editorial, descripcion, fecha, paginas, generos, img, idioma, stock, precio, _id, review } = details;
        
    var a=payloadJWT()

    useEffect(() => {
        dispatch(getDetails(id));
        dispatch(url(window.location.href))
        dispatch(seeCart())
        dispatch(getPromos())
    }, [dispatch, id]);
    
    function comprarBoton(){
        let contadorCarrito = document.getElementById('details' + id)
        if(contadorCarrito){
            contadorCarrito = contadorCarrito.innerHTML
            contadorCarrito = Number(contadorCarrito.substring(1))
        }else{
            contadorCarrito = 1
        }
        if(contadorCarrito < stock){
            dispatch(addCart(id))
        }else{
            swal ( " ¡No hay más libros en Stock! " , { 
                icon: "error",
                botón : false , 
            } ) ;
        }
    }

    if(review) {
            
        var estrellas = (estrellita) => {
            let estrellas = [];
            for (let i = 0; i < estrellita; i++) {
                estrellas.push(<p className="estrellas">★</p>)
            }
            return estrellas
        }  
    }

    async function removeBook(id,token){
        var mando= await swal ( " ¿Seguro que quieres eliminarlo? " , { 
            dangerMode: true,
            buttons: {
                cancel: {
                    text: "Cancel",
                    value: false,
                    visible: true,
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    closeModal: true
                }
            }
        })
        if(mando){
            await deleteBook(id,token) 
            swal ( " ¡Producto Eliminado! " , { 
                icon: "success",
                botón : false , 
            } ) ;
            history.push('/')                      
        }
    }

    if(titulo) {
        
        return (
            <div className='details'>
                <div className="detalles_izq">
                    <img className="imagen_detail" src={img} alt={`imagen de portada del libro: ${titulo}`} />
                    
                    <h3 className="autor_detail">{autor}</h3>
                    <div className="detail_info">
                        <div>
                            <p className="generos_detail">Generos:</p>
                            <p className="detail_texto">{generos.join(", ")}</p>
                        </div>
                        <div>
                            <p>Idioma: </p>
                            <p className="detail_texto"> {idioma}</p>
                        </div>
                        <div>
                            <p >Paginas: </p>
                            <p className="detail_texto">{paginas}</p>
                        </div>
                        <div>
                            <p>Publicación:</p>
                            <p className="detail_texto">{new Date(fecha).toDateString()}</p>
                        </div> 
                        { a && a.admin? <button className="boton_editar"><NavLink className="btn_editar" style={{textDecoration:'none'}} to={`/edit/${_id}`} >Edit</NavLink></button>:null}
                    </div>
                </div>
                <div className="contenido_details">
                    <div className="comprar">
                        {a && a.admin ? false : <button className={stock<= 0? "vacio_detail": "comprar_detail"} onClick={comprarBoton}>Comprar</button>}
                    </div>
                    {a && a.admin && <button className="btn_Eliminar"onClick={()=> removeBook(id,token)}>Eliminar</button> }
                    <h2 className="titulo_detail">{titulo}</h2>
                    <div className="autor_editorial">
                        <h3 className="autor_detail_der">{autor}</h3>
                        <p className="guion_der">-</p>
                        <p className="editorial_der">{editorial}</p>
                    </div>
                    <div className='precio_detalle'>
                        
                        {promoValida.validate === false ?
                        <div>
                        
                        <p className="precio_numero">{precio}</p> 
                        </div> 
                       :
                       <div>
                        <div className="precios_descuento">
                        <p className="precio_peso">$</p>
                        <p className="precio_promo">{(Math.round(precio - (precio * (promoValida.descuento / 100))))}</p>
                        </div>
                        <p className="precio_numero_tachado">$ {precio}</p>
                        <p className="ahorro">Ahorras: ${Math.round(precio * (promoValida.descuento / 100))}</p>
                        </div>
                        }
                        
                    </div>
                    <div className='stock'>
                        <p className={stock<= 0? "stock_vacio": "stock_unidad"}>{stock<=0? "No hay unidades disponibles":`Quedan ${stock} unidades`}</p>
                    </div>
                    <div className='descripcion'>
                        <p className="descripcion_titulo">Reseña del Libro</p>
                        <p className="descripcion_contenido">{descripcion}</p>
                      
                    </div>
                    <div className="opiniones">
                    <h2 className="titulo_valoracion">Opiniones de nuestros lectores</h2>
                    {review &&  <div> 
                        {review.map((r,i)=> { return (
                            <div key={i} className="valoraciones">
                            <h4>{r.nombre + " " + r.apellido}</h4>
                            <p>{estrellas(r.valoracion)}</p>
                            <p className="comentario_usuario">" {r.comentario} "</p>
                            </div>
                            
                        )
                        })}
                        </div>
                        }
                    </div>
                    {a && !a.admin && <div><ReviewForm /></div>}
                </div>
            </div>
        )
    } else {
        return <img src={gif_carga} alt="Cargando..."/>
    }
}