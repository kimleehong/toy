$(function () {
  // texarea 사이즈 자동 조절
  $(".textarea").on("keydown keyup", function () {
    $(this).height(302).height($(this).prop("scrollHeight"));
  });

  // 전화번호 입력 관련 코드
  function formatPhoneNumber() {
    const phoneInput = $("#phone");

    phoneInput.on("input", function () {
      const inputValue = phoneInput.val();
      const strippedValue = inputValue.replace(/-/g, ''); // 하이픈 제거

      if (strippedValue.length >= 4 && strippedValue.length <= 7) {
        const formattedValue = `${strippedValue.slice(0, 3)}-${strippedValue.slice(3)}`;
        phoneInput.val(formattedValue);
      } else if (strippedValue.length >= 8) {
        const formattedValue = `${strippedValue.slice(0, 3)}-${strippedValue.slice(3, 7)}-${strippedValue.slice(7, 11)}`;
        phoneInput.val(formattedValue);
      }

      // 추가된 부분: 마지막 4자리 이후에는 입력 방지
      if (strippedValue.length >= 11) {
        phoneInput.val(formattedValue); // 마지막 입력을 무시하고 이전 값으로 복원
      }
    });
  }

  formatPhoneNumber();

});


