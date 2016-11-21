var ConnectionFactory = (function(){
    
    const stores = ['negociacoes'];
    const version = 4;
    const dbName = 'aluraframe';

    var conn = null;    
    var close = null;

    return class ConnectionFactory{

        constructor(){
            throw new Error('nao é possivel criar instancias');
        }

        static getConnection(){
            return new Promise( (resolve, reject)=>{

                let openRequest = window.indexedDB.open(dbName, version);
                openRequest.onupgradeneeded = e=> {
                    ConnectionFactory._createStore(e.target.result);                
                }

                openRequest.onsuccess = e=> {
                    if (!conn){
                        conn = e.target.result
                        close = conn.close;
                        conn.close = function(){
                            throw new Error('não pode fechar conexao')
                        }
                    }
                        
                    resolve(conn);
                }

                openRequest.onerror = e=>{
                    reject(e.target.error.name);
                }

            });
        }

        static closeConnection(){
            if (!conn){
                Reflect.apply(close, conn, []);
                conn = null;
            }
        }
        
        static _createStore(connection){
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }           
            });

            connection.createObjectStore(
                'negociacoes', {autoIncrement:true});
        }
        
        

    }
})();