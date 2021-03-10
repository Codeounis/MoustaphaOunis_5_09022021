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

        // BOUCLE QUI VA INTEGRER DANS UN TABLEAU LES OBJETS DE L'API PAR RAPPORT AU ID PRESENTES DANS LE LOCAL STORAGE
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
        // SI IL EXISTE PAS DANS LE TABLEAU
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
  localStorage.removeItem("listePanier");
  localStorage.removeItem("prixTotal");
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

// VARIABLE POUR DECLENCHER LA VALIDATION DU FORMULAIRE
let envoiFormulaire = document.getElementById("envoiFormulaire");

//VARIABLE POUR RECUPERER LES INFOS DU FORMULAIRE
let nom = document.getElementById("nom");
let prenom = document.getElementById("prenom");
let adresse = document.getElementById("adresse");
let ville = document.getElementById("ville");
let email = document.getElementById("email");

//VARIABLE POUR EFFECTUER LES TEST DE CARACTERE
let prenomNomVilleValid = /^[a-zA-Z][a-zA-Z0-9-_\.]{1,30}$/;
let adresseValid = /^[A-Z-a-z-0-9\s]{5,80}$/;
let emailValid =/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

// DECLENCHEMENT DE L'ENVOI DU FORMULAIRE
envoiFormulaire.addEventListener('click',validity);


//  FONCTION VERIFICATION DU FORMULAIRE + POST 
function validity(event){

  //  VERIFICATION NOM EST VALIDE 
  if (prenomNomVilleValid.test(nom.value) == false){
      event.preventDefault();
      alert("votre nom n'est pas conforme")

      // VERIFICATION SI PRENOM EST VALIDE
  } else if (prenomNomVilleValid.test(prenom.value) == false){
      event.preventDefault();
      alert("votre prénom n'est pas conforme")

      // VERIFICATION SI L'ADRESSE EST VALIDE
  } else if (adresseValid.test(adresse.value) == false){
      event.preventDefault();
      alert("votre adresse n'est pas conforme")

      // VERIFICATION SI LA VILLE EST VALIDE
  } else if (prenomNomVilleValid.test(ville.value) == false){
      event.preventDefault();
      alert("votre ville n'est pas conforme")

      // VERIFICATION SI L'EMAIL EST VALIDE
  } else if (emailValid.test(email.value) == false){
      event.preventDefault();
      alert("votre adresse mail n'est pas conforme")
  } else {event.preventDefault();

  // CREATION VARIABLE CONTACT NECESSAIRE POUR LA REQUETE POST

  let contact = {
    firstName: nom.value,
    lastName: prenom.value,
    address: adresse.value,
    city: ville.value,
    email: email.value,
  }
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
}
