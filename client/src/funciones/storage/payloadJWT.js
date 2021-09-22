export function payloadJWT(){
  const token=window.localStorage.getItem('token')

  if(token) {
    let renovar= token.split('.')[1]
    renovar=window.atob(renovar)
    renovar=JSON.parse(renovar)  
    return renovar
  }
}    