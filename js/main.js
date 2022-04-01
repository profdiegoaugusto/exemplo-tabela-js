const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const tableContainer = document.querySelector('.wrapper');

const NUMERO_DE_COLUNAS = 5;
const CABECALHO = ["ID", "Nome", "Preço", "Descrição", "Categoria"];

let produtos = []

window.addEventListener('load', function() {

    criarTabela();
    criarCabecalho(CABECALHO);
    carregarDados();
});

function criarTabela() {
    thead.setAttribute('id', 'cabecalho-tabela');
    tbody.setAttribute('id', 'corpo-tabela');
    table.appendChild(thead);
    table.appendChild(tbody);
    tableContainer.appendChild(table);   
}

function criarCabecalho(dados) {

    let linha = thead.insertRow(0);

    for (let celula = 0; celula < NUMERO_DE_COLUNAS; celula++) {

        let th = document.createElement('th');
        th.textContent = CABECALHO[celula];
        linha.appendChild(th);
        
    }

}

function adicionarLinhas(dados) {

    console.log(dados);

    for (let i = 0; i < dados.length; i++) {
        
        let linha = tbody.insertRow(0);

        for (let j = 0; j < NUMERO_DE_COLUNAS; j++) {
            
            let celula = linha.insertCell(j);
            

        }
        
    }

}

function carregarDados() {

    fetch('data/produtos.json')
        .then(function(resposta) { return resposta.json(); })
        .then(function(dados) { 
            
            adicionarLinhas(dados);
        
        }).catch(function(erro) {
            console.error("Problema ao carregar os dados: " + erro.message);
        });

}