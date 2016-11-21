class NegociacoesView extends View{
    constructor(elemento){
        super(elemento);
    }
    template(model) {
        console.log(model);
        return `
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th onclick="negociacaoController.ordena('data')">DATA</th>
                        <th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
                        <th onclick="negociacaoController.ordena('valor')">VALOR</th>
                        <th onclick="negociacaoController.ordena('volume')">VOLUME</th>
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
}