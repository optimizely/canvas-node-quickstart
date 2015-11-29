# Optimizely Canvas Quickstart
The Optimizely Quickstart project is meant to help get started with canvas using node.js and google app engine. It includes OUI so that the design of your application matches the Optimizely design guidelines.

## Application Structure
```
/app
  /routes
    api.js
    main.js
  /db
    /mysql
      model.js
    /mongodb
      model.js
  /services
    auth.js
    responder.js
/assets
  /css
    canvas.css
    lego.css
    main.css
  /js
    lego.js
    main.js
    optimizely.js
  /img
/config
  config-example.js
/public
  main.min.js
  main.min.css
/views
  /includes
    sidebar.swig
    table.swig
    toptabs.swig
  index.swig
  layout.swig
app.js
app.yaml
gulpfile.js
package.json
```
### Configuration
#### /config/config-example.js
```
module.exports = {
  port: process.env.PORT || 8080,
  gcloud: {
    projectId: ''
  },
  optimizely: {
    // The secret for your application
    secret: ''
  },
  mysql:{
    dbname: '',
    auth : {
      user: '',
      password: '',
      host: ''
    }
  }  
};
```
#### app.yaml
This is used for deploying to Google AppEngine. The custom part of this is the NODE_ENV which is used in the config file for different environments running your application. More info on app.yaml configuration options [can be found here ](https://cloud.google.com/appengine/docs/managed-vms/custom-runtimes)
```
env_variables:
  NODE_ENV: 'production'
```
#### gulpfile.js
Gulp is a service that is used to automate. We use it to build our main.min.css and main.min.js files. [More info on gulp](http://gulpjs.com/). The two commands built in are
```
gulp watch
```
Used while developing locally. Will update the min files located in /public each time a file changes. Also, keeps the files in an un-minified state for easy debugging
```
gulp build
```
Will build your JS and CSS files ready for production
#### package.json
Used for global project settings and telling the application what modules are being used.
```
"name": "canvas-node-quickstart",
"version": "1.0.0",
"description": "A project to help you get started with canvas using node.js and app engine",
"repository": "https://github.com/optimizely/canvas-node-quickstart",
"private": false,
"author": "Brad Taylor <bradtaylorsf@gmail.com>",
"license": "MIT License",
"scripts": {
  "start": "node app.js",
  "monitor": "nodemon app.js",
  "deploy": "gcloud preview app deploy app.yaml",
  "init-mysql": "node app/db/mysql/model.js"
}
```
### Data Model

### Application
#### app.js
Main starting point for the application. Sets up application dependencies, basic error handler, and starts the server on port 8080 or the port you specified in your environment variable PORT.

#### /services/auth.js
The auth service is used to authenticate your application This will look for a param named 'signed_request'. If that does not exist it will look for a secure cookie. If a cookie does not exist it will return as unauthorized. Each route you want to lock down so that it can not be accessed outside of a canvas app should use the middleware function ensureAuthenticated().
```

```
#### /services/responder.js

#### /routes/api.js
Place routes here that will be used in your applications API. All routes here will be prefixed with /api in the route. So this route will respond with JSON:
```
router.get('/', function (req, res) {
  var data = {
    first: 'John',
    last: 'Snow'
  }
  responder.respond(req,res,data);
});
```
#### /routes/main.js
Place routes here that a user can navigate to and will expect an HTML output. This route would load the template located in /views/index.swig and the data would be passed to the page, able to be used in the template
```
router.get('/', function(req, res) {
  var data = {
    first: 'John',
    last: 'Snow'
  }
  responder.respond(req,res,data,'index.swig');
});
```



### View




## Supporting packages

## Running locally
* First install node.js by [following these instructions](https://github.com/ekalinin/nodeenv). Using these instructions will install node in a virtual environment, however you can install node directly [by going here](https://nodejs.org/en/download/). Having your node installation in a virtual environment allows you to have multiple versions of node and different setups on one machine.
* Install the database you want to use and start it locally. The Quickstart project has support for MySQL, MongoDB, and Google Cloudstore.
* Clone this repo into a folder for your project
```
git clone https://github.com/optimizely/canvas-node-quickstart
```
* Install all supporting packages
```
npm install
```


## Deploy to Google AppEngine
