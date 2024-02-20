document.addEventListener('DOMContentLoaded', function () {

    function obtenerProductosLS() {
        return JSON.parse(localStorage.getItem("productos")) || [];
    }

    const productos = obtenerProductosLS();

    function generarHTMLProducto(producto) {
        const precioConAumento = Math.round(producto.precio * 1.10);

        return `
            <div class="img${producto.id}__pagPpal"> 
                <img src="${producto.imagenUrl}" class="rounded float-start" alt="${producto.textoProducto}">
                <div class="seccionVtaImgsPpal">
                    <div class="card-img-overlay">
                        <div class="seccionPrecios__imgsPagPPal">
                            <h5 class="precioTachado">$${precioConAumento}</h5>
                            <h5 class="textPrice">$${producto.precio}</h5>
                        </div>
                        <p class="card-text">${producto.textoProducto}</p>
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

    productos.forEach(producto => {
        const productoHTML = generarHTMLProducto(producto);
        document.getElementById('listaProductosPagPpal').innerHTML += productoHTML;
    });

    // Filtrar productos por género
    function filtrarPorGenero(genero) {
        return productos.filter(producto => producto.genero === genero);
    }

    const generoFiltrado = 'Mujer';
    const productosFiltradosPorGenero = filtrarPorGenero(generoFiltrado);

    console.log(`Productos filtrados por género "${generoFiltrado}":`);
    console.log(productosFiltradosPorGenero);
});
