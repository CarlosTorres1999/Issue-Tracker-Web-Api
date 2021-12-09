


let usuarioNombre;
let usuarioApellido;
let usuarioUserName;
let usuarioPassword;
let usuarioConfirmPassword;
let inputUser;
let passwordLogin;


const onInit = () => {
    usuarioNombre = document.getElementById("usuario-nombre");
    usuarioApellido = document.getElementById("usuario-apellido");
    usuarioUserName = document.getElementById("usuario-user");
    usuarioPassword = document.getElementById("usuario-password");
    usuarioConfirmPassword = document.getElementById("usuario-confirm-password");
    inputUser = document.getElementById("inputUser");
    passwordLogin = document.getElementById("password-login");
}

const fnRegistrarse = () => {
    registerUser(usuarioNombre.value, usuarioApellido.value, usuarioUserName.value, usuarioPassword.value, "User", usuarioConfirmPassword.value); 
    fnBorrarWarningsRegistro();
    fnValidar();
}

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

const fnBorrarWarningsRegistro = () => {
    document.getElementById("validar-form-nombre").style ="display:none;";
    document.getElementById("validar-form-apellido").style ="display:none;";
    document.getElementById("validar-form-userName").style ="display:none;";
    document.getElementById("validar-form-password").style ="display:none;";
    document.getElementById("validar-form-confirm-password").style ="display:none;";
}

const fnLogin  = () => {
    
    fnGetToken(inputUser.value, passwordLogin.value);
    if(verificarLoginValido){
        let tokenObj = JSON.parse(sessionStorage.getItem("Token"));
        console.log(tokenObj);
        obtenerIDUsuarioLoggeado(tokenObj.access_token);
        getUserById(IdUserLogged);
        console.log(IdUserLogged);
        let user = JSON.parse(localStorage.getItem("Usuario-Logueado"));
        console.log(user);
        if(user.role === null){
            alert("No cuenta con los roles necesarios para el inicio de sesion, por favor registrese");
        }

        if(user.role === "Admin"){
            alert("Logueado Como Administrador");
        }

        if(user.role === "User"){
            alert("logueado Como Usuario Normal");
        }
        else {
            alert("Logueado sin Autorizacion");
        }
    }
} 