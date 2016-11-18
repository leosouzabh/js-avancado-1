class NegociacaoService{
    
    obterNegociacoesDaSemana(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semanas');
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    cb(null, JSON.parse(xhr.responseText)
                        .map((objeto)=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                    
                } else {
                    console.log(xhr.responseText);
                    cb('Erro ao obter as negociacoes');
                }
            }
        }
        xhr.send();
    }
    
    obterNegociacoesDaSemanaRetrasada(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/retrasada');
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    cb(null, JSON.parse(xhr.responseText)
                        .map((objeto)=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                    
                } else {
                    console.log(xhr.responseText);
                    cb('Erro ao obter as negociacoes');
                }
            }
        }
        xhr.send();
    }
    
    obterNegociacoesDaSemanaAnterior(cb){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/anterior');
        
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4){
                if (xhr.status == 200){
                    cb(null, JSON.parse(xhr.responseText)
                        .map((objeto)=>new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    );
                    
                } else {
                    console.log(xhr.responseText);
                    cb('Erro ao obter as negociacoes');
                }
            }
        }
        xhr.send();
    }
    
}