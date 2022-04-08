let produto = {};

const nome = document.querySelector("#nome-produto")
const preco = document.querySelector("#preco")
const categoria = document.querySelector("#categoria")

window.addEventListener('load', function() {

    produto = carregarProduto();
    nome.textContent = produto.nome;

    console.log(produto);


});

function carregarProduto() {

    return {
        id: sessionStorage.getItem("id"),
        nome: sessionStorage.getItem("nome"),
        preco: sessionStorage.getItem("preco"),
        categoria: sessionStorage.getItem("categoria")
    }

}