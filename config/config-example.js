'use strict';

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
    environment: 'local';
  }
};
