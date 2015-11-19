$(function() {
  $('#testingSwig').on('click',function(){
    var data = {
      headers: [
        {
          name: 'Title',
          type: '',
          tag: ''
        }
      ]
    };
    optlycanvas.showLightbox(data,null);
  });
});
