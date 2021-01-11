


// /* ===================== Selectores ===================== */
// const carrito = document.querySelector('#carrito');
// const contendorCarrito = document.querySelector('#lista-carrito tbody');
// const listaProductos = document.querySelector('#lista-productos');

// let articulosCarrito = [];


// /* ===================== Listeners ===================== */
// listaProductos.addEventListener('click', agregarProducto);
// window.addEventListener('load', () => {
// 	articulosCarrito = JSON.parse(localStorage.getItem('carrito'));

// 	insertarCarritoHTML()
// })



// /* ===================== Funciones ===================== */

// //Agregar productos al carrito
// function agregarProducto(e){
// 	//Quitar la reaccion por defecto:
// 	e.preventDefault();

// 	//Paso 1: Identificar si estoy dandole click a un elemento que contiene en su lista de clases 'agregar-carrito'
// 	if(e.target.classList.contains('agregar-carrito')) {
// 			//Paso 2: Identificar que elemento es
// 		//Seleccionar el card del producto
// 		const productoSeleccionado = e.target.parentElement.parentElement;

// 		obtenerDatos(productoSeleccionado);
// 	}
// }

// //Extraer la informacion del elemento al que se le dio click
// function obtenerDatos(producto) {

// 	//Creamos un objeto que extraiga lo que necesito:
// 	const productoAgregado = {
// 		imagen: producto.querySelector('img').src,
// 		nombre: producto.querySelector('h4').textContent,
// 		precio:producto.querySelector('.precio span').textContent,
// 		id: producto.querySelector('a').getAttribute('data-id'),
// 		cantidad: 1
// 	};

// 	//Comprobar si existe un mismo producto dentro del carrito
// 	const existe = articulosCarrito.some(producto => producto.id == productoAgregado.id);

// 	if(existe){
// 		// Producto ya existente
// 		const productos = articulosCarrito.map(producto => {
// 			if(producto.id === productoAgregado.id){
// 				producto.cantidad++;
// 				return producto
// 			}else{
// 				return producto
// 			}
// 		})

// 		//Esto copia la variable 'productos' dentro del arreglo carrito
// 		articulosCarrito = [...productos];
// 		/* 	articulosCarrito = [...productos]; seria igual a 
// 				articulosCarrito = [productos[0], productos[1], productos[2], etc];	 */

// 	} else {
// 		//Agrego el producto al carrito
// 		articulosCarrito.push(productoAgregado);
// 	}

// 	insertarCarritoHTML();
// 	guardarStorage();
// }

// function guardarStorage() {
// 	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
// }


// //Insertar los productos dentro del carrito (DOM)
// function insertarCarritoHTML() {

// 	/* Para que los elementos no se multipliquen, hay que 'borrar' el objeto que seleccionamos previamente */
// 	limpiarCarrito();


// 	//debemos iterar sobre el arreglo carrito:
// 	articulosCarrito.forEach(producto => {

// 		// Destructuring sobre el producto:
// 		const {imagen, nombre, precio, cantidad, id} = producto;

// 		const row = document.createElement('tr');
// 		row.innerHTML = `
// 			<td>
// 				<img src="${imagen}" width=100>
// 			</td>
// 			<td>
// 				${nombre}
// 			</td>
// 			<td>
// 				${precio}
// 			</td>
// 			<td>
// 				${cantidad}
// 			</td>
// 			<td>
// 				<a href="#" class="borrar-producto" data-id="${id}"> X </a>
// 			</td>
// 		`
// 		//Dentro del forEach porque va por cada producto
// 		contendorCarrito.appendChild(row);
// 	})
// }

// function limpiarCarrito(){
// 	//contendorCarrito.innerHTML = '';

// 	while(contendorCarrito.firstChild){
// 		contendorCarrito.removeChild(contendorCarrito.firstChild);
// 	}
// }



