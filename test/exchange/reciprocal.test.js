var chai = require('chai')
  , expect = require('chai').expect
  , reciprocal = require('../../lib/exchange/reciprocal');


describe('exchange.reciprocal', function() {
  
  it('should be unnamed', function() {
    expect(reciprocal(function(){}).name).to.equal('');
  });
  
  describe('reciprocating a code', function() {
    var response, err;

    before(function(done) {
      function exchange(client, accessToken, code, done) {
        if (client.id !== 'example.com') { return done(new Error('incorrect client argument')); }
        if (accessToken !== 'sadadojsadlkjasdkljxxlkjdas') { return done(new Error('incorrect accessToken argument')); }
        if (code !== 'hasdyubasdjahsbdkjbasd') { return done(new Error('incorrect code argument')); }
        
        return done();
      }
      
      chai.connect.use(reciprocal(exchange))
        .req(function(req) {
          req.user = { id: 'example.com' };
          req.body = {
            code: 'hasdyubasdjahsbdkjbasd',
            access_token: 'sadadojsadlkjasdkljxxlkjdas'
          };
        })
        .end(function(res) {
          response = res;
          done();
        })
        .next(function(err) {
          throw err;
        })
        .dispatch();
    });
    
    it('should respond with headers', function() {
      expect(response.getHeader('Cache-Control')).to.equal('no-store');
      expect(response.getHeader('Pragma')).to.equal('no-cache');
    });
    
    it('should respond with body', function() {
      expect(response.body).to.be.undefined;
    });
  });
  
});
