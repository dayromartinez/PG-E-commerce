import {localStore} from '../funciones/storage/localStoreFunction'
import {
    GET_BOOKS,
    FIND_BYCATEGORY,
    DETAILS,
    GET_GENDERS,
    CREATE_GENDER,
    CREATE_BOOK,
    ADD_CART,
    REMOVE_ONE_CART,
    REMOVE_ALL_CART,
    CLEAR_CART,
    FILTER_CLEAR,
    ORDER_BOOKS,
    FILTER_BOOK,
    SEARCH_BOOK,
    URL,
    SEE_CART,
    GET_ORDENES,
    ORDEN_DETAIL,
    FILTER_PRICE,
    FILTER_LANGUAGE,
    GET_PROFILE,
    GET_PROFILE2,
    GET_PROFILES,
    DELETE_PROFILE,
    GET_PROMOS,
    WHISHLIST,
} from '../Actions/index';


const initialState = {
    allBooks: [],
    filteredAllBooks: [],
    inputBooks: false,
    genders:[],  
    details: {},
    cart: {},
    user: {},
    book: undefined,
    url: "",
    forRender:0,
    ordenes:[],
    ordenDetail:{},
    profiles:[],
    profile:{},
    profile2:{},
    promo:[],
    whishlist:[]
};


function rootReducer(state = initialState, action) {


    switch (action.type) {

        case GET_BOOKS:
            return{
                ...state,
                allBooks: action.payload,
                filteredAllBooks: action.payload
            } 

        case FIND_BYCATEGORY:
            
            return{
                ...state,
                filteredAllBooks: state.filteredAllBooks.filter( book => {
                    for( let i=0 ; i<book.generos.length ; i++ ) {
                        for( let j=0 ; j<action.payload.length ; j++ ) {
                            if( book.generos[i] === action.payload[j] ) return true;
                        }
                    }
                    return false;
                })
            }; 

        case FILTER_CLEAR:
                return{
                    ...state,
                    filteredAllBooks: state.allBooks
                } 
            
        case  SEARCH_BOOK:
                return {
                    ...state,
                    inputBooks: true,
                    filteredAllBooks: state.allBooks.filter( book => {
                        return book.titulo.toString().toLowerCase().includes(action.payload.toLowerCase()) || book.autor.toString().toLowerCase().includes(action.payload.toLowerCase())
                    })
                }
        case DETAILS:
            return {
            ...state,
            details: action.payload
        }

        case GET_GENDERS:
            return{
                ...state,
                genders: action.payload
            }

        case CREATE_BOOK:
            return{
                ...state,
                allBooks: [action.payload,...state.allBooks],
                filteredAllBooks: [action.payload,...state.filteredAllBooks]
            }

        case ORDER_BOOKS:
            if (action.payload === "A-Z") {
                return{
                    ...state,
                    forRender:state.forRender+1,
                    filteredAllBooks:state.filteredAllBooks.sort((a, b) => {
                    if (a.titulo < b.titulo) {
                    return -1;
                    }
                    if (a.titulo > b.titulo) {
                    return 1;
                    }
                    return 0;
                })
                }
            }
            if (action.payload === "Z-A") {
                return{
                    ...state,
                    forRender:state.forRender+1,
                    filteredAllBooks:state.filteredAllBooks.sort((b, a) => {
                if (a.titulo < b.titulo) {
                    return -1;
                }
                if (a.titulo > b.titulo) {
                    return 1;
                }
                return 0;
                })
            }
            }
            if (action.payload === "Mayor_Precio") {
                return{
                    ...state,
                    forRender:state.forRender+1,
                    filteredAllBooks:state.filteredAllBooks.sort((b, a) => {
                if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
                })
            }
            }
            if (action.payload === "Menor_Precio") {
                return{
                    ...state,
                    forRender:state.forRender+1,    
                    filteredAllBooks:state.filteredAllBooks.sort((a, b) => {
                    if (a.precio < b.precio) {
                    return -1;
                }
                if (a.precio > b.precio) {
                    return 1;
                }
                return 0;
                })
            }
            } break

        case CREATE_GENDER:
            
            return{
                ...state,
                genders:[ ...state.genders,action.payload.genero]
            }
            case ADD_CART:

                const addCart= localStore(action.payload,'add')
                return{
                    ...state,
                    cart: addCart
                }

        case REMOVE_ONE_CART:
                const removeOneCart=localStore(action.payload, 'subtract')
                return{
                    ...state,
                    cart:removeOneCart
                }

        case REMOVE_ALL_CART:
                    const removeAllCart = localStore( action.payload, 'delete')
                    return{
                        ...state,
                        cart: removeAllCart
                    }
        case SEE_CART:
                    const seeCart = localStore('see','see')
    
                    return{
                        ...state,
                        cart:seeCart
                    }
        case CLEAR_CART:
            const clearCart = localStore( 'clear', 'clear')
            return {
                ...state,
                cart: clearCart
            }
        case FILTER_BOOK:
            
            return {
                ...state,
                filteredAllBooks: state.allBooks.filter((book) => {
                    return book.generos.some((t) => t=== action.payload);
                }),
            }
        
        case FILTER_PRICE:

            return {
                ...state,
                // eslint-disable-next-line
                filteredAllBooks: state.allBooks.filter((book) => {
                    console.log(action.payload.es)
                    if(!action.payload.es && !action.payload.en){
                        if(book.precio >= action.payload.min && book.precio <= action.payload.max){
                            return book;
                        }
                    }else if( (action.payload.es || !action.payload.en) && action.payload.min ){
                        if(book.precio >= action.payload.min && book.precio <= action.payload.max && book.idioma === 'es'){
                            return book;
                        }
                    }else if( (!action.payload.es || action.payload.en) && action.payload.min ){
                        if(book.precio >= action.payload.min && book.precio <= action.payload.max && book.idioma === 'en'){
                            return book;
                        }
                    }else if( action.payload.es || !action.payload.en){
                        if(book.idioma === 'es'){
                            return book;
                        }
                    }else{
                        if(book.idioma === 'en'){
                            return book;
                        }
                    }
                })
            }

        case FILTER_LANGUAGE:
            return {
                ...state,
                // eslint-disable-next-line
                filteredAllBooks: state.filteredAllBooks.filter((book) => {
                    if(book.idioma === action.payload){
                        return book;
                    }
                })
            }
            
        case URL:
            return {
                ...state,
                url: action.payload
            }
        case GET_ORDENES:
            return{
                ...state,
                ordenes:action.payload
            }
        case ORDEN_DETAIL:
            return{
                ...state,
                ordenDetail:action.payload
            } 
        case GET_PROFILE:
            return{
                ...state,
                profile:action.payload

            }
        case GET_PROFILE2:
            return{
                ...state,
                profile2:action.payload

            }
        case GET_PROFILES:
            return{
                ...state,
                profiles:action.payload
            }
        case DELETE_PROFILE:
            return{
                ...state,
                profile: {}
            }
        case GET_PROMOS:
            return{
                ...state,
                promo:action.payload,
            }
        case WHISHLIST:
            return{
                ...state,
                whishlist: action.payload.length? action.payload : [...state.whishlist]
            }

        default: return state
    }

}

export default rootReducer;
