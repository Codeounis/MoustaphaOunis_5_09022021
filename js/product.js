const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);

fetch("http://localhost:3000/api/teddies/"+id).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);
  let teddy = data;
  createTeddyInfos(teddy);
})

// function createTeddyInfos(){
//   let teddyBlock = document.createElement("div");
//   let teddyBuyButton = document.createElement("button");
//   teddyBuyButton.innerText = "Achetez moi"
//   teddyBuyButton.onclick = function(){
//     console.log("j'ai acheté l'id:"+ id);
//   }
//   teddyBlock.appendChild(teddyBuyButton);
//   document.body.appendChild(teddyBlock);
// }



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
  teddyTitle.className = "card-title";
  teddyTitle.innerText = teddy.name ; 
  
  let teddyPrice = document.createElement("h4");
  let Price = teddy.price/100;
  teddyPrice.innerText = Price + " €";

  let teddyDescription = document.createElement ("p");
  teddyDescription.className = "card-text";
  teddyDescription.innerText = teddy.description;

  let teddyColorsSelect = document.createElement ("select");
  for (let index = 0; index < teddy.colors.length; index++) {
    let teddyColorsOption = document.createElement("option");
    teddyColorsOption.value = teddy.colors[index];
    teddyColorsOption.innerText = teddy.colors[index];
    teddyColorsSelect.appendChild(teddyColorsOption);
  }
  let teddyBuyBar = document.createElement('div');
  let TeddyBuyRecap = document.createElement("div");
  let teddyMax = 10;
  let teddyBuyNumber = 1;
  // TeddyBuyRecap.innerHTML = teddyBuyTotal

  
  teddyBuyBar.appendChild(teddyColorsSelect);

  teddyBuyBar.appendChild(TeddyBuyRecap);
  
 


  //  Gestion du local storage

  
// RECUPERER LOCALSTORAGE
// VERIFIER SI IL EXISTE
// SI IL EXISTE
//   ALORS RECUPERER LE CONTENU  ET  LE TRANSFORMER EN JSON
//   SI L'ID ET LA COULEUR DE LA PELUCHE EST PRESENT DANS LE JSON
//     ALORS AJOUTER +1 EN QUANTITE  SUR L'ID CONCERNE
//   SINON AJOUTER UN OBJET AVEC L'ID ET LA COULEUR CONCERNE ET LA QUANTITE 1
// SINON CREER UN ARRAY AVEC DEDANS UN OBJET AVEC L'ID ET LA COULEUR CONCERNE ET LA QUANTITE 1

  
  let teddyBuy = document.createElement("button");
  teddyBuy.innerText = "achetez";
  teddyBuy.onclick = function(){
    let idProduit=teddy._id;
    let colorProduit = teddyColorsSelect.value; 
    let ls = localStorage.getItem("listePanier");
    let lsJSON;
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
  document.getElementById("item").appendChild(teddyBuy);
  document.getElementById("item").appendChild(teddyBuyBar);
}








// If(stockage == vide) { setItem pour créer le storage }
//  elseif (stockage.id == produit.id) {  quantité ++) } 
// else(stockage.id != produit.id) { push } et enfin setItem
