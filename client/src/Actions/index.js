export const GET_BOOKS = 'GET_BOOKS';
export const FIND_BYCATEGORY = 'FIND_BYCATEGORY';
export const DETAILS = 'DETAILS';
export const GET_GENDERS = 'GET_GENDERS';
export const CREATE_BOOK = 'CREATE_BOOK';
export const CREATE_GENDER = 'CREATE_GENDER';
export const ADD_CART = 'ADD_CART';
export const REMOVE_ONE_CART = 'REMOVE_ONE_CART';
export const REMOVE_ALL_CART = 'REMOVE_ALL_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const FILTER_CLEAR =   'FILTER_CLEAR'
export const ORDER_BOOKS =   'ORDER_BOOKS'
export const FILTER_BOOK = 'FILTER_BOOK'
export const SEARCH_BOOK = 'SEACRH_BOOK'
export const URL = "URL";
export const CHECKOUT_CART = 'CHECKOUT_CART';
export const SEE_CART = 'SEE_CART'
export const GET_ORDENES = 'GET_ORNDES';
export const ORDEN_DETAIL = 'ORDEN_DETAIL';
export const FILTER_PRICE = 'FILTER_PRICE';
export const FILTER_LANGUAGE = 'FILTER_LANGUAGE';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE2 = 'GET_PROFILE2';
export const GET_PROFILES ='GET_PROFILES';
export const DELETE_PROFILE = 'DELETE_PROFILE';
export const GET_PROMOS = 'GET_PROMOS';
export const WHISHLIST = 'WHISHLIST'




export function getAllBooks(){
    return function(dispatch){
        return fetch(`http://localhost:4000/productos`)
        .then(response=> response.json())
        .then(json=>{
            dispatch({
            type:GET_BOOKS,
            payload:json
            })
        });
}};

export function getGenders(){
  return async function(dispatch) {
      var genders= await fetch('http://localhost:4000/generos');
          genders= await genders.json();
      return dispatch({type:GET_GENDERS, payload:genders})
  };
};

export function createBook(payload,token){
  return async function (dispatch){
      var book= await fetch('http://localhost:4000/productos',{
          method: 'POST',
          headers:{
              'x-token':token,
              'Accept': 'application/json',
              'Content-type': 'application/json; charset=utf-8'
          },
          body: JSON.stringify(payload)
      })
      const res= await book.json();
      return dispatch ({type: CREATE_BOOK, payload:res});
  };
};



export function categoryFilter(generos){
  return{
      type: FIND_BYCATEGORY,
      payload:generos
      
  };
};


export function filterClear(){
  return{
    type:FILTER_CLEAR
  }; 
};

export function searchByName(titulo){
  return{
    type: SEARCH_BOOK,
    payload: titulo
  }
}

export function getDetails(id){
  return function(dispatch){
    return fetch(`http://localhost:4000/productos/${id}`)
      .then(response => response.json())
      .then(data =>{
        dispatch({
          type: DETAILS,
          payload: data
        })
      });
  }
};


export function createGender(payload,token) {
  return async function (dispatch) {
    var gender = await fetch("http://localhost:4000/generos", {
      method: "POST",
      headers: {
        "x-token": token,
        "Accept": "application/json",
        "Content-type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });
    gender = await gender.json();
    return dispatch({ type: CREATE_GENDER, payload: gender });
  };
}

export function addCart (id){
  return async function(dispatch) {
    var book= await fetch(`http://localhost:4000/cart/${id}`);
        book= await book.json();
    return dispatch({type:ADD_CART, payload:book})
  };
};

export function seeCart(){
  return{
    type: SEE_CART
  }
}

export function orderBooks(orden ) {
  
  return {
    type : ORDER_BOOKS,
    payload: orden
  }
}

export function removeOneCart(id){
  return {type:REMOVE_ONE_CART, payload:id}

}

export function removeAllCart(id){
  return {type:REMOVE_ALL_CART, payload:id}

}

export function clearCart(payload){

  return {
    type : CLEAR_CART
  }
}

export function addBuyUser (payload,token){
  return async function (dispatch) {
    await fetch ('http://localhost:4000/cart', {
      method: 'POST',
      headers:{
        'x-token': token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    return dispatch ({type: CLEAR_CART})
  };
};



export function filterBook(genero) {
  return {
    type: FILTER_BOOK,
    payload: genero,
  }
}

export function filterPrice(min,max,es,en) {
  return {
    type: FILTER_PRICE,
    payload: {min, max, es, en}
  }
}

export function filterLanguage(idioma) {
  return {
    type: FILTER_LANGUAGE,
    payload: idioma
  }
}

export function url(url) {
  return {
    type: URL,
    payload: url,
  }
};
export function getOrdenes(token){
  return async function(dispatch) {
    let ordenes= await fetch('http://localhost:4000/orden',{
      method:'GET',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
        ordenes= await ordenes.json();
    return dispatch({type:GET_ORDENES, payload:ordenes})
  };
}
export function getOrdenesID(id){
  return async function(dispatch) {
    let orden= await fetch(`http://localhost:4000/orden/${id}`);
        orden= await orden.json();
    return dispatch({type:ORDEN_DETAIL, payload:orden})
  };

}

export function getOrdenesUser(token){
  return async function (dispatch) {
    let ordenesUser= await fetch ('http://localhost:4000/auth/historyShopping', {
        method: 'GET',
        headers:{
          'x-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      ordenesUser= await ordenesUser.json()
      return dispatch ({type: GET_ORDENES, payload:ordenesUser})
    };
};

export function updateOrden(state,id,token){
  return async function (dispatch) {
    var updateState= await fetch (`http://localhost:4000/orden/${state}/${id}`, {
        method: 'post',
        headers:{
          'x-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      updateState= await updateState.json()
      return dispatch ({type:ORDEN_DETAIL, payload:updateState})
    };
};

export function getProfile (id){
  return async function (dispatch){
    var profile= await fetch (`http://localhost:4000/auth/profile/${id}`);
    profile= await profile.json();
    return dispatch({type: GET_PROFILE, payload:profile })
  };
};

export function getProfile2 (id){
  return async function (dispatch){
    var profile= await fetch (`http://localhost:4000/auth/profile/${id}`);
    profile= await profile.json();
    return dispatch({type: GET_PROFILE2, payload:profile })
  };
};

export function profileUpdate (id,payload){
  return async function (dispatch) {
    var profileUptate= await fetch (`http://localhost:4000/auth/profile/edit/${id}`, {
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
      profileUptate= await profileUptate.json()
      return dispatch ({type:GET_PROFILE, payload:profileUptate})
    };
};

export function getProfiles (){
  return async function (dispatch){
    var profiles= await fetch (`http://localhost:4000/auth/profiles`);
    profiles= await profiles.json();
    return dispatch({type: GET_PROFILES, payload:profiles})
  };
};

export function deleteProfile() {
  return {
    type: DELETE_PROFILE,
    
  }
};

export function getPromos (){
  return async function (dispatch){
    var promos= await fetch (`http://localhost:4000/promo`);
    promos= await promos.json();
    return dispatch({type: GET_PROMOS, payload:promos})
  };
};

export function getWhishlist(token) {
  return async function (dispatch){
    let whishlist = await fetch (`http://localhost:4000/auth/whishlist`,{
      method: 'GET',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
      whishlist =await whishlist.json()
      return dispatch({type:WHISHLIST, payload: whishlist})
  };
};

export function postWhishlist (idProducto,token){
  return async function (dispatch) {
    let whishlist= await fetch (`http://localhost:4000/auth/whishlist/${idProducto}`, {
        method: 'POST',
        headers:{
          'x-token':token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      whishlist= await whishlist.json()
      return dispatch ({type:WHISHLIST, payload:whishlist})
    };
};

export function deleteWhishlist (idProducto,token){
  return async function (dispatch) {
    let whishlist= await fetch (`http://localhost:4000/auth/whishlist/${idProducto}`, {
        method: 'DELETE',
        headers:{
          'x-token':token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      whishlist= await whishlist.json()
      return dispatch ({type:WHISHLIST, payload:whishlist})
    };
};