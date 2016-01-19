(function(){
    angular
        .module('app.config')
        .config(Route)
        .run(RouteInterceptor);

    RouteInterceptor.$inject = ['$rootScope', '$location', 'auth'];

    function Route($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home/home.html',
                controller: 'HomeController as vm'
            })
            .when('/login', {
                templateUrl: 'public/views/login/login.html',
                controller: 'LoginController as vm'
            })
            .when('/register', {
                templateUrl: 'public/views/register/register.html',
                controller: 'RegisterController as vm'
            })
            .when('/dashboard', {
                templateUrl: 'public/views/dashboard/dashboard.html',
                controller: 'DashboardController as vm',
                requiresLogin: true


            })
            .otherwise({redirectTo: '/'});

    }
    function RouteInterceptor($rootScope, $location, auth){
        $rootScope.$on('$routeChangeStart', function(event, next){
            var authenticated = (auth.isAuthed());

            if(next.requiresLogin){
               if(!authenticated){
                   event.preventDefault();
                   $location.path('/');
               }
            }



        })
    }

}());