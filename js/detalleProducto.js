function obtenerProductosFiltradosLS() {
    return JSON.parse(localStorage.getItem("productosFiltrados")) || [];
}

const mostrarProdsFilt = obtenerProductosFiltradosLS();

function generarHTMLProductoDetalle(producto) { 
    const precioConAumento = Math.round(producto.precio * 1.10);
    return `
        <div class="card" style="width: 18rem;">
            <img src=".${producto.imagenUrl}" class="card-img-top" alt="${producto.textoProducto}">
            <div class="card-body">
                <h5 class="card-title">${producto.textoProducto}</h5>
                <h6>${producto.descuento}</h6>
                <p class="card-text">${producto.talla}</p>
                <p class="card-text">${producto.color}</p>
                <div class="seccionPrecios">
                    <p class="textoTachado">$${precioConAumento}</p>
                    <p class="card-textPrice">$${producto.precio}</p>
                </div>
                <a href="./pages/detalleProducto.html" class="btn btn-dark">Ver detalle</a>
                <a href="./pages/detalleProducto.html" class="btn btn-dark">Añadir al carrito</a>
            </div>
        </div>
    `;
}

mostrarProdsFilt.forEach(producto => {
    const productoHTML = generarHTMLProductoDetalle(producto); 
    document.getElementById('prodsFiltrados').innerHTML += productoHTML;
});
