$(function () {

  // texarea 사이즈 자동 조절
  $(".textarea").on("keydown keyup", function () {
    $(this).height(302).height($(this).prop("scrollHeight"));
  });

});