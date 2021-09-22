import React,{ useState }  from 'react';
import swal from 'sweetalert';
import newUser from '../../funciones/login/newUser'
import '../registerForm/registerForm.css'
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router';

export default function RegisterForm(){


    const history = useHistory();

    const [input, setInput] = useState({
        email:'',
        password:'',
        password_confirm:'',
        nombre:'',
        apellido:'',
        telefono:'',
        direccion:'',
        documento: '',
        
    });
        
        
    const handleInputChange = (e) => {

        setInput({
            ...input,  //Trae el estado anterior, para que no se pise con el nuevo estado.
            [e.target.name]: e.target.value
        });
    }
    const enviarInput =async (e) => {
        e.preventDefault();
        if(input.password===input.password_confirm){

            let a = await newUser(input);   
            setInput({
                email:'',
                password:'',
                password_confirm:'',
                nombre:'',
                apellido:'',
                telefono:'',
                direccion:'',
                documento: '',
            })

            a.token && window.localStorage.setItem("token", a.token);

            if(a.token){
                (swal({
                    title: "Registro realizado con éxito. ¡Bievenid@!",
                    icon: "success",
                }))


                history.push('/');
            }else{
                swal({
                    title: "El registro no ha sido exitoso. Inténtelo de nuevo.",
                    icon: "error",
                })
            }

        }else{
            if(input.password!==input.password_confirm) {           
                swal({
                    title: "Las contraseñas no coinciden",
                    icon: "error",
                })
            }
        }
       
        
        
        
    }



    //loggin google
    const respuestaGoogle = async (respuesta)=>{
       
        if(respuesta.profileObj){
            const login = {
                apellido: respuesta.profileObj.familyName,
                password: respuesta.profileObj.googleId,
                email: respuesta.profileObj.email,
                nombre: respuesta.profileObj.givenName,
                foto: respuesta.profileObj.imageUrl

            }
            let a= await newUser(login);   
            a.token && window.localStorage.setItem("token", a.token)
            if(a.token){
                (swal({
                    title: "Registro realizado con éxito. ¡Bievenid@!",
                    icon: "success",
                }))

                history.push('/');
            }else{
                (swal({
                    title: "El registro no ha sido exitoso. Inténtelo de nuevo.",
                    icon: "error",
                }))
            }
        }
    }
    
    return (
       
        <div className="logModalUser">
            <h1 className="regisTitulo">Completa tus Datos</h1>
            <div className="modal_dialog_user">
            <form  className="formLoginUser" onSubmit={enviarInput}>
                <div className="regisNombreApellido">
                    <div className="regisLeft">
                    <h3 >Nombre</h3>
                    <input  placeholder="Tu nombre..." name="nombre" autoComplete='off' required   value={input.nombre} onChange={handleInputChange} />
                    </div>
                <div className="regisRight">
                <h3>Apellido</h3>
                    <input  placeholder="Tu apellido..." name="apellido" autoComplete='off' required  value={input.apellido} onChange={handleInputChange} />
                    </div>
                </div>                
                <div className="contraseña">
                   <div className="regisLeft">
                   <h3>Contraseña</h3>
                   <input placeholder="Escribe tu contraseña..." name="password" autoComplete='off'  value={input.password} required minLength='6' type="password" onChange={handleInputChange}/>
                   </div>
                   <div className="regisRight">
                   <h3>Confirmar Contraseña</h3>
                   <input placeholder="Confirma tu contraseña..." name="password_confirm" autoComplete='off'  value={input.password_confirm} required minLength='6' type="password" onChange={handleInputChange}/>
                   </div>
                </div>
                <div className="telMail">
                   <div className="regisLeft">
                    <h3 className="regisEmail">Correo electrónico</h3>
                    <input placeholder="correo@mail.com" name="email" type="email" autoComplete='off' required value={input.email} onChange={handleInputChange}/>
                    </div>
                    <div className="regisRight">
                    <h3 className="regisTelefono">Teléfono</h3>
                    <input placeholder="Nro de Teléfono..." name="telefono" type="telefono" autoComplete='off' required value={input.telefono} onChange={handleInputChange}/>
                    </div>
                </div>
                 <div className="documentoDire">
                    <div className="regisLeft">
                    <h3 className="regisDocumento">Documento</h3>
                    <input placeholder="Documento..." name="documento" type="documento" autoComplete='off' required value={input.documento} onChange={handleInputChange}/>
                    </div>
                   <div className="regisRight"> 
                   <h3 className="regisDireccion">Dirección</h3>
                    <input className="direccion_input" placeholder="Pais / Cuidad, Calle, CP" name="direccion" type="direccion" autoComplete='off' required value={input.direccion} onChange={handleInputChange}/>
                   </div>
                 </div>
                 <div className="regisTerminos">
                    <input className="terminosCheck" type="checkbox"/>
                    <p className="regisCondiciones">Acepto los Términos y Condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad y la Autorización de Tratamiendo de Datos</p>
                </div>
                 <div>
                    <button type="submit" className="regisBtn" autoComplete='off'>Regístrate</button>
                </div>
                </form>
            
                <div>
                <GoogleLogin
                    clientId="1306055516-vqakgi1c0sql95der98ul0vpsufbppd9.apps.googleusercontent.com"
                    buttonText="Registrate con google"
                    onSuccess={respuestaGoogle}
                    onFailure={respuestaGoogle}
                    cookiePolicy={'single_host_origin'}
                    className="google_btn"
                />
                </div>
                 
                
        </div>
        </div>
    )
}