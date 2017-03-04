'use strict';

describe('Service: worker', function () {

  // load the service's module
  beforeEach(module('morewithlessApp'));

  // instantiate service
  var worker;
  beforeEach(inject(function (_worker_) {
    worker = _worker_;
  }));

  it('should do something', function () {
    expect(!!worker).toBe(true);
  });

});
