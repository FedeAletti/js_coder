/* ==================== Selectores ==================== */
const carrito = $("#carrito");

const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaProductos = document.querySelector("#lista-productos");
const carritoLogo = document.querySelector('#carrito-contenedor')

const btnVaciarCarrito = $('#vaciar-carrito');

const comprarButton = $('.comprarButton');

let articulosCarrito = [];


/* ==================== Listeners ==================== */
listaProductos.addEventListener('click', agregarProducto);

$(comprarButton).click(comprarButtonClicked);

$(carrito).click(quitarProducto);
$(btnVaciarCarrito).click(vaciarCarrito);


document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];


    
    // --formato de carrito con contenido
    if(articulosCarrito.length >= 0){
        carritoLogo.classList.add('carrito-lleno');
    }
    insertarCarritoHTML();
});

/* ==================== Funciones ==================== */

// --Vaciado de carrito
function vaciarCarrito(e) {
	limpiarCarrito();
	articulosCarrito = [];
	guardarStorage();
}
// --Quita de producto
function quitarProducto(e) {
	if (e.target.classList.contains('borrar-producto')) {
        e.preventDefault();
		const productoId = e.target.getAttribute('data-id');

		/* Filtro los productos del carrito */
		articulosCarrito = articulosCarrito.filter(producto => producto.id != productoId);

		insertarCarritoHTML();
		guardarStorage();
    }
    
}

// --Boton Compra
function comprarButtonClicked(e){
    
    if (e.target.classList.contains('comprarButton')) {
        vaciarCarrito();
        const graciasCompra = document.createElement('div');
        graciasCompra.innerHTML = `
            <h3 class="text-center">Gracias por su compra!</h3>
            `
        contenedorCarrito.appendChild(graciasCompra);

        total = 0
    }
    
}

// --Agregar productos
function agregarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;

        obtenerDatos(productoSeleccionado);
    } 

    

}

// --Datos de productos
function obtenerDatos(producto) {
    
    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h4').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => producto.id == productoAgregado.id)

    if(existe) {
        const productos = articulosCarrito.map(producto => {
            if(producto.id === productoAgregado.id) {
                producto.cantidad++;
                return producto;
            }else {
                return producto;
            };
            articulosCarrito = [...productos];
        })
    } else{
        //Pushear al carrito
        articulosCarrito.push(productoAgregado);
    }

    insertarCarritoHTML();
    guardarStorage();
}

// --Guardado en el local storage
function guardarStorage() {
	localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function insertarCarritoHTML(){
    //Borrar contenido del carrito para no repetirlo
    limpiarCarrito();
    let total = 0;
    const carritoTotal = document.querySelector('.cartTotal')

    articulosCarrito.forEach(producto => {
        const {imagen, nombre, precio, id, cantidad} = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${imagen}" width=100>
            </td>
            <td>
                ${nombre}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-producto" data-id="${id}"> X </a>
            </td>
        `
        contenedorCarrito.appendChild(row);

        const precioProducto = precio.replace('$', '');
        const cantidadProducto = cantidad;

        total = total + precioProducto * cantidadProducto;

    });
    

    carritoTotal.innerHTML = `$${total.toFixed(2)}`;

}


// --Limpiar productos
function limpiarProductos() {
	while (listaProductos.firstChild) {
		listaProductos.removeChild(listaProductos.firstChild);
	}
}

// --Limpiar Carrito
function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};