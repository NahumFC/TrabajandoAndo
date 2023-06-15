function validarCorreo() {
    
    let bool = true;

    let boleta = document.getElementById('boleta').value
    let contraseña = document.getElementById('pass').value

    let boletaRX = new RegExp("[0-9]");
    let passRX = new RegExp("[a-zA-Z0-9]")

    if (!boletaRX.test(boleta) && !passRX.test(contraseña)) {

        bool = false
        
    }

    return bool;

}