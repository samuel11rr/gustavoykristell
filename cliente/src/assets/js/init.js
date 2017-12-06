(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space

$(document).ready(function(){
  $('.carousel').carousel();
  $('.modal').modal();
  $('.scrollspy').scrollSpy();
  $('ul.tabs').tabs();
});

avanzaCarousel();

function avanzaCarousel() {
	setTimeout(function(){
	 $('#carouselAnuncios').carousel('next');
	 avanzaCarousel();
	}, 5000);
};

// var options = [
//   {
//     selector: '.section', offset: 150, callback:function(){
//       Materialize.toast('Hola', 5000);
//     }
//   }
// ];

// Materialize.scrollFire(options);


function abreModal(nombreModal){
  $(nombreModal).modal('open');
}
        