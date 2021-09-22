import React,{useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from "react-router";
import {useHistory} from 'react-router-dom'
import Select from 'react-select';
import {getProfile, profileUpdate } from '../../Actions/index';
import {deletePerfil} from '../../funciones/delete';
import { payloadJWT } from '../../funciones/storage/payloadJWT';
import swal from 'sweetalert';
import './perfil.css';

export default function Perfil() {

    const dispatch = useDispatch()
    const {id} = useParams();
    const history= useHistory()
    const state = useSelector(state => state.profile)
    const [foto, setfoto] = useState('')
    const [admin,setadmin]= useState('')


    
    var token=payloadJWT()
  

    function processImage(e){
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl.readAsDataURL(imageFile)
        imageUrl.onload=(e)=>{
        setfoto(e.target.result)
        };
    };

    async function deleteProfiles(){
        
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
        });
        if(mando){
            let token=window.localStorage.getItem('token')
            await deletePerfil(id,token) 
            swal ( " ¡Usuario Eliminado! " , { 
                icon: "success",
                botón : false , 
              } ) ;
            history.push('/profiles')                      
        };
    };

    function guardar(){
        token.admin? dispatch(profileUpdate(id,{admin})) : dispatch(profileUpdate(id,{foto}))
        setadmin('')
        setfoto('')
    }

    return (
       <div>
            <h2 className="perfil_usuario_titulo">Perfil del Usuario</h2>
            <div className="userContenedor">
                <div>
                <img className="fotoMarco" src={state.foto} alt='foto de perfil' />
                {!token.admin && <div className='realButton'><span>Cambia tu foto</span><input type="file" required accept="image/*" className='inputFoto' onChange={(e)=>processImage(e)}/></div>}
                {token.admin && admin.length===0 &&
                        <Select
                            className="select_user"
                            options={!state.admin? [{ value:'true',label:'Nombrar Administrador'}]:[{ value:'false',label:'Nombrar Usuario'}]}
                            onChange={(e)=>setadmin(e.value)}
                            placeholder='Cambiar Rol'
                        />}
                </div>
            <div className="table">
                <div className="childTable">
                
                    <p className="nombre_usuario_perfil">{`${state.nombre} ${state.apellido}`}</p>
                    <p className="email_perfil">E-Mail: <p>{state.email}</p></p>
                    <p className="rol_perfil">Rol: {state.admin? <p>Administrador</p> : <p>Usuario</p>}</p>
                    {token.admin && <button className="eliminar_usuario_perfil" onClick={()=>deleteProfiles()}>Eliminar</button>}
                    </div>
                   
                    {(admin.length>0 || foto.length>0) && <button onClick={()=>guardar()}>Guardar</button>}
                
            </div>
            </div>
            </div>
    )
}
