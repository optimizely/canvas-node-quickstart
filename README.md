# Optimizely Canvas Quickstart
The Optimizely Quickstart project is meant to help get started with canvas using node.js and google app engine. The application handles creating a basic routing structure, HTML templates, and an API. It also includes OUI so that the design of your application matches the Optimizely design guidelines.
M
Before you begin any Canvas application please review the following documentation:
* Canvas Documentation: [Link](https://docs.google.com/document/d/1dgaK6qqV-BrpSjqQOigMTC-YD08uDpn3HnqkW7derHg/edit)
* Canvas Developer Guide: [Link](https://docs.google.com/document/d/1p1b_HZd7O61IL2NhQGToJP1qCd_gh7hlyXQQbkIlh4E/edit)
* Design Doc: [Link](https://docs.google.com/document/d/19PvSZVmr5dNhb7EJqsKbFvaMYW5heKAZsgQzxPWcjCk/edit)
* Guide for Optinauts: [Link](https://docs.google.com/document/d/1F1G2MoctAhCkFzMlp6nDrgCF6HkQHp5DfSMmIkxWwVk/edit)

## Getting started
* Read docs above
* Register new Optimizely Application https://app.optimizely.com/accountsettings/apps/access
* Install the latest version of Node https://nodejs.org/en/
* Install Gulp Globally
```
npm install -g gulp
```
* (Optional) Install one of the supported Databases
  * MySQL: https://dev.mysql.com/doc/refman/5.7/en/osx-installation-pkg.html
  * MongoDB: https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/
* (Optional) Install the Google Cloud SDK (if you will be hosting on Google Cloud)
```
curl https://sdk.cloud.google.com | bash
```
* Set an environment variable in your .bash_profile (create a new one if you do not have one already).
```
vim ~/.bash_profile
```
Add the following text at the bottom of the file
```
export NODE_ENV=local
```
* Clone this repo
```
git clone https://github.com/optimizely/canvas-node-quickstart.git
```
* Copy the files to another new repo for your new project
* Navigate to your new project folder and update the node modules
```
npm install
```
* From your projects root create local and production versions of the config file
```
cp config/config-example.js config/local.js
cp config/config-example.js config/production.js
```
* Update the following settings in your /config/local.js file
  * (Required) Optimizely Secret (this is the app secret you [created here](https://app.optimizely.com/accountsettings/apps/access))
  * (Optional) dataBackend: mysql | mongodb
  * (Optional) mysql or mongo configuration
  * (Optional) Sentry URL - used for bug tracking []More Info](https://getsentry.com/welcome/)
  * (Optional) Gcloud projectId
* (Optional) Setup your MySQL database
  * MySQL: Update the script in the file /app/db/mysql with your table(s) creation
  * Run the init script for MySQL
  ```
  npm run-script init-mysql
  ```
* Start the application
```
npm start
```
* Navigate to http://localhost:8080

## While Developing
* Open a new terminal window in the same project folder and start gulp watch. This will look for changes to your JS and CSS files and rebuild them with each change
```
gulp watch
```
* It is recommended  to use node-inspector so that you can set breakpoints and step through your code. [More Info](https://github.com/node-inspector/node-inspector)
```
npm install -g node-inspector
```
Then to start the app
```
node-debug app.js
```

## Deploy to Google App Engine (for Optinauts)
* Sign up for an account if you have not already https://cloud.google.com/
* Create a new Project and add the following people as owners of the project
  * bill@optimizely.com
  * jon@optimizely.com
  * bradley.taylor@optimizely.com
* Send an email with the link to your Billing page to bill@optimizely.com to set the billing account to Optimizely
* Open a terminal window and navigate to your project
* Run the following command to authorize the SDK and configure your project:
```
gcloud init
```
* In your terminal window, enter the following command to deploy the App
```
gcloud preview app deploy app.yaml --promote
```
* Answer y when prompted to continue. It can take a short time to deploy the app. When it's done, you will see a message telling you that the update of the app is completed.
* Once finished, in your web browser, enter the following address
```
https://<your-project-id>.appspot.com
```

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
  /font
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
The config file is used to set global variables like secret keys, database authentication and any other global application variables you may want access to. You will need to copy this file into two seperate files, local.js and production.js. We ignore these two files in the .gitignore file so that you do not check in any secrets to a repo. Here is a list of the options available:
* (Required) Optimizely Secret: (this is the app secret you [created here](https://app.optimizely.com/accountsettings/apps/access))
* (Required) Port: the port that you want the application to run on
* (Optional) dataBackend: mysql | mongodb
* (Optional) mysql or mongo configuration
* (Optional) Sentry URL: used for bug tracking []More Info](https://getsentry.com/welcome/)
* (Optional) Gcloud projectId

```
module.exports = {
  port: process.env.PORT || 8080,
  dataBackend: '',
  sentry: {
    url: ''
  },
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
  },
  mongo:{
    db:'',
    user:'',
    password:'',
    port:'',
    domain:''
  },
  public:{
    environment: 'local'
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
### Application
#### app.js
Main starting point for the application. Sets up application dependencies, basic error handler, and starts the server on port 8080 or the port you specified in your environment variable PORT.

### Supported Database Models
#### MySQL

#### MongoDB

### Routes
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

### Services
#### /services/auth.js
The auth service is used to authenticate your application This will look for a param named 'signed_request'. If that does not exist it will look for a secure cookie. If a cookie does not exist it will return as unauthorized. Each route you want to lock down so that it can not be accessed outside of a canvas app should use the middleware function ensureAuthenticated().
```
router.get('/', authService.ensureAuthenticated, function(req, res) {
  var data = {
    first: 'John',
    last: 'Snow'
  }
  responder.respond(req,res,data,'index.swig');
});
```
#### /services/responder.js

### Client Side
#### /views

#### /assets/js

#### /assets/css

#### /public



## Supporting Modules
body-parser:
cookie-parser:
express:
express-session:
gcloud:
lodash:
mongodb:
mysql:
optimizely-canvas-sdk:
optimizely-node:
prompt:
raven:
request:
swig:
underscore:
del:
gulp:
gulp-clean:
gulp-concat:
gulp-nodemon:
run-sequence:
gulp-minify-css:
gulp-uglify:
