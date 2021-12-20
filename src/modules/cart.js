import renderCart from "./renderCart";
import postData from "./postData";

const cart = () => {
  const cartBtn = document.getElementById('cart');
  const cartModal = document.querySelector('.cart');
  const cartCloseBtn = cartModal.querySelector('.cart-close');
  const cartTotal = cartModal.querySelector('.cart-total > span');
  const cartSendBtn = cartModal.querySelector('.cart-confirm');
  const goodsWrapper = document.querySelector('.goods');
  const cartWrapper = document.querySelector('.cart-wrapper');


  const openCart = () => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    cartModal.style.display = 'flex';

    renderCart(cart);
    cartTotal.textContent = cart.reduce((sum, good) => sum + good.price, 0);
  };

  const closeCart = () => {
    cartModal.style.display = '';
  };

  // cartBtn.onclick = openCart;
  // cartCloseBtn.onclick = closeCart;

  cartBtn.addEventListener('click', openCart);
  cartCloseBtn.addEventListener('click', closeCart);

  goodsWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-primary')) {
      const key = event.target.closest('.card').dataset.key;
      const goods = JSON.parse(localStorage.getItem('goods'));
      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      const good = goods.find(good => good.id === +key);

      cart.push(good);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });

  cartWrapper.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-primary')) {
      const key = event.target.closest('.card').dataset.key;
      const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
      const index = cart.findIndex(item => item.id === +key);

      cart.splice(index, 1);

      localStorage.setItem('cart', JSON.stringify(cart));

      renderCart(cart);
      cartTotal.textContent = cart.reduce((sum, good) => sum + good.price, 0);
    }
  });

  cartSendBtn.addEventListener('click', () => {
    const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    postData(cart).then(() => {
      localStorage.removeItem('cart');

      renderCart([]);
      cartTotal.textContent = 0;
    });
  });
};

export default cart;