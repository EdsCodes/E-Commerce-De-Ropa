 //----------------PAGINA: INICIA SESION------------------//

    // --- Formulario de registro:

    var listaClientes = [];

    class Cliente {
        constructor(nombre, email, telefono, direccion, contrasenaRegistro, genero, fechaNacimiento, ciudad, aceptaTerminos) {
            this.idCliente = listaClientes.length + 1;
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

            if (fechaNacimiento.getMonth() > fechaActual.getMonth() || 
            (fechaNacimiento.getMonth() === fechaActual.getMonth() && fechaNacimiento.getDate() > fechaActual.getDate())
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
                    return "Bono de bienvenida del 15% de descuento para la 1era compra.";
                case 2:
                    return "El envío de la primera compra es totalmente gratuito.";
                case 3:
                    return "Cupón único del 10% adicional para la 1era compra.";
                case 4:
                    return "Para 1er pedido mayor a $200.000, un regalo sorpresa.";
            }
        }
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
            alert("Debes aceptar los terminos y condiciones para continuar")
            return;
        }
        
        var fechaNacUsuario = new Date(fechaNacimiento);

        if (isNaN(fechaNacUsuario.getTime()) || fechaNacUsuario.getFullYear() > new Date().getFullYear() - 18){
            alert("Por favor, ingresa una fecha de nacimiento válida.");
            console.error("Registro & id no válidos");
            return;
        } 
        
        // Duda, porque el sigte codigo ternario no funca??, no valida el return para detener la ejecucion del codigo...
        // (isNaN(fechaNacUsuario.getTime()) || fechaNacUsuario.getFullYear() > new Date().getFullYear() - 18) ? (alert("Por favor, ingresa una fecha de nacimiento válida."), console.error("Registro & id no válidos"), return) : null;

        const nuevoCliente = new Cliente(nombre, email, telefono, direccion, contrasenaRegistro, genero, fechaNacimiento, ciudad, aceptaTerminos);
        
        listaClientes.push(nuevoCliente);
        
        alert("Bienvenid@, " + nuevoCliente.premioSorpresaGanado);
        console.table(listaClientes);
        console.log("Fecha de actualización de registro: " + new Date());

        resetFormulario();
    });

    // Sistema de "login" provisional y muuuuy inseguro jajaja... para aplicar el método de búsqueda find (mientras aprendemos AJAX y fetch), consiste en buscar el dato entre los datos de clientes (objetos) registrados en el array [listaClientes], compararlos, y si son iguales salta alert de bienvenido.

        document.getElementById('botonLogin').addEventListener('click', function (event) {
        event.preventDefault();

        var emailUsuarioRegistrado = document.querySelector('[name="emailUsuarioRegistrado"]').value;
        var contrasena = document.querySelector('[class="password"]').value;

        var usuarioEncontrado = listaClientes.find(function (cliente) {
            return cliente.email === emailUsuarioRegistrado && cliente.contrasenaRegistro === contrasena;
        });

        if (usuarioEncontrado) {
            alert("Bienvenido de nuevo " + usuarioEncontrado.nombre);
            return;
        } else {
            alert("Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.");
        }
        
        resetFormulario();
    });

    //sistema provisional de ingreso a pagina de admin de productos y otros del sitio. al INGRESAR LOS SIGTES DATOS SE INGRESA A LA PAG DE ADMIN DEL SITIO (PROVISIONAL) <!--NOTA: Se trabajara en panel de control para añadir o quitar productos y para mostrar informes de clientes, de productos, añadir o quitar inventario, controlar promociones, etc... pero para mas adelante...-->

    const emailAdmin = "admin@gmail.com";
    const contrasenaAdmin = "Admin123*";

    function ingresarComoAdmin() {
    const emailAdminRegistrado = document.getElementById('email').value;
    const contrasenaAdminReg = document.getElementById('password').value;

        while (emailAdminRegistrado === emailAdmin && contrasenaAdminReg === contrasenaAdmin){
            alert("Bienvenido, admin");
            window.open("../pages/control.html", "_blank");
            return;
        }
    }

    document.getElementById('botonLogin').addEventListener('click', function() {
    ingresarComoAdmin();
    });

    function resetFormulario() {
        document.querySelector('.formularioRegistro').reset();
    }
