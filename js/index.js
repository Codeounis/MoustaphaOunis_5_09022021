// VARIABLES POUR CREATION DE L'ICONE SIGNALANT DES ARTICLES DANS LE PANIER
let Panier = document.createElement("span");
let PanierIcone = document.createElement("i");

// INTEGRATION DE L'ICONE DANS LE HTML
Panier.appendChild(PanierIcone);
document.getElementById("lienPanier").appendChild(Panier);

// LOGIQUE POUR GENERER OU NON L'ICONE SIGNALANT DES ARTICLES DANS LE PANIER
if (localStorage.length > 0) {
  PanierIcone.title = "Des articles vous attendent !!";
  PanierIcone.className = "fas fa-exclamation orange";
}

//  REQUETE FETCH POUR RECUPERER LES INFOS DE L'API

fetch("http://localhost:3000/api/teddies")
  .then(function (response) {
    return response.json();
  })
  .then(function (teddyApi) {
    // BOUCLE POUR GENERER LES CARTES PRODUITS VIA UNE FONCTION AVEC LES INFOS DE L'API
    for (let index of teddyApi) {
      let teddy = index;
      createTeddyCard(teddy);
    }
  });

// FONCTION POUR CREER UNE TEDDYCARD ET L'AFFICHER EN HTML

function createTeddyCard(teddy) {
  // CONTAINER DES PRODUITS
  let cardBlock = document.createElement("div");
  cardBlock.className = "col-lg-4 col-md-6 mb-4";
  let card = document.createElement("div");
  card.className = "card h-100";

  //  LIEN DE LA CARTE VERS PAGE PRODUIT
  let a = document.createElement("a");
  a.href = "./product.html?id=" + teddy._id;

  // IMAGE DU PRODUIT
  let img = document.createElement("img");
  img.className = "card-img-top imgsize";
  img.src = teddy.imageUrl;
  img.alt = "peluche teddy de chez Orinoco";
  a.appendChild(img);

  // DESCRIPTION PRODUIT : CONTAINER,
  let cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // TITRE
  let cardTitle = document.createElement("h4");
  cardTitle.className = "card-title";

  // LIEN VERS PAGE PRODUIT
  let cardTitleA = document.createElement("a");
  cardTitleA.href = "./product.html?id=" + teddy._id;
  cardTitleA.innerText = teddy.name;
  cardTitle.appendChild(cardTitleA);

  // PRIX
  let cardPrice = document.createElement("h5");
  let Price = teddy.price / 100;
  cardPrice.innerText = Price + " €";

  // DESCRIPTION
  let cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.innerText = teddy.description;

  // COULEURS EXISTANTE
  let cardFooter = document.createElement("div");
  cardFooter.className = "card-footer";
  cardFooter.innerHTML = "<b>COLORS: </b>" + teddy.colors.join(", ");

  // INTEGRATION DES BLOCS HTML POUR CREATION DE LA CARTE
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(cardText);

  card.appendChild(a);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  cardBlock.appendChild(card);

  // INTEGRATION DE LA CARTE DANS LA PAGE HTML
  document.getElementById("rowProduct").appendChild(cardBlock);
}
