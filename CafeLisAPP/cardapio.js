//Importação do arquivo com as imagens e legendas
import itens from './model/dataset.js';
import foodsModel from './model/foods.js';

foodsModel.load(itens);
let foods = foodsModel.readAll();


//Função para ler os cards que foram adicionados através do Id
function initFoodsCard() {

    for (let item of foods) {

        const view = createFoodCardItem(item);

        //let itensCardapio = document.querySelector('.itens-cardapio');
        let itensCardapio = document.getElementById("itens-cardapio");
        itensCardapio.insertAdjacentHTML('beforeend', view);
    }
}

//Função para os cards serem adicionados na página HTML
function createFoodCardItem(item) {

    const view = `<div class="col-3 card my-1 mx-1 py-1">
                    <img src="${item.imagem}" class="card-img-top" alt="...">
  
                    <div class="card-body">
                      <h5 class="card-title">${item.nome}</h5>
                      <p class="card-text">${item.descricao}</p>
                      <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                  </div>`;

    return view;
}


// Captar o evento de submissão do formulário e adicionar o item no cartão (card).
// const foodForm = document.querySelector('#foodForm');
const foodForm = document.getElementById("foodForm");

foodForm.onsubmit = function(event) {
    // Previnir que o modal fique abrindo e fechando em loop.
    event.preventDefault();

    let newFood = Object.fromEntries(new FormData(foodForm));
    foodsModel.create(newFood);

    const foodCard = createFoodCardItem(newFood);
    let itensCardapio = document.getElementById("itens-cardapio");
    itensCardapio.insertAdjacentHTML('beforeend', foodCard);
}

initFoodsCard();