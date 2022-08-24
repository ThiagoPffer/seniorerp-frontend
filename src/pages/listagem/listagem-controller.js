appModule.controller("ListagemController", ListagemController);

function ListagemController($scope, $route, StorageService, NotificationService) {
    var vm = this;
    vm.itens = [];
    vm.removeItem = _removeItem;
    _initialize();

    function _initialize() {
        _getItens();
    }

    function _getItens() {
        StorageService.getItens().then(itens => {
            vm.itens = itens ? itens : vm.itens;
            $scope.$apply();
        });
    }

    function _removeItem(itemId) {
        if (confirm('Deseja mesmo excluir este item?')) {
            let itens = vm.itens.filter(item => {
                return item.id != itemId;
            });
            StorageService.saveItens(itens);
            NotificationService.notify("Item excluído com sucesso!");
            $route.reload();
        }
    }

}