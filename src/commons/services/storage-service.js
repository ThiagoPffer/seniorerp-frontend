appModule.factory("StorageService", StorageService);

function StorageService() {

    function _saveItens(itens) {
        localStorage.setItem('itens', JSON.stringify(itens));
    }

    async function _getItens() {
        let itens = await JSON.parse(localStorage.getItem('itens'));
        return itens;
    }

    return {
        saveItens: _saveItens,
        getItens: _getItens,
    };
}