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