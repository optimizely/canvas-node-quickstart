var optlycanvas = {};

optlycanvas.templates = {
  dialog: ''
}

optlycanvas.templates.dialog = ''+
  '<div class="lego-dialog">'+
	  '<div class="lego-dialog__header">'+
	    '<div class="lego-dialog__title">{{ header }}</div>'+
	  '</div>'+
	  '<div class="lego-dialog__body">'+
	    '{{ body }}'+
	  '</div>'+
	  '<div class="lego-dialog__footer lego-button-row--right">'+
	    '<button class="lego-button cancel">{{ cancelBtn }}</button>'+
	    '<button class="lego-button lego-button--brand submit">{{ submitBtn }}</button>'+
	  '</div>'+
	  '<div class="lego-dialog__close">'+
	    '<svg class="lego-icon">'+
	      '<use xlink:href="#close"></use>'+
	    '</svg>'+
	  '</div>'+
	'</div>';


optlycanvas.fn = {
  /*
    Helper function to show a lightbox
    * Data Options
    * data.header {String}
    * data.body {String}
    * data.cancelBtn {String}
    * data.submitBtn {String}
    * data.submitFn {Function}
  */
  showLightbox: function (data, callback){
    var html = swig.render(optlycanvas.templates.dialog, {locals: data});
    var maskHeight = $(window).height();
    var maskWidth = $(window).width();
    $('body').append('<div id="mask"></div>');
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow",0.8);

    html = $.parseHTML(html);
		$('body').append(html);
		$(html).centerWidth();
		$('.lego-dialog__footer .cancel, .lego-dialog__close').on('click',function(e){
			$(html).remove();
			$('#mask').remove();
		});

    $('.lego-dialog__footer .submit').on('click',data.submitFn);
    if(callback){
      callback();
    }
  }
}

$.fn.centerWidth = function () {
  this.css("position","absolute");
  this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                              $(window).scrollLeft()) + "px");
  return this;
}

$.fn.centerHeight = function (){
  this.css("position","absolute");
  this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                              $(window).scrollTop()) + "px");
  return this;
}

// extend the jQuery object to include this function that turns the form post into an object
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};
