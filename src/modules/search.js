import getData from "./getData";
import renderGoods from "./renderGoods";

const search = () => {
  const searchInput = document.querySelector('.search-wrapper_input');

  searchInput.addEventListener('input', event => {
    const value = event.target.value;

    getData(`?title_like=${value}`).then(data => renderGoods(data));
  });
};

export default search;