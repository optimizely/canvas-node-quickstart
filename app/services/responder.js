var _  = require('underscore'),
    config = require('../../config/' + process.env.NODE_ENV);

var sentry;
if(config.sentry && config.sentry.url !== ''){
  sentry = new raven.Client(config.sentry.url);
}

module.exports = {
  respond: function (req,res,data,template) {
    var contentType = req.baseUrl.indexOf('/api') == 0 || (req.query && _.has(req.query, 'json') && process.env.NODE_ENV != 'production') ? 'json' : 'html';
    var localData = {};

    // Add passed in data
    _.extend(localData, data);

    // Add optimizely user data
    if(req.optlyUser){
      _.extend(localData,{optlyUser:req.optlyUser});
    }

    // Add config info to the local data
    if(config.public){
      _.extend(localData,{config:config.public});
    }
    // Add any query params to the local
    if(req.query){
      _.extend(localData,{query:req.query});
    }

    // Add the current URL
		if(contentType == 'json'){
      delete req.query['json'];
      res.status(200).json(localData);
    }else{
      res.status(200).render(template, localData);
    }
	},
  handleErrors: function (err, res, contentType){
    errorCode = err.errorCode ? err.errorCode : 500;
    console.log(err);
    if(process.env.NODE_ENV == 'production'){
      sentry.captureException(err);
    }
    contentType == 'json' ? res.status(errorCode).json({
      message: err.message,
      errorCode: err.code
    }) : res.status(errorCode).render('error.swig',{
      message: err.message,
      errorCode: errorCode
    });
  }
}
