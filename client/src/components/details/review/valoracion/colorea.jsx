export default function Colorea(e){
    let { id } = e.target
    id = Number(id)
    for(let i = 1 ; i < 6 ; i++ ) {
        if( i <= id ){
            let star = document.getElementById(i)
            let starCheckbox = document.getElementById('radio'+i)
            starCheckbox.checked = true;
            star.style.color = 'orange';
        }else{
            let star = document.getElementById(i)
            let starCheckbox = document.getElementById('radio'+i)
            starCheckbox.checked = false;
            star.style.color = 'grey';
        }
    }
}