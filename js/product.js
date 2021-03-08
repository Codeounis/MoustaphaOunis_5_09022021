// CONSTANTES POUR LA CREATION DE LA PAGE HTML EN FONCTION DU PRODUIT CHOISI
const paramsUrl = new URL(window.location).searchParams;
const id = paramsUrl.get("id");

// VARIABLES POUR CREATION DE L'ICONE SIGNALANT DES ARTICLES DANS LE PANIER
let totalPanier = document.createElement("span");
let totalPanierIcone = document.createElement("i");

// INTEGRATION DE L'ICONE DANS LE HTML
totalPanier.appendChild(totalPanierIcone);
document.getElementById("lienPanier").appendChild(totalPanier);

// LOGIQUE POUR GENERER OU NON L'ICONE SIGNALANT DES ARTICLES DANS LE PANIER
if (localStorage.length > 0) {
  totalPanierIcone.title = "Des articles vous attendent !!";
  totalPanierIcone.className = "fas fa-exclamation orange";
}

//  REQUETE FETCH POUR RECUPERER LES INFOS DE L'API
fetch("http://localhost:3000/api/teddies/" + id)
  .then(function (response) {
    return response.json();
  })
  .then(function (teddyApi) {
    let teddy = teddyApi;
    // LANCEMENT DE LA FONCTION POUR GENERER LA FICHE TEDDY INFOS VIA UNE FONCTION AVEC LES INFOS DE L'API
    createTeddyInfos(teddy);
  });

// FONCTION POUR CREER LA FICHE TEDDY INFO
function createTeddyInfos(teddy) {
  // CONTAINER DU PRODUIT
  let teddyBlock = document.createElement("div");
  teddyBlock.className = "card mt-4";

  // IMAGE DU PRODUIT
  let teddyImg = document.createElement("img");
  teddyImg.className = "card-img-top img-fluid";
  teddyImg.src = teddy.imageUrl;
  teddyImg.alt = "peluche teddy de chez Orinoco";

  // CONTAINER DESCRIPTION PRODUIT
  let teddyBody = document.createElement("div");
  teddyBody.className = "card-body";

  // TITRE DU PRODUIT
  let teddyTitle = document.createElement("h3");
  teddyTitle.className = "card-title orange";
  teddyTitle.innerText = teddy.name;

  //PRIX PRODUIT
  let teddyPrice = document.createElement("h4");
  let Price = teddy.price / 100;
  teddyPrice.innerText = Price + " €";

  // DESCRIPTION PRODUIT
  let teddyDescription = document.createElement("p");
  teddyDescription.className = "card-text";
  teddyDescription.innerText = teddy.description;

  // CONTAINER CHOIX COULEURS
  let teddyColorsBar = document.createElement("div");

  // COULEURS PRODUIT
  let teddyColorsSelect = document.createElement("select");
  teddyColorsSelect.className = "form-control";

  // BOUCLE POUR CREER DES OPTIONS EN FONCTION DES COULEURS DU PRODUIT CHOISI ENVOYEES PAR L'API
  for (let index = 0; index < teddy.colors.length; index++) {
    let teddyColorsOption = document.createElement("option");
    teddyColorsOption.value = teddy.colors[index];
    teddyColorsOption.innerText = teddy.colors[index];
    teddyColorsSelect.appendChild(teddyColorsOption);
  }

  // CREATION BOUTON AJOUTEZ AU PANIER
  let teddyBuy = document.createElement("button");
  teddyBuy.innerText = "Ajoutez au panier";
  teddyBuy.className = "btn btn-primary btn-lg btn-block";

  // VARIABLE POUR ALERTE ARTICLE AJOUTE AU PANIER
  let teddyAlerte = document.createElement("div");

  // FONCTION AU CLICK DU BOUTON AJOUTER AU PANIER
  // ELLE A POUR BUT DE RAJOUTER UN PRODUIT AU LOCAL STORAGE OU DE CREER LE LOCAL STORAGE AU CAS OU IL N'EXISTE PAS
  teddyBuy.onclick = function () {
    // VARIABLE POUR RECUPERER L'ID DU PRODUIT
    let idProduit = teddy._id;

    // VARIABLE POUR RECUPERER LA COULEURS CHOISI
    let colorProduit = teddyColorsSelect.value;

    // VARIABLE POUR RECUPERE L'ITEM "listePanier" DU LOCAL STORAGE
    let ls = localStorage.getItem("listePanier");

    // VARIABLE VIDE QUI S'INITIALISERA EN FONCTION DE LA PRESENCE DU LOCAL STORAGE
    let lsJSON;

    // ALERTE QUAND LE PRODUIT EST AJOUTE AU CLICK BOUTON A PARTIR DU DEUXIEME PRODUIT CHOISI
    teddyAlerte.innerHTML += `<div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>Votre ${teddyTitle.innerText} de couleur ${colorProduit} a été ajoutez au panier!</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;

    // INTEGRATION DE L'ALERTE DANS LA PAGE HTML
    document.getElementById("messageAlert").appendChild(teddyAlerte);

    // LOGIQUE POUR AFFICHER UNE ALERTE ET FAIRE UN RELOAD DE LA PAGE LORS DU TOUT PREMIER ARTICLE CHOISI
    if (localStorage.length < 1) {
      alert("Article ajouté au panier");
      location.reload();
    }

    // LOGIQUE AU CAS OU LE LOCAL STORAGE EXISTE
    if (ls != undefined) {
      // INITIALISATION DE LA VARIABLE QUI STOCKERA L'OBJET DANS UN TABLEAU AVEC LES INFOS ISSU DU LOCAL STORAGE
      lsJSON = JSON.parse(ls);

      // VARIABLE VIDE QUI S'INITIALISERA EN FONCTION DU PRODUIT CHOISI
      let indexProduit;

      // BOUCLE QUI AGIT SUR LE TABLEAU EN FONCTION DES VALEURS DU PRODUIT CHOISI
      lsJSON.map((produit, index) => {
        if (produit.id === idProduit && produit.color === colorProduit) {
          indexProduit = index;
        }
      });

      // SI LE PRODUIT EXISTE DEJA DANS LE TABLEAU
      if (indexProduit != undefined) {
        //  QUANTITE RAJOUTE DE 1 DANS LE TABLEAU
        lsJSON[indexProduit].quantity++;

        // SINON CREATION D'UN OBJET QU'ON AJOUTE AU TABLEAU
      } else {
        let produit = { id: idProduit, color: colorProduit, quantity: 1 };
        lsJSON.push(produit);
      }

      // SINON LE LOCAL STORAGE N'EXISTE PAS
    } else {
      // INITIALISATION DE LA VARIABLE lsJSON AVEC UN TABLEAU CONTENANT L'OBJET A CREER
      lsJSON = [{ id: idProduit, color: colorProduit, quantity: 1 }];
    }

    // CREATION D'UNE VARIABLE POUR FORMATER LE TABLEAU lsJSON MIS A JOUR
    let lsString = JSON.stringify(lsJSON);

    // MISE A JOUR DU PANIER DANS LE LOCAL STORAGE
    localStorage.setItem("listePanier", lsString);
  };

  // INTEGRATION DES BLOCS HTML ENTRE EUX POUR CREER LA FICHE TEDDY INFOS
  teddyColorsBar.appendChild(teddyColorsSelect);

  teddyBody.appendChild(teddyTitle);
  teddyBody.appendChild(teddyPrice);
  teddyBody.appendChild(teddyDescription);

  teddyBlock.appendChild(teddyImg);
  teddyBlock.appendChild(teddyBody);

  // INTEGRATION DE LA FICHE TEDDY INFOS DANS LA PAGE HTML
  document.getElementById("ficheProduit").appendChild(teddyBlock);
  document.getElementById("ficheProduit").appendChild(teddyColorsBar);
  document.getElementById("ficheProduit").appendChild(teddyBuy);
}
