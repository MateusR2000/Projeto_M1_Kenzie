let index = document.querySelector("body");
let vitrine = document.createElement("main");
index.appendChild(vitrine);

let products = document.createElement("ul");
vitrine.appendChild(products);


let side = document.createElement("div")
side.setAttribute("class", "container")
vitrine.appendChild(side);

document.querySelector(".container").insertAdjacentHTML("beforeend",
    `<div class="searchbar"     >
        <input type="text" placeholder="Digite a sua pesquisa" class="type_search">
        <button type="submit" class="search">Pesquisar</button></div>`
)

document.querySelector(".container").insertAdjacentHTML("beforeend",
    `<div class = "cart"><p class="title_cart">Carrinho de Compras</p>`
)

let quantidade = 0
let total = 0

function createCard(itens) {
    for (let i = 0; i < itens.length; i++) {
        item = itens[i];
        let card = document.createElement("li");
        card.setAttribute("class", "card");

        let img = document.createElement("img");
        img.src = item.img;
        img.alt = item.nameItem;

        let tag = document.createElement("p");
        tag.setAttribute("class", "tag");
        tag.innerHTML = item.tag;

        let name = document.createElement("h4");
        name.innerHTML = item.nameItem;

        let description = document.createElement("p");
        description.innerHTML = item.description;
        description.setAttribute("class", "description");

        let price = document.createElement("p");
        price.innerText = `R$ ${item.value.toFixed(2)}`;
        price.setAttribute("class", "price");

        let button = document.createElement("button");
        button.innerText = "Adicionar ao carrinho"
        button.className = "add";
        button.id = item.id

        card.appendChild(img);
        card.appendChild(tag);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(button);

        let list = document.querySelector("ul");
        list.appendChild(card);
    }
}

createCard(data);

let cart = document.querySelector(".cart");

let list = document.createElement("ul");
list.setAttribute("class", "list");
cart.appendChild(list);

let arr = document.querySelectorAll(".add");

let cards = []

function addToCart(array, objects) {
    for (let i = 0; i < array.length; i++) {
        array[i].addEventListener("click", (e) => {
            cards.push(array[i])
            quantidade += 1
            total += objects[i].value

            document.querySelector(".num").innerHTML = quantidade;
            document.querySelector(".valor_total").innerHTML = `R$${total}`;

            let listCart = document.getElementsByClassName("list");

            let product = document.createElement("li");
            product.setAttribute("class", "product");
            list.appendChild(product);

            let imgCart = document.createElement("img");
            imgCart.src = objects[i].img
            imgCart.setAttribute("class", "img_cart");

            let nameCart = document.createElement("p");
            nameCart.innerText = objects[i].nameItem;
            nameCart.setAttribute("class", "nameCart")

            let priceCart = document.createElement("p");
            priceCart.innerText = `R$ ${objects[i].value.toFixed(2)}`
            priceCart.setAttribute("class", "price_cart")

            let remove = document.createElement("button");
            remove.innerText = "Remover Produto"
            remove.setAttribute("class", "remove")

            product.appendChild(imgCart);
            product.appendChild(nameCart);
            product.appendChild(priceCart);
            product.appendChild(remove);

            remove.addEventListener("click", (e) => {
                product.remove();
                quantidade -= 1
                total -= objects[i].value;
                document.querySelector(".num").innerHTML = quantidade;
                document.querySelector(".valor_total").innerHTML = `R$${total}`;
            })
        })
    }
}

cart.insertAdjacentHTML("afterend",
    `<div class = "cart_bottom">
        <div class="quantidade">
            <p>Quantidade:</p>
            <p class="num">${quantidade}</p>
        </div>
        <div class="total">
            <p>Total:</p>
            <p class="valor_total">R$${total.toFixed(2)}</p>
        </div>
    </div>`)

let bottom = document.querySelector(".cart_bottom");


let preVenda = [];
let melhores = [];
let destaques = [];

for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].tag.length; j++) {
        if (data[i].tag[j] === "Pré-Venda") {
            preVenda.push(data[i]);
        }
        else if (data[i].tag[j] === "Os Melhores") {
            melhores.push(data[i]);
        }
        else if (data[i].tag[j] === "Destaques") {
            destaques.push(data[i]);
        }
    }
}

document.querySelector(".button2").addEventListener("click", (e) => {
    products.innerHTML = ""
    createCard(preVenda)
    let arrVenda = document.querySelectorAll(".add")
    addToCart(arrVenda, preVenda);
})

document.querySelector(".button3").addEventListener("click", (e) => {
    products.innerHTML = ""
    createCard(melhores);
    let arrMelhores = document.querySelectorAll(".add")
    addToCart(arrMelhores, melhores);
})

document.querySelector(".button4").addEventListener("click", (e) => {
    products.innerHTML = ""
    createCard(destaques);
    let arrDestaques = document.querySelectorAll(".add")
    addToCart(arrDestaques, destaques);
})

document.querySelector(".button1").addEventListener("click", (e) => {
    products.innerHTML = ""
    createCard(data);
    let arrTodos = document.querySelectorAll(".add")
    addToCart(arrTodos, data)
})

let search = []

document.querySelector(".search").addEventListener("click", (e) => {
    let input = document.querySelector("input").value;
    console.log(input);
    for (let i = 0; i < data.length; i++) {
        if (data[i].nameItem.toLowerCase().includes(input.toLowerCase())) {
            search.push(data[i])
        }
    }
    if (search.length === 0) {
        products.innerHTML = ""
    }
    else {
        products.innerHTML = ""
        createCard(search);
        let arrSearch = document.querySelectorAll(".add")
        addToCart(arrSearch, search)
    }
})

addToCart(arr, data)