let teddyPanierJson = localStorage.getItem("Teddy");
console.log(teddyPanierJson);
let teddyPanier =JSON.parse(teddyPanierJson);
console.log(teddyPanier);


let teddyRecap = document.createElement("div");
teddyRecap.className = "itempanier";

let teddyImg = document.createElement("img");
teddyImg.className = "imgTeddy";
teddyImg.src = teddyPanier.imageUrl;

let teddyPrice = document.createElement("span");
teddyPrice.className = "priceTeddy";
teddyPrice.innerText = teddyPanier.price/100 + ' €';


teddyRecap.appendChild(teddyImg);
teddyRecap.appendChild(teddyPrice);

document.getElementById("panier").appendChild(teddyRecap);