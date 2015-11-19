var canvasSdk = require('optimizely-canvas-sdk');
var config = require('../../config/' + process.env.NODE_ENV);
var responder = require('./responder');

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    var signed_request;
    // Check if signed request exists and use that if it does
    if(typeof req.query !== 'undefined' && typeof req.query.signed_request !== 'undefined'){
      signed_request = req.query.signed_request;
      try{
        var userContext = canvasSdk.extractUserContext(config.optimizely.secret,signed_request);
        req.optlyUser = userContext.context;
        if(process.env.NODE_ENV == 'local'){
          res.cookie('signed_request',signed_request);
        }else{
          res.cookie('signed_request',signed_request,{secure:true,httpOnly:true});
        }
        next();
      }catch(error){
        responder.handleErrors(error,res);
      }
    }else if(typeof req.cookies !== 'undefined' && typeof req.cookies.signed_request !== 'undefined'){
      signed_request = req.cookies.signed_request;
      try{
        var userContext = canvasSdk.extractUserContext(config.optimizely.secret,signed_request);
        req.optlyUser = userContext.context;
        next();
      }catch(error){
        responder.handleErrors(error,res);
      }
    }else{
      // No valid signed request
      var error = {
        message: 'You are not authorized to use this application.'
      }
      responder.handleErrors(error,res);
    }
  }
};
