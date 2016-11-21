class NegociacaoController {
    
    constructor(){
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        
        this._negociacaoService = new NegociacaoService();
        this._ordemAtual = '';
        
        this._listaNegociacoes = new Bind(
                new ListaNegociacoes(), 
                new NegociacoesView($('#negociacoesView')), 
                'adiciona', 'esvazia', 'ordena', 'inverteOrdem');

        this._mensagem = new Bind(
            new Mensagem(),
            new MensagemView($('#mensagemView')),
            'texto');
        
        ConnectionFactory
            .getConnection()
            .then(conn => new NegociacaoDao(conn))
            .then(dao => dao.listaTodos())
            .then(negociacoes => 
                  negociacoes.forEach(negociacao => {
                            this._listaNegociacoes.adiciona(negociacao);
                        }))
            .catch(erro => {
                console.log(erro)
                this._mensagem.texto = erro
            })
            
    }
    
    adiciona(event){
        event.preventDefault();
        
        ConnectionFactory
            .getConnection()
            .then(conn => {
                console.log('getconn');
                let negociacao = this._criaNegociacao();        
                new NegociacaoDao(conn)
                    .adiciona(negociacao)
                    .then(()=>{
                        console.log('inseriyu');
                        this._listaNegociacoes.adiciona(negociacao);
                        this._mensagem.texto = 'Negociação adicionada';       
                        this._limpaFormulario();
                    })
            })
            .catch(erro => this._mensagem.texto = erro)
        
        
    }
    
    apaga(){
        
        ConnectionFactory
            .getConnection()
            .then(conn => {
                new NegociacaoDao(conn)
                    .apagaTodos()
                    .then(()=>{
                        this._listaNegociacoes.esvazia();        
                        this._mensagem.texto = 'Lista Apagadas';
                    })
            })
            .catch(erro => this._mensagem.texto = erro)
        
        
    }
    
    ordena(coluna) {
        if(this._ordemAtual == coluna) {
            this._listaNegociacoes.inverteOrdem();
        } else {
            this._listaNegociacoes.ordena((a, b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
    
    importaNegociacoes(){
         service.
            obterNegociacoes()
        .then(negociacoes => {
            negociacoes.forEach(negociacao => {
                this._listaNegociacoes.adiciona(negociacao)
            }); 
            this._mensagem.texto = 'Importadas com sucessp' ;
        })
        .catch(erro => this._mensagem.texto = erro);  
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
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }
}