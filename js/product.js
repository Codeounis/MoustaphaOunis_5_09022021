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
  teddyPrice.innerText = teddy.price + " €";

  let teddyDescription = document.createElement ("p");
  teddyDescription.className = "card-text";
  teddyDescription.innerText = teddy.description;

  let teddyColors = document.createElement ("span");
  teddyColors.innerText = "<b>COLORS: </b>" + teddy.colors.join(", ");

  teddyBody.appendChild(teddyTitle);
  teddyBody.appendChild(teddyPrice);
  teddyBody.appendChild(teddyDescription);
  teddyBody.appendChild(teddyColors);

  teddyBlock.appendChild(teddyImg);
  teddyBlock.appendChild(teddyBody);

  document.getElementById("item").appendChild(teddyBlock);

}