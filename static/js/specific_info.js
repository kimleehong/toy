class UseCpn {
  constructor() {
    this.faccount = document.getElementById('usecpnacc').dataset.faccount;
    this.account = document.getElementById('usecpnacc').dataset.account;
  }
  chncpn(t) {
    document.querySelectorAll('.coupon-if-wrap .chnfontweight').forEach((ele) => {
      ele.classList.remove('mtxtbld');
    })
    let discount = 0;
    let cpnlist = document.querySelectorAll('.coupon-if-wrap .chkimg');

    cpnlist.forEach(ele => {
      //체크한것 할인금애걷하기
      if (!ele.checked) {
        return true;
      }
      ele.parentNode.classList.add('mtxtbld');
      ele.parentNode.nextElementSibling.classList.add('mtxtbld');
      discount += parseInt(ele.dataset.discount);
    })
    let returnAccount = this.faccount - discount;
    if (returnAccount < 0) {
      returnAccount = 0;
    }
    let disper = Math.round(100 - ((returnAccount / this.account) * 100));
    document.getElementById('usecpnper').innerText = disper;
    document.getElementById('usecpnacc').innerText = returnAccount.toLocaleString();
  }
  toggleshow() {
    let cpncontent = document.querySelector('.coupon-if-wrap .coupon-if-content');
    cpncontent.style.display = cpncontent.style.display == 'none' ? 'block' : 'none';
    let toggleimg = document.querySelector('.coupon-if-wrap .toggleShowImg');
    toggleimg.style.transform = toggleimg.style.transform == 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}
const usecpn = new UseCpn();


