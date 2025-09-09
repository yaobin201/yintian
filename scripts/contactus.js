let contactSroller = null

function sectionBgAni() {
  contactSroller = ScrollTrigger.create({
    trigger: '.section-bg',
    start: 'top top',
    end: 'bottom 50%',
    scrub: true,
    markers: false,
    pin: true,
  });
}

function contactListToggle() {
  $('#contactusList .product-category-toggle').click(function(){
    $(this).next().toggle();
    contactSroller.refresh()
  })
}

$(document).ready(function(){
  sectionBgAni();

  contactListToggle()


  $('.contact-form').submit(function(e){
    e.preventDefault();
    $.ajax({
      url: $(this).attr('action'),
      type: $(this).attr('method'),
      data: $(this).serialize(),
      success: function(data){
        if(data == 'success'){
          $('.contact-form').html('<div class="alert alert-success">Message sent successfully</div>');
        }
      }
    });
  });
});
