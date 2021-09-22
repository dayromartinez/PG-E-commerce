import {categoryFilter, filterClear } from "../../Actions/index"
import { connect } from 'react-redux';
import React from 'react';
import CheckList from "../checklist/checklist";
import "./filter.css"

function categoryCheck() {
    let categoryBox = document.getElementById('categoryBox')
    let categoryList = document.getElementById('categoryList')
    if(categoryBox.checked) categoryList.style.display = 'flex';
    else categoryList.style.display = 'none';
}

export function Filter(props) {

    function genreCheckLooks() {
        let genreList = props.genders.map( category => {
            let gender = document.getElementById('C'+ category );
            if(gender.checked) {
                gender.checked = false;
                return category
            };
            return undefined;
        })
        genreList = genreList.filter( g => g !== undefined )
        props.categoryFilter(genreList)
    } 

    function categoryClear(e){
        e.preventDefault()
        props.filterClear()
    }

    return (
        <div className='categoryFilter'>
            <label htmlFor='categoryBox' className='categoryLabel'>
                <input 
                    type="checkbox" 
                    id="categoryBox" 
                    value="first_checkbox" 
                    className='categoryInput'
                    onChange={() => categoryCheck()}
                />
                
                <span className='radioSpan'>Generos ↓</span>
            </label>
            <CheckList items={props.genders} id='categoryList' type='C'/> 
            <button id='categoryButton' className='categoryButton' onClick={genreCheckLooks}>Filtrar</button>
            <button id='cleanButton' className='cleanButton' onClick={categoryClear}>Limpiar filtro</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        genders: state.genders
    }
}

export default connect ( mapStateToProps, { categoryFilter, filterClear } )(Filter);



