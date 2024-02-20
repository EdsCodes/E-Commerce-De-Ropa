document.addEventListener('DOMContentLoaded', function () {
    let idCounter = 0;
    
    const productos = [];

    function resetFormulario() {
        document.querySelector('.formularioControl').reset();
    }

    class Producto {
        constructor(imagenUrl, precio, textoProducto, color, genero) {
            this.id = ++idCounter;
            this.imagenUrl = imagenUrl;
            this.precio = precio;
            this.textoProducto = textoProducto;
            this.color = color;
            this.genero = genero;
        }
    }

    document.getElementById('BtnControl').addEventListener('click', function (event) {
        event.preventDefault();

        const imagenUrl = document.querySelector('.UrlImagen').value;
        const precio = document.querySelector('.precio').value;
        const textoProducto = document.querySelector('.textoProducto').value;
        const color = document.querySelector('.colorPrendaIngresada').value;
        const genero = document.querySelector('[name="gender"]:checked').value;

        const nuevoProducto = new Producto(imagenUrl, precio, textoProducto, color, genero);

        productos.push(nuevoProducto);

        guardarProductosLS(productos);

        resetFormulario();
    });

    function eliminarDatos() {
        localStorage.removeItem("productos");
        alert("Datos borrados correctamente");
    }

    document.getElementById("borrarDatosLS").addEventListener("click", eliminarDatos);


    function guardarProductosLS(productos) {
        localStorage.setItem("productos", JSON.stringify(productos));
    }
});


// URLS de imagenes para probar el funcionamiento del sitio:

// ./multi/mujer_con_jean_roto.jpeg
// ./multi/mujer_blusa_beige.jpeg
// ./multi/saco_gris_hombre.jpeg
// ./multi/buzo_rojo_hombre.jpeg