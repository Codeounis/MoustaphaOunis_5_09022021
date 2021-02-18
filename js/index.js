


// Requete fetch pour cartes teddy 

fetch("http://localhost:3000/api/teddies").then(function(response){
  return response.json();
}).then(function (data) {
  console.log(data);
  for (let index of data){ 
    // console.log(index);
  // for (let index = 0; index < data.length; index++) {   // voir pour idex = I
    // let teddy = data[index];
    let teddy = index;
    createTeddyCard(teddy);
    // console.log(teddy);
  }
})

// fonction pour création des cartes teddy 

function createTeddyCard(teddy){
  // console.log(teddy)
  let cardBlock = document.createElement("div");
  cardBlock.className = "col-lg-4 col-md-6 mb-4";
  let card = document.createElement("div");
  card.className = "card h-100";

  let a = document.createElement("a");
  a.href = "./product.html?id="+teddy._id;

  let img = document.createElement("img");
  img.className = "card-img-top imgsize";
  img.src = teddy.imageUrl;
  img.alt = "peluche teddy de chez Orinoco";
  a.appendChild(img);

  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  let cardTitle = document.createElement("h4");
  cardTitle.className = "card-title";

  let cardTitleA = document.createElement("a");
  cardTitleA.href =  "./product.html?id="+teddy._id;
  cardTitleA.innerText = teddy.name;
  cardTitle.appendChild(cardTitleA);

  let cardPrice = document.createElement("h5");
  let Price = teddy.price/100;
  cardPrice.innerText = Price + " €";

  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = teddy.description;
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardText);

  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  cardFooter.innerHTML = "<b>COLORS: </b>" + teddy.colors.join(", ");

  card.appendChild(a);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  cardBlock.appendChild(card);
  document.getElementById("rowProduct").appendChild(cardBlock);
}



