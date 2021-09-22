import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, getAllBooks, getGenders, orderBooks, searchByName, filterPrice, filterLanguage, deleteProfile } from "../../Actions/index";
import './navBar.css'
import { MdMenu, MdShoppingCart, MdAccountCircle } from "react-icons/md";
import { RiSoundModuleFill  } from "react-icons/ri";
import { BsArrowLeftRight } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { NavLink } from "react-router-dom"; 
import Cart from '../cart/cart'
import LoginForms  from "../loginForm/loginForms.jsx"; 
import {logaut} from "../../funciones/login/logaut"
import Logo from "../../img/Logo-principal.png"
import { useHistory } from "react-router";
import { payloadJWT } from '../../funciones/storage/payloadJWT'
import OpcionesUser from '../opciones/opcionesUser'
import OpcionesAdmin from "../opciones/opcionesAdmin";

export default function NavBar() {
    const profileImg = useSelector(state => state.profile)
    const dispatch = useDispatch();
    const orderAllBooks = useSelector((state) => state.filteredAllBooks);
    const url = useSelector((state) => state.url);
    const carts = useSelector((state)=>state.cart);
    const history = useHistory();
    
  
      var user=payloadJWT()
      if(!profileImg.foto && user) {
        dispatch(getProfile(user.uid))
      }
      
  
    
    useEffect(() => {
        dispatch(getAllBooks())
        dispatch(getGenders())
    },[dispatch])

    const [leftBarState, setleftBarState] = useState(false);
    function leftBarFunction(){
      
      let leftNavBar = document.getElementById('leftNavBar');
      if( leftBarState ){
        leftNavBar.style.left = '-400px';
        setleftBarState(false);
      }else{
        leftNavBar.style.left = '0px';
        setleftBarState(true);
      }
      
    }
    

    const [rightBarState, setrightBarState] = useState(false);
    function rightBarFunction(){
      let rightNavBar = document.getElementById('rightNavBar');
      <Cart/>
      if( rightBarState ){
        
        rightNavBar.style.top = '-100vh';
        setrightBarState(false);

      }else{
        
        rightNavBar.style.top = '0px';
        setrightBarState(true);
      }
    }

    const [loginBarState, setloginBarState] = useState(false);
    function loginBarFunction(){
      let loginNavBar = document.getElementById('loginNavBar');
      if( loginBarState ){
        loginNavBar.style.top = '-100vh';
        setloginBarState(false);
      }else{
        loginNavBar.style.top = '0px';
        setloginBarState(true);
      }
    }
    

  //Ordenado
  const [state, setState] = useState([]);
  const selectOptionOrder = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };
    
  useEffect(() => {
    dispatch(orderBooks(state.select, orderAllBooks))
    // eslint-disable-next-line
  }, [state.select])

  //busqueda
  const[busqueda, setBusqueda] = useState("")
  const handleChange = e =>{ 
    setBusqueda(e.target.value);
    dispatch(searchByName(e.target.value));
  }

  const handleChangePrecio = () =>{
    let campoMin = Number(document.getElementById('min').value)
    let campoMax = Number(document.getElementById('max').value)
    let es = document.getElementById('es').checked
    let en = document.getElementById('en').checked
    let button_filtrar_precio = document.getElementById('button_filtrar_precio')

    if((campoMin && campoMax && campoMin >= campoMax) || !campoMin || !campoMax){
      button_filtrar_precio.className = "button_filtrar_precio_inactivo";
    }else{
      button_filtrar_precio.className = "button_filtrar_precio_activo";
    }
    if(!campoMin && !campoMax){
      button_filtrar_precio.className = "button_filtrar_precio_activo"
    }
    if(!campoMin && !campoMax && !es && !en){
      button_filtrar_precio.className = "button_filtrar_precio_inactivo";
    }
  }

  //evento onclick del boton de filtrar por precio
  const handleSubmit = (e) => {
    e.preventDefault();
    let campoMin = document.getElementById('min').value
    let campoMax = document.getElementById('max').value
    let es = document.getElementById('es').checked
    let en = document.getElementById('en').checked

    dispatch(filterPrice(campoMin, campoMax, es, en));
  }

  //POP-UP DE LOGIN
  const openModal = async() => {
    let logModal = document.getElementById('logModal')
    let ninjaButton = document.getElementById('buttonsForms')
    ninjaButton.style.opacity = '0';
    ninjaButton.style.zIndex = '1'
    logModal.style.opacity = '1';
    logModal.style.zIndex = '2'
  }
  /* POP-UP DE REGISTRO */

  const openRegisModal = () => {
    loginBarFunction();
    history.push('/registerUser')
  }
  
  const locaLogout = () => {
    dispatch(deleteProfile())
    logaut();
    loginBarFunction();
    history.push('/');
  }

  return (
  <div className="nav_principal">
    <div>
    <div className='mainNavBar'>
      {url === "http://localhost:3000/" ? (
        <div>
        
        <button className = {leftBarState ? "leftNavBarButton_active" : "leftNavBarButton_inactive"} onClick={ leftBarFunction }>
            <MdMenu className="icono_nav"/>
        </button>
            <div id='leftNavBar'>
              <h2 className="titulo_leftNavBar">Catálogo</h2>
            <div className="botonesPaginadoOrdenado">

                <div className="contenedor_filtrado">
                  <div className="filtrado_leftNavBar">
                    <RiSoundModuleFill className="filtrado_icon"/>
                    <h3 className="titulo_filtrado">Filtrar</h3>
                  </div>

                  <div className="filtrado_precio">
                    <h3 className="titulo_filtrado_precio">Precio</h3>
                    <div className="menu_filtrado_precio">
                      <input className="precio_min_input" type="number" required placeholder="Mínimo" id='min' onChange={handleChangePrecio}></input>
                      <BsArrowLeftRight className="precio_icon"/>
                      <input className="precio_max_input" type="number" required placeholder="Máximo" id='max' onChange={handleChangePrecio}></input>
                    </div>
                    <button id='button_filtrar_precio' className="button_filtrar_precio_inactivo" onClick={handleSubmit}>Filtrar</button>
                  </div>

                  <div className="filtrado_idioma">
                    <h3 className="titulo_filtrado_idioma">Idioma</h3>
                    <div className="menu_filtrado_idioma">
                      <div className="checkbox_filtro_idioma_es">
                        <p>Español</p>
                        <input type='checkbox' id='es' onChange={handleChangePrecio}></input>
                      </div>
                      <div>
                        <p>Inglés</p>
                        <input type='checkbox' id='en' onChange={handleChangePrecio}></input>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contenedor_ordenado">
                    <h3 className="titulo_ordenado">Ordenar por:</h3>
                    <select id="select" onChange={selectOptionOrder}>
                    <option defaultValue>Selecionar</option>
                    <option id="A-Z" value="A-Z">
                        A - Z
                    </option>
                    <option value="Z-A">Z - A</option>

                    <option value="Mayor_Precio">Mayor a menor precio</option>
                    <option value="Menor_Precio">Menor a mayor precio</option>
                    </select>
                </div>
                </div>
              </div>
            </div>
      ) : null} 
      
                <div className='searchMenu'>
                    
                </div>
    <div className="titulo_principal">
      <NavLink  className="titulo_b" to={'/'}>
      <img alt="logo" className="img_logo_nav" src={Logo}/>
      </NavLink>
            
        </div>  
        
        <div className="searchBar">
        <BiSearchAlt className="search-btn"/>
        <input className="search-input" type="text" placeholder="Buscar por título o autor..."
        autoComplete="on"
        value={busqueda}
        onChange={handleChange}/>
        </div>
        {user && !user.admin && <button className="favoritos_button_home"><NavLink to='/whishlist' style={{textDecoration: "none", color:"white"}}>Lista de Deseos</NavLink></button>}
        <button className="sucursales_button_home"><NavLink to='/sucursales' style={{textDecoration: "none", color:"white"}}>Sucursales</NavLink></button>
          
          
          <div className="icono_Usuario">
          <div id={loginBarState? "loginNavBarbutton_active" : "loginNavBarbutton_inactive"} className="loginNavBarbutton" onClick={ loginBarFunction }>
          {user && user.uid ? <img className='profileImg' src={profileImg.foto} alt="imagen de perfil" /> : <MdAccountCircle/>}
          </div>
  <div id ="loginNavBar">

    <div id ="buttonsForms" >
      {!user?(<div>
         <button onClick={openModal} className="userLoginButton">Acceder</button>
         <button className="userLoginButton" onClick={openRegisModal}>Registrarse</button>
        </div>
       ):
      (<div>
        {user? user.admin ? <OpcionesAdmin /> : <OpcionesUser/>: null}
        <button onClick={locaLogout}  className="userLoginButtonSesion"> Cerrar Sesión </button>
        </div>)}

    </div>
    <LoginForms loginBarFunction={loginBarFunction} />
    

</div>
</div>

       </div>
          { user && user.admin ? false : <div>

            <div id={rightBarState? "rightNavBarButton_active" : "rightNavBarButton_inactive"} className="rightNavBarButton" onClick={ rightBarFunction }>
            <MdShoppingCart className="icono_nav_der"/> <span className="numero_icono">{Object.values(carts).length}</span>
            </div>           
            <div id ="rightNavBar">
            <Cart/>
            </div>
          </div> }


        </div>
      
    </div> 
  );
}


