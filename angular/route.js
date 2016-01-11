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
    }
}());