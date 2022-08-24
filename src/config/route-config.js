appModule.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");

    $routeProvider.when("/listagem", {
        templateUrl: "src/pages/listagem/listagem.html",
        controller: "ListagemController as vm"
    });

    $routeProvider.when("/item", {
        templateUrl: "src/pages/item/item.html",
        controller: "ItemController as vm",
        resolve: {
            itemId: function() { return null; }
        }
    });

    $routeProvider.when("/item/:id", {
        templateUrl: "src/pages/item/item.html",
        controller: "ItemController as vm",
        resolve: {
            itemId: function($location) {
                return $location.path().split("/item/").pop();
            }
        }
    });

    $routeProvider.otherwise({redirectTo: "/listagem"});

});