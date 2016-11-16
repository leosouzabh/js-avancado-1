class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        
        this._listaNegociacoes = new ListaNegociacoes();
        
        this._negociacoesView = new NegociacoesView($('#negociacoesView'));
        console.log(this._negociacoesView);
        this._negociacoesView.update(this._listaNegociacoes);
    }
    
    adiciona(event){
        event.preventDefault();
        
        let negociacao = this._criaNegociacao();        
        this._listaNegociacoes.adiciona(negociacao);
        
        this._negociacoesView.update(this._listaNegociacoes);
        this._limpaFormulario();
    }
    
    _limpaFormulario(){
        this._inputData.value = ""
        this._inputData.focus()
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;
    }
    
    _criaNegociacao(){
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }
}