'use strict';

/**
 * @ngdoc service
 * @name morewithlessApp.user
 * @description
 * # user
 * Service in the morewithlessApp.
 */
angular.module('morewithlessApp')
  .service('user', function ($resource, $q) {
    
    var userResource = $resource(
      location.protocol + '//' + location.host+':8080'+'/users/:username',
      {
        username: '@username'
      },
      {
          'save':   {method:'PUT'},
      }
    )
    function updateWorkersInfo(dataCompany){
      var defer = $q.defer()
      dataCompany.workers = []
      dataCompany.quantity = 0
      var users = getAllusers().then(
        function(users){
          for(var i = 0 ; i < users.length; i++){
            if(users[i].company == dataCompany.company && !users[i].isCompany){
              dataCompany.workers.push(users[i])
              if(users[i].isAuthorized)
                dataCompany.quantity = +dataCompany.quantity + +users[i].quantity
            }
          }
          defer.resolve(dataCompany)
        },function(err){
          defer.reject(err)
          console.error("problem obtaining users")
        }
      )

      return defer.promise
    }
    function updateCompanyInfo(dataUser){
      var defer = $q.defer()
      var users = getAllusers().then(function(users){
        for(var i = 0 ; i < users.length; i++){
          if(users[i].company == dataUser.company && users[i].isCompany){
            dataUser.company = users[i]
            defer.resolve(users[i])
          }
        }
      },function(err){
        defer.reject(err)
        console.error("problem obtaining users")
      })
      return defer.promise
    }
    function getAllusers(){
      return userResource.query().$promise
    }
    function getByUsername(username){
      return userResource.get({username:username}).$promise
    }
    function getFullUserByName(username){
      var defer = $q.defer()
      userResource.get({username:username}).$promise.then(
        function(data){
          updateCompanyInfo(data)
          defer.resolve(data)
        },
        function(err){
          defer.reject(data)
          console.error("error obtaining!")
        }
      )
      return defer.promise
    }
    function updateUser(user){
      return userResource.save({username:user.id},user).$promise
    }
    function getFullCompanyByName(companyId){
      var defer = $q.defer()
      userResource.get({username:companyId}).$promise.then(
        function(data){
          updateWorkersInfo(data)
          defer.resolve(data)
        },
        function(err){
          defer.reject(data)
          console.error("error obtaining!")
        }
      )
      return defer.promise
    }

    var userFactory = {
      getAllusers: getAllusers,
      getByUsername: getByUsername,
      updateUser:updateUser,
      getFullUserByName: getFullUserByName,
      getFullCompanyByName:getFullCompanyByName
    }
    return userFactory
  });
