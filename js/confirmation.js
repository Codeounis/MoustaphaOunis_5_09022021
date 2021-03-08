// CONSTANTES POUR LA CREATION DE LA PAGE HTML SUITE A LA REPONSE DU SERVEUR VIA LE FORMULAIRE DE LA PAGE PANIER

const paramsUrl = new URL(window.location).searchParams;
const orderId = paramsUrl.get("orderId");

//  VARIABLES POUR LA RECUPERATION DE LA FICHE CONTACT ET DE LA SOMME TOTALE DANS LE LOCAL STORAGE
let contact = JSON.parse(localStorage.getItem("contact"));
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

// FONCTION DISPLAY POUR AFFICHER LA REPONSE AVEC LES INFOS DU LOCALSTORAGE ET DE L'API
function display() {
  // INTEGRATION DE LA REPONSE DIRECTEMENT VIA L'ID "confirmation" DANS LE HTML
  confirmation.innerHTML += `
        <p>
        Merci  ${contact.firstName} ${contact.lastName} pour votre commande chez Orinoco.
        </p>
        <p>Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant de : ${prixTotal} € </br>
        </p>
        Un email vous sera envoyé à l'adresse : </br> ${contact.email} a l'envoi de votre commande.  
    `;
}

// UTILISATION DE LA FONCTION DISPLAY
display();
