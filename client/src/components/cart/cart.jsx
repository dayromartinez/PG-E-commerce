import React from 'react'
import { NavLink } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import {IoMdRemoveCircleOutline, IoMdAddCircleOutline, IoIosCloseCircle } from "react-icons/io";
import './cart.css'
import {addCart,removeAllCart, clearCart, removeOneCart} from '../../Actions/index'

export default function Cart() {
    const dispatch = useDispatch()
    const carts = useSelector((state)=>state.cart)
    const arrayCart=[]
    
    var totalPrecio = 0;  

    for (const i in carts) {
        arrayCart.push(carts[i]);
        totalPrecio += carts[i].precio*carts[i].count   
    }
    // const [rightBarState, setrightBarState] = useState(true);
    function rightBarFunction(){
        let rightNavBar = document.getElementById('rightNavBar');

        rightNavBar.style.top = '-100vh';
    }

    return (
        <div className="contenedor_cart">
        <div className="cart_contenedor">
            <h3>Carrito de compras</h3>
            {arrayCart.length > 0 ? (<div>
                
                {arrayCart.map(e=>{
                return (<div key={e._id} className="cart">
                    <IoIosCloseCircle className='cartsButton' onClick={()=> dispatch(removeAllCart(e._id, e.count))}/>
                       <div className="cart_info">
                       <p id={'details' + e._id} className="contador">x{e.count}</p>
                       <div className="cart_data">
                        <p className="titulo_cart">{e.titulo}</p>
                        <p className="autor_cart">{e.autor}</p></div>
                        <div className="cart_peso">
                        <p className="cart_precio"><span className="peso_cart">$</span>{e.precio}</p>  
                        </div>
                       </div>
                        <div className="btn_add">
                            {e.count < e.stock ? <IoMdAddCircleOutline className='carts_add' onClick={ () => dispatch(addCart(e._id)) }/> : null }
                           <IoMdRemoveCircleOutline className='carts_add_red' onClick={()=> dispatch(removeOneCart(e._id,e.count))}/>
                        </div>    
                                    
                    </div>)
                })
                } 
            </div>) : (<div className="carrito_vacio"><p>Tu carrito está vacío</p>
                <p>¿No sabés qué comprar? ¡Miles de libros te esperan!</p> 
                </div>)
            }    
            
        </div>
            {
                arrayCart.length !== 0 ? (
                <div> 
                    <p className="total_cart"><span className="cart_total">Total:</span> <span className="total_peso">$</span>{totalPrecio.toFixed(2)} </p> <hr className="cart_linea"/>
                    <div >
                        <button className="btn_confirm" onClick={rightBarFunction}><NavLink to='/check' style={{textDecoration:"none"}}><span className="confirm_text">Confirmar</span></NavLink></button>
                    </div>   
                    <button className='cart_limpiar' onClick={()=> dispatch(clearCart(arrayCart))}>Limpiar Carrito</button>
                </div>) : null
            }
        </div>
    )
}