function FaqBox__init() {
  $('.asked_box > ul > li').click(function() {
    let $this = $(this);
    
    $this.siblings('.hover').find(' > .asked_box_answer').slideUp(300); // 추가
    $this.siblings('.hover').removeClass('hover');
    
    if ( $this.hasClass('hover') ) {
      $this.find(' > .asked_box_answer').slideUp(300); // 추가
      $this.removeClass('hover');
    }
    else {
      $this.find(' > .asked_box_answer').slideDown(300); // 추가
      $this.addClass('hover');
    }
  });
  
  $('.asked_box_answer').click(function() {
    return false;
  });
}

$(function () {
  FaqBox__init();
});