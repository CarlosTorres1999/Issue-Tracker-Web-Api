//Declaracion de variables

let updateNombre;
let updateApellido;
let idSelected;
let createNombre;
let createApellido;
let createUserName;
let createPassword;
let createRole;
let createConfirmPassword;

/**
 * Inicializa las variables 
 */
const init = () => {
    if (
        localStorage.getItem("token") === null
        || localStorage.getItem("Logged") == null
        || localStorage.getItem("token") == ""
        || localStorage.getItem("Logged") === ""
        || JSON.parse(localStorage.getItem("Logged")).Role != "Admin"
        
    ) {
        window.location.assign("../Index.html");
    }
    updateNombre = document.getElementById("updateNombre");
    updateApellido = document.querySelector("#updateApellido");
    createNombre = document.getElementById("createNombre");
    createApellido = document.getElementById("createApellido");
    createUserName = document.getElementById("createUserName");
    createPassword = document.getElementById("createPassword");
    createRole = document.getElementById("createRole");
    createConfirmPassword = document.getElementById("createConfirmPassword");
    fnListarUsuarios();

}

/**
 * Se encarga de listar a los usuarios
 */
const fnListarUsuarios = () => {
    let user = JSON.parse(localStorage.getItem("Logged"));
    let token = JSON.parse(localStorage.getItem("token"));
    getUsers(user.Id, token.access_token)
        .then(result => {
            let usuarios = JSON.parse(result);
            console.log(usuarios);
            let buff = [];
            if (usuarios.length === 0) {
                buff.push(`<h4> Vacio </h4>`);
            } else {
                buff.push(`<div class="table-responsive">`);
                buff.push(`<table class="table align-middle table-bordered">`);
                buff.push(`<thead>`);
                buff.push(`<tr>`);
                buff.push(`<th scope="col">Id</th>`);
                buff.push(`<th scope="col">Nombres</th>`);
                buff.push(`<th scope="col">Apellido</th>`);
                buff.push(`<th scope="col">UserName</th>`);
                buff.push(`<th scope="col">Role</th>`);
                buff.push(`<th scope="col">Accion</th>`);
                buff.push(`</tr>`);
                buff.push(`</thead>`);
                for (let user of usuarios) {
                    buff.push(`<tbody>`);
                    buff.push(`<tr>`);
                    buff.push(`<td>${user.Id}</th>`);
                    buff.push(`<td>${user.Nombre}</th>`);
                    buff.push(`<td>${user.Apellido}</td>`);
                    buff.push(`<td>${user.Email}</td>`);
                    buff.push(`<td>${user.Role}</td>`);
                    buff.push(`<td>`);
                    buff.push(`<div class = "botones">`);
                    buff.push(`<button class = "btn btn-danger" onclick ="fnBorrarUsuario('${user.Id}')">Borrar</button>`);
                    buff.push(`<button class = "btn btn-primary" onclick = "fnSelect('${user.Id}','${user.Nombre}','${user.Apellido}')"> Actualizar </button>`);
                    buff.push(`</div>`);
                    buff.push(`</tbody>`);
                }
            }
            document.getElementById('tabla-usuarios').innerHTML = buff.join("\n");


        })
        .catch(error => console.log(error));
}

/**
 * La relacion Ticket recibe dos claves foraneas, esta funcion, le pasa null a las claves foraneas
 * @param {string} id El id del usuario
 */
const fnAnularTicket = (id) => {
    let token = JSON.parse(localStorage.getItem("token"));
    getUserById(id, token.access_token)
    .then(u => {
        let user = JSON.parse(u);
        filtrarTicketPorUserName(user.Email, token.access_token)
        .then(t => {
            let tickets = JSON.parse(t);
            if(tickets.length === 0) return;

            for(let ticket of tickets){
                if(ticket.Creador === user.Email){
                    ticket.Creador = null;
                }
                if(ticket.Responsable === user.Email){
                    ticket.Responsable = null;
                }
                updateTicket(ticket.Id, token.access_token, ticket)
                .catch(error => console.log(error));
            }
        });
    });
}

/**
 * borra a los usuarios sin tener en cuenta la relacion con los tickets
 * @param {string} id 
 */
const fnBorrar = (id) => {
    let band = window.confirm("Desea Borrar Al Usuario?");
    if(band){
        let token = JSON.parse(localStorage.getItem("token"));
        deleteUser(id, token.access_token)
        .then(result => {
            console.log(result);
        })
        .finally(() => fnListarUsuarios());
    }

}

/**
 * Borra teniendo en cuenta la relacion foranea con los tickets
 * @param {string} id 
 */
const fnBorrarUsuario = (id) => {
    fnAnularTicket(id);
    fnBorrar(id);
}
    const fnSelect = (id, nombre, apellido) => {
        if (document.getElementById("oculto")) {
            document.getElementById("oculto").id = "form-visible-registro";
        }
        updateNombre.value = nombre;
        updateApellido.value = apellido;
        idSelected = id;
    }

    /**
     * Para editar un usuario, solo permite editar el nombre y el apellido
     */
    const fnActualizar = () => {
        let token = JSON.parse(localStorage.getItem("token"));
        let userUpdate = new UserUpdateDTO(idSelected, updateNombre.value, updateApellido.value);
        updateUser(idSelected, token.access_token, userUpdate)
            .then(() => {
                console.log("peticion hecha")
            }).catch(error => {
                console.log("error al actualizar", error);
            }).finally(() => {
                document.getElementById("form-visible-registro").id = "oculto";
                fnListarUsuarios();
                console.log("usuario actualizado");
            })

    }


    /**
     * Hace invisible el formulario para editar al usuario
     */
    const fnCancelarEdicion = () => {
        if (document.getElementById("form-visible-registro")) {
            document.getElementById("form-visible-registro").id = "oculto";
        }
    }

    /**
     * Se encarga de Cerrar la sesion
     */
    const fnLogOut = () => {
        localStorage.clear();
        location.assign("../Index.html");
    }

    /**
     * Se encarga de de crear un nuevo usuario, pero permite seleccionar un role
     */
    const fnCrearNuevoUsuario = () => {
        let user = new UserDTORequest(
            createNombre.value,
            createApellido.value,
            createUserName.value,
            createPassword.value,
            createRole.value,
            createConfirmPassword.value
        )
        registerUser(user)
            .then((result) => {
                console.log(result);
                console.log("Registrado al Usuario con exito");
                alert("Registrado con exito");
            }).catch(error => {
                console.log("error al registrar", error);
                alert("error al registrar, verifica si los campos estan correctamente validados");
            })
            .finally(() => {
                fnListarUsuarios();
            });
    }

    /**
     * despues de crear al usuario, lo lista.
     */
    const fnCrearYListar = () => {
        fnCrearNuevoUsuario();
    }