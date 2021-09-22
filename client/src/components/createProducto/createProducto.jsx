import React,{useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import {createBook, createGender} from '../../Actions/index'
import Form from '../form/form'


export default function CreateProducto(){
    const dispatch = useDispatch()
    const token= window.localStorage.getItem('token')
    const history= useHistory()
    
    const genderAll= useSelector(state=>state.genders)
    
//-----estado principal para enviar al post
    const [state, setstate] = useState({
        titulo:'',
        autor:'',
        editorial:'', 
        descripcion:'', 
        fecha:'',
        paginas:'',
        img:'',
        idioma:'',
        precio:'',
        stock:''
    });
//-----estado para colocar los multiples generos
    const [arrGender, setArrGender]= useState([])
//-----array para colocar los multiples generos

//------modifica el estado principal
    function handleChange(e){
        setstate({
            ...state,
            [e.target.name]:e.target.value
        });
    };

//----modifica el estado de los generos
    function handleGenders(e){
    setArrGender(e)
    }
//-----optiene la url de la imagen cargada
    function processImage(e){
        const imageFile = e.target.files[0];
        const imageUrl = new FileReader();
        imageUrl.readAsDataURL(imageFile)
        imageUrl.onload=(e)=>{
        setstate({...state, img: e.target.result, })
        };
    };
//------une todos los estado creando un obj y lo envia para el post, aca tambien se hace la creacion de genero
    function handleSubmit(e){
        e.preventDefault();
//------aca se revisa si en el estado de los generos hay alguno distinto al array de generos anterior para despachar la creacion
        arrGender.forEach(e => {
            if (genderAll.indexOf(e.value) === -1){
                return dispatch(createGender({genero:e.value},token))
            }

        
        });
        const generosValue= arrGender.map(e=>e.value)
        dispatch(createBook({...state,generos:generosValue},token))
        setstate({
            titulo:'',
            autor:'',
            editorial:'', 
            descripcion:'', 
            fecha:'',
            paginas:'', 
            precio:'',
            stock:''
        })    
        history.push('/')
    };

    return (
        <Form genderAll={genderAll} state={state} arrGender={arrGender}  handleGenders={handleGenders} handleChange={handleChange} handleSubmit={handleSubmit} processImage={processImage} />
    )
}
