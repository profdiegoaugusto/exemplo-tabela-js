class Produto {

    #id;

    constructor(id, nome, preco, descricao, categoria, imagem, avaliacao) {
        this.#id = id;
        this._nome = nome;
        this._preco = preco;
        this._descricao = descricao;
        this._categoria = categoria;
        this._imagem = imagem;
        this._avalicao = avaliacao;
    }

    get ID() { return this.id; }


}