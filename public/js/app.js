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
        .config(Route);

    function Route($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                templateUrl: 'public/views/home/home.html',
                controller: 'HomeController as vm'
            })
    }
}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.config')
        .config(authConfig);

    function authConfig($httpProvider){
        $httpProvider.interceptors.push('authInterceptor');
    }
}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.constants')
        .constant('API', 'http://test-routes.herokuapp.com');

}());
/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.factories')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['API', 'auth'];

    function authInterceptor(API, auth){
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

    userService.$inject = ['$http', 'API', 'auth'];

    function userService($http, API, auth){
        var vm = this;

        vm.getQuote = function(){
            return $http.get(API + '/auth/quote')
        };

        vm.register = function(username, password){
            return $http.post(API +'/auth/register',{
                username: username,
                password: password
            })
        };

        vm.login = function(username, password) {
            return $http.post(API + '/auth/login', {
                username: username,
                password: password
            })
        };
    }
}());
(function(){
    angular
        .module('app.controllers')
        .controller('HomeController', homeController);

    homeController.$inject = ['user', 'auth'];

    function homeController(user, auth){
        var vm = this;

        function handleRequest(res){
            var token = res.data ? res.data.token : null;
            if(token){
                console.log('JWT:', token);
            }
            vm.message = res.data.message;
        }

        vm.login = function(){
            user.login(vm.username, vm.password)
                .then(handleRequest, handleRequest)
        };

        vm.register = function(){
            user.register(vm.username, vm.password)
                .then(handleRequest, handleRequest)
        };

        vm.getQuote = function(){
            user.getQuote()
                .then(handleRequest, handleRequest)
        };

        vm.logout = function(){
            auth.logout && auth.logout()
        };

        vm.isAuthed = function() {
            return auth.isAuthed ? auth.isAuthed() : false
        }
    }
}());

