'use strict';

describe('Controller: CompanyCtrl', function () {

  // load the controller's module
  beforeEach(module('morewithlessApp'));

  var CompanyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CompanyCtrl = $controller('CompanyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CompanyCtrl.awesomeThings.length).toBe(3);
  });
});
