class NegociacaoDao{
    
    constructor(connection){
        this._connection = connection;
        this._store = 'negociacoes';
    }
    
    adiciona(negociacao){
        return new Promise((resolve, reject)=>{
            
            let tx = this._connection.transaction([this._store], 'readwrite');
            let store = tx.objectStore(this._store);
            let request = store.add(negociacao);
             
            request.onsuccess = e=>{
                console.log('added');
                resolve();
            }
            request.onerror = e=>{
                console.log(e.target.error)
                reject('Não foi possivel incluir');
            }
 
        })
    }
    
    listaTodos(negociacao){
        return new Promise((resolve, reject)=>{
            
            let cursor = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .openCursor();
             
            let negociacoes = [];
            cursor.onsuccess = e=> {
                
                let atual = e.target.result;
                if (atual){
                    var dado = atual.value;
                    negociacoes.push( new Negociacao(dado._data, dado._quantidade, dado._valor) );
                    atual.continue();
                } else {
                    resolve(negociacoes);
                }
                
                
            };
            cursor.onerror = e=> {
                console.log(e.target.error);
                reject("Erro ao listar");
            };
 
        })
    }
    
    apagaTodos(negociacao){
        return new Promise((resolve, reject)=>{
            
            let request = this._connection
                .transaction([this._store], 'readwrite')
                .objectStore(this._store)
                .clear();
             
            request.onsuccess = e=> resolve('Sucesso ao remover')
            request.onerror = e=>{
                console.log(e.target.error);
                reject('Não foi possivel incluir');
            }
 
        })
    }
    
    
    
}

