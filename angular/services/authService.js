/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.services')
        .service('auth', authService);

    authService.$inject = ['$window','$location'];

    function authService($window, $location){
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

        vm.isAdmin = function() {
            var token = vm.getToken();
            if(token){
                var params = vm.parseJwt(token);
                var role = params.role;

                return role == 'admin';

            } else {
                return false;
            }
        }

        vm.logout = function() {
            $window.localStorage.removeItem('jwtToken');
            $location.path('/');
        }
    }
}());