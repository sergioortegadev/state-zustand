const fetchData = async () => {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();

  return data.products;
};

export default fetchData;
