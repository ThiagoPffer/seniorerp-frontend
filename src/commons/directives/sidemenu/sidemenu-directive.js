appModule.directive("sidemenu", function() {
    return {
        restrict: "E",
        transclude: true,
        scope: {},
        templateUrl: 'src/commons/directives/sidemenu/sidemenu.html',
        controller: SidemenuDirective,
        controllerAs: 'vm'
    };
});

function SidemenuDirective($scope, $location) {
    var vm = this;
}