document.addEventListener('DOMContentLoaded', async function () {
    
    async function consumirApiProds() {
        try {
            const respuesta = await fetch('./js/productos.json');
            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            return [];
        }
    }

    async function consumirApiProdsCarrete() {
        try {
            const respuesta = await fetch('./js/productosCarrete.json');
            const datos = await respuesta.json();
            return datos;
        } catch (error) {
            return [];
        }
    }

    const [productos, productosCarrete] = await Promise.all([consumirApiProds(), consumirApiProdsCarrete()]);

    function generarHTMLProducto(producto) {
    const precioConAumento = Math.round(producto.precio * 1.10);
    return `
        <div id=${producto.id} class="img${producto.id}__pagPpal"> 
            <img src="${producto.imagenUrl1}" class="rounded float-start" alt="${producto.textoProducto}">
            <div class="seccionVtaImgsPpal">
                <div class="card-img-overlay">
                    <div class="seccionPrecios__imgsPagPPal">
                        <h5 class="precioTachado">$${precioConAumento}</h5>
                        <h5 class="textPrice">$${producto.precio}</h5>
                    </div>
                    <p class="card-text">${producto.textoProducto}  (-10% OFF)</p>
                    <p class="card-text"><small>${producto.color} ${producto.talla}</small></p>
                </div>
                <div class="botonesAccionCompra">
                    <a href="./pages/detalleProducto.html" class="btn btn-dark" value="Ver detalle" onclick="SaveIdProd(${producto.id});">Ver detalle</a>
                    <button class="btn btn-dark" onclick="SaveIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</button>
                </div>
            </div>
        </div>
        `;
    };

    function generarHTMLProductosCarrete(producto) {
    const precioConAumento = Math.round(producto.precio * 1.10);

        return `
            <div class="card" style="width: 18rem;">
                <img src="${producto.imagenUrl1}" class="card-img-top" alt="${producto.textoProducto}">
                <div class="card-body">
                    <h5 class="card-title">${producto.textoProducto}</h5>
                    <h6>${producto.descuento}</h6>
                    <p class="card-text">${producto.talla}</p>
                    <p class="card-text">${producto.color}</p>
                    <div class="seccionPrecios">
                        <p class="textoTachado">$${precioConAumento}</p>
                        <p class="card-textPrice">$${producto.precio}</p>
                    </div>
                    <a href="./pages/detalleProducto.html" class="btn btn-dark" onclick="SaveIdProd(${producto.id});"> Ver detalle</a>
                    <button class="btn btn-dark" onclick="SaveIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</button>
                </div>
            </div>
        `;
    };

    function desplegarProductos(productos, elemento) {
        const htmlProductos = productos.map(producto => generarHTMLProducto(producto)).join('');
        elemento? elemento.innerHTML = htmlProductos: null;
    };

    function desplegarProdsCarrete (productos, elemento) {
        const htmlProductos = productos.map(producto => generarHTMLProductosCarrete(producto)).join('');
        elemento? elemento.innerHTML = htmlProductos: null;
    };
    
    desplegarProductos(productos, document.getElementById('listaProductosPagPpal'));
    desplegarProdsCarrete(productosCarrete, document.getElementById('carrete_recomendados'));

    const prodsPagPpal = productos.concat(productosCarrete); 

    localStorage.setItem('prodsPagPpal', JSON.stringify(prodsPagPpal));

    //Filtros por genero de la pag ppal:

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
        window.open('./pages/detalleFiltrados.html')
    }
    
    const botonFiltroMujer = document.getElementById('botonFiltroMujer');
    const botonFiltroHombre = document.getElementById('botonFiltroHombre');
    
    function accionesProd() {
        const genero = this.dataset.genre;
        actualizarProdsFiltYSaveLS(genero);
        console.log(prodsFiltrados);
        setTimeout(abrirPagDetalle, 1000);
    }
    
    botonFiltroMujer.addEventListener("click", accionesProd);
    botonFiltroHombre.addEventListener("click", accionesProd);
    
});