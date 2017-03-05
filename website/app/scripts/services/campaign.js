'use strict';

/**
 * @ngdoc service
 * @name morewithlessApp.campaign
 * @description
 * # campaign
 * Service in the morewithlessApp.
 */
angular.module('morewithlessApp')
  .service('campaign', function ($resource, $q) {
    var campaignResource = $resource(
      location.protocol + '//' + location.host+':8080'+'/campaigns'
    )
    var campaignFactory = {
      getAllCampaigns: getAllCampaigns
    }  
      
    function getAllCampaigns(){
      return campaignResource.query()
    }
    
    return campaignFactory
});
