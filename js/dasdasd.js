// let botonValidarCodDesc = document.getElementById('BtnValidarCodDesc').addEventListener('click', validarCodDescuento());

// function validarCodDescuento() {
//     const codigoDescuento = document.getElementById('codigoDescuento').value;
//     let totalConDescuento;

//     if (codigoDescuento) {
//         let porcentajeDescuento = 0;

//         switch (codigoDescuento) {
//             case "MELOLLEVO123":
//                 porcentajeDescuento = 0.004;
//                 break;

//             case "COMPRAYA123":
//                 porcentajeDescuento = 0.006;
//                 break;

//             case "LLEVATELO123":
//                 porcentajeDescuento = 0.008;
//                 break;

//             case "COMPRA456":
//                 porcentajeDescuento = 0.010;
//                 break;
//         }

//         totalConDescuento = sumaTotalProductos() - (sumaTotalProductos() * porcentajeDescuento);
//     } else {
//         totalConDescuento = sumaTotalProductos();
//     }

//     return totalConDescuento;
// }



// let botonValidarCodDesc = document.getElementById('codigoDescuento').value;
// botonValidarCodDesc.addEventListener('click', BtnValidarCodDesc());
// botonValidarCodDesc 

// function BtnValidarCodDesc () {

// if (codigoDescuento) {
//     const valorCodigo = codigoDescuento.value;
//     let porcentajeDescuento = 0;

//     switch (valorCodigo) {
//         case "MELOLLEVO123":
//             porcentajeDescuento = 0.004;
//             break;

//         case "COMPRAYA123":
//             porcentajeDescuento = 0.006;
//             break;

//         case "LLEVATELO123":
//             porcentajeDescuento = 0.008;
//             break;

//         case "COMPRA456":
//             porcentajeDescuento = 0.010;
//             break;
//     }

//     totalConDescuento = sumaTotalProductos() - (sumaTotalProductos() * porcentajeDescuento);
// } else {
//     totalConDescuento = sumaTotalProductos();
// }
// };



// sistema provisional de ingreso a pagina de admin de productos y otros del sitio. al INGRESAR LOS SIGTES DATOS SE INGRESA A LA PAG DE ADMIN DEL SITIO (PROVISIONAL) <!--NOTA: Se trabajara en panel de control para añadir o quitar productos y para mostrar informes de clientes, de productos, añadir o quitar inventario, controlar promociones, etc... pero para mas adelante...-->

// const emailAdmin = "admin@gmail.com";
// const contrasenaAdmin = "Admin123*";

// function ingresarComoAdmin() {
// const emailAdminRegistrado = document.getElementById('email').value;
// const contrasenaAdminReg = document.getElementById('password').value;

//     while (emailAdminRegistrado === emailAdmin && contrasenaAdminReg === contrasenaAdmin){
//         alert("Bienvenido, admin");
//         window.open("../pages/control.html", "_blank");
//         return;
//     }
// }

// document.getElementById('botonLogin').addEventListener('click', function() {
// ingresarComoAdmin();
// });

// function resetFormulario() {
//     document.querySelector('.formularioRegistro').reset();
// }