function obtenerprodsPagPpalLS() {
    return JSON.parse(localStorage.getItem("prodsPagPpal")) || [];
}

const encontrarIdProd = (id) => {
    localStorage.setItem("idProducto", JSON.stringify(id));
}

function obtenerIdProductoLS() {
    return JSON.parse(localStorage.getItem("idProducto")) || 0;
}

const verProducto = () => {
    const id = obtenerIdProductoLS();
    const productos = obtenerprodsPagPpalLS();
    const producto = productos.find(item => item.id === id);
    return producto;
}

function renderProducto() {
    const producto = verProducto(); 
    let contenido = '';
    let precioConAumento = 0;
    if(producto){
        precioConAumento = Math.round(producto.precio * 1.10);
    }
    if (producto) {
        contenido = `
            <div class="tituloArticuloVta col-12"> 
                <h1 class="articulo">${producto.textoProducto}</h1>
                <p class="ref_articulo">REF: ${producto.ref}</p>
            </div>
            <div class="columnaIzqCompras col-sm-12 col-md-12 col-lg-6">
                <div class="imgs_vta">
                    <div class="grupoImgsA">
                        <img src="${producto.imagenUrl1}" alt="foto 1 articulo seleccionado"> 
                        <img src="${producto.imagenUrl2}" alt="foto 2 articulo seleccionado"> 
                    </div>
                    <div class="grupoImgsB">
                        <img src="${producto.imagenUrl3}" alt="foto 3 articulo seleccionado"> 
                        <img src="${producto.imagenUrl4}" alt="foto 4 articulo seleccionado">
                    </div>
                </div>
                <div class="botones_vta">
                    <input type="button" value="Descripción">
                    <input type="button" value="Especificaciones">
                    <input type="button" value="Completa tu look">
                </div>
                <p class="descripcion_productovta">${producto.descripcion}</p>
            </div>
            <div class="columnaDerCompras col-sm-12 col-md-12 col-lg-6">
                <div class ="preciosDetalleProd"><p class="textoTachado">$${precioConAumento}</p>
                <p class="precio_articulovta">$${producto.precio}</p></div>
                <div class="seccionColorProd">
                    <p class="tittleColores">Colores:</p>
                    <div class="color-selector">
                        <input type="radio" name="color" id="color-red" class="color-input" value="red">
                        <label for="color-red" class="color-label" style="background-color: black;"></label>
                
                        <input type="radio" name="color" id="color-blue" class="color-input" value="blue">
                        <label for="color-blue" class="color-label" style="background-color: darkgray;"></label>
                        
                        <input type="radio" name="color" id="color-green" class="color-input" value="green">
                        <label for="color-green" class="color-label" style="background-color: green;"></label>
                    </div>
                </div>
                <div class="seccionTallaProd">
                    <p>TALLA: Si tienes dudas acerca de tu talla consulta nuestra <a href="../pages/guiatallas.html">guía de tallas</a></p>
                    <div class="botonestallacompra">
                        <input type="button" value="S"/> 
                        <input type="button" value="M"/> 
                        <input type="button" value="L"/> 
                        <input type="button" value="XL"/> 
                    </div>
                </div>
                <div class="bloqueCantidadLogos">
                    <div class="seccionCantidadProd">
                        <p>CANTIDAD: <input class="quantity" id="id_form-0-quantity" min="0" name="form-0-quantity" value="1" type="number"></p>
                        <div class="botonesAccionCompra">
                            <input type="button" id="anadirCarrito" onclick="agregarProdCarrito()" value="Añadir al carrito">
                        </div> 
                    </div>
                    <div class="areaTextoLogosVrAgreg">
                        <div class="textoLogosVrAgreg">
                            <p class="textoLogos"><img src="../multi/truck.ico">Envíos gratis para compras mayores a $200.000</p>
                        </div>
                        <div class="textoLogosVrAgreg">
                            <p class="textoLogos"><img src="../multi/amex_logo.ico">Compras seguras y diversos medios de pago</p>
                        </div>  
                        <div class="textoLogosVrAgreg">
                            <p class="textoLogos"><img src="../multi/calidad.ico">Calidad garantizada en todos tus productos</p>
                        </div>
                    </div>
                </div>
            </div>
            `;
            let vista=document.getElementById('vistaDetalleProd');

            if (vista){
                vista.innerHTML = contenido;
            }
    }
}

renderProducto();