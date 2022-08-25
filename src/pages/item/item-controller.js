appModule.controller("ItemController", ItemController);

function ItemController($scope, $route, $location, StorageService, NotificationService, itemId) {
    var vm = this;
    vm.itemId = itemId;
    vm.item = { quantidade: 0 };
    vm.title = 'Novo item'
    vm.saveItem = _saveItem;
    vm.validateDataValidade = _validateDataValidade;
    vm.validateDataFabricacao = _validateDataFabricacao; 
    $scope.unidadesMedida = [
        {
            id: 0,
            descricao: 'Litro',
            abreviatura: 'lt',
            decimais: 3
        },
        {
            id: 1,
            descricao: 'Quilograma',
            abreviatura: 'kg',
            decimais: 3
        },
        {
            id: 2,
            descricao: 'Unidade',
            abreviatura: 'un',
            decimais: 0
        }
    ]

    _initialize();

    function _initialize() { _getItens(); }

    function _getItens() {
        StorageService.getItens().then(itens => {
            vm.itens = itens ? itens : [];
            if (itemId) { _setItem(); }
        });
    }

    function _setItem() {
        let item = vm.itens.find((item, index) => {
            if (item.id == itemId) {
                vm.index = index;
                return true;
            }
        });
        item.dataValidade = new Date(item.dataValidade);
        item.dataFabricacao = new Date(item.dataFabricacao);
        vm.item = item;
        vm.title = item.nome;
        $scope.$apply();
    }

    function _saveItem() {
        if (vm.item.id) { _update(); } else { _insert(); }
    }

    function _insert() {
        vm.item.id = vm.itens.length + 1;
        vm.itens.push(vm.item);
        StorageService.saveItens(angular.copy(vm.itens));
        NotificationService.notify("Item salvo com sucesso!");
        $location.path('/listagem');
    }

    function _update() {
        vm.itens[vm.index] = angular.copy(vm.item);
        StorageService.saveItens(angular.copy(vm.itens));
        NotificationService.notify("Item salvo com sucesso!");
        $location.path('/listagem');
    }

    function _validateDataValidade() {
        vm.vencido = vm.item.dataValidade && vm.item.dataValidade < Date.now();
        _validateDataFabricacao();
    }

    function _validateDataFabricacao() {
        if (vm.item.dataValidade && vm.item.dataFabricacao) {
            if (vm.item.dataFabricacao > vm.item.dataValidade) {
                NotificationService.notify("Data de fabricação não pode ser maior que a data de validade!");
                vm.item.dataFabricacao = null;
            }
        }
    }

}