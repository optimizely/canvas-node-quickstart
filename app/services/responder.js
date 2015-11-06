var _  = require('underscore'),
    config = require('../../config/' + process.env.NODE_ENV);

module.exports = {
	respond: function (req,res,contentType,data,template) {
    var localData = {};

    // Add passed in data
    _.extend(localData, data);

    // Add optimizely user data
    if(req.optlyUser){
      _.extend(localData,{optlyUser:req.optlyUser});
    }

    // Add config info to the local data
    if(req.config){
      _.extend(req.config,{environment: process.env.NODE_ENV });
      _.extend(localData,{config:req.config});
    } 

    // Add any query params to the local
    if(req.query){
      _.extend(localData,{query:req.query});
    }
    
    // Add the current URL
    _.extend(localData,{url:req._parsedUrl});
		if(contentType == 'json' || (req.query && _.has(req.query, 'json') && process.env.NODE_ENV != 'production')){
      delete req.query['json'];
      res.json(localData);
    }else{
      res.render(template, localData);
    }
	},
  handleErrors: function (err, res, contentType){
    contentType == 'json' ? res.json(err) : res.render('error.swig',err)
  }
}