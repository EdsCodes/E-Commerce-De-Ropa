function obtenerprodsPagPpalLS() {
    return JSON.parse(localStorage.getItem("prodsPagPpal")) || [];
}

const prodsPagPpal = obtenerprodsPagPpalLS();

const guardarCarritoLS = (prods) => {
    localStorage.setItem("carrito", JSON.stringify(prods));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function obtenerIdProductoLS() {
    return JSON.parse(localStorage.getItem("idProducto")) || 0;
}

function buscarProd() {
    const id = obtenerIdProductoLS();
    const producto = prodsPagPpal.find(item => item.id === id);
    return producto;
}

const agregarProdCarrito = () => {
    const producto = buscarProd();
    const carrito = obtenerCarritoLS();
    carrito.push(producto);
    guardarCarritoLS(carrito);
    desplegarBotonCarrito();
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id !== id);
    guardarCarritoLS(carritoActualizado);
    desplegarGraficosCarrito();
    desplegarBotonCarrito();
    Swal.fire({
        position:"center",
        icon: "error",
        text: "Producto eliminado del carrito!",
        showConfirmButton: false,
        timer: 1000
    });
}

const sumaVrTotalProds = () => {
    const carrito = obtenerCarritoLS();
    return carrito.reduce((acumulador, item) => acumulador + item.precio, 0);
}

const borrarTodoCarrito = () => {
    Swal.fire({
        title: "Deseas eliminar todo tu carrito de compras?",
        text: "Por favor, confirmar.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#113946",
        cancelButtonColor: "#ff4500",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "no, deseo seguir comprando!"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            Swal.fire({
                title: "Carrito Eliminado!",
                text: "Tus productos fueron eliminados correctamente de tu carrito de compras!",
                icon: "success",
            });
        } else {
            desplegarGraficosCarrito();
            desplegarBotonCarrito();
            Swal.fire({
                title: "Guardado!",
                text: "Estas a un solo paso de tener tus productos favoritos!",
                icon: "success"
            });
        }
    });
}

const desplegarBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    return carrito.length;
}


function desplegarGraficosCarrito() {
    const carrito = obtenerCarritoLS();
    let contenido = "";
    if (carrito && cantTotalProductos() > 0) {
        contenido = `
        <div class="tituloArticuloVta col-12"> 
            <h1 class="articulo">Tu carrito</h1>
        </div>
        `;

        for (const producto of carrito) {
            contenido += `
                <div class="columnaIzqCarrito col-sm-6 col-md-4 col-lg-4" id="ProductosCarrito">
                    <div class="itemCarrito">
                        <div class="ImgProducto_carrito">
                            <img src=".${producto.imagenUrl1}" alt="${producto.textoProducto}">
                        </div>
                        <div class="AccionProdCar">    
                            <h4>${producto.textoProducto}</h4>
                            <p>Total: $${producto.precio}  (-10% OFF)</p>
                            <div class="botonBorrProd_carrito">
                                <button class="btn btn-light botonBorrProd_carrito" id="borrarProdCarrito" onclick="eliminarProductoCarrito(${producto.id})" type="button" value= "Borrar"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        contenido += `
            <div class="columnaDerCompras col-sm-6 col-md-8 col-lg-8">
            <h2 class="resumen_articulovta">Resumen de tu compra</h2>
                <div class="campoCodDescuento">
                    <p class="total_articulovta">Sub Total: $${sumaVrTotalProds()}</p>
                    <label for="Codigo de descuento:"></label>
                    <input class="codigoDescuento" type="any" name="codigoDescuento" id="codigoDescuento" placeholder="    Codigo Descuento">
                    <button title="Validar codigo" onclick="desplegarGraficosCarrito()">Validar código</button>
                </div>
                <div class="campoCodDescuento">
                    <p class="total_articulovta" id="vrTotalProductos">Total: $${validarCodigoProm()}</p>
                </div>
                <div class="accionTotalCarrito">
                    <button class="btn btn-sm" onclick="borrarTodoCarrito()" title="Borrar carrito"><b>Borrar Carrito</b></button>
                    <button class="btn btn-sm" onclick="finalizarCompra()" title="Finalizar Compra"><b>Finalizar Compra</b></button>
                </div> 
                <div class="imgMediosPago">
                    <img src="../multi/payments_checkout.png">
                </div>
                <div class="bloqueCantidadLogos">
                    <div class="areaTextoLogosVrAgreg">
                        <div class="textoLogosVrAgreg">
                            <p class="textoLogos"><img src="../multi/truck.ico">Envios gratis para compras mayores a $200.000</p>
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
    } else {
        contenido = `<h1 class="text-center" style="margin: 230px 0 230px 0">Tu carrito de compras se encuentra vacío!</h1>`;
    }
    let contenidoCarrito = document.getElementById("contenidoGralCarrito") 
    contenidoCarrito? contenidoCarrito.innerHTML = contenido: null;
}

let codigoDescuentoAplicado = false;

function validarCodigoProm() {
    const codigoDescuento = document.querySelector('.codigoDescuento');
    let totalConDescuento = 0;

    if (codigoDescuentoAplicado) {
        Swal.fire({
            title: "¡Refresca la página e ingresa nuevamente tu código de descuento!",
            text: "Solo puedes ingresar un código por compra",
            icon: "warning"
        });
        totalConDescuento = sumaVrTotalProds();
        return totalConDescuento;
    }

    if (!codigoDescuento || codigoDescuento.value === "") {
        totalConDescuento = sumaVrTotalProds();
        codigoDescuentoAplicado = false;
    } else {
        const valorCodigo = codigoDescuento.value.toUpperCase();
        let porcentajeDescuento = 0;

        switch (valorCodigo) {
            case "MELOLLEVO123":
                porcentajeDescuento = 0.04;
                break;
            case "COMPRAYA123":
                porcentajeDescuento = 0.06;
                break;
            case "LLEVATELO123":
                porcentajeDescuento = 0.08;
                break;
            case "COMPRA456":
                porcentajeDescuento = 0.10;
                break;
            default:
            Swal.fire({
                title: "¡Error!",
                text: "Por favor ingresa un codigo de descuento correcto.",
                icon: "warning"
            });
        }

        totalConDescuento = sumaVrTotalProds() - (sumaVrTotalProds() * porcentajeDescuento);
        codigoDescuentoAplicado = true;
    }
    return totalConDescuento;
}

const finalizarCompra = () => {
    const totalConDescto = document.getElementById('vrTotalProductos').innerText;
    const mensaje = codigoDescuentoAplicado ? `Tu valor a pagar es en ${totalConDescto} pesos.` : `Tu cuenta total es $${sumaVrTotalProds()} pesos.`;

    Swal.fire({
        title: "¡Muchas gracias por tu compra, vuelve pronto!",
        text: mensaje,
        imageUrl: "../images/logo3.png",
        imageWidth: 50,
        imageAlt: "Me Lo Llevo Store",
        showCancelButton: true,
        confirmButtonColor: "#ff4500",
        cancelButtonColor: "#113946",
        confirmButtonText: "Aceptar"
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito");
            Swal.fire({
                title: "¡Listo!",
                text: "Tu compra será enviada a la dirección registrada.",
                icon: "success"
            });
        }
    });
}

desplegarGraficosCarrito();
desplegarBotonCarrito();