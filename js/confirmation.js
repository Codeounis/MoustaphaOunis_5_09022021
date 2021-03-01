const paramsUrl = new URL(window.location).searchParams;
const orderId = paramsUrl.get("orderId");

console.log(localStorage);

//RECUPERATION DES DONNEES CONTACT
let contact = JSON.parse(localStorage.getItem("contact"));

// RECUPERATION DU PRIX TOTAL
let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));

// AFFICHAGE HTML
function display (){
    confirmation.innerHTML += `
        <p>
        Merci  ${contact.firstName } ${contact.lastName} 
        </p>
        <p>Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant de :${prixTotal}  </br>
        </p>
        Un email vous sera envoyer à l'adresse : </br> ${contact.email} a l'envoi de votre commande  
    `
};

display();