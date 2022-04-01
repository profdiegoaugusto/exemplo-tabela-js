const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const tableContainer = document.querySelector('.wrapper');

const CABECALHO = ["ID", "Nome", "Preço",  "Categoria"];

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

    for (let celula = 0; celula < CABECALHO.length; celula++) {

        let th = document.createElement('th');
        th.textContent = CABECALHO[celula];
        linha.appendChild(th);
        
    }

    let ths = thead.children[0].childNodes;

    for (let i = 1; i < ths.length; i++) {
        
        if (i == (ths.length - 2)) {
            ths[i].setAttribute('class', 'texto-alinhado-direita');
        } else {
            ths[i].setAttribute('class', 'texto-alinhado-esquerda');

        }
        
    }
     

}

function adicionarLinhas(dados) {

    for (let i = 0; i < dados.length; i++) {
        
        let linha = tbody.insertRow();
        linha.setAttribute('id', 'produto-' + dados[i].id)

        let registro = [
            dados[i].id.toString().padStart(2,  0),
            dados[i].title,
            dados[i].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            dados[i].category
        ]


        for (let j = 0; j < registro.length; j++) {
            
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title', registro[j])

            linha.appendChild(celula);

        } // fim for j
        
    } // fim for i

    document.querySelectorAll('tr td:nth-child(3)').forEach(function(d) {
        d.setAttribute('class', 'texto-alinhado-direita');
    });
    
}

function carregarDados() {

    fetch('data/produtos.json')
        .then(function(resposta) { return resposta.json(); })
        .then(function(dados) { 
            
            adicionarLinhas(dados);
        
        }).catch(function(erro) {
            console.error("Não foi possível carregar os dados: " + erro.message);
        });

}