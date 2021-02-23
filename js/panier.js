




//  Récupération du Local storage



let teddyPanier = localStorage.getItem("listePanier");   // récupération Local storage
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
                    let VraiprixTotal = [];
                     for (let index of Montableaulocalstorage) {
                             let sommeTotalTeddy = (index.price*index.quantity) ;
                             VraiprixTotal.push(sommeTotalTeddy);
                                console.log(VraiprixTotal);
                          }
                    let indexduteddydansletableauquejeveuxalafin; 
                    leTableauquejeveuxalafin.map((teddy,indexfinal)=>{
                        if(teddy.id === teddycomplet._id){
                            indexduteddydansletableauquejeveuxalafin = indexfinal;
                        }
                    })
                    if(indexduteddydansletableauquejeveuxalafin != undefined){
                        console.log("Produit trouvé");
                        leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].quantity += teddypascomplet.quantity;
                        leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].colors.push(" " +teddypascomplet.color + " qty:" + teddypascomplet.quantity);
                      }else{
                        console.log("Produit non trouvé")
                        let produit = {id:teddycomplet._id,name:teddycomplet.name,colors:[teddypascomplet.color + " qty: " + teddypascomplet.quantity],quantity:teddypascomplet.quantity,price:teddycomplet.price,image:teddycomplet.imageUrl};
                        leTableauquejeveuxalafin.push(produit);
                      } 
                      if(index === Montableaulocalstorage.length -1){
                          leTableauquejeveuxalafin.map((teddy,indexalafin)=>{
                            console.log(teddy);
                            let teddyLigneAchat = document.createElement('div');
                            let teddyLigneImg = document.createElement('img');
                            teddyLigneImg.className = "imgTeddy";
                            teddyLigneImg.src = teddy.image;
                            let teddyName = document.createElement('p');
                            teddyName.innerText = teddy.name;
                            let teddyColors = document.createElement('p');
                            teddyColors.innerText = "Couleurs choisis: " + teddy.colors ;
                            let teddyPriceTotal = document.createElement('p');
                            teddyPriceTotal.innerText ="qty final: " + teddy.quantity + ", " + "prix total: " + (teddy.price * teddy.quantity)/100 + " €";
                            
                            teddyLigneAchat.appendChild(teddyLigneImg);
                            teddyLigneAchat.appendChild(teddyName);
                            teddyLigneAchat.appendChild(teddyColors);
                            teddyLigneAchat.appendChild(teddyPriceTotal);
                            document.getElementById('panier').appendChild(teddyLigneAchat);
                          }
                          )
                        //  for (let index of leTableauquejeveuxalafin) {
                        //      let prixTotalTeddy = index;
                        //       let VraiprixTotal  = (prixTotalTeddy.price * prixTotalTeddy.quantity);
                        //     //   VraiprixTotal += prixTotalTeddy.price;
                        //       console.log(VraiprixTotal);
                        //   }
                      } 
                      const reducer = (accumulator, currentValue) => accumulator + currentValue;
                      const montantTotal = VraiprixTotal.reduce(reducer, 0);
                      console.log(montantTotal);
                      let teddySommeTotal = document.createElement('div');
                      teddySommeTotal.innerText ="Total panier: "+  montantTotal/100 + ' €';
                      document.getElementById('panier').appendChild(teddySommeTotal);
                    //   for (let index of leTableauquejeveuxalafin) {
                    //     let prixTotalTeddy = index;
                    //      let VraiprixTotal  = (prixTotalTeddy.price * prixTotalTeddy.quantity);
                    //    //   VraiprixTotal += prixTotalTeddy.price;
                    //      console.log(VraiprixTotal);
                    //  }
                    
                })
            })
    }else{
        console.log("Votre panier est vide");    
    } 

// teddyPanier.map((produit,index)=>{
     
//     }
// }
// )



