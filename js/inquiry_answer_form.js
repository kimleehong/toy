$(function () {
  // texarea 사이즈 자동 조절
  $(".answer_2").on("keydown keyup", function () {
    $(this).height(244).height($(this).prop("scrollHeight"));
  });

});
