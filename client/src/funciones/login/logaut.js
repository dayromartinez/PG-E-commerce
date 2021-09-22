import swal from 'sweetalert';

export function logaut(){
    swal({
        title: "¡Hasta pronto!",
        icon: "success",
        });
    window.localStorage.removeItem("token")
}