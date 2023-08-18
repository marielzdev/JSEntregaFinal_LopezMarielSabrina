//Array del Carrito de compras con sus funciones

let carrito = [];

const productoContenedor = document.getElementById("producto-contenedor");
//funcion productocontenedor con lectura del evento tipo click
productoContenedor.addEventListener("click", (e) => {
  if (e.target.classList.contains("agregar")) {
    validarProductoEnCarrito(e.target.id);
  }
});
// funcion para validacion del producto en el carrito| utlizacion de fetch | JSON |
const validarProductoEnCarrito = (id) => {
  const estaRepetido = carrito.some((producto) => producto.id == id);

  if (!estaRepetido) {
    fetch("../data/stock.json")
      .then((response) => response.json())
      .then((productos) => {
        const producto = productos.find((producto) => producto.id == id);
        carrito.push(producto);
        pintarProductoCarrito(producto);
        actualizarTotalesCarrito(carrito);
      });
  } else {
    const producto = carrito.find((producto) => producto.id);
    producto.cantidad++;
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  }
};

//función pintar producto del carrito

const pintarProductoCarrito = (producto) => {
  const contenedor = document.getElementById("carrito-contenedor");
  const div = document.createElement("div");
  div.classList.add("productoEnCarrito");

  div.innerHTML = `
  <p>${producto.nombre}</p>
  <p>$ ${producto.precio}</p>
  <p id=cantidad ${producto.id}>Cantidad ${producto.cantidad}</p> 
  <button class="btn waves-effect waves-ligh boton-eliminar"value="">X</${producto.id}button>
  `;
  contenedor.appendChild(div);
};
//función muestra en  DOM estructura html | bucle para recorrer cada producto|

const pintarCarrito = (carrito) => {
  const contenedor = document.getElementById("carrito-contenedor");

  contenedor.innerHTML = "";

  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.classList.add("productoEnCarrito");

    div.innerHTML = `
      <p>${producto.nombre}</p>
      <p>$ ${producto.precio}</p>
      <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `;
    contenedor.appendChild(div);
  });
};

//funcion para eliminar productos del carrito

const eliminarProductoCarrito = (id) => {
  const productoIndex = carrito.findIndex((producto) => producto.id == id);
  carrito.splice(productoIndex, 1);
  pintarCarrito(carrito);
  actualizarTotalesCarrito(carrito);
};

//función que muestra la cantidad y calcula el precio acorde a ello

const actualizarTotalesCarrito = (carrito) => {
  const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalCompra = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  pintarTotalesCarrito(totalCantidad, totalCompra);
  guardarCarritoStorage(carrito);
};
//función muestra en el DOM la cantidad de productos + precio total.

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
  const contadorCarrito = document.getElementById("contador-carrito");
  const precioTotal = document.getElementById("precio-total");
  contadorCarrito.innerText = totalCantidad;
  precioTotal.innerText = totalCompra;
};

//Esta función guarda en el localstorage del usuario lo referente a productos del carrito.

const guardarCarritoStorage = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

//Esta función obtiene los productos del carrito que estan en el JSON del localstorage

const obtenerCarritoStorage = () => {
  const carritoStorage = JSON.parse(localStorage.getItem("carrito"));
  return carritoStorage;
};

//Esta función guarda todo lo anterior

const cargarCarrito = () => {
  if (localStorage.getItem("carrito")) {
    carrito = obtenerCarritoStorage();
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
  }
};
