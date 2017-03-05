'use strict';

/**
 * @ngdoc service
 * @name morewithlessApp.user
 * @description
 * # user
 * Service in the morewithlessApp.
 */
angular.module('morewithlessApp')
  .service('user', function ($resource) {
    
    var userResource = $resource(
      location.protocol + '//' + location.host+':8080'+'/users/:username',
      {username: '@username'}
    )
      
    function getAllusers(){
      return userResource.query()
    }
    function getByUsername(username){
      return userResource.get({username:username}).$promise
    }

    var userFactory = {
      getAllusers: getAllusers,
      getByUsername: getByUsername
    }
    return userFactory
  });
