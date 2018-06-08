//var merge = require('utils-merge');
//var TokenError = require('../errors/tokenerror');


//https://tools.ietf.org/html/draft-ietf-oauth-reciprocal-00

// https://tools.ietf.org/html/draft-hardt-mutual-oauth-00
// https://tools.ietf.org/html/draft-hardt-oauth-mutual-02

module.exports = function(options, exchange) {
  if (typeof options == 'function') {
    exchange = options;
    options = undefined;
  }
  options = options || {};
  
  if (!exchange) { throw new TypeError('oauth2orize.reciprocal exchange requires an exchange callback'); }
  
  var userProperty = options.userProperty || 'user';
  
  
  return function(req, res, next) {
    if (!req.body) { return next(new Error('OAuth2orize requires body parsing. Did you forget to use body-parser middleware?')); }
    
    // The 'user' property of `req` holds the authenticated user.  In the case
    // of the token endpoint, the property will contain the OAuth 2.0 client.
    var client = req[userProperty]
      , code = req.body.code
      , accessToken = req.body.access_token
    
    if (!code) { return next(new TokenError('Missing required parameter: code', 'invalid_request')); }
    if (!accessToken) { return next(new TokenError('Missing required parameter: access_token', 'invalid_request')); }
  
    function exchanged(err) {
      res.setHeader('Cache-Control', 'no-store');
      res.setHeader('Pragma', 'no-cache');
      res.end();
    }
  
    try {
      exchange(client, accessToken, code, exchanged);
    } catch (ex) {
      return next(ex);
    }
  };
};
