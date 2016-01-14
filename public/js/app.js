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


        })
    }

}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.constants')
        .constant('API', 'http://localhost:8080/api');

}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.config')
        .config(authConfig);


    function authConfig($httpProvider){
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};

        $httpProvider.interceptors.push('authInterceptor');
    }
}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.factories')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['API', 'auth', '$location'];

    function authInterceptor(API, auth, $location){
        return {
            // automatically attach Authorization header
            request: function(config) {

                var token = auth.getToken();
                if(config.url.indexOf(API) === 0 && token) {
                    config.headers.Authorization = 'Bearer ' + token;
                }

                return config;
            },

            // If a token was sent back, save it
            response: function(res) {

                if(res.config.url.indexOf(API) === 0 && res.data.token) {
                    auth.saveToken(res.data.token);
                }
                return res;
            },

            responseError: function(rejection){
                if(rejection.status === 401 || rejection.status === 403){
                    console.log('Response Error 401', rejection);
                    $location.path('#/');
                }
                return rejection;
            }
        }
    }
}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.services')
        .service('auth', authService);

    authService.$inject = ['$window'];

    function authService($window){
        var vm = this;

        // decode jwt
        vm.parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace('-', '+').replace('_', '/');
            console.log('JSON: ',JSON.parse($window.atob(base64)));
            return JSON.parse($window.atob(base64));
        };

        // save token to local storage
        vm.saveToken = function(token) {
            $window.localStorage['jwtToken'] = token;
        };

        // retrieve token from localStorage
        vm.getToken = function() {
            return $window.localStorage['jwtToken'];
        };

        vm.isAuthed = function() {
            var token = vm.getToken();
            if(token) {
                var params = vm.parseJwt(token);

                //Unix Time is in seconds while JavaScript Date.now()
                // returns milliseconds, so a conversion is necessary
                return Math.round(new Date().getTime() / 1000) <= params.exp;
            } else {
                return false;
            }
        };

        vm.logout = function() {
            $window.localStorage.removeItem('jwtToken');
        }
    }
}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.services')
        .service('user', userService);

    userService.$inject = ['$http', 'API'];

    function userService($http, API){
        var vm = this;


        vm.register = function(name, email, password, role){
            return $http.post(API +'/user/register',{
                name: name,
                email: email,
                password: password,
                role: role
            })
        };

        vm.login = function(email, password) {
            return $http.post(API + '/authenticate', {
                email: email,
                password: password
            })
        };
    }
}());
/**
 * Created by HWhewell on 12/01/2016.
 */
(function(){
    angular
        .module('app.controllers')
        .controller('DashboardController', dashboardController);

    dashboardController.$inject = ['auth'];

    function dashboardController(auth){
        var vm = this;


        vm.logout = function(){
            auth.logout && auth.logout()
        };

        vm.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false
        }

    }
}());
(function(){
    angular
        .module('app.controllers')
        .controller('HomeController', homeController);


    function homeController(){
        var vm = this;

    }
}());


/**
 * Created by HWhewell on 12/01/2016.
 */
(function(){
    angular
        .module('app.controllers')
        .controller('LoginController', loginController);

    loginController.$inject = ['user', '$location'];

    function loginController(user, $location){
        var vm = this;

        function handleRequest(res){
            var token = res.data ? res.data.token : null;
            if(token){
                console.log('JWT:', token);
            }
            vm.success = res.data.success;
        }

        vm.login = function(){
            user.login(vm.email, vm.password)
                .then(handleRequest, handleRequest);
            $location.path('/dashboard');

        };

    }
}());
/**
 * Created by HWhewell on 12/01/2016.
 */
(function(){
    angular
        .module('app.controllers')
        .controller('RegisterController', registerController);

    registerController.$inject = ['user','$location'];

    function registerController(user, $location){
        var vm = this;

        function handleRequest(res){
            var token = res.data ? res.data.token : null;
            if(token){
                console.log('JWT:', token);
            }
            vm.message = res.data.message;
        }

        vm.register = function(){
            user.register(vm.name, vm.email, vm.password, vm.route)
                .then(handleRequest, handleRequest);
            $location.path('/dashboard');
        };
    }
}());