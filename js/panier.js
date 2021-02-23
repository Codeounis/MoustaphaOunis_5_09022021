




//  Récupération du Local storage



let teddyPanier = localStorage.getItem("listePanier");   
let prixTotal = 0;
let teddySommeTotal = document.createElement('div');
    teddySommeTotal.innerText ="Total panier: "+  prixTotal/100 + ' €';
    document.getElementById('panier').appendChild(teddySommeTotal);
    console.log(prixTotal); // test prix 

if (teddyPanier != undefined) {
    let Montableaulocalstorage = JSON.parse(teddyPanier);
    console.log("votre panier est rempli")
    console.log(Montableaulocalstorage);
    let leTableauquejeveuxalafin = [];

    Montableaulocalstorage.map((teddypascomplet, index) => {
        fetch("http://localhost:3000/api/teddies/" + teddypascomplet.id).then(function (response) {
            return response.json();
        }).then(function (teddycomplet) {
            console.log(teddycomplet);
            let indexduteddydansletableauquejeveuxalafin;
            leTableauquejeveuxalafin.map((teddy, indexfinal) => {
                if (teddy.id === teddycomplet._id) {
                    indexduteddydansletableauquejeveuxalafin = indexfinal;
                }
            })
            if (indexduteddydansletableauquejeveuxalafin != undefined) {
                console.log("Produit trouvé");
                leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].quantity += teddypascomplet.quantity;
                leTableauquejeveuxalafin[indexduteddydansletableauquejeveuxalafin].colors.push(" " + teddypascomplet.color + " qty:" + teddypascomplet.quantity);
            } else {
                console.log("Produit non trouvé")
                let produit = { id: teddycomplet._id, name: teddycomplet.name, colors: [teddypascomplet.color + " qty: " + teddypascomplet.quantity], quantity: teddypascomplet.quantity, price: teddycomplet.price, image: teddycomplet.imageUrl };
                leTableauquejeveuxalafin.push(produit);
            }
            if (index === Montableaulocalstorage.length - 1) {
                leTableauquejeveuxalafin.map((teddy, indexalafin) => {
                    console.log(teddy);
                    let teddyLigneAchat = document.createElement('div');
                    let teddyLigneImg = document.createElement('img');
                    // let teddySupprimer = document.createElement('button');
                    // teddySupprimer.innerText = "Supprimer element";
                    // teddySupprimer.addEventListener('click',supprimerElement(teddy.id));
                    // teddyLigneAchat.appendChild(teddySupprimer);
                    // teddySupprimer.addEventListener('click',supprimerElement(teddy.id));
                    teddyLigneImg.className = "imgTeddy";
                    teddyLigneImg.src = teddy.image;
                    let teddyName = document.createElement('p');
                    teddyName.innerText = teddy.name;
                    let teddyColors = document.createElement('p');
                    teddyColors.innerText = "Couleurs choisis: " + teddy.colors;
                    let teddyPriceTotal = document.createElement('p');
                    teddyPriceTotal.innerText = "qty final: " + teddy.quantity + ", " + "prix total: " + (teddy.price * teddy.quantity) / 100 + " €";
                    prixTotal += teddy.price * teddy.quantity;
                    teddySommeTotal.innerText ="Total panier: "+  prixTotal/100 + ' €';
                    // console.log(prixTotal); // test prix 
                    teddyLigneAchat.appendChild(teddyLigneImg);
                    teddyLigneAchat.appendChild(teddyName);
                    teddyLigneAchat.appendChild(teddyColors);
                    // teddyLigneAchat.appendChild(teddySupprimer);
                    teddyLigneAchat.appendChild(teddyPriceTotal);
                    document.getElementById('panier').appendChild(teddyLigneAchat);
                })
            }
        })
    })
} else {
    console.log("Votre panier est vide");
}

// let teddySupprimer = document.createElement('button');
// teddySupprimer.onclick = function(){
//     localStorage.clear();
//     window.location.reload();
// }
// document.getElementById('panier').appendChild(teddySupprimer);
// // teddySupprimer.onclick = resetTableau();

// // function resetTableau(){
// //     localStorage.clear();
// //     window.location.reload();
// // }

// function supprimerElement(cle){
//     localStorage.removeItem(cle);
//     console.log(localStorage);
//     // window.location.reload();
// }