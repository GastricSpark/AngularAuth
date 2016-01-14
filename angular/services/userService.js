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