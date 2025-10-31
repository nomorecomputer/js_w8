export function rePlotting(orders) {
  const categories = [];
  orders.forEach((order) => {
    order.products.forEach((product) => {
      categories[product.category] =
        (categories[product.category] || 0) + product.price * product.quantity;
    });
  });

  const products = [];
  orders.forEach((order) => {
    order.products.forEach((product) => {
      products[product.title] =
        (products[product.title] || 0) + product.price * product.quantity;
    });
  });
  const products2 = Object.entries(products);
  const sortedProducts = products2.sort((a, b) => {
    return b[1] - a[1];
  });
  const otherProducts = sortedProducts.splice(3);
  if (sortedProducts.length >= 1) {
    sortedProducts.push([
      "其他",
      otherProducts.reduce((acc, item) => {
        acc += item[1];
        return acc;
      }, 0),
    ]);
  }

  let chart3 = c3.generate({
    bindto: "#chart-LV2", // HTML 元素綁定
    size: { width: 360, height: 360 },
    data: {
      type: "pie",
      columns: Object.entries(categories),
    },
  });

  let chart2 = c3.generate({
    bindto: "#chart-LV3", // HTML 元素綁定
    size: { width: 360, height: 360 },
    data: {
      type: "pie",
      columns: sortedProducts,
    },
  });
}
