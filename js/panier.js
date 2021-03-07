

let totalPanier = document.createElement("i");
document.getElementById("numberProduct").appendChild(totalPanier);


//  Récupération du Local storage



let teddyPanierStorage = localStorage.getItem("listePanier");   
let prixTotal = 0;
let teddyPanierJson;
let teddySommeTotal = document.createElement('div');
    teddySommeTotal.innerText ="Total panier: "+  prixTotal/100 + ' €';
    document.getElementById('numberProduct').appendChild(teddySommeTotal);
     

if (teddyPanierStorage != undefined) {
    teddyPanierJson = JSON.parse(teddyPanierStorage);
    console.log("votre panier est rempli")
    console.log(teddyPanierJson);
    let teddyPanierTableau = [];

    teddyPanierJson.map((teddyStorage, index) => {
        fetch("http://localhost:3000/api/teddies/" + teddyStorage.id).then(function (response) {
            return response.json();
        }).then(function (teddyApi) {
            console.log(teddyApi);
            let indexTeddyPanierTableau;
            teddyPanierTableau.map((teddy, indexfinal) => {
                if (teddy.id === teddyApi._id) {
                  indexTeddyPanierTableau = indexfinal;
                  console.log(teddyPanierTableau);
                }
            })
            if ( indexTeddyPanierTableau != undefined) {
                console.log("Produit trouvé");
                teddyPanierTableau[indexTeddyPanierTableau].quantity += teddyStorage.quantity;
                teddyPanierTableau[indexTeddyPanierTableau].colors.push(" " + teddyStorage.color + " qté:" + teddyStorage.quantity);
            } else {
                console.log("Produit non trouvé")
                let produit = { id: teddyApi._id, name: teddyApi.name, colors: [teddyStorage.color + " qté: " + teddyStorage.quantity], quantity: teddyStorage.quantity, price: teddyApi.price, image: teddyApi.imageUrl };
                teddyPanierTableau.push(produit);
            }
            if (index === teddyPanierJson.length - 1) {
              teddyPanierTableau.map((teddy, indexTableauFinal) => {
                    console.log(teddy);
                    let teddyLigneAchat = document.createElement('div');
                    teddyLigneAchat.className = "itemPanier";
                    let teddyLigneImg = document.createElement('img');
                    teddyLigneImg.className = "imgTeddy";
                    teddyLigneImg.src = teddy.image;
                    let teddyName = document.createElement('p');
                    teddyName.innerText = teddy.name;
                    let teddyColors = document.createElement('p');
                    teddyColors.innerText = "Couleurs choisis: " + teddy.colors;
                    let teddyPriceTotal = document.createElement('p');
                    teddyPriceTotal.innerText = "qté final: " + teddy.quantity + ", " + "prix total: " + (teddy.price * teddy.quantity) / 100 + " €";
                    prixTotal += teddy.price * teddy.quantity;
                    localStorage.setItem('prixTotal',prixTotal/100);
                    teddySommeTotal.innerText ="Total panier: "+  prixTotal/100 + ' €';
                    teddyLigneAchat.appendChild(teddyLigneImg);
                    teddyLigneAchat.appendChild(teddyName);
                    teddyLigneAchat.appendChild(teddyColors);
                    teddyLigneAchat.appendChild(teddyPriceTotal);
                    document.getElementById('panier').appendChild(teddyLigneAchat);
                })
            }
        })
    })
} else {
    console.log("Votre panier est vide");
    let errorResponse = document.createElement("p") ;
    errorResponse.innerText = "Veuiller remplir votre panier pour commander.";
    errorResponse.className = "reponsePanierVide";
    panier.className = "noFormulaire";
    document.getElementById("panierVide").appendChild(errorResponse);
}


let teddyClear = document.createElement("button");
teddyClear.className ="btn btn-danger";
teddyClear.innerText = "vider le panier";
teddyClear.onclick = function(){
  localStorage.clear();
  location.reload();
}
document.getElementById("videpanier").appendChild(teddyClear);
// console log a supprimer 

console.log(localStorage)

console.log(teddyPanierStorage);
console.log(typeof teddyPanierStorage);

console.log(teddyPanierJson);

//  console log a supprimer

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

  if (form.reportValidity() == true) {
    let contact = {
      'firstName': document.getElementById("nom").value,
      'lastName': document.getElementById("prenom").value,
      'address': document.getElementById("adresse").value,
      'city': document.getElementById("ville").value,
      'email': document.getElementById("email").value,
    };

    let formulaireClient = JSON.stringify({
      contact,
      products,
    });

    // console.log(formulaireClient)

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
});

