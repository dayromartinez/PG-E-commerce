export async function insertaReview(review, token) {

    var a = await fetch (`https://pg-henry-ecommerce.herokuapp.com/productos/review`, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-token': token
        },
        body: JSON.stringify(review)
    })
   var res = await a.json()
    return res;
};

export async function createPromo (promo,token){
    var promoCreate= await fetch (`http://localhost:4000/promo`, {
        method: 'post',
        headers:{
        'x-token':token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(promo)
    });
    promoCreate= await promoCreate.json()

    return promoCreate
}