// const queryString = window.location.search;
// const urlParams = new URLSearchParams(queryString);
// const id = urlParams.get("id")
// console.log(id);

const paramsUrl = new URL(window.location).searchParams;
const id = paramsUrl.get("id");

let totalPanier = document.createElement("span");
let totalPanierIcone = document.createElement("i");
totalPanier.appendChild(totalPanierIcone);
document.getElementById("lienPanier").appendChild(totalPanier);
if(localStorage.length > 0){
  totalPanierIcone.title="Des articles vous attendent !!";
  totalPanierIcone.className = "fas fa-exclamation orange";
  }




fetch("http://localhost:3000/api/teddies/"+id).then(function (response) {
  return response.json();
}).then(function (teddyApi) {
  console.log(teddyApi);
  let teddy = teddyApi;
  createTeddyInfos(teddy);
})



function createTeddyInfos(teddy){
  console.log(teddy);
  let teddyBlock = document.createElement("div");
  teddyBlock.className = "card mt-4";
  
  let teddyImg = document.createElement ("img");
  teddyImg.className = "card-img-top img-fluid";
  teddyImg.src = teddy.imageUrl;
  teddyImg.alt = "peluche teddy de chez Orinoco";

  let teddyBody = document.createElement("div");
  teddyBody.className = "card-body";

  let teddyTitle = document.createElement("h3");
  teddyTitle.className = "card-title orange";
  teddyTitle.innerText = teddy.name ; 
  
  let teddyPrice = document.createElement("h4");
  let Price = teddy.price/100;
  teddyPrice.innerText = Price + " €";

  let teddyDescription = document.createElement ("p");
  teddyDescription.className = "card-text";
  teddyDescription.innerText = teddy.description;

  let teddyColorsSelect = document.createElement ("select");
  teddyColorsSelect.className = "form-control";
  for (let index = 0; index < teddy.colors.length; index++) {
    let teddyColorsOption = document.createElement("option");
    teddyColorsOption.value = teddy.colors[index];
    teddyColorsOption.innerText = teddy.colors[index];
    teddyColorsSelect.appendChild(teddyColorsOption);
  }
  let teddyBuyBar = document.createElement('div');
  let TeddyBuyRecap = document.createElement("div");
  // TeddyBuyRecap.innerHTML = teddyBuyTotal

  
  

  teddyBuyBar.appendChild(TeddyBuyRecap);
  
  teddyBuyBar.appendChild(teddyColorsSelect);

  //  Gestion du local storage

  
// RECUPERER LOCALSTORAGE
// VERIFIER SI IL EXISTE
// SI IL EXISTE
//   ALORS RECUPERER LE CONTENU  ET  LE TRANSFORMER EN JSON
//   SI L'ID ET LA COULEUR DE LA PELUCHE EST PRESENT DANS LE JSON
//     ALORS AJOUTER +1 EN QUANTITE  SUR L'ID CONCERNE
//   SINON AJOUTER UN OBJET AVEC L'ID ET LA COULEUR CONCERNE ET LA QUANTITE 1
// SINON CREER UN ARRAY AVEC DEDANS UN OBJET AVEC L'ID ET LA COULEUR CONCERNE ET LA QUANTITE 1


// let nombreProduitPAnier = 0;
// let totalPanier = document.createElement("div");
// totalPanier.innerHTML = nombreProduitPAnier;
// document.getElementById("numberProduct").appendChild(totalPanier);

  
  let teddyBuy = document.createElement("button");
  teddyBuy.innerText = "Ajoutez au panier";
  teddyBuy.className = "btn btn-primary btn-lg btn-block";
  let teddyAlerte = document.createElement("div");
  teddyBuy.onclick = function(){
    let idProduit=teddy._id;
    let colorProduit = teddyColorsSelect.value; 
    let ls = localStorage.getItem("listePanier");
    let lsJSON;
    teddyAlerte.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Votre ${teddyTitle.innerText} de couleur ${colorProduit } a été ajoutez au panier!</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
    document.getElementById("messageAlert").appendChild(teddyAlerte);
    if(localStorage.length < 1){
      alert("Article ajouté au panier")
      location.reload();
      }
    if(ls != undefined){
      console.log("Local Storage Exist");
      lsJSON = JSON.parse(ls);
      console.log(lsJSON);
      let indexProduit;
      lsJSON.map((produit,index) =>{
        if(produit.id === idProduit && produit.color === colorProduit ){
          indexProduit = index;
        } 
      })
      if(indexProduit != undefined){
        console.log("Produit trouvé")
        lsJSON[indexProduit].quantity++;
      }else{
        console.log("Produit non trouvé")
        let produit = {id: idProduit,color:colorProduit,quantity:1};
        lsJSON.push(produit);
      }
    }
    else{
      console.log("Local Storage Existe Pas")
      lsJSON = [{id:idProduit,color:colorProduit,quantity:1}];
    }
    console.log(lsJSON)
    let lsString = JSON.stringify(lsJSON);
    localStorage.setItem("listePanier",lsString);
  }
  teddyBody.appendChild(teddyTitle);
  teddyBody.appendChild(teddyPrice);
  teddyBody.appendChild(teddyDescription);
  // teddyBody.appendChild(teddyColors);

  teddyBlock.appendChild(teddyImg);
  teddyBlock.appendChild(teddyBody);

  document.getElementById("item").appendChild(teddyBlock);
  document.getElementById("item").appendChild(teddyBuyBar);
  document.getElementById("item").appendChild(teddyBuy);
}



console.log(localStorage)








// If(stockage == vide) { setItem pour créer le storage }
//  elseif (stockage.id == produit.id) {  quantité ++) } 
// else(stockage.id != produit.id) { push } et enfin setItem
