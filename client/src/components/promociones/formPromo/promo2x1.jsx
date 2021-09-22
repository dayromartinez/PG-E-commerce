import React from 'react'
import CreatableSelect from 'react-select/creatable';

export default function Promo2x1({dias, date, state, generos, diasPromo, opcionGenero, handleSubmit, handleDias, handleGenders, handleChange}) {
    return (
        <form>
            <h2>Producto gratis por candidad de compra</h2>
            <div>
                <h3>Duracion</h3>
                <p>Selecciona la fecha de inicio</p>
                <input type='date' name='fechaInicio' value={state.fechaInicio} require min={date} onChange={(e)=>handleChange(e)}/>
                <p>Selecciona la fecha de Fin</p>
                <input type='date' min={date} require name='fechaFinal' value={state.fechaFinal} onChange={(e)=>handleChange(e)}/>                
            </div>
            <div>
                <h3>Reglas</h3>
                <p>A partir de que cantidas de productos</p>
                <input type='number' min='0' name='cantidad' value={state.cantidad} require onChange={(e)=>handleChange(e)}/>
                <p>Cuantos productos gratis</p>
                <input type='number' min='0' name='gratis' value={state.gratis}  onChange={(e)=>handleChange(e)}/>    
                <p>Dias de Promocion</p>
                <CreatableSelect
                    options={dias}
                    placeholder="Seleccionar..."
                    isMulti
                    onChange={(e)=>handleDias(e)}
                />         
            </div>
            {state.fechaInicio && state.fechaFinal && diasPromo.length>0 && generos.length>0 && <button onClick={(e)=>handleSubmit(e)}>Crear</button>}
        </form>
    )
}
