
function guardarProductoDetalleLS(producto) {
    localStorage.setItem("productoDetalle", JSON.stringify(producto));
}

function obtenerProductosFiltradosLS() {
    return JSON.parse(localStorage.getItem("productosFiltrados")) || [];
}

const obtenerIdProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

function abrirPagDetalle (){
    window.open('../pages/detalleProducto.html');
}

function guardarProdDetArray (producto){
    productoDetalle.push(producto);    
};

function guardarProductosFiltardosLS(prodsFiltrados) {
    localStorage.setItem("productos", JSON.stringify(prodsFiltrados));
}

function borrarProdsFiltradosLS (){
    localStorage.removeItem('productosFiltrados');
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const buscarProducto = () => {
    borrarProdsFiltradosLS ()    
    const productos = obtenerprodsPagPpalLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id === id);

    return producto;
}


function filtrarPorGenero(genero) {
    return prodsPagPpal.filter(producto => producto.genero === genero);
}

function guardarProductosFiltradosLS(prodsFiltrados) {
    localStorage.setItem("productosFiltrados", JSON.stringify(prodsFiltrados));
}

function actualizarProdsFiltYSaveLS(genero) {
    prodsFiltrados = filtrarPorGenero(genero);
    guardarProductosFiltradosLS(prodsFiltrados);
}

function abrirPagDetalle () {
    window.open('../pages/detalleProducto.html')
}

function accionesProd() {
    const genero = this.dataset.genre;
    actualizarProdsFiltYSaveLS(genero);
    console.log(prodsFiltrados);
    setTimeout(abrirPagDetalle, 1000);
}