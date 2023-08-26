// 할인적용
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


$(function () {

  // 구매하기
  const productSelect = document.getElementById('product-select');
  const quantityInput = document.getElementById('quantity-input');
  const totalPrice = document.getElementById('total-price');
  const addToCartButton = document.getElementById('add-to-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  productSelect.addEventListener('change', updateTotalPrice);
  quantityInput.addEventListener('input', updateTotalPrice);
  addToCartButton.addEventListener('click', addToCart);

  function updateTotalPrice() {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    if (!selectedOption.value) {
      totalPrice.textContent = `0원`;
      return;
    }

    const price = parseInt(selectedOption.value);
    const quantity = parseInt(quantityInput.value);
    const total = price * quantity;
    const formattedTotal = total.toLocaleString(); // 3자리 단위 콤마 추가
    totalPrice.textContent = `${formattedTotal}원`;
  }

  function addToCart() {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    if (!selectedOption.value) {
      return;
    }

    const productName = selectedOption.text.split(' - ')[0];
    const price = parseInt(selectedOption.value);
    const quantity = parseInt(quantityInput.value);
    const total = price * quantity;

    const cartItem = document.createElement('li');
    const removeButton = document.createElement('button');
    const itemQuantityInput = document.createElement('input');

    removeButton.classList.add('remove-button');
    itemQuantityInput.classList.add('item-quantity');

    removeButton.textContent = '삭제';

    itemQuantityInput.type = 'number';
    itemQuantityInput.value = quantity;
    itemQuantityInput.min = '1';

    cartItem.innerHTML = `
        ${productName} - <span class="total">${total}</span>원
      `;
    cartItem.appendChild(itemQuantityInput);
    cartItem.appendChild(removeButton);

    cartItemsList.appendChild(cartItem);

    updateTotalPrice();
    updateCartTotal();

    removeButton.addEventListener('click', () => {
      const confirmDelete = confirm('정말로 상품을 삭제하시겠습니까?');
      if (confirmDelete) {
        cartItemsList.removeChild(cartItem);
        updateTotalPrice();
        updateCartTotal();
      }
    });

    itemQuantityInput.addEventListener('input', () => {
      const newQuantity = parseInt(itemQuantityInput.value);
      const newTotal = price * newQuantity;
      cartItem.querySelector('.total').textContent = newTotal;
      updateTotalPrice();
      updateCartTotal();
    });
  }

  function updateCartTotal() {
    const cartItems = cartItemsList.querySelectorAll('li');
    let cartTotalPrice = 0;

    cartItems.forEach(cartItem => {
      const price = parseInt(cartItem.querySelector('.total').textContent);
      cartTotalPrice += price;
    });

    cartTotal.textContent = `장바구니 총 가격: ${cartTotalPrice}원`;
  }

  // 바로 구매하기
  const purchaseButton = document.getElementById('purchase-button');
  purchaseButton.addEventListener('click', purchaseItems);

  function purchaseItems() {
    const selectedOption = productSelect.options[productSelect.selectedIndex];
    if (!selectedOption.value) {
      alert('상품을 선택해주세요.');
      return;
    }

    const quantity = parseInt(quantityInput.value);
    if (isNaN(quantity) || quantity < 1) {
      alert('올바른 수량을 입력해주세요.');
      return;
    }

    const productName = selectedOption.text.split(' - ')[0];
    const price = parseInt(selectedOption.value);
    const total = price * quantity;

    const confirmPurchase = confirm(`${productName} ${quantity}개를 구매하시겠습니까?\n총 가격: ${total}원`);

    if (confirmPurchase) {
      alert(`${productName} ${quantity}개를 구매하셨습니다. 총 가격: ${total}원`);
      quantityInput.value = '1'; // 수량 초기화
      productSelect.value = ''; // 상품 선택 초기화
      totalPrice.textContent = `0원`; // 총 가격 초기화
    }
  }


  // 장바구니에서 구매하기
  const purchaseCartButton = document.getElementById('purchase-cart-button');
  purchaseCartButton.addEventListener('click', purchaseCartItems);

  function purchaseCartItems() {
    const cartItems = cartItemsList.querySelectorAll('li');

    if (cartItems.length === 0) {
      alert('장바구니가 비어 있습니다. 상품을 추가하세요.');
      return;
    }

    let cartTotalPrice = 0;
    let itemsToPurchase = [];

    cartItems.forEach(cartItem => {
      const productName = cartItem.innerText.split(' - ')[0];
      const quantity = parseInt(cartItem.querySelector('.item-quantity').value);
      const price = parseInt(cartItem.querySelector('.total').textContent);

      cartTotalPrice += price;
      itemsToPurchase.push({ productName, quantity, price });
    });

    const confirmPurchase = confirm(`장바구니의 상품을 구매하시겠습니까?\n총 가격: ${cartTotalPrice}원`);
    if (confirmPurchase) {
      cartItemsList.innerHTML = '';
      updateTotalPrice();
      updateCartTotal();
      alert('구매가 완료되었습니다. 감사합니다!');

      // 여기에 구매 로직 추가 가능 (서버로 정보 전송 등)
    }

  }



});




