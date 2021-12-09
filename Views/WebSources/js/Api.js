let verificarLoginValido = false;
let IdUserLogged = "";

const registerUser = (nombre, apellido, email, password, role, confirmPassword) => {
    let user = new UserDTORequest(nombre,apellido, email,password,role, confirmPassword);
    let raw = JSON.stringify(user);
    let settings = {
        "url": "https://localhost:44348/api/Account/Register",
        "type": "POST",
        "data": raw,
        "headers": {
            "Content-Type": "application/json"
          }
    };

    $.ajax(settings).done(function (response) {
        alert("Usuario Registrado");
    }).fail(( error ) => {
        let mensajeError = JSON.parse(error.responseText);
        console.log(mensajeError.Message);
        alert(mensajeError.Message); 
    });
}

const fnGetToken = (userName, password) => {
    let settings = {
        "url": "https://localhost:44348/token",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded"
          },

        "data": {
          "userName:":userName,
          "password":password,
          "grant_type":"password"
        }
      };
      
      $.ajax(settings)
      .fail((error) => {
        
        console.log(error);
        alert("Error al Logear, verifica tus credenciales");
      })
      .done(function (response) {
        
        console.log(response);
      });
}

const obtenerIDUsuarioLoggeado = (token) => {
  let settings = {
    "url": "https://localhost:44348/api/Account/Logged",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": `bearer ${token}`
    },
  };
  
  $.ajax(settings)
  .fail((error) => console.log(error))
  .done(function (response) {
    console.log(response);
  });
}

const getUserById = (id, token) => {
  let settings = {
    "url": `https://localhost:44348/api/Account/User?Id=${id}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Authorization": `bearer ${token}`
    }
  };
  
  $.ajax(settings)
  .fail(error => console.log(error))
  .done(function (response) {
    localStorage.setItem("Usuario-Logueado",JSON.stringify(response));
  });
}