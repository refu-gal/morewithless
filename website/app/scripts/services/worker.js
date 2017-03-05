'use strict';

/**
 * @ngdoc service
 * @name morewithlessApp.worker
 * @description
 * # worker
 * Service in the morewithlessApp.
 */
angular.module('morewithlessApp')
  .service('worker', function ($resource) {
    var workerResource = $resource(
      location.protocol + '//' + location.host+':8080'+'/worker'
    )
    var workerFactory = {
      getAllworkers: getAllworkers
    }  
      
    function getAllworkers(){
      return workerResource.query()
    }
    
    return workerFactory
  });
