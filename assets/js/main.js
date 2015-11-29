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
