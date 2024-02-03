
//----------------PAGINA: INICIA SESION------------------//

// ---Formulario de registro:
document.addEventListener('DOMContentLoaded', function () {

    var validacionUsuario = false;
    var opcionPremioSorp = 0;
    var contadorClientes = 0;

    class Cliente {
        constructor(nombre, email, telefono, direccion, contrasenaRegistro, genero, fechaNacimiento, ciudad, aceptaTerminos) {
            this.idCliente = ++contadorClientes;
            this.nombre = nombre;
            this.email = email;
            this.telefono = telefono;
            this.direccion = direccion;
            this.contrasenaRegistro = contrasenaRegistro;
            this.genero = genero;
            this.fechaNacimiento = fechaNacimiento;
            this.edad = this.calcularEdad();
            this.ciudad = ciudad;
            this.aceptaTerminos = aceptaTerminos;
            this.premioSorpresaGanado = this.calcularPremioSorpresa();
        }

        mostrarInformacion() {
            console.log("idCliente: " + this.idCliente, "nombre: " + this.nombre, "email: " + this.email, "telefono: " + this.telefono, "direccion: " + this.direccion, "contrasenaRegistro: " + this.contrasenaRegistro, "genero: " + this.genero, "fechaNacimiento: " + this.fechaNacimiento, "edad: " + this.edad, "ciudad: " + this.ciudad, "aceptaTerminos: " + this.aceptaTerminos);
        }

        calcularEdad() {
            const fechaNacimiento = new Date(this.fechaNacimiento);
            const fechaActual = new Date();
            let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();

            if (
                fechaNacimiento.getMonth() > fechaActual.getMonth() ||
                (fechaNacimiento.getMonth() === fechaActual.getMonth() &&
                    fechaNacimiento.getDate() > fechaActual.getDate())
            ) {
                edad--;
            }

            return edad;
        }

        calcularPremioSorpresa() {
            function aleatorio(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }

            switch (aleatorio(1, 4)) {
                case 1:
                    return "Premio sorpresa: Bono de bienvenida del 15% de descuento para la 1era compra.";
                case 2:
                    return "Premio sorpresa: El envío de la primera compra es totalmente gratuito.";
                case 3:
                    return "Premio sorpresa: Cupón único del 10% adicional para la 1era compra.";
                case 4:
                    return "Premio sorpresa: Para 1er pedido mayor a $200.000, un regalo sorpresa.";
            }
        }
    }

    const listaClientes = [];

    function resetFormulario() {
        document.querySelector('.formularioRegistro').reset();
    }

    document.getElementById('registrarBtn').addEventListener('click', function (event) {
        event.preventDefault();

        const nombre = document.querySelector('.nombreRegistro').value;
        const email = document.querySelector('[name="mailRegistro"]').value;
        const telefono = document.querySelector('[name="phone"]').value;
        const direccion = document.querySelector('[name="direccionCliente"]').value;
        const contrasenaRegistro = document.querySelector('[name="regPassword"]').value;
        const genero = document.querySelector('[name="gender"]:checked').value;
        const fechaNacimiento = document.querySelector('[name="fechaNac"]').value;
        const ciudad = document.querySelector('[name="ciudadRegistro"]').value;
        const aceptaTerminos = document.querySelector('[name="terminos"]').checked;

        if (!aceptaTerminos) {
            alert("Debes aceptar los términos y condiciones para continuar.");
            return;
        }

        var fechaNacUsuario = new Date(fechaNacimiento);

        if (isNaN(fechaNacUsuario.getTime()) || fechaNacUsuario.getFullYear() > new Date().getFullYear() - 18) {
            alert("Por favor, ingresa una fecha de nacimiento válida.");
            console.error("Registro & id no válidos");
            validacionUsuario = false;
            return;
        }

        const nuevoCliente = new Cliente(nombre, email, telefono, direccion, contrasenaRegistro, genero, fechaNacimiento, ciudad, aceptaTerminos);

        listaClientes.push(nuevoCliente);

        alert("Bienvenid@, " + nuevoCliente.premioSorpresaGanado)

        console.table(listaClientes);

        console.log("Fecha de actualización de registro: " + new Date());

        resetFormulario();

        document.getElementById('borrarDatosBtn').addEventListener('click', resetFormulario);
    });

    // ---Formulario de Inicio de sesión:

    document.getElementById('botonLogin').addEventListener('click', function (event) {
        event.preventDefault();

        var emailUsuarioRegistrado = document.querySelector('[name="emailUsuarioRegistrado"]').value;
        var contrasena = document.querySelector('[class="password"]').value;

        console.log("<----------------------------------------------->");
    });
});