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