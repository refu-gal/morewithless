'use strict';

describe('Service: authentification', function () {

  // load the service's module
  beforeEach(module('morewithlessApp'));

  // instantiate service
  var authentification;
  beforeEach(inject(function (_authentification_) {
    authentification = _authentification_;
  }));

  it('should do something', function () {
    expect(!!authentification).toBe(true);
  });

});
