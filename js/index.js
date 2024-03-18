document.addEventListener('DOMContentLoaded', async function () {
    
    try {
        async function consumirApiProductos() {
            try {
                const respuesta = await fetch('./js/productos.json');
                const datos = await respuesta.json();
                return datos;
            } catch (error) {
                console.error("Error al consumir la primera API:", error);
                return [];
            }
        }

        async function consumirApiProductosCarrete() {
            try {
                const respuesta = await fetch('./js/productosCarrete.json');
                const datos = await respuesta.json();
                return datos;
            } catch (error) {
                console.error("Error al consumir la segunda API:", error);
                return [];
            }
        }

        const [productos, productosCarrete] = await Promise.all([consumirApiProductos(), consumirApiProductosCarrete()]);

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
                        <a href="../pages/detalleProducto.html" class="btn btn-dark" value="Ver detalle" onclick="encontrarIdProd(${producto.id});">Ver detalle</a>
                        <a class="btn btn-dark" onclick="encontrarIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</a>
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
                        <a href="../pages/detalleProducto.html" class="btn btn-dark" onclick="encontrarIdProd(${producto.id});"> Ver detalle</a>
                        <a class="btn btn-dark" onclick="encontrarIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</a>
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

        localStorage.setItem('prodsPagPpal', JSON.stringify(prodsPagPpal));

        function abrirPagDetalle () {
            window.open('../pages/detalleFiltrados.html')
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

    
    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
});document.addEventListener('DOMContentLoaded', async function () {
    
    try {
        async function consumirApiProductos() {
            try {
                const respuesta = await fetch('./js/productos.json');
                const datos = await respuesta.json();
                return datos;
            } catch (error) {
                console.error("Error al consumir la primera API:", error);
                return [];
            }
        }

        async function consumirApiProductosCarrete() {
            try {
                const respuesta = await fetch('./js/productosCarrete.json');
                const datos = await respuesta.json();
                return datos;
            } catch (error) {
                console.error("Error al consumir la segunda API:", error);
                return [];
            }
        }

        const [productos, productosCarrete] = await Promise.all([consumirApiProductos(), consumirApiProductosCarrete()]);

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
                        <a href="../pages/detalleProducto.html" class="btn btn-dark" value="Ver detalle" onclick="encontrarIdProd(${producto.id});">Ver detalle</a>
                        <a class="btn btn-dark" onclick="encontrarIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</a>
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
                        <a href="../pages/detalleProducto.html" class="btn btn-dark" onclick="encontrarIdProd(${producto.id});"> Ver detalle</a>
                        <a class="btn btn-dark" onclick="encontrarIdProd(${producto.id}); agregarProdCarrito();">Añadir al carrito</a>
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

        localStorage.setItem('prodsPagPpal', JSON.stringify(prodsPagPpal));

        function abrirPagDetalle () {
            window.open('../pages/detalleFiltrados.html')
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

    
    } catch (error) {
        console.error("Error al cargar la página:", error);
    }
});
