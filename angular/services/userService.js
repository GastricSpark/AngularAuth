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