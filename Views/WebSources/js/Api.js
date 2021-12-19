let verificarLoginValido = false;
let IdUserLogged = "";

/**
 * Peticion que se encarga de registrar al usuario
 * @param {UserDTORequest} user 
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const registerUser = async (user) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify(user);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://localhost:44348/api/Account/Register", requestOptions);
  return await response.text();
}
/**
 * funcion para obtener el token de autorizacion
 * @param {string} userName el nombre de usuario 
 * @param {string} password la contraseña del usuario
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const fnGetToken = (userName, password) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Cookie", ".AspNet.Cookies=nagRwI9XDvM9h6vNAwt-KIsqxxjrP7lj4pggMJ7ADJINelc-P-a9aqnX7thPJJpzlRGIaHP6yu7f0r1T_ma29mUfHGL5rzMTR5VaaukTGk8Xx18_J0gAUBOq0rP0I7F9xN7xea5NWNssDc49f8u4CS-VKy_3FS1yNPG-ScaxAD2Klw6iZYlY-t7UkEwsWDe7GmXn5OE2LvPxI5IIPAZcsEemkndVNP8z9cKwXF5FdUBo91XzU6UXRqXVte5GltgJXCtaWfk9TbpCyvPFaMf_RM7fmvP5F6MTudmbO3y6VJsXWovnTq8Q1h1l1U17KggWa4Q-ByXCNyy5UCv6QBRw5FoQt2zyEYM6VRuaMtW0Y-MRXoMrsmnOzrXjcktETF6P2qkN7Ap9Cvidh3cOIqhRHEeeX5r5mYiluhKdcGaNEyckMakrEXhEKQmMzDxVOQ7NzxGgwXtCrHz2wJFiX75KmjLhf-j3bIXhI59x1BPT6AMwLE_B4rkCY2he8mtvI1YFfxSX0X9uYDZqGfD6oTWSjA");

  let urlencoded = new URLSearchParams();
  urlencoded.append("userName", userName);
  urlencoded.append("password", password);
  urlencoded.append("grant_type", "password");

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };

  return fetch("https://localhost:44348/token", requestOptions);

}


/**
 * Obtiene el Usuario por el Id
 * @param {string} id Id del usuario
 * @param {string} token el Token de Autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const getUserById = async (id, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");



  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Account/User?id=${id}`, requestOptions);
  return await response.text();
}

/**
 * Obtiene el usuario por el Email
 * @param {string} userName el Email del usuario 
 * @param {string} token el token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const getUserByUserName = async (userName, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Account/UserName?userName=${userName}`, requestOptions);
  return await response.text();
}

/**
 *Obtiene los usuarios excepto del id 
 * @param {string} id  el id del usuario que se omite
 * @param {string} token  el token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const getUsers = async (id, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);


  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Account/Users?id=${id}`, requestOptions);
  return await response.text();
}

/**
 * Elimina al usuario coincidente con el id
 * @param {string} id id del usuario a ser borrado
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const deleteUser = async (id, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);



  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Account/Delete?Id=${id}`, requestOptions);
  return await response.text();
}

const getTickets = async (token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);



  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("https://localhost:44348/api/Tickets", requestOptions);
  return await response.text();
}

/**
 * actualiza el ticket del id coincidente
 * @param {number} id id del ticket
 * @param {string} token token de autenticacion
 * @param {TicketCreateDTO} ticket el nuevo ticket que va a tomar su lugar
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const updateTicket = async (id, token, ticket) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify(ticket);

  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Tickets?id=${id}`, requestOptions);
  return await response.text();
}

/**
 *obtiene todos los comentarios
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/erroresuna promesa, para poder trabajar con las respuestas/errores
 */
const getComments = async (token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);



  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("https://localhost:44348/api/Comments", requestOptions);
  return await response.text();
}

/**
 * Actualiza los comentarios
 * @param {number} id id del comentario
 * @param {string} token token de autenticacion
 * @param {Comentario} comment nuevo comentario
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const updateComment = async (id, token, comment) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify(comment);

  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Comments?Id=${id}`, requestOptions);
  return await response.text();
}

/**
 * actualiza al usuario
 * @param {string} id el id del usuario al ser actualizado
 * @param {string} token el token de autenticacion
 * @param {UserUpdateDTO} user el nuevo usuario
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const updateUser = async (id, token, user) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify(user);

  let requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Account/User?Id=${id}`, requestOptions);
  return await response.text();
}

/**
 * Cierra la sesion del usuario
 * @param {string} token el token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const logOut = async (token) => {
  let myHeaders = new Headers();
  myHeaders.append(`Authorization", "bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");



  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch("https://localhost:44348/api/Account/logOut", requestOptions);
  return await response.text();
}

/**
 * crea un nuevo ticket
 * @param {TicketCreateDTO} ticket el ticket a ser creado
 * @param {*} token el token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const createTicket = async (ticket, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify(ticket);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  const response = await fetch("https://localhost:44348/api/Tickets", requestOptions);
  return await response.text();

}
/**
 * Filtra los tickets por Estado
 * @param {string} estado el estado que se desea saber
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const getTicketPorEstado = async (estado, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");



  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/Estado?Estado=${estado}`, requestOptions);
  return await response.text();
}

/**
 * elimina el ticket
 * @param {number} id id del ticket
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const deleteTicket = async (id, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);

  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Tickets?Id=${id}`, requestOptions);
  return await response.text();
}

/**
 * elimina el comentario
 * @param {number} id id del comentario
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const deleteComents = async (id, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");



  let requestOptions = {
    method: 'DELETE',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/api/Comments?Id=${id}`, requestOptions);
  return await response.text();
}

/**
 * Filtra por nombre de usuario
 * @param {string} userName el userName 
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const filtrarTicketPorUserName = async (userName, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/User?usuario=${userName}`, requestOptions);
  return await response.text();
}

/**
 * Filtra los tickets por prioridades 
 * @param {string} prioridad la prioridad
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const filtrarTicketporPrioridad = async (prioridad, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `bearer ${token}`);

  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  const response = await fetch(`https://localhost:44348/Prioridad?Prioridad=${prioridad}`, requestOptions);
  return await response.text();
}

/**
 * filtra por fachas
 * @param {string} fecha1 fecha inicio
 * @param {string} fecha2 fecha fin
 * @param {string} token token de autenticacion
 * @returns una promesa, para poder trabajar con las respuestas/errores
 */
const filtrarTicketPorFechas = async (fecha1, fecha2, token) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization",`bearer ${token}`);
  
  let requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
  
  const response = await fetch(`https://localhost:44348/Fechas?fecha1=${fecha1}&fecha2=${fecha2}`, requestOptions);
  return await response.text();
}