//Declaracion de variables

let usuarioNombre;
let usuarioApellido;
let usuarioUserName;
let usuarioPassword;
let usuarioConfirmPassword;
let inputUser;
let passwordLogin;

/**
 * Funcion Encargada de iniciar las variables al cargar la pagina
 */
const onInit = () => {
    usuarioNombre = document.getElementById("usuario-nombre");
    usuarioApellido = document.getElementById("usuario-apellido");
    usuarioUserName = document.getElementById("usuario-user");
    usuarioPassword = document.getElementById("usuario-password");
    usuarioConfirmPassword = document.getElementById("usuario-confirm-password");
    inputUser = document.getElementById("inputUser");
    passwordLogin = document.getElementById("password-login");
}

/**
 * Funcion Encargada de Registrar a un usuario
 */
const fnRegistrarse = () => {
    fnBorrarWarningsRegistro();
    fnValidar();
    let user = new UserDTORequest(
        usuarioNombre.value, 
        usuarioApellido.value, 
        usuarioUserName.value, 
        usuarioPassword.value, 
        "User", 
        usuarioConfirmPassword.value

    );
    registerUser(user)
    .then(()=> {
        console.log("Registrado al usuario");

    })
    .catch((error) => {
        console.log(error);
        alert("error al loguear al usuario")
    });
}

/**
 * Funcion que se encarga de validar a los usuarios
 */
const fnValidar = () => {

    if(usuarioNombre.value.length === 0){
        document.getElementById("validar-form-nombre").style ="color:red;";
    }

    if(usuarioApellido.value.length === 0){
        document.getElementById("validar-form-apellido").style = "color:red;";
    }
    if (usuarioUserName.value.length === 0){
        document.getElementById("validar-form-userName").value = "UserName Requerido";
        document.getElementById("validar-form-userName").style = "color:red;";
    }
    if(usuarioPassword.value.length === 0){
        document.getElementById("validar-form-password").value = "Password Requerido";
        document.getElementById("validar-form-password").style = "color:red;";
    }

    if(usuarioPassword.value.length < 6){
        document.getElementById("validar-form-password").value = "Debe Tener minimo 6 caracteres";
        document.getElementById("validar-form-password").style = "color:red;";
    }

    if(usuarioConfirmPassword.value != usuarioPassword.value){
        document.getElementById("validar-form-confirm-password").value = "No es igual con el password";
        document.getElementById("validar-form-confirm-password").style = "color:red;";

    }
    
    if(usuarioConfirmPassword.value.length === 0){
        document.getElementById("validar-form-confirm-password").value = "Campo Requerido";
        document.getElementById("validar-form-confirm-password").style = "color:red;";
    }

}

/**
 * Borra los warnings
 */
const fnBorrarWarningsRegistro = () => {
    document.getElementById("validar-form-nombre").style ="display:none;";
    document.getElementById("validar-form-apellido").style ="display:none;";
    document.getElementById("validar-form-userName").style ="display:none;";
    document.getElementById("validar-form-password").style ="display:none;";
    document.getElementById("validar-form-confirm-password").style ="display:none;";
}

/**
 * Se encarga del login
 */
const fnLogin  = () => {


    fnGetToken(inputUser.value, passwordLogin.value)
    .then(response => response.text())
    .then(result => {
        console.log("token obtenido");
        localStorage.setItem("token", result);
    })
    .catch(error => {
        console.log("error al obtener el token");
        alert("Error al obtener el Token, verifica las credenciales");
    })
    .finally(() => {
        let token = JSON.parse(localStorage.getItem("token"));
        getUserByUserName(token.userName, token.access_token)
        .then(r => {
            localStorage.setItem("Logged", r);
        })
        .catch(e => {
            console.log("error al obtener el usuario",e);
            alert("Error al obtener el usuario logueado, verifica las credenciales :(");
        })
        .finally(() => {
            let user = JSON.parse(localStorage.getItem("Logged"));
            if(user.Role === "Admin"){
                alert("Logueado como Administrador");
                location.assign("/pages/UserDashBoard.html");
            }
            if(user.Role === "User"){
                alert("Logueado como Usuario Normal");
                location.assign("/pages/TicketDashBoard.html");
            }
        });
    }) 
} 

