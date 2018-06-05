var chai = require('chai')
  , expect = require('chai').expect
  , reciprocal = require('../../lib/exchange/reciprocal');


describe('exchange.reciprocal', function() {
  
  it('should be unnamed', function() {
    expect(reciprocal(function(){}).name).to.equal('');
  });
  
});
