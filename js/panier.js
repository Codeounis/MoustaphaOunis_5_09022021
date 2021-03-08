// VARIABLES POUR UTILISER LE LOCAL STORAGE

let teddyPanierStorage = localStorage.getItem("listePanier");
let teddyPanierJson;

// VARIABLE POUR LA CREATION DU TOTAL PANIER
let prixTotal = 0;
let teddySommeTotal = document.createElement("div");
teddySommeTotal.innerText = "Total panier: " + prixTotal / 100 + " €";
document.getElementById("numberProduct").appendChild(teddySommeTotal);

// LOGIQUE POUR DEFINIR SI LE LOCAL STORAGE EXISTE
if (teddyPanierStorage != undefined) {
  //  INITIALISSATION DU LOCAL STORAGE EN JSON
  teddyPanierJson = JSON.parse(teddyPanierStorage);
  // CREATION D'UN TABLEAU VIDE
  let teddyPanierTableau = [];
  // BOUCLE QUI VA POUR CHAQUE OBJET DU STORAGE FAIRE UNE REQUETE FETCH POUR RECUPERER LES INFOS DE L'API
  teddyPanierJson.map((teddyStorage, index) => {
    fetch("http://localhost:3000/api/teddies/" + teddyStorage.id)
      .then(function (response) {
        return response.json();
      })
      //  PUIS APPLIQUER LA FONCTION QUI VA REMPLIR LE TABLEAU VIDE EN FONCTION DES DE LA BOUCLE ET DES ID RECUPERER AU DESSUS
      // PUIS GENERER UN PANIER QUI S'INTEGRERA DANS LE HTML
      .then(function (teddyApi) {
        let indexTeddyPanierTableau;

        // BOUCLE QUI VA INTEGRER DANS UN TABLEAU LES OBJETS DU LOCAL STORAGE
        teddyPanierTableau.map((teddy, indexfinal) => {
          if (teddy.id === teddyApi._id) {
            indexTeddyPanierTableau = indexfinal;
          }
        });
        // SI L'OBJET EXISTE DEJA DANS LE TABLEAU
        if (indexTeddyPanierTableau != undefined) {
          // IL RAJOUTE +1 A LA QUANTITE
          teddyPanierTableau[indexTeddyPanierTableau].quantity +=
            teddyStorage.quantity;
          // IL RAJOUTE +1 A LA QUANTITE PAR RAPPORT A LA COULEUR
          teddyPanierTableau[indexTeddyPanierTableau].colors.push(
            " " + teddyStorage.color + " qté:" + teddyStorage.quantity
          );
        }
        // SI IL EXISTE PAS DANs LE TABLEAU
        else {
          // CREATION D'UN OBJET PUIS AJOUT DANS LE TABLEAU
          let produit = {
            id: teddyApi._id,
            name: teddyApi.name,
            colors: [teddyStorage.color + " qté: " + teddyStorage.quantity],
            quantity: teddyStorage.quantity,
            price: teddyApi.price,
            image: teddyApi.imageUrl,
          };
          teddyPanierTableau.push(produit);
        }
        // SI LE PANIER EST REMPLI IL VA CREER LES CARTES DES PRODUITS CHOISIS DANS LE PANIER
        if (index === teddyPanierJson.length - 1) {
          teddyPanierTableau.map((teddy, indexTableauFinal) => {
            let teddyLigneAchat = document.createElement("div");
            teddyLigneAchat.className = "itemPanier";
            let teddyLigneImg = document.createElement("img");
            teddyLigneImg.className = "imgTeddy";
            teddyLigneImg.src = teddy.image;
            let teddyName = document.createElement("p");
            teddyName.innerText = teddy.name;
            let teddyColors = document.createElement("p");
            teddyColors.innerText = "Couleurs choisis: " + teddy.colors;
            let teddyPriceTotal = document.createElement("p");
            teddyPriceTotal.innerText =
              "qté final: " +
              teddy.quantity +
              ", " +
              "prix total: " +
              (teddy.price * teddy.quantity) / 100 +
              " €";
            prixTotal += teddy.price * teddy.quantity;
            localStorage.setItem("prixTotal", prixTotal / 100);
            teddySommeTotal.innerText =
              "Total panier: " + prixTotal / 100 + " €";
            teddyLigneAchat.appendChild(teddyLigneImg);
            teddyLigneAchat.appendChild(teddyName);
            teddyLigneAchat.appendChild(teddyColors);
            teddyLigneAchat.appendChild(teddyPriceTotal);
            document.getElementById("panier").appendChild(teddyLigneAchat);
          });
        }
      });
  });
  //  SINON AFICHAGE D'UN MESSAGE COMME QUOI LE PANIER EST VIDE
} else {
  console.log("Votre panier est vide");
  let errorResponse = document.createElement("p");
  errorResponse.innerText = "Veuiller remplir votre panier pour commander.";
  errorResponse.className = "reponsePanierVide";
  panier.className = "noFormulaire";
  document.getElementById("panierVide").appendChild(errorResponse);
}

// BOUTON POUR VIDER LE PANIER
let teddyClear = document.createElement("button");
teddyClear.className = "btn btn-danger";
teddyClear.innerText = "vider le panier";
teddyClear.onclick = function () {
  localStorage.clear();
  location.reload();
};
document.getElementById("videpanier").appendChild(teddyClear);

// VARIABLE PRODUCT NECESSAIRE POUR LA REQUETE POST
let products = [];
// LOGIQUE POUR REMPLIR LE TABLEAU PRODUCT DES ID DU PANIER
if (teddyPanierJson != undefined) {
  products = teddyPanierJson.map((item) => {
    return item.id;
  });
}

// RECUPERATIONS DES INFOS DU FORMULAIRE HTML
let envoiFormulaire = document.getElementById("envoiFormulaire");

// FONCTION AU CLICK DE L'ENVOI FORMULAIRE
envoiFormulaire.addEventListener("click", function (event) {
  let form = document.getElementById("form");
  event.preventDefault();

  // LOGIQUE POUR CREER LA VARIABLE CONTACT NECESSAIRE POUR LA REQUETE POST
  if (form.reportValidity() == true) {
    let contact = {
      firstName: document.getElementById("nom").value,
      lastName: document.getElementById("prenom").value,
      address: document.getElementById("adresse").value,
      city: document.getElementById("ville").value,
      email: document.getElementById("email").value,
    };
    // CREATION VARIABLE POUR LE BODY DE LA REQUETE POST EN JSON
    let formulaireClient = JSON.stringify({
      contact,
      products,
    });

    // REQUETE FETCH POUR LE POST DU FORMULAIRE A L'API

    fetch("http://localhost:3000/api/teddies/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      mode: "cors",
      body: formulaireClient,
    })
      .then(function (response) {
        return response.json();
      })

      //  PUIS APPLICATION FONCTION POUR RECUPERER LA REPONSE DE L'API orderID
      .then(function (r) {
        localStorage.setItem("contact", JSON.stringify(r.contact));
        window.location.assign("confirmation.html?orderId=" + r.orderId);
      })

      // SI L'APPLICATION DE LA FONCTION N'EST PAS POSSIBLE
      .catch(function (err) {
        console.log("problème API");
      });
  }
});
