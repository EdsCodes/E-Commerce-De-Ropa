function obtenerProdsFiltLS() {
    return JSON.parse(localStorage.getItem("productosFiltrados")) || [];
}

const mostrarProdsFilt = obtenerProdsFiltLS();

function generarHTMLProductoDetalle(producto) { 
    const precioConAumento = Math.round(producto.precio * 1.10);
    return `
        <div class="card cardProdsFilt col-md-4" style="width: 10rem; font-size: 10px;">
            <img src=".${producto.imagenUrl1}" class="card-img-top" alt="${producto.textoProducto}">
            <div class="card-body">
                <h5 class="card-title">${producto.textoProducto}</h5>
                <h6>${producto.descuento}</h6>
                <p class="card-text">${producto.talla}</p>
                <p class="card-text">${producto.color}</p>
                <div class="seccionPrecios">
                    <p class="textoTachado">$${precioConAumento}</p>
                    <p class="card-textPrice">$${producto.precio}</p>
                </div>
                <a href="../pages/detalleProducto.html" class="btn btn-dark" onclick="SaveIdProd(${producto.id});">Ver detalle</a>
                <a class="btn btn-dark" onclick="SaveIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</a>
            </div>
        </div>
    `;
}

mostrarProdsFilt.forEach(producto => {
    const productoHTML = generarHTMLProductoDetalle(producto); 
    let contenidoDetalleFiltrados = document.getElementById('prodsFiltrados');
    contenidoDetalleFiltrados ? contenidoDetalleFiltrados.innerHTML += productoHTML : null;
});