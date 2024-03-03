document.addEventListener('DOMContentLoaded', function () {
    
    const productos = [
        {id:1, imagenUrl: "./multi/mujer_con_jean_roto.jpeg", textoProducto: "Jean Dama", descuento: "-10%", talla: "Tallas 26-36", precio: 75000, color: "Azul", genero: "mujer"},
        {id:2, imagenUrl: "./multi/mujer_blusa_beige.jpeg", textoProducto: "Blusa dama", descuento: "-10%", talla: "Tallas S-XL", precio: 65000,  color: "Beige", genero: "mujer"},
        {id:3, imagenUrl: "./multi/saco_gris_hombre.jpeg", textoProducto: "Saco gris", descuento: "-10%", talla: "Tallas S-XL", precio: 70000,  color: "Gris", genero: "hombre"},
        {id:4, imagenUrl: "./multi/buzo_rojo_hombre.jpeg", textoProducto: "Buzo hombre", descuento: "-10%", talla: "Tallas S-XL", precio: 90000,  color: "Rojo", genero: "hombre"},
    ];

    const productosCarrete = [
        {id:5, imagenUrl: "./multi/jean_dama_azul.jpeg",  textoProducto: "Jean Dama", descuento: "-10%", talla: "Tallas 26-36", precio: 80000, color: "Azul", genero: "mujer"},
        {id:6, imagenUrl: "./multi/camisa_azulJean_hombre.jpeg", textoProducto: "Camisa hombre", descuento: "-10%", talla: "Tallas S-XL", precio: 60000, color: "Azul", genero: "hombre"},
        {id:7, imagenUrl: "./multi/jean_dama.jpeg", textoProducto: "Jean dama", descuento: "-10%", talla: "Tallas 26-36", precio: 80000, color: "Azul", genero: "mujer"},
        {id:8, imagenUrl: "./multi/camisa_casual_hombre.jpeg", textoProducto: "Camisa casual hombre", descuento: "-10%", talla: "Tallas S-XL", precio: 75000, color: "Colores variados", genero: "hombre"},
        {id:9, imagenUrl: "./multi/camisa_unisex.jpeg", textoProducto: "Camisa unisex", descuento: "-10%", talla: "Tallas S-XL", precio: 78000, color: "Colores variados", genero: "mujer"}
    ];

    function generarHTMLProducto(producto) {
        const precioConAumento = Math.round(producto.precio * 1.10);

        return `
            <div class="img${producto.id}__pagPpal"> 
                <img src="${producto.imagenUrl}" class="rounded float-start" alt="${producto.textoProducto}">
                <div class="seccionVtaImgsPpal">
                    <div class="card-img-overlay">
                        <div class="seccionPrecios__imgsPagPPal">
                            <h5 class="textDesc">${producto.descuento}</h5>
                            <h5 class="precioTachado">$${precioConAumento}</h5>
                            <h5 class="textPrice">$${producto.precio}</h5>
                        </div>
                        <p class="card-text">${producto.textoProducto}</p>
                        <p class="card-text"><small>${producto.color} ${producto.talla}</small></p>
                    </div>
                    <div class="botonesAccionCompra">
                        <input type="button" class="verDetalleProd" value="Ver detalle">
                        <input type="button" id="anadirCarrito" value="Añadir al carrito">
                    </div>
                </div>
            </div>
        `;
    };

    function generarHTMLProductosCarrete(producto) {
        const precioConAumento = Math.round(producto.precio * 1.10);

        return `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagenUrl}" class="card-img-top" alt="${producto.textoProducto}">
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
    };
    
    function renderizarProductos(productos, elemento) {
        const htmlProductos = productos.map(producto => generarHTMLProducto(producto)).join('');
        elemento.innerHTML = htmlProductos;
    };
    
    function renderizarProdsCarrete (productos, elemento) {
        const htmlProductos = productos.map(producto => generarHTMLProductosCarrete(producto)).join('');
        elemento.innerHTML = htmlProductos;
    };
    
    renderizarProductos(productos, document.getElementById('listaProductosPagPpal'));

    renderizarProdsCarrete(productosCarrete, document.getElementById('carrete_recomendados'));

    const prodsPagPpal = productos.concat(productosCarrete); 

    let prodsFiltrados = []; 

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
    
    const botonFiltroMujer = document.getElementById('botonFiltroMujer');
    const botonFiltroHombre = document.getElementById('botonFiltroHombre');
    
    botonFiltroMujer.addEventListener("click", accionesProd);
    botonFiltroHombre.addEventListener("click", accionesProd);
});