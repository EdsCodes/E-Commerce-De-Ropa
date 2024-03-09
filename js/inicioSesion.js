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
            this.beneficioGanado = this.beneficioGanado();
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

        beneficioGanado() {
            function aleatorio(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            switch (aleatorio(1, 3)) {
                case 1:
                    Swal.fire({
                        title: "Felicidades "+ this.nombre,
                        text: "Si tu pedido es mayor a $200.000, recibiras en tu paquete un regalo sorpresa.",
                        icon: "success"
                    });
                    return "regalo sorpresa";
                case 2:
                    Swal.fire({
                        title: "Felicidades "+ this.nombre,
                        text: "Acercate a una de nuestras tiendas con tu documento, recibiras un regalo de bienvenida :)",
                        icon: "success"
                    });
                    return "regalo de bienvenida en tienda";
                case 3:
                    Swal.fire({
                        title: "Felicidades "+ this.nombre,
                        text: "Si llevas a uno de tus amig@s a nuestras tiendas, recibiras un descuento del 4% adicional en tu compra",
                        icon: "success"
                    });
                    return "descuento en tienda por referido";
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
        
        console.table(listaClientes);
        console.log("Fecha de actualización de registro: " + new Date());

        resetFormulario();
    });

    // Sistema de "login" provisional y muuuuy inseguro jajaja... para aplicar el método de búsqueda find, consiste en buscar el dato entre los datos de clientes (objetos) registrados en el array [listaClientes], compararlos, y si son iguales salta alert de bienvenido.

        document.getElementById('botonLogin').addEventListener('click', function (event) {
        event.preventDefault();

        var emailUsuarioRegistrado = document.querySelector('[name="emailUsuarioRegistrado"]').value;
        var contrasena = document.querySelector('[class="password"]').value;

        var usuarioEncontrado = listaClientes.find(function (cliente) {
            return cliente.email === emailUsuarioRegistrado && cliente.contrasenaRegistro === contrasena;
        });

        if (usuarioEncontrado) {
            Swal.fire({
                title: "Bienvenido de nuevo " + usuarioEncontrado.nombre,
                text: "Checa las nuevas colecciones que tenemos para ti.",
                icon: "success"
            });
        } else {
            Swal.fire({
                position:"center",
                icon: "error",
                text: "Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.",
                showConfirmButton: false,
                timer: 1000
            });
        }
        
        resetFormulario();
    });
