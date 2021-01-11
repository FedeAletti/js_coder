/* Selectores */
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const listaProductos = document.querySelector("#lista-productos");

let articulosCarrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito'));

    insertarCarritoHTML();
});


/* Funciones */
function agregarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const productoSeleccionado = e.target.parentElement.parentElement;

        obtenerDatos(productoSeleccionado);
    }

}

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
            articulosCarrito = [...productoAgregado];
        })
    } else{
        //Pushear al carrito
        articulosCarrito.push(productoAgregado);
    }

    insertarCarritoHTML();
    guardarStorage();
};

function guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
};

function insertarCarritoHTML(){
    //Borrar contenido del carrito para no repetirlo
    limpiarCarrito();

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
    });

}


function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
};