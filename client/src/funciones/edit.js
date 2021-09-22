export async function editBook(payload,id,token){
    var book= await fetch(`http://localhost:4000/productos/edit/${id}`,{
        method: 'PUT',
        headers:{
            "x-token":token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });
    const res= await book.json();
    return res
};

export async function editGenders(payload,genero,token){
    var gender= await fetch(`http://localhost:4000/generos/${genero}?updateGenero=${payload}`,{
        method: 'PUT',
        headers:{
            "x-token":token,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const res= await gender.json();
    return res
};