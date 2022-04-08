const table = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const tableContainer = document.querySelector('#tabela');

const selectCategoria = document.querySelector('#categoria-produto');

selectCategoria.addEventListener('change', function(){

    if (this.selectedIndex == 0) {
        totalRegistros.textContent = produtos.length;
        tbody.childNodes.forEach(function(d) { return d.style.display = ''; })
    } else {
        filtrarLinhas(this.value)    
    }
    
});



const totalRegistros = document.querySelector('#total-produtos');

const CABECALHO = ["ID", "Nome", "Preço",  "Categoria"];

let produtos = []
let categoriasDosProdutos = []

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

        produtos.push(dados[i])

        if (!categoriasDosProdutos.includes(dados[i].category))
            categoriasDosProdutos.push(dados[i].category)


        let registro = [
            dados[i].id.toString().padStart(2,  0),
            dados[i].title,
            dados[i].price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            dados[i].category
        ]


        let celulaOpcoes = document.createElement('td');
        
        let botaoApagar = document.createElement('button');
        botaoApagar.setAttribute('type', 'button');
        botaoApagar.value = dados[i].id;
        botaoApagar.textContent = "Excluir";
        botaoApagar.addEventListener('click', function(){
            
            let id = +this.value;
            console.log(id);

            if (confirm('Tem certeza que deseja excluir este item?')) {
                excluirProduto(id);
            }
        });
    

        celulaOpcoes.appendChild(botaoApagar);
        


        for (let j = 0; j < registro.length; j++) {
            
            let celula = linha.insertCell();
            celula.innerText = registro[j];
            celula.setAttribute('title', registro[j])
            
            if (j == 1) {

                celula.addEventListener('click', function() {

                    let id = this.parentElement.id.split('-')[1]
                    let produto = produtos.find(function(d) { return d.id == id; });
        
                    sessionStorage.clear();
                    sessionStorage.setItem("id", produto.id);
                    sessionStorage.setItem("nome", produto.title);
                    sessionStorage.setItem("preco", produto.price);
                    sessionStorage.setItem("categoria", produto.category);
        
                    window.open("exibir.html","_self")
        
                });
                
            }
            
            linha.appendChild(celula);
            linha.appendChild(celulaOpcoes)

        } // fim for j
        
    } // fim for i

    document.querySelectorAll('tr td:nth-child(3)').forEach(function(d) {
        d.setAttribute('class', 'texto-alinhado-direita');
    });    
}


function excluirProduto(id) {
    let indice = produtos.findIndex(function(d) { return d.id == id; });
    produtos.splice(indice, 1)
    tbody.deleteRow(indice);
}

function atualizarBarraDeFerramentas(dados) {

    totalRegistros.textContent = dados.length

    for (let i = 0; i < categoriasDosProdutos.length; i++) {
        
        let option = document.createElement('option');
        option.setAttribute('value', categoriasDosProdutos[i])
        option.textContent = categoriasDosProdutos[i]
        selectCategoria.appendChild(option)     
    }

}

function filtrarLinhas(categoria) {

    let totalItensFiltrados = 0;

    tbody.childNodes.forEach(function(linha) {
            
        let td = linha.childNodes[3];

        if (td.textContent == categoria) {
            linha.style.display = '';
            totalItensFiltrados++;
        } else {
            linha.style.display = 'none';
        }
    });

    totalRegistros.textContent = totalItensFiltrados;

}

function carregarDados() {

    fetch('data/produtos.json')
        .then(function(resposta) { return resposta.json(); })
        .then(function(dados) { 
            
            adicionarLinhas(dados);
            atualizarBarraDeFerramentas(dados)
        
        }).catch(function(erro) {
            console.error("Não foi possível carregar os dados: " + erro.message);
        });

}