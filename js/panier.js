




//  Récupération du Local storage



let teddyPanier = localStorage.getItem("listePanier");
    if (teddyPanier != undefined){
        let Montableaulocalstorage =JSON.parse(teddyPanier);
        console.log("votre panier est rempli")
        console.log(Montableaulocalstorage);
        let leTableauquejeveuxalafin = [];
        Montableaulocalstorage.map((teddypascomplet,index)=>{
            fetch("http://localhost:3000/api/teddies/" + teddypascomplet.id).then(function (response){
                return response.json();
                }).then(function(teddycomplet){
                    console.log(teddycomplet);
                    let indexduteddydansletableauquejeveuxalafin;
                    leTableauquejeveuxalafin.map((teddy,indexfinal)=>{
                        if(teddy.id === teddycomplet._id){
                            indexduteddydansletableauquejeveuxalafin = indexfinal;
                        }
                    })
                    if(indexduteddydansletableauquejeveuxalafin != undefined){
                        console.log("Produit trouvé");
                        leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].quantity += teddypascomplet.quantity;
                        // couleur supplémentaire
                      }else{
                        console.log("Produit non trouvé")
                        let produit = {id:teddycomplet._id,name:teddycomplet.name,colors:[teddypascomplet.color],quantity:teddypascomplet.quantity,price:teddycomplet.price,image:teddycomplet.imageURL};
                        leTableauquejeveuxalafin.push(produit);
                      } 
                      if(index === Montableaulocalstorage.length -1){
                          leTableauquejeveuxalafin.map((teddy,indexalafin)=>{
                              console.log(teddy);
                            // creer card 
                          }
                          )
                      }
                    // let teddyRecap = document.createElement("div");
                    // let teddyName = document.createElement("p");
                    // teddyRecap.appendChild(teddyName);
                    // teddyName.className = "itempanier";
                    // teddyName.innerText = data.name;
                    // document.getElementById("panier").appendChild(teddyRecap);
                    
                })
            })
    }else{
        console.log("Votre panier est vide");    
    } 

// teddyPanier.map((produit,index)=>{
     
//     }
// }
// )




// let teddyRecap = document.createElement("div");
// teddyRecap.className = "itempanier";
// teddyRecap.innerText = teddyPanier.id
// console.log(teddyRecap);

// let teddyImg = document.createElement("img");
// teddyImg.className = "imgTeddy";
// teddyImg.src = teddyPanier.imageUrl;

// let teddyPrice = document.createElement("span");
// teddyPrice.className = "priceTeddy";
// teddyPrice.innerText = teddyPanier.price/100 + ' €';


// teddyRecap.appendChild(teddyImg);
// teddyRecap.appendChild(teddyPrice);

// document.getElementById("panier").appendChild(teddyRecap);