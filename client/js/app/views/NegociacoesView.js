class NegociacoesView{
    constructor(elemento){
        this._elemento = elemento;
    }
    
    _template(model) {
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th>DATA</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR</th>
                        <th>VOLUME</th>
                    </tr>
                </thead>
                <tbody>
                    ${
                        model.negociacoes.map(obj => {console.log(obj); return `
                                <tr>
                                    <td>${DateHelper.dataParaTexto(obj.data)}</td>
                                    <td>${obj.quantidade}</td>
                                    <td>${obj.valor}</td>
                                    <td>${obj.volume}</td>
                                <tr>
                        `}).join('')                    
                    }
                </tbody>
                <tfooter>
                    <td colspan="3"></td>
                    <td>${
                        model.negociacoes.reduce((total, obj) => {console.log(obj); return total + obj.volume}, 0)
                    }</td>
                </tfooter>
            </table>
            `;
    }
    
    update(model) { 
        this._elemento.innerHTML = this._template(model);
    }

}