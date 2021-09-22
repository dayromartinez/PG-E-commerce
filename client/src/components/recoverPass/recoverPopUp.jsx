import React, { useState } from 'react'
import ReactCircleModal from 'react-circle-modal'
import   './recoverPopUp.css'
import {passModifi, sendMail, changePass} from '../../funciones/login/recoverPass'


export default function RecoverPopUp (){
    const [aprove, setAprove] = useState(false)
    const [aprovePass, setAprovePass] = useState(false)

const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function validarEmail(e) {
    const valor = e.target.value
    let msgRecoverPass = document.getElementById('msgRecoverPass')
    let btnRecoverPass = document.getElementById('enviaPop')
    if (re.test(String(valor).toLowerCase())){
        setAprove(true) 
        btnRecoverPass.style.backgroundColor = 'rgb(244, 164, 96)'
        msgRecoverPass.style.color = 'green'
        msgRecoverPass.textContent = "La dirección de email " +  valor + " es correcta!."
    } else {
        setAprove(false) 
        btnRecoverPass.style.backgroundColor = 'grey'
        msgRecoverPass.style.color = 'red'
        msgRecoverPass.textContent = "La dirección de email es incorrecta!."
    }
}   

    function validarPass(){
        let newPassA = document.getElementById('newPassA')
        let newPassB = document.getElementById('newPassB')
        let enviaPass = document.getElementById('enviaPass')
        let msgNewPass = document.getElementById('msgNewPass')
        if(newPassA.value === newPassB.value){
            setAprovePass(true)
            enviaPass.style.backgroundColor = 'rgb(244, 164, 96)'
            msgNewPass.style.color = 'green'
            msgNewPass.textContent = "¡Perfecto!"
        }else{
            setAprovePass(false)
            enviaPass.style.backgroundColor = 'grey'
            msgNewPass.style.color = 'red'
            msgNewPass.textContent = "Las contraseñas deben ser iguales"
        }
        
    }


        

    async function handleSumbit(e){
        e.preventDefault()
        await sendMail(document.getElementById('inputMail').value)
            let pepeA = document.getElementById('pepeA')
            let pepeB = document.getElementById('pepeB')
            let pepeC = document.getElementById('pepeC')
            pepeA.style.opacity = '0';
            pepeA.style.zIndex = '1'; 

            pepeB.style.opacity = '1';
            pepeB.style.zIndex = '3'

            pepeC.style.opacity = '0'
            pepeC.style.zIndex = '2'
        }

        const handleClose = () => {
            let pepeA = document.getElementById('pepeA')
            let pepeB = document.getElementById('pepeB')
            let pepeC = document.getElementById('pepeC')
            pepeA.style.opacity = '1';
            pepeA.style.zIndex = '3'; 

            pepeB.style.opacity = '0';
            pepeB.style.zIndex = '2'

            pepeC.style.opacity = '0';
            pepeC.style.zIndex = '1'   
        }

        async  function handleSumbitModify (e){
            const a =  await passModifi(
            document.getElementById('code').value,
            document.getElementById('newPassA').value,
            document.getElementById('inputMail').value
            )
            if(a.msg === "Codigo enviado"){
                let pepeB = document.getElementById('pepeB')
                let pepeC = document.getElementById('pepeC') 
                pepeB.style.opacity = '0';
                pepeB.style.zIndex = '1'

                pepeC.style.opacity = '1';
                pepeC.style.zIndex = '2' 
            }else{
                alert(a.msg)
            }
        }

    async function sumbitNewPass (e){
        e.preventDefault()
        const a =  await changePass(
            document.getElementById('code').value,
            document.getElementById('newPassA').value,
            document.getElementById('inputMail').value
        )
        alert(a.msg)
        window.location.reload()
    }

    return (
        <ReactCircleModal 
        backgroundColor="rgb(244, 164, 96)"
        toogleComponent={onClick => (
            <button className="openPop" onClick={onClick}>
            ¿Olvidaste tu contraseña?
            </button>
        )}
        offsetX={0}
        offsetY={0}
        >
        {(onClick) => (
            <div className="pepe">
                <div id="pepeA">
                    <p>Escribe tu dirección de correo electrónico a continuación y recibirás una nueva clave:</p><br />
                    <p>¡Revisa la bandeja de entrada o tu casilla de spam en tu buzón de mensajes!</p>
                    <span id="msgRecoverPass"></span>
                    <input 
                    id="inputMail"
                    className="inputMail" 
                    type="text" 
                    placeholder="Escribe tu email..."
                    name="email"
                    changui="true"
                    onChange={validarEmail}
                    />
                    {aprove ? (<button id="enviaPop" onClick={handleSumbit}>Enviar</button>):(
                        <button id="enviaPop">nup :'C</button>
                    )}
                    
                    <button className="closePop" onClick={onClick}>Atras</button>
                </div>

                <div id="pepeB">
                    
                    
                    <input 
                    type="text"  
                    id='code'  
                    name="code" 
                    placeholder="Introduce aqui el codigo que enviamos a tu correo"
                    autoComplete="off"/>
                    <button className="enviaCode" onClick={handleSumbitModify}>Enviar</button>
                    <button className="buttonBack" onClick={handleClose}> Atras </button>
                </div>


                <div id="pepeC">
                    <input 
                    id='newPassA' 
                    className="newPass" 
                    name="newPassA" 
                    autoComplete="off" 
                    placeholder="introduzca la nueva contraseña"
                    type="password"
                    changui="true"
                    
                    onChange = {validarPass}
                    />

                    <span id="msgNewPass"></span>

                    <input type="password"
                    id="newPassB"
                    className="newPass"
                    autoComplete="off"
                    placeholder="Repita la contraseña"
                    changui="true"
                    
                    onChange = {validarPass}
                    />
                    <label id="msgNewPass"></label>
                    { aprovePass ? (<button className="buttonBack" id="enviaPass" onClick={sumbitNewPass}> Enviar </button>):(
                        <button className="buttonBack" id="enviaPass"> nope. </button>
                    )}
                    <button className="buttonBack" onClick={handleClose}> Atras </button>
                </div>

            </div>
        )}
        </ReactCircleModal>
    )
    }
    

