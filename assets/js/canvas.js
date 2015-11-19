var optlycanvas = {};

optlycanvas.templates = {
  dialog: '',
  table: '',
  previewitem: ''
}

optlycanvas.templates.dialog = ''+
'<table class="lego-table lego-table--dashboard" data-sortable-table-id="dashboard-experiments" data-test-section="dashboard-experiments">'+
  '<thead>'+
    '<tr>'+
      '{% for x in header %}'+
        '<th class="nowrap" type="{{ head.type }}">{{ head.name }}</th>'+
      '{% endfor %}'+
    '</tr>'+
  '</thead>'+
  '<tbody>'+
  	'{% for item in list %}'+
      '{% set col = "anything!" %}'+
    	'<tr spinner-size="small" data-table-row-id="{{ item.id }}" style="position: relative;">'+
        '{{ for head in headers }}'+
          '{% set obj = item[head.tag] %}'+
          '<td class="cell-truncate">'+
            '{{ if obj.subtext }}'+
  	        	'<div class="cell-truncate__text">'+
  	        		'<span class="lego-tag">{{ obj.subtext }}</span>'+
  	        	'</div>'+
            '{{ endif }}'+
          	'<div class="cell-truncate__title">obj.text</div>'+
          '</td>'+
        '{{ endfor }}'+
        // '<td class="numerical" data-dir="top-right">'+
        // 	'23'+
        // '</td>'+
        // '<td>'+
        // 	'<span class="color--good-news"> Running </span>'+
        // '</td>'+
        // '<td>'+
        // 	'<div class="nowrap"> July 21, 2015 </div>'+
        // '</td>'+
    	'</tr>'+
    '{% endfor %}'+
  '</tbody>'+
'</table>';


optlycanvas.fn = {
  showTable: function (){
    return false;
  },
  showPreviewSidebar: function (){
    return false;
  },
  showLightbox: function (data, callback){
    var html = swig.render(optlycanvas.templates.dialog, {locals: data});
    var maskHeight = $(window).height();
    var maskWidth = $(window).width();
    $('body').append('<div id="mask"></div>')
    $('#mask').css({'width':maskWidth,'height':maskHeight});
    $('#mask').fadeIn(1000);
    $('#mask').fadeTo("slow",0.8);

    html = $.parseHTML(html);
		$('body').append(html);
		$(html).centerWidth();
		$('.lego-dialog__footer .cancel, .lego-dialog__close').on('click',function(e){
			$(html).remove();
			$('#mask').hide();
		});

  },
  closeLightBox: function (box){
    return false;
  },
  handleErrors: function (){
    return false;
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
