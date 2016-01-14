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
            vm.message = res.data.message;
        }

        vm.login = function(){
            user.login(vm.username, vm.password)
                .then(handleRequest, handleRequest);
            $location.path('/dashboard');

        };
    }
}());