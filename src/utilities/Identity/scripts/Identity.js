angular.module('encore.ui.utilities')
/**
* @ngdoc service
* @name utilities.service:Identity
* @description
* This is a component designed to aid interaction with Rackspace's Identity API.
*
* @requires $resource
*
* @example
* <pre>
* Identity.loginWithJSON(json); //Returns a promise
* Identity.login({username: '', password: '', successCallback, errorCallback}); // returns a promise
* </pre>
*/
.factory('Identity', function ($resource) {
    var authSvc = $resource('/api/identity/:action',
        {},
        {
            loginWithJSON: { method: 'POST', isArray: false, params: { action: 'tokens' }},
            validate: { method: 'GET', url: '/api/identity/login/session/:id', isArray: false }
        });

    authSvc.login = function (credentials, success, error) {
        var body = {
            auth: {
                passwordCredentials: {
                    username: credentials.username,
                    password: credentials.password
                }
            }
        };

        return authSvc.loginWithJSON(body, success, error);
    };

    return authSvc;
});
