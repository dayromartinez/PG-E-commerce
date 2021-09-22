import React,{useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {seeCart} from '../../Actions/index'
import {MapContainer, TileLayer} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './markers'
import { tiendas } from './iconMap/tiendas'
import { direccion } from '../../funciones/direccion'
import './sucursales.css'
import swal from 'sweetalert';
import undraw3 from "../../img/alfiler.png"
export default function Sucursales (){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(seeCart())
    }, [dispatch])

    function locationUser(){
        navigator.geolocation.getCurrentPosition(
            function(position){
                var search ={lat: position.coords.latitude,lng: position.coords.longitude}
                var sucursal= direccion(tiendas,search)
                // setState(sucursal)
                swal(sucursal.name, sucursal.direct,"info");
            },
            function(error){
                console.log(error)
            },
            {enableHighAccuracy:true}
            )
    }
    return <div>
        <div>
            <h2 className="sucTitle">Sucursales</h2>
            
            <div className="info">
            <p >Somos una de las librerias mas antiguas de Buenos Aires; actualmente contamos con 8 sucursales fisicas, no dudes en visitarnos, ¡Te esperamos!</p>
                    <p> permitenos saber tu ubicacion para buscar la sucursal mas cercana </p>  
                    <img className="imageGPS" src={undraw3} alt="img" onClick={()=>locationUser()}/>
            </div>
        </div>
        <div className='map'>
            <MapContainer center={{lat:'-34.598387932559795',lng: '-58.439818381557'}} zoom={13} scrollWheelZoom={true}>
                <TileLayer 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Markers />
            </MapContainer>            
        </div>
    </div>

}
