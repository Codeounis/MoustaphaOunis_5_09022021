
// Mise en place Header

// let headerBloc = document.createElement("div");
// headerBloc.className = "container";

// let headerA = document.createElement("a");
// headerA.className = "navbar-brand";
// headerA.href = './index.html';

// let headerButton = document.createElement("button")
// headerButton.className = "navbar-toggle";
// headerButton.type = "button";
// headerButton.datatoggle = "collapse";
// headerButton.formTarget = "#navbarResponsive"; 

// let headerSpan = document.createElement("span");
// headerSpan.className = "navbar-toggle-icon";

// headerButton.appendChild(headerSpan);
// headerBloc.appendChild(headerA);
// headerBloc.appendChild(headerButton);

// let navbarList = document.createElement("div")
// navbarList.className = "collapse navbar-collapse";
// navbarList.id = "navbarResponsive";

let navbarUl = document.createElement("ul");
navbarUl.className = "navbar-nav ml-auto";

let navLiHome = document.createElement("li");
navLiHome.className = "nav-item active";

let navHomeA = document.createElement("a");
navHomeA.className = "nav-link";
navHomeA.href="#";
navHomeA.innerText = "Acceuil";

navLiHome.appendChild(navHomeA);

let navSpanA = document.createElement("span");
navSpanA.className = "sr-only";
navSpanA.innerText = "(current)";

navHomeA.appendChild(navSpanA);

let navLiOne = document.createElement("li");
navLiOne.className = "nav-item";

let navLiOneA = document.createElement("a");
navLiOneA.className = "nav-link";
navLiOneA.href = "#";
navLiOneA.innerText = "panier";

navLiOne.appendChild(navLiOneA);

navbarUl.appendChild(navLiHome);
navbarUl.appendChild(navLiOne);

document.getElementById("navbarResponsive").appendChild(navbarUl);
// navbarUl.appendChild(navLiHome);
// navbarUl.appendChild(navLiOne);
// navbarUl.appendChild(navHomeA);

// navbarList.appendChild(navbarUl);

 
// headerBloc.appendChild(navbarList);

// document.getElementById("headerBloc").appendChild(navbarList);



// Requete fetch pour cartes teddy 

fetch("http://localhost:3000/api/teddies").then(function(response){
  return response.json();
}).then(function (data) {
  // console.log(data);
  for (let index = 0; index < data.length; index++) {
    let teddy = data[index];
    createTeddyCard(teddy);
    // console.log(teddy);
  }
})

// fonction pour création des cartes teddy 

function createTeddyCard(teddy){
  console.log(teddy)
  let cardBlock = document.createElement("div");
  cardBlock.className = "col-lg-4 col-md-6 mb-4";
  let card = document.createElement("div");
  card.className = "card h-100";

  let a = document.createElement("a");
  a.href = "./product.html?id="+teddy._id;

  let img = document.createElement("img");
  img.className = "card-img-top";
  img.src = teddy.imageUrl;
  img.alt = "peliche teddy de chez Orinoco";
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
  cardPrice.innerText = teddy.price + " €";

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
  document.getElementById("row").appendChild(cardBlock);
}



