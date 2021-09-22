import './checklist.css';
import React from 'react';

export function CheckList({ items, id, type }){
    
    return (
       
        <fieldset className='checkList' id={id}>
            {items.map( item => {
                return (
                        <label htmlFor={type+item} key={type+item} className='checkListLabel'>
                            <input id={type+item} type="checkbox" name={item} />
                            <span className='checkListSpan'>{item}</span>
                        </label>
                )
            })}
        </fieldset>
    )
}

export default CheckList;