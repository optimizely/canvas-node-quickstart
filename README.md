# Optimizely Canvas Node.js Quickstart
The Optimizely Quickstart project is meant to help get started with canvas using node.js and google app engine. The application handles creating a basic routing structure, database, HTML templates, and an API. It also includes OUI so that the design of your application matches the Optimizely design guidelines.
<br><br>

## Getting started
* Read the Canvas Developer Guide: [Link](http://developers.optimizely.com/apps/)
* Register a new Optimizely Application https://app.optimizely.com/accountsettings/apps/access
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
Add the following text at the bottom of the file and then restart your terminal
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

## Deploy to Google App Engine
* Sign up for an account if you have not already https://cloud.google.com/
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

#### app.js
Main starting point for the application. Sets up application dependencies, basic error handler, and starts the server on port 8080 or the port you specified in your environment variable PORT.

### Supported Database Models
#### MySQL
To use the MySQL database structure you can do the following
* Setup your MySQL database
  * Setting up locally on a mac: [Link](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html)
  * Setting up on Google Cloud: [Link](https://cloud.google.com/sql/docs/getting-started?hl=en)
  * Edit your config file
  ```
  dataBackend: 'mysql',
  mysql:{
    dbname: '',
    auth : {
      user: '',
      password: '',
      host: ''
    }
  }
  ```
* Edit the createSchema() function to setup your database schema
```javascript
// /app/db/mysql/model.js
connection.query(
  'CREATE DATABASE IF NOT EXISTS `'+config.mysql.dbname+'` DEFAULT CHARACTER SET = \'utf8\' DEFAULT COLLATE \'utf8_general_ci\'; ' +
  'USE `'+config.mysql.dbname+'`; ' +
  'CREATE TABLE IF NOT EXISTS `'+config.mysql.dbname+'`.`experiments` ( ' +
  '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
  '`account_id` INT NOT NULL, ' +
  '`project_id` INT NULL, ' +
  '`title` VARCHAR(255) NULL, ' +
  '`created_date` VARCHAR(255) NULL, ' +
  '`updated_date` VARCHAR(255) NULL, ' +
  'PRIMARY KEY (`id`));',
  function(err, rows) {
    if (err) throw err;
    console.log('Successfully created schema');
    connection.end();
  }
);
```
* Open a terminal and run the createSchema scripts
```
npm run-script init-mysql
```

#### MongoDB
To use the MongoDB database structure you can do the following
* Setup your MySQL database
  * Setting up locally on a mac: [Link](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/)
  * Setting up on Google Cloud: [Link](https://cloud.google.com/nodejs/getting-started/deploy-mongodb?hl=en)
  * Edit your config file
  ```
  dataBackend: 'mongodb',
  mongo:{
    db:'',
    user:'',
    password:'',
    port:'',
    domain:''
  }
  ```

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
The responder is the main module used to handle all responses to all requests. It will add all the data needed and make the determination if it should render a template or return in JSON if its an /api route.
* Respond to non api route with server side rendering. Pass in the request, response, the data (in JSON format), the template name you want to render
```
responder.respond(req,res,data,'index.swig');
```
* respond to an API route is the same as a main route without having to pass in the template
```
responder.respond(req,res,data,'index.swig');
```
* To respond to errors you can use the handleErrors helper function. Pass in the error response and if you want the response in JSON
```
responder.handleErrors(err,res,'json');
```

### Client Side
The client side uses OUI which is the design framework created by the Optimizely design team. It's used to make sure that your canvas app has the same design as the application. For more information about OUI please visit the OUI pages:
* OUI Github [Link](https://github.com/optimizely/oui)
* OUI Documentation [Link](https://optimizely.github.io/oui-docs/)
#### /views
The views folder contains SWIG templates used for server side rendering. It has the basic HTML structure for creating a dashboard similar to the Optimizely Application Home. Form more info on SWIG Templates [visit their site here](http://paularmstrong.github.io/swig/).
* /views/layout.swig: The main layout of the application and includes the header, footer and basic HTML framework
* /views/index.swig: Template used in the root path, extends the layout template
* /views/error.swig: Template used to handle errors
* /views/includes/sidebar.swig: Example of the preview right sidebar
* /views/includes/table.swig: Example of listing items in a table using OUI
* /views/includes/toptabs.swig: Example of a submenu

#### /assets/js
* /assets/js/lego.js: Loads jQuery and JS needed for OUI components
* /assets/js/optimizely.js: A Javascript wrapper for our REST API
* /assets/js/swig.js: JS file that allows you to use SWIG templates on the client side
* /assets/js/canvas.js: JS methods and variables that will be used in all canvas applications
* /assets/js/main.js: Application specific Javascript

#### /assets/css
* /assets/css/lego.css: The main CSS file for all of OUI (lego) components
* /assets/css/canvas.css: File used for boilerplate styles for all canvas apps
* /assets/css/main.css: You application specific CSS

#### /public
This is the output folder of all of the public facing files created by the Gulp process. Any files located here will be available at the root
* /main.min.css
* /main.min.js
* /proxima.ttf


## Supporting Modules
* [body-parser](https://github.com/expressjs/body-parser):
* [cookie-parser](https://github.com/expressjs/cookie-parser):
* [express](http://expressjs.com/en/index.html):
* [express-session](https://github.com/expressjs/session):
* [gcloud](https://www.npmjs.com/package/gcloud):
* [lodash](https://lodash.com/):
* [mongodb](https://www.mongodb.org/):
* [mysql](https://www.npmjs.com/package/mysql):
* [optimizely-canvas-sdk](https://www.npmjs.com/package/optimizely-canvas-sdk/)
* [optimizely-node](https://www.npmjs.com/package/optimizely-node):
* [prompt](https://www.npmjs.com/package/prompt):
* [raven](https://www.npmjs.com/package/raven):
* [request](https://github.com/request/request):
* [swig](http://paularmstrong.github.io/swig/):
* [underscore](https://www.npmjs.com/package/underscore):
* [del](https://www.npmjs.com/package/del):
* [gulp](https://www.npmjs.com/package/gulp):
