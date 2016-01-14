(function(){
    angular
        .module('app', [
            'app.controllers',
            'app.services',
            'app.factories',
            'app.directives',
            'app.config',
            'app.constants',
            'ngRoute',
            'ui.bootstrap'
        ]);

    angular.module('app.controllers', []);
    angular.module('app.services', []);
    angular.module('app.factories', []);
    angular.module('app.directives', []);
    angular.module('app.constants', []);
    angular.module('app.config', ['ngRoute']);

}());
