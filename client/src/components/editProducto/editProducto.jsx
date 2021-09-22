import {createGender} from '../../Actions/index'
import {editBook} from '../../funciones/edit'
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import React,{useState} from 'react';
import Form from '../form/form.jsx'
import { useParams } from "react-router";


export default function EditProduct (){
    const dispatch = useDispatch()
    const token= window.localStorage.getItem('token')
    const history= useHistory()
    
    const genderAll= useSelector(state=>state.genders)
    const bookDetail= useSelector(state=>state.details)

    const { id } = useParams();

 const {titulo, autor, editorial, descripcion, fecha, paginas, img, idioma, precio, stock}=bookDetail

//-----empieza con el form con los datos del obj para que edite solo los que quiera
    const [state, setstate] = useState({
        titulo,
        autor,
        editorial, 
        descripcion, 
        fecha:fecha.split('T')[0],
        paginas, 
        img,
        idioma,
        precio,
        stock
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
//------une todos los estado creando un obj y lo envia para el put para editar, aca tambien se hace la creacion de genero si hay nuevos
    function handleSubmit(e){
        e.preventDefault();
//------aca se revisa si en el estado de los generos hay alguno distinto al array de generos anterior para despachar la creacion
        arrGender.forEach(e => {
            if (genderAll.indexOf(e.value) === -1){
                return dispatch(createGender({genero:e.value},token))
            }
        });
        const generosValue= arrGender.map(e=>e.value)
        editBook({...state,generos:generosValue},id,token)
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
        setTimeout(() => {
            window.location.reload()
        }, 500);
    };

    return (
        <Form genderAll={genderAll} state={state}   handleGenders={handleGenders} handleChange={handleChange} handleSubmit={handleSubmit} processImage={processImage} />
    )
}
