function guardarProductoDetalleLS(producto) {
    localStorage.setItem("productoDetalle", JSON.stringify(producto));
}

function abrirPagDetalle (event){
    window.open('../pages/detalleProducto.html');
}

function guardarProdDetArray (producto){
    productoDetalle.push(producto);    
};

function guardarProductosFiltardosLS(prodsFiltrados) {
    localStorage.setItem("productos", JSON.stringify(prodsFiltrados));
}
