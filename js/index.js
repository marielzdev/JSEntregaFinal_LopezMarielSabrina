//Carga de DOM y BD//
document.addEventListener("DOMContentLoaded", () => {
  fetch("../data/stock.json")
    .then((response) => response.json())
    .then((productos) => {
      pintarProductos(productos);
    });
});
document.addEventListener("DOMContentLoaded", cargarCarrito());
