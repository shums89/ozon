const getData = (str) => {
  return fetch(`http://localhost:3000/goods${str ? str : ''}`)
    .then(response => response.json());
};

export default getData;