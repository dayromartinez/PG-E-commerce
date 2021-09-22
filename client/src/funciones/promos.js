export function promoDesc(libros, promo) {

    var librosEnPromo=[];
    var promosGenero=[]
   
    promo.forEach(e=>promosGenero.push(e.genero))

   if(libros.length>0){
       libros.forEach(element=>{
            element.generos.forEach(genero=>{
                if(promosGenero.flat(Infinity).includes(genero)){
                librosEnPromo.push(element._id)
                }
            })  
        })
    }else{
        for (const i in libros) {
           libros[i].generos.forEach(genero=>{
            if(promosGenero.flat(Infinity).includes(genero)){
                librosEnPromo.push(libros[i]._id)
                }
           })
        }
    }
    return librosEnPromo
}

export function promoDescPrecioFinal(cart,promo,precioTotal) { 
    var librosDescuento=promoDesc(cart,promo)

    var precioFinal=0

    for (const i in cart) {
        if(librosDescuento.includes(cart[i]._id)){
            promo.forEach(e=>{
                e.genero.forEach(a=>{
                    if(cart[i].generos.includes(a)){
                        let porcentaje= e.porcentaje/100
                        precioFinal+=cart[i].precio*cart[i].count - (cart[i].precio*cart[i].count * porcentaje)
                    }
                    
                })
            })
             
        }else{
            precioFinal+=cart[i].precio*cart[i].count
        }
       
    }
 return precioTotal- precioFinal !== 0? precioFinal : 0
        
}
