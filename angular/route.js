(function(){
    angular
        .module('app.config')
        .config(Route);

    function Route($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home/home.html',
                controller: 'HomeController as vm'
            })
            .when('/fail', {
                templateUrl: 'public/views/fail/fail.html',
                controller: 'FailController as vm'
            })
    }
}());