
// OBJETO

class producto {
        constructor (id, nombre, imagen, comentario, precio, categoria, xAgregado, enCarrito) {
          this.id = id;
          this.nombre = nombre;
          this.imagen = imagen;
          this.comentario = comentario;
          this.precio = precio;
          this.categoria = categoria;
          this.xAgregado = xAgregado;
          this.enCarrito = enCarrito;
        }
}


// ARRAYS

const productosStock = [
        new producto (1, "La Mr. Pit", "./assets/imgs/imgpizzas/mr-pit.jfif", "Sólo para expertos", 350, "pizzas", 0, false),
        new producto (2, "¡Q' Jamone!", "./assets/imgs/imgpizzas/Q-Jamone.jfif", "c/jamón crudo", 350, "pizzas", 0, false),
        new producto (3, "La Charly García", "./assets/imgs/imgpizzas/Carly.jfif", "¡BASTA!", 380, "pizzas", 0, false),
        new producto (4, "La Maradona", "./assets/imgs/imgpizzas/bennazianna.jfif", "¡Eterna!", 450, "pizzas", 0, false),
        new producto (5, "Picantovich", "./assets/imgs/imgpizzas/Picantovich.jfif", "Pica 2 veces", 750, "pizzas", 0, false),
        new producto (6, "La Hasbulla", "./assets/imgs/imgpizzas/Hasbulla.jfif", "En honor al 1", 990, "pizzas", 0, false),
        new producto (7, "Leo Messi", "./assets/imgs/imgpizzas/Messi.jfif", "¡De pie señores!", 10, "pizzas", 0, false),
        new producto (8, "Nick Gi", "./assets/imgs/imgpizzas/NickGi.jfif", "La que desaparece", 0, "pizzas", 0, false),
        new producto (9, "Bennazianna", "./assets/imgs/imgpizzas/bennazianna.jfif", "La más completa", 3650, "pizzas", 0, false),
        new producto (10, "Tronco-Pizza", "./assets/imgs/imgpizzas/tronco.jfif", "Para todo el día", 870, "pizzas", 0, false),
        new producto (11, "Papas | Provenzal", "./assets/imgs/imgpizzas/papitas.jfif", "Van como piña", 360, "papas", 0, false)
];

let productosCarrito = [];

let productosRecomendados = [];


// ELEMENTOS DE HTML

const populares = document.getElementById("populares");
const pizzas = document.getElementById("pizzas");
const hamburguesas = document.getElementById("hamburguesas");
const papas = document.getElementById("papas");
const wraps = document.getElementById("wraps");
const mexican = document.getElementById("mexican");
const batidos = document.getElementById("batidos");
const categoriasProductos = [populares, pizzas, hamburguesas, papas, wraps, mexican, batidos];

const seccionProductos = document.getElementById("productos");
const seccionRecomendaciones = document.getElementById("recomendaciones");
const seccionCarrito = document.getElementById("carrito");
const openCarrito = document.getElementById("boton_carrito");
const botonComprar = document.getElementById("boton_compra");




// RENDER

const mostrar_producto = (seccion, producto) => {
        seccion.innerHTML = seccion.innerHTML + `
                <div class="cards-p">
			<img src="${producto.imagen}" alt="imagen-prod-${producto.id}" class="prod-imgs">
			<div class="info-prod">
				<p class="nombre-prod">${producto.nombre}</p>
				<p class="comentario-prod">${producto.comentario}</p>
				<p class="precio-prod">${producto.precio}</p>
			</div>
			<button class="btns-add">AGREGAR</button>
		</div>
                `;
};


const filtrar_productos = (categoria) => {
        let productos_para_mostrar = [];
        if (categoria == "populares") {
                productos_para_mostrar = productosStock.filter ((producto) => producto.id <= 8);
        }
        else {
                productos_para_mostrar = productosStock.filter ((producto) => producto.categoria == categoria);
        }
        productos_para_mostrar.forEach ((producto) => mostrar_producto(seccionProductos, producto));
}


const render_recomendaciones = () => {
        productosStock.sort ((producto1, producto2) => producto2.xAgregado - producto1.xAgregado);
        productosRecomendados = [productosStock[0], productosStock[1], productosStock[2]];
        productosRecomendados.forEach ((producto) => mostrar_producto(seccionRecomendaciones, producto));
};


const render_productos = (seccion, categoria) => {
        switch (seccion) {
                case "recomendaciones":
                        render_recomendaciones ();
                        break;
                case "carrito":
                        productosCarrito.forEach ((producto) => mostrar_producto (seccionCarrito, producto));
                        break;
                default:
                        if (!categoria) {
                                filtrar_productos("populares");
                        }
                        else {
                                filtrar_productos(categoria);
                        }
                        break;
        }
}









// CARRITO
/*
const actualizar_carrito = () => {
        mostrar_producto ();
        addEventListener ('click', agregar_producto);
        // si la cantidad del producto en carrito es 0:
        addEventListener ('click', eliminar_producto);
        mostrar_precio_total ();
        confirmar_compra ();
        actualizar_local_storage ();
}
*/

/**********************************************/

const init = () => {
        render_productos ();
        render_productos ("recomendaciones");
        papas.addEventListener('click', () => render_productos("nose", "papas"));
        //actualizar_carrito ();
};

localStorage.setItem('productosStock', JSON.stringify(productosStock));
localStorage.setItem('productosCarrito', JSON.stringify(productosCarrito));
localStorage.setItem('productosRecomendados', JSON.stringify(productosRecomendados));
// console.log (papas.id);
init();