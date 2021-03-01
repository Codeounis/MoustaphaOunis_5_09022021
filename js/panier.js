




//  Récupération du Local storage



let teddyPanier = localStorage.getItem("listePanier");   
let prixTotal = 0;
let teddySommeTotal = document.createElement('div');
    teddySommeTotal.innerText ="Total panier: "+  prixTotal/100 + ' €';
    document.getElementById('panier').appendChild(teddySommeTotal);
     

if (teddyPanier != undefined) {
    let Montableaulocalstorage = JSON.parse(teddyPanier);
    console.log("votre panier est rempli")
    console.log(Montableaulocalstorage);
    let leTableauquejeveuxalafin = [];

    Montableaulocalstorage.map((teddypascomplet, index) => {
        fetch("http://localhost:3000/api/teddies/" + teddypascomplet.id).then(function (response) {
            return response.json();
        }).then(function (teddycomplet) {
            console.log(teddycomplet);
            let indexduteddydansletableauquejeveuxalafin;
            leTableauquejeveuxalafin.map((teddy, indexfinal) => {
                if (teddy.id === teddycomplet._id) {
                    indexduteddydansletableauquejeveuxalafin = indexfinal;
                    // product.push(teddypascomplet.id);
                    // console.log(product);
                }
            })
            if (indexduteddydansletableauquejeveuxalafin != undefined) {
                console.log("Produit trouvé");
                leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].quantity += teddypascomplet.quantity;
                leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].colors.push(" " + teddypascomplet.color + " qty:" + teddypascomplet.quantity);
            } else {
                console.log("Produit non trouvé")
                let produit = { id: teddycomplet._id, name: teddycomplet.name, colors: [teddypascomplet.color + " qty: " + teddypascomplet.quantity], quantity: teddypascomplet.quantity, price: teddycomplet.price, image: teddycomplet.imageUrl };
                leTableauquejeveuxalafin.push(produit);
            }
            if (index === Montableaulocalstorage.length - 1) {
                leTableauquejeveuxalafin.map((teddy, indexalafin) => {
                    console.log(teddy);
                    let teddyLigneAchat = document.createElement('div');
                    let teddyLigneImg = document.createElement('img');
                    teddyLigneImg.className = "imgTeddy";
                    teddyLigneImg.src = teddy.image;
                    let teddyName = document.createElement('p');
                    teddyName.innerText = teddy.name;
                    let teddyColors = document.createElement('p');
                    teddyColors.innerText = "Couleurs choisis: " + teddy.colors;
                    let teddyPriceTotal = document.createElement('p');
                    teddyPriceTotal.innerText = "qty final: " + teddy.quantity + ", " + "prix total: " + (teddy.price * teddy.quantity) / 100 + " €";
                    prixTotal += teddy.price * teddy.quantity;
                    localStorage.setItem('prixTotal',prixTotal);
                    teddySommeTotal.innerText ="Total panier: "+  prixTotal/100 + ' €';
                    // console.log(prixTotal); // test prix 
                    teddyLigneAchat.appendChild(teddyLigneImg);
                    teddyLigneAchat.appendChild(teddyName);
                    teddyLigneAchat.appendChild(teddyColors);
                    // teddyLigneAchat.appendChild(teddySupprimer);
                    teddyLigneAchat.appendChild(teddyPriceTotal);
                    document.getElementById('panier').appendChild(teddyLigneAchat);
                })
            }
        })
    })
} else {
    console.log("Votre panier est vide");
    let errorResponse = document.createElement("p") ;
    errorResponse.innerText = "Veuiller remplir votre panier pour commander";
    errorResponse.className = "reponsePanierVide";
    panier.className = "noFormulaire";
    document.getElementById("panierVide").appendChild(errorResponse);
}




// test formulaire

// console.log(leTableauquejeveuxalafin)
// localStorage.setItem('prixTotal',prixTotal)
console.log(localStorage)
// console.log(Montableaulocalstorage)
console.log(teddyPanier);
console.log(typeof teddyPanier);

let teddyPanierJson= JSON.parse(teddyPanier);
console.log(teddyPanierJson);

let products =[];

if(teddyPanierJson != undefined){ 
products = teddyPanierJson.map(item=>{ return item.id});
}
console.log(products);
console.log(typeof products)





let envoiFormulaire = document.getElementById("envoiFormulaire");

envoiFormulaire.addEventListener('click', function (event) {
  let form = document.getElementById("form");
  event.preventDefault();

  if (form.reportValidity() == true && teddyPanierJson != null) {
    let contact = {
      'firstName': document.getElementById("nom").value,
      'lastName': document.getElementById("prenom").value,
      'address': document.getElementById("adresse").value,
      'city': document.getElementById("ville").value,
      'email': document.getElementById("email").value
    };


    let formulaireClient = JSON.stringify({
      contact,
      products,
    });

    console.log(formulaireClient)

    
    fetch('http://localhost:3000/api/teddies/order', {
      method: 'POST',
      headers: {
        'content-type': "application/json"
      },
      mode: "cors",
      body: formulaireClient
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (r) {
      localStorage.setItem("contact", JSON.stringify(r.contact));
      window.location.assign("confirmation.html?orderId=" + r.orderId)
      console.log(localStorage)
    })
    .catch(function (err) {
      console.log('problème API');
    })
  }
  // else{
  //   let errorResponse = document.createElement("p") ;
  //   errorResponse.innerText = "Veuiller remplir votre panier pour commander";
  //   document.getElementById("panierVide").appendChild(errorResponse);
  // }
});

