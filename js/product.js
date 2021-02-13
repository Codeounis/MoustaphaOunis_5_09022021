const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')
console.log(id);

fetch("http://localhost:3000/api/teddies/"+id).then(function (response) {
  return response.json();
}).then(function (data) {
  console.log(data);
  createTeddyInfos();
})

function createTeddyInfos(){
  let teddyBlock = document.createElement("div");
  let teddyBuyButton = document.createElement("button");
  teddyBuyButton.innerText = "Achetez moi"
  teddyBuyButton.onclick = function(){
    console.log("j'ai acheté l'id:"+ id);
  }
  teddyBlock.appendChild(teddyBuyButton);
  document.body.appendChild(teddyBlock);
}