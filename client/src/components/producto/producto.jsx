import React,{ useEffect} from "react";
import {useDispatch, useSelector } from "react-redux";
import {deleteWhishlist, postWhishlist, getWhishlist} from "../../Actions";
import "./producto.css";
import { NavLink } from "react-router-dom";
import {payloadJWT} from '../../funciones/storage/payloadJWT'
import {IoIosCloseCircle } from "react-icons/io";

export default function Producto({ titulo, autor, img, precio, id, stock, promo}) {
  const dispatch = useDispatch()
  const token= window.localStorage.getItem('token')
  var user= payloadJWT()
  const wishlist = useSelector(state => state.whishlist)
 


useEffect(() => {
  dispatch(getWhishlist(token))
}, [wishlist])



function renderFav () {
 var url = window.location.href
 var listaDeseos = wishlist.map(e=>e.producto._id)
 var validateDeseo = listaDeseos.includes(id)
    if(stock==='whishlist' && url === 'http://localhost:3000/whishlist') {
      return (<IoIosCloseCircle className="eliminar_fav" onClick={()=>dispatch(deleteWhishlist(id,token))}/>)
    }
  if(user && !user.admin && stock!=='whishlist' && validateDeseo === true && url === 'http://localhost:3000/') {
    return (<button className="add_fav_red" onClick={()=>dispatch(postWhishlist(id,token))}>♥</button>)
  } else if(url === 'http://localhost:3000/' && validateDeseo === false){
    return (<button className="add_fav_gris" onClick={()=>dispatch(postWhishlist(id,token))}>♥</button>)
  }

}







  return (
    
    <div className="libro">
     {renderFav()}
      <NavLink style={{textDecoration:"none"}}className="libro_link" to={`/details/${id}`}>
      <div className="producto_descuento">
           {promo ? <p>Oferta</p>: null}
        </div>
      <div className="producto">
        <div>
          <img className="imagen" src={img} alt={titulo}></img>
        </div>
        <div>
          <h2 className="titulo">{titulo}</h2>
        </div>
        <div>
          <p className="autor">{autor}</p>
        </div>
        
        {stock >= 0? <div>
          <p className="precio"><span className="peso">$:</span> {precio}</p>
        </div>:(stock !== 'whishlist' && <div className="vacio">No hay unidades disponibles</div>)} 
      </div> 
      </NavLink>
    </div>
    
  );
}
