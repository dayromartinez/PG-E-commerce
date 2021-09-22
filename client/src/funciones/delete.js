export async function deletePerfil (id,token){
    var deletePrfoile= await fetch (`http://localhost:4000/auth/delete/${id}`,{
        method:'DELETE',
        headers:{
          'x-token':token,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    });
    deletePrfoile= await deletePrfoile.json()
    return deletePrfoile
};

export async function deleteGenero(genero,token) {
  var deleteGenero= await fetch (`http://localhost:4000/generos/delete?genero=${genero}`,{
      method:'DELETE',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
  deleteGenero= await deleteGenero.json()
  return deleteGenero
};

export async function deleteBook (id,token){
  var deleteBooks= await fetch (`http://localhost:4000/productos/delete/${id}`,{
      method:'DELETE',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
  deleteBooks= await deleteBooks.json()
  return deleteBooks
};


export async function deletePromo (id,token){
  var deleteBooks= await fetch (`http://localhost:4000/promo/delete/${id}`,{
      method:'DELETE',
      headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
  });
  deleteBooks= await deleteBooks.json()
  return deleteBooks
};