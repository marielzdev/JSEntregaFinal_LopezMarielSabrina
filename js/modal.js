// funciones referentes al modal contenedor
const modalContenedor = document.querySelector(".modal-contenedor");
const abrirCarrito = document.getElementById("cesta-carrito");
const cerrarCarrito = document.getElementById("btn-cerrar-carrito");
const modalCarrito = document.querySelector(".modal-carrito");
const compraExitosa = document.getElementById("compraExitosa");

//eventos asociados a las funciones
abrirCarrito.addEventListener("click", () => {
  modalContenedor.classList.toggle("modal-active");
});

cerrarCarrito.addEventListener("click", () => {
  modalContenedor.classList.toggle("modal-active");
});

modalContenedor.addEventListener("click", () => {
  cerrarCarrito.click();
});
modalCarrito.addEventListener("click", (e) => {
  e.stopPropagation();
  if (e.target.classList.contains("boton-eliminar")) {
    eliminarProductoCarrito(e.target.value);
  }
});

//funcion de compra
compraExitosa.addEventListener("click", () => {
  mostrarMensajeCompraExitosa()
    .then(() => {
      console.log("Mensaje de compra exitosa mostrado");
    })
    .catch((error) => {
      console.error("Error al mostrar el mensaje:", error);
    });
});

//funcion asincrónica + evento de compraExitosa
const mostrarMensajeCompraExitosa = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Felicitaciones!",
        text: "Su compra ha sido realizada con éxito",
      });
      resolve();
    }, 1500);
  });
};
