appModule.directive("pHeader", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {},
        bindToController: {
            title: '=?'
        },
        templateUrl: 'src/commons/directives/header/header.html',
        controller: HeaderDirective,
        controllerAs: 'vm'
    };
});

function HeaderDirective($scope, $location) {
    var vm = this;
}