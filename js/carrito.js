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
    renderBotonCarrito();
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id !== id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    Swal.fire({
        position:"center",
        icon: "error",
        text: "Producto eliminado del carrito!",
        showConfirmButton: false,
        timer: 1000
    });
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    return carrito.reduce((acumulador, item) => acumulador + item.precio, 0);
}

const eliminarCarrito = () => {
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
            renderCarrito();
            renderBotonCarrito();
            Swal.fire({
                title: "Guardado!",
                text: "Estas a un solo paso de tener tus productos favoritos!",
                icon: "success"
            });
        }
    });
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Para finalizar, por favor confirma tu compra",
        text: "Total a pagar: $" + sumaTotalProductos() + " pesos.",
        imageUrl: "../images/logo3.png",
        imageWidth: 50,
        imageAlt: "Me lo Llevo Store",
        showCancelButton: true,
        confirmButtonColor: "#ff4500",
        cancelButtonColor: "#113946",
        confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem("carrito");
                Swal.fire({
                    title: "Gracias por tu compra!",
                    text: "Tu pedido será enviado a la direccion registrada.",
                    icon: "success"
                });
            }
        });
}

const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    return carrito.length;
}


function renderCarrito() {
    const carrito = obtenerCarritoLS();
    let contenido = "";

    if (cantTotalProductos() > 0) {
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
                            <img src="${producto.imagenUrl1}" alt="${producto.textoProducto}">
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
                    <p class="total_articulovta">Sub Total: $${sumaTotalProductos()}</p>
                    <label for="Codigo de descuento:"></label>
                    <input class="codigoDescuento" type="any" name="codigoDescuento" id="codigoDescuento" placeholder="    Codigo Descuento">
                    <button title="Validar codigo" onclick="renderCarrito()">Validar código</button>
                </div>
                <div class="campoCodDescuento">
                    <p class="total_articulovta">Total: $${validarCodigoProm()} </p>
                </div>
                <div class="accionTotalCarrito">
                    <button class="btn btn-sm" onclick="eliminarCarrito()" title="Borrar carrito"><b>Borrar Carrito</b></button>
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

    document.getElementById("contenidoGralCarrito").innerHTML = contenido;
}

let codigoDescuentoAplicado = false;

function validarCodigoProm() {
    const codigoDescuento = document.querySelector('.codigoDescuento');

    let totalConDescuento = 0;

    if (codigoDescuentoAplicado) {
        Swal.fire({
            title: "Refresca la pagina e ingresa nuevamente tu codigo de descuento!",
            text: "Solo puedes ingresar un codigo por compra",
            icon: "warning"
        });
        totalConDescuento = sumaTotalProductos();
        return totalConDescuento;
    }

    if (codigoDescuento === null || codigoDescuento === "") {
        totalConDescuento = sumaTotalProductos();
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
        }

        totalConDescuento = sumaTotalProductos() - (sumaTotalProductos() * porcentajeDescuento);

        
        codigoDescuentoAplicado = true;
    }
    return totalConDescuento;
}

const totalConDescto = validarCodigoProm();

const finalizarCompra = () => {
    const mensaje = codigoDescuentoAplicado ? `tu cuenta total con descuento es $${totalConDescto} pesos.` : `tu cuenta total es $${totalConDescto} pesos.`;
    Swal.fire({
        title: "Muchas Gracias por tu Compra, vuelve pronto!",
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
                title: "listo!",
                text: "Tu compra será enviada a la dirección registrada.",
                icon: "success"
            });
        }
    });
}

renderCarrito();
renderBotonCarrito();