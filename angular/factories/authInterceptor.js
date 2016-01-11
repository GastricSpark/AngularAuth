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