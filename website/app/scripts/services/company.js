'use strict';

/**
 * @ngdoc service
 * @name morewithlessApp.company
 * @description
 * # company
 * Service in the morewithlessApp.
 */
angular.module('morewithlessApp')
  .service('company', function ($resource) {
    var companyResource = $resource(
      location.protocol + '//' + location.host+':8080'+'/companies'
    )
    var companyFactory = {
      getAllcompanies: getAllcompanies
    }  
      
    function getAllcompanies(){
      return companyResource.query()
    }
    
    return companyFactory
  });
