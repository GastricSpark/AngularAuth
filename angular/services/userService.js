/**
 * Created by HWhewell on 11/01/2016.
 */
(function(){
    angular
        .module('app.services')
        .service('user', userService);

    userService.$inject = ['$http', 'API', '$location'];

    function userService($http, API, $location){
        var vm = this;


        vm.register = function(name, email, password, role){
            return $http({
                method: 'POST',
                url: API + '/user/register',
                data:'name=' + name + '&' + 'email=' +email + '&'
                + 'password=' +password + '&' + 'role=' + role,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(res){
                    if(res.data.success == true){
                        $location.path('/login');
                    }
                    else{
                        window.alert('Could not Register!')
                    }
                }

            )
        };

        vm.login = function(email, password) {
            return $http({
                method: 'POST',
                url: API + '/authenticate',
                data: 'email=' +email + '&' + 'password=' +password,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallback(res){
                    if(res.data.success == true){
                        $location.path('/dashboard');
                    }
                    else{
                        window.alert('Wrong Login Credentials!')
                    }
                }

            )
        };
    }
}());