$(function() {
  // Example on how to show a lightbox
  $('#show-lightbox').on('click',function(){
    var data = {
      header: 'This is my lightbox',
      body: 'This is a lightbox body',
      cancelBtn: 'Cancel',
      submitBtn: 'Submit',
      submitFn: function(){
        console.log('submitted the lightbox');
      }
    }
    optlycanvas.fn.showLightbox(data,function(){
      console.log('lightbox shown');
    });
  });
});


window.optimizelyTemplateTool = (function(window, undefined) {
    //namespace variables
    var editor, app_config, user, optly;
    var projectJS = '\nwindow.optimizelyEditorial={findAndReplace:function(e,t,n){if(e&&"undefined"!=typeof t)for(var d="string"==typeof e?new RegExp(e,"g"):e,i=(n||document.body).childNodes,r=i.length,a=["html","head","style","link","meta","script","object","iframe"];r--;){var o=i[r];if(1===o.nodeType&&-1===a.indexOf(o.nodeName.toLowerCase()+",")&&arguments.callee(e,t,o),3===o.nodeType&&d.test(o.data)&&o.data.trim().length==e.length){var l=o.parentNode,f=function(){var e=o.data.replace(d,t),n=document.createElement("div"),i=document.createDocumentFragment();for(n.innerHTML=e;n.firstChild;)i.appendChild(n.firstChild);return i}();l.insertBefore(f,o),l.removeChild(o)}}}};';
    var html = '<li class="lego-form-field__item"> <label class="lego-label" for="Headline">Headline Variation</label> <table class="lego-table lego-table--add-row width--1-1"> <tbody> <tr> <td> <div class="lego-grid"> <div class="lego-grid__cell"> <input type="text" class="lego-text-input" placeholder="Alternate headline you want to test"> </div> </div> </td> <td class="lego-table--add-row__controls"> <button type="button" class="lego-button lego-button--form lego-button--narrow float--right button-close"> <svg class="lego-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#close"></use> </svg> </button> <button type="button" class="lego-button lego-button--form lego-button--narrow float--right push--right button-add"> <svg class="lego-icon"> <use xlink:href="#add"></use> </svg> </button> </td> </tr> </tbody> </table> </li>';
    var variationNumber = 0;
    function initialize() {

      optly = new OptimizelyAPI({
        auth_mode: "oauth",
        client_id: 2845500185
      });

    };

    //namespace functions
    function onDOMReady() {
       //setEditor();
      // $('#url-target').on('click','button.url-button-add',function(e){
      //   addRows('.user-target-row','.url-button-add',getUrlRowHTML('',''),e);
      // });
      // $('#url-target').on('click','button.url-button-remove',function(e){
      //   removeRows('.user-target-row','#url-target','.url-button-add',e)
      // });
      bindButtons();
    };

    function bindButtons() {
      $('.button-add:last').on('click', function() {
        $('.button-add').remove();
        $('#variation-level').append(html);
        bindButtons();
      });
      $('.button-close:last').on('click', function() {
        if(!$(this).next().hasClass('button-add')) {
          $(this).closest('.lego-form-field__item').remove();
        } else if($('.button-close').length > 1) {
          var val = $(this).closest('li').prev().find('input').val();
          $(this).closest('tbody').find('input').val(val);
          $(this).closest('li').prev().remove();
        }
      });
    };

    function logger(e) {
        console.log("ERROR:");
        console.log(e);
    };

    function spinner(message) {
        if (message != undefined) {
            $('#overlay').show();
            $('#status').text(message || "Please wait…");
        } else {
            $('#overlay').hide();
        }
    };

    function getEditor() {
      if(editor) {
        return editor;
      } else {
        return false;
      }
    };

    function setEditor() {
      editor = CodeMirror.fromTextArea(document.getElementById('configuration'), {
          mode: "text/javascript",
          lineWrapping: true,
          lineNumbers: true,
          tabSize: 2,
          theme: "default"
      });
    };

    function createExperiment(experiment_definition) {

        optimizelyTemplateTool.spinner('Creating experiment…');
        // Create experiment

        optly.post("projects/" + app_config.project_id + '/experiments', experiment_definition.experiment, function(experiment) {
            experiment_id = experiment.id;
            updateVariations(experiment, experiment_definition);
            addGoals(experiment, experiment_definition);
        });
    };

    function isValid() {
      var valid = true;
      $('.lego-form-field__item input').each(function(index, input) {
        if(input.value == "") {
          var parent = $(input).parent();
          parent.addClass('lego-form-bad-news');
          $(input).on('keyup', function() {
            parent.removeClass('lego-form-bad-news');
          });
          valid = false;
        }
      });
      return valid;
    };

    function addGoals(experiment, experiment_definition) {
        // TO DO because of BUG-2364, the primary goal is not always set correctly

        optimizelyTemplateTool.spinner('Adding goals…');

        // remove engagement goal
        optly.get("projects/" + app_config.project_id + "/goals", function(goals) {
            for (var key in goals) {
                goal = goals[key];
                var new_experiment_ids = [];
                if (goal.title == 'Engagement') {
                    for (i = 0; i < goal.experiment_ids.length; i++) {
                        if (goal.experiment_ids[i] != experiment_id) {
                            new_experiment_ids.push(goal.experiment_ids[i]);
                        }
                    }
                    update_experimentids = {
                        "experiment_ids": new_experiment_ids
                    };
                    optly.put("goals/" + goal.id, update_experimentids, function() {});
                }
            }
        });

        // primary goal is first defined goal in the list
        var primary_goal_event_name = experiment_definition.goals[0].event;
        var goal_ids = [];
        var primary_goal_id = "";

        for (var i = 0; i < experiment_definition.goals.length; i++) {
            var new_goal_definition = experiment_definition.goals[i];
            if (typeof new_goal_definition === "number") {

                optly.get("goals/" + experiment_definition.goals[i], function(goal) {
                    var index = goal.experiment_ids.indexOf(experiment_definition.goals[i]);
                    goal.experiment_ids.splice(index, 1);

                    goal.experiment_ids.push(experiment_id);
                    update_experimentids = {
                        "experiment_ids": goal.experiment_ids
                    };

                    goal_ids.push(goal.id.toString());

                    optly.put("goals/" + goal.id, update_experimentids, function() {});
                });

            } else if (typeof new_goal_definition === "object") {

                optly.post("projects/" + app_config.project_id + "/goals/", new_goal_definition, function(goal) {

                    goal_ids.push(goal.id.toString());

                    goal.experiment_ids.push(experiment_id);
                    update_experimentids = {
                        "experiment_ids": goal.experiment_ids
                    };

                    optly.put("goals/" + goal.id, update_experimentids, function(goal) {
                        // check if this is the primary goal
                        if (goal.event == primary_goal_event_name) {
                            primary_goal_id = goal.id;
                        }
                    })
                });
            }
        }

        // because of https://optimizely.atlassian.net/browse/BUG-2364 we might need
        // to manually update the list and then set the primary goal
        var waitForExperiment = setInterval(function() {
            if (optly.outstandingRequests == 0) {
                clearInterval(waitForExperiment);
                settings = {
                    "display_goal_order_lst": goal_ids,
                    "primary_goal_id": primary_goal_id
                };
                optly.put("experiments/" + experiment_id, settings, function(e) {});
            }
        }, 300);
    };

    function updateVariations(experiment, experiment_definition) {

        optimizelyTemplateTool.spinner('Adding variations…');

        var length = experiment_definition.variations.length;
        var weight = parseInt(Math.floor(10000/length));

        for (var i = 0; i < experiment_definition.variations.length; i++) {
          experiment_definition.variations[i]['weight'] = weight;
          if (i < experiment.variation_ids.length) {
              optly.put('variations/' + experiment.variation_ids[i], experiment_definition.variations[i], function() {});
          } else {
              optly.post('experiments/' + experiment.id + '/variations', experiment_definition.variations[i], function() {});
          }

        }

    };

    function createExperimentDefinition() {

        // Create new experiment_definition object containing experiment, original and goals
        var experiment_definition = {
            "experiment": app_config.experiment,
            "variations": [
                app_config.variations[0]
            ],
            "goals": app_config.goals,
            "conditional_code": app_config.conditional_code,
            "activation_mode": app_config.activation_mode,
            "auto_allocated": app_config.auto_allocated,
            // "audience_ids": app_config.audience_ids,
            "edit_url": app_config.edit_url
        };

        //If no project JS available, add to experiment js
        if(Session.get('project_js') == false) {
          experiment_definition.experiment['custom_js'] = '/*_optimizely_evaluate=force*/' + projectJS;
        }

        // Add variations based on formsets and replace variation-level placeholders with actual values (using JSON.stringify's replacer function)
        $('#variation-level input')
            .each(function(index, element) {
                var variation = JSON.parse(JSON.stringify(app_config.variations[1], function(key, value) {
                    if (typeof value === "string") {
                        for (var key in app_config.placeholders.variation) {
                            var fieldvalue = element.value ? element.value : "";
                            var value = value.replace(new RegExp("{{" + key + "}}", 'g'), fieldvalue.replace(/\\([\s\S])|(")/g, "\\$1$2"));
                        }
                    }
                    return value;
                }));

                experiment_definition.variations.push(variation);

            });

        // Iterate through all strings and fill in experiment-level values for placeholders (using JSON.stringify's replaced function to iterate through all strings)

        experiment_definition = JSON.parse(JSON.stringify(experiment_definition, function(key, value) {
            if (typeof value === "string") {
                for (var key in app_config.placeholders.experiment) {
                    var fieldvalue = $("#experiment-level input[name=\"" + key + "\"]").val() ? $("#experiment-level input[name=\"" + key + "\"]").val() : "";
                    var value = value.replace(new RegExp("{{" + key + "}}", 'g'), fieldvalue.replace(/\\([\s\S])|(")/g, "\\$1$2"));
                }
            }
            return value;
        }));

        return experiment_definition;

    };

    function setUser(object) {
      user = object;
      optly.setUser(object);
    };

    function setSettings(settings) {
      app_config = settings;

      //Insert ProjectJS code if not currently present
      if(Session.get('project_js') == false) {
        optly.get("projects/" + app_config.project_id + '/', function(project) {
          if(project.project_javascript === null || project.project_javascript.indexOf('window.optimizelyEditorial') == -1) {
            var updateProjJS = project.project_javascript + projectJS;
            var updateProject = { "project_javascript": updateProjJS };
            optly.put("projects/" + app_config.project_id +"/", updateProject, function(project) {
              Session.set('project_js', true);
              Meteor.call('projectJS', true);
            });
          } else {
            Session.set('project_js', true);
            Meteor.call('projectJS', true);
          }
        });

      }
    };

    function saveSettings() {
      Meteor.call('saveSettings', app_config);
    };

    function createAudience() {
      //Create audience excluding people coming directly from social media
      var data = {
        "name": "[Headline Testing App] - DO NOT REMOVE",
        "description":"",
        "conditions": "[\"and\", [\"or\", [\"or\", {\"type\": \"code\", \"value\": \"window.document.referrer.indexOf(window.document.domain) > -1\"}]]]",
        "segmentation": false
      };

      optly.post("projects/" + app_config.project_id +"/audiences", data, function(response) {
        app_config.experiment.audience_ids.push(response.id);
        Meteor.call('updateSettings', app_config);
      }, function(response) {
        optly.get("projects/" + app_config.project_id +"/audiences", function(audiences) {
          $.each(audiences, function(index, value) {
            if(value.name.indexOf('[Headline Testing App]') != -1) {
              app_config.experiment.audience_ids.push(value.id);
              Meteor.call('updateSettings', app_config);
              return true;
            }
          });
        });
      });

    };

    function getSettings() {
      return app_config;
    };

    function getUser() {
      return user;
    };

    function postExperiment(boola) {
      var waitForExperiment = setInterval(function() {
        if (optly.outstandingRequests == 0) {
            clearInterval(waitForExperiment);
            if (app_config.redirect_url == "NO_REDIRECT" && boola) {
                spinner("Starting Experiment...");
                var data = {"status": "Running"};
                optly.put("experiments/" + experiment_id, data, function(e) {
                  if(e.status == "Running") {
                    spinner("Done! Refreshing App...");
                    setTimeout(function() {
                      window.location.reload();
                    }, 2000);
                  } else {
                    spinner("Start your experiment from the dashboard!");
                    setTimeout(function() {
                      window.location.reload();
                    }, 2000);
                  }
                });
              } else {
                spinner("Go to the dashboard to start the experiment! Refreshing App...");
                setTimeout(function() {
                  window.location.reload();
                }, 2000);
              }
            // } else if (app_config.redirect_url === undefined) {
            //     // just to be backward compatible but ideally no redirect_url would mean no redirect
            //     spinner('Forwarding to Optimizely editor…');
            //     window.location.href = "https://www.optimizely.com/edit?experiment_id=" + experiment_id;
            // } else {
            //     app_config.redirect_url = app_config.redirect_url.replace("{{Experiment ID}}", experiment_id);
            //     //window.location.href = app_config.redirect_url;
            //     var win = window.open(app_config.redirect_url, '_blank');
            //     win.focus();
            //     spinner();
            // }
        }
      }, 300);
    };

    return {
        initialize: initialize,
        getEditor: getEditor,
        isValid: isValid,
        setEditor: setEditor,
        setUser: setUser,
        getSettings: getSettings,
        setSettings: setSettings,
        saveSettings: saveSettings,
        postExperiment: postExperiment,
        spinner: spinner,
        getUser: getUser,
        createExperimentDefinition: createExperimentDefinition,
        createExperiment, createExperiment,
        onDOMReady: onDOMReady
    }
})(window);

optimizelyTemplateTool.initialize();

$(document).ready(function() {
  optimizelyTemplateTool.onDOMReady();
});
