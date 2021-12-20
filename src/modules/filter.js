import getData from "./getData";
import renderGoods from "./renderGoods";

const filter = () => {
  const minInput = document.getElementById('min');
  const maxInput = document.getElementById('max');
  const checkboxInput = document.getElementById('discount-checkbox');
  const checkboxSpan = document.querySelector('.filter-check_checkmark');
  const filter = document.querySelector('.filter');

  filter.addEventListener('change', (event) => {
    let str = '';
    const value = priceFilter();

    if (value) {
      str = value;
    }

    if (checkboxInput.checked) {
      checkboxSpan.classList.add('checked');
      str = str ? `${str}&sale=true` : '?sale=true';
    } else {
      checkboxSpan.classList.remove('checked');
    }
    console.log(str);
    getData(str).then(data => renderGoods(data));
  });

  // minInput.addEventListener('input', () => {
  //   const value = priceFilter();

  //   getData(`${value}`).then(data => renderGoods(data));
  // });

  // maxInput.addEventListener('input', () => {
  //   const value = priceFilter();

  //   getData(`${value}`).then(data => renderGoods(data));
  // });

  // checkboxInput.addEventListener('change', () => {
  //   if (checkboxInput.checked) {
  //     checkboxSpan.classList.add('checked');
  //   } else {
  //     checkboxSpan.classList.remove('checked');
  //   }

  //   getData(`?sale=${checkboxInput.checked}`).then(data => renderGoods(data));
  // });

  const priceFilter = () => {
    const min = minInput.value;
    const max = maxInput.value;

    if (min === '' && max === '') {
      return '';
    } else if (min !== '' && max !== '') {
      return `?price_gte=${min}&price_lte=${max}`;
    } if (min !== '' && max === '') {
      return `?price_gte=${min}`;
    } if (min === '' && max !== '') {
      return `?price_lte=${max}`;
    }
  };
};

export default filter;