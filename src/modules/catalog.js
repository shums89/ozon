import getData from "./getData";
import renderGoods from "./renderGoods";

const catalog = () => {
  const btnCatalog = document.querySelector('.catalog-button > button');
  const catalogModal = document.querySelector('.catalog');
  const catalogModalItems = document.querySelectorAll('.catalog li');

  let isOpen = false;

  btnCatalog.addEventListener('click', () => {
    isOpen = !isOpen;

    if (isOpen) {
      catalogModal.style.display = 'block';
    } else {
      catalogModal.style.display = '';
    }
  });

  catalogModalItems.forEach(item => {
    item.addEventListener('click', () => {
      const text = item.textContent;

      getData(`?category=${text}`).then(data => renderGoods(data));
    });
  });
};

export default catalog;