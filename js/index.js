//----------------PAGINA: INICIO (Index.html -- Seccion: Imagenes y prods de pagina ppal. Se deja comments del html (por el momento) para relacionar que se trabajo y la estructura base)------------------//

function generarHTMLProducto(producto) {
    return `
    <div class="${producto.class}"> 
        <img src="${producto.imagenUrl}" class="rounded float-start" alt="${producto.textoProducto}">
        <div class="seccionVtaImgsPpal">
            <div class="card-img-overlay">
                <div class="seccionPrecios__imgsPagPPal">
                    <h5 class="precioTachado"> $${(producto.precio * 1.10).toFixed(0)}</h5>
                    <h5 class="textPrice"> $${(producto.precio)}</h5>
                </div>
                <p class="card-text"> ${producto.textoProducto}</p>
                <p class="card-text"><small>${producto.color}</small></p>
            </div>
            <div class="botonesAccionCompra">
                <input type="button" value="Añadir al carrito">
                <input type="button" value="Comprar">
            </div>
        </div>
    </div>
    `;
}

const producto1 = {
    class: 'img1__pagPpal',
    imagenUrl: './multi/mujer_con_jean_roto.jpeg',
    precio: 85000,
    textoProducto: 'Jean Azul Dama. Tallas 26 - 36.',
    color: 'Color azul',
    genero: 'Mujer'
}

const producto2 = {
    class: 'img2__pagPpal',
    imagenUrl: './multi/mujer_blusa_beige.jpeg',
    precio: 75000,
    textoProducto: 'Blusa Dama. Tallas S-XL',
    color: 'Color Beige',
    genero: 'Mujer'
}

const producto3 = {
    class: 'img3__pagPpal',
    imagenUrl: './multi/saco_gris_hombre.jpeg',
    precio: 65000,
    textoProducto: 'Saco hombre. Tallas S-XL.',
    color: 'Color Gris',
    genero: 'Hombre'
}

const producto4 = {
    class: 'img4__pagPpal',
    imagenUrl: './multi/buzo_rojo_hombre.jpeg',
    precio: 95000,
    textoProducto: 'Hoddie Hombre. Tallas S-XL.',
    color: 'Color Rojo',
    genero: 'Hombre'
}

const productos = [producto1, producto2, producto3, producto4];

const imgsPagPPal = document.getElementById('listaProductosPagPpal');

productos.forEach(producto => {
    const productoHTML = generarHTMLProducto(producto);
    imgsPagPPal.innerHTML += productoHTML;
});

// Filtrar productos por género
function filtrarPorGenero(genero) {
    const productosFiltrados = productos.filter(producto => producto.genero === genero);
    return productosFiltrados;
}

const generoFiltrado = 'Mujer';
const productosFiltradosPorGenero = filtrarPorGenero(generoFiltrado);

console.log(`Productos filtrados por género "${generoFiltrado}":`);
console.log(productosFiltradosPorGenero);
