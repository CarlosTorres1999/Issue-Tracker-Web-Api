//Declaracion de variables
let tituloTicket;
let descripcionTicket;
let responsable;
let fechaEntrega;
let estado;
let prioridad;

let actualizarTitulo;
let actualizarDescripcion;
let actualizarResponsable;
let actualizarEntrega;
let actualizarPrioridad;
let actualizarEstado;

let filtrarUserName;
let filtrarPrioridad;
let filtrarFechaInicio;
let filtrarFechaFin;

/**
 * Inicializa las variables
 */
const initTickets = () => {
    if (
        localStorage.getItem("token") === null
        || localStorage.getItem("Logged") == null
        || localStorage.getItem("token") == ""
        || localStorage.getItem("Logged") === ""
        || JSON.parse(localStorage.getItem("Logged")).Role != "User"
    ) {
        window.location.assign("../Index.html");
    }

    tituloTicket = document.getElementById("titulo-ticket");
    descripcionTicket = document.getElementById("descripcion-ticket");
    responsableTicket = document.getElementById("responsable-ticket");
    fechaEntrega = document.getElementById("fecha-fin-ticket");
    prioridad = document.getElementById("prioridad");
    estado = document.getElementById("estado");
    responsable = document.getElementById("responsable-ticket")
    filtrarUserName = document.getElementById("buscar-userName");
    filtrarPrioridad = document.getElementById("filtrar-prioridad");
    filtrarFechaFin = document.getElementById("filtrar-fecha-fin");
    filtrarFechaInicio = document.getElementById("filtrar-fecha-inicio");
    fnListarTodosLosTickets();
}
/**
 * Lista los arreglos de tickets
 * @param {string} id_estado_html a que estado del ticket se desea listar
 * @param {Array} tickets los tickets que seran listados
 */
const fnListarTickets = (id_estado_html, tickets) => {
    let user = JSON.parse(localStorage.getItem("Logged"));
    if (!(tickets.length === 0)) {
        let buff = [];
        buff.push(`
        <div class="accordion accordion-flush" id="accordionFlushExample">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                          ${id_estado_html}
                        </button>
                      </h2>
                    
        `);
        for (let ticket of tickets) {
            if (
                user.Email === ticket.Creador
                || user.Email === ticket.Responsable
            ) {
                buff.push(
                    `<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class = "card">
                                <div class = "card-body">
                                    <h5 style =  class = "card-title">${ticket.Titulo} </h5>
                                    <p class = "card-text">${ticket.Descripcion}</p>
                                    <div class = "row">
                                        <div class = "col-sm-4">
                                            <button type = "button" class = "btn  btn-link" data-bs-toggle="modal" data-bs-target="#modalVerDetalle${ticket.Id}">Ver Mas</button>
                                         </div>

                                         <div class = "col-sm-4">
                                            <button type = "button" class = "btn btn-danger" onclick = "fnBorrarTicket(${ticket.Id})">Borrar</button>
                                         </div>

                                         <div class = "col-sm-4">
                                            <button type = "button" class = "btn  btn-primary" data-bs-toggle="modal" data-bs-target="#modalEditarTicket${ticket.Id}">Editar</button>
                                         </div>

                                         
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                    <!-- Modal -->
                    <div class="modal fade" id="modalEditarTicket${ticket.Id}" tabindex="-1" aria-labelledby="modalEditarLabel${ticket.Id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalEditarLabel${ticket.Id}">Editar Ticket</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form class="form-ticket">
                                        <div class="row mb-3">
                    
                                            <div class="col-sm-4">
                                                <label for="actualizar-titulo${ticket.Id}" class="form-label"> Titulo </label>
                                            </div>
                    
                                            <div class="col-sm-8">
                                                <input class="form-control" type="text" id="actualizar-titulo${ticket.Id}" value = "${ticket.Titulo}">
                                            </div>
                    
                                        </div>
            
                                        <div class="row mb-3">
            
                                            <div class="col-sm-4">
                                                <label class="form-label" for="actualizar-descripcion${ticket.Id}">Descipcion</label>
                                            </div>
                    
                                            <div class="col-sm-8">
                                                <div class="form-floating">
                                                    <textarea class="form-control" id="actualizar-descripcion${ticket.Id}">${ticket.Descripcion}</textarea>
                                                </div>
                                            </div>
            
                                        </div>
            
                                        <div class="row mb-3">
            
                                            <div class="col-sm-4">
                                                <label class="form-label" for="actualizar-responsable${ticket.Id}">Asignar A:</label>
                                            </div>
            
                                            <div class="col-sm-8">
                                                <input type="text" class="form-control"
                                                    id="actualizar-responsable${ticket.Id}" value = "${ticket.Responsable}">
                                            </div>
            
            
                                        </div>
            
                                        <div class="row mb-3">
            
                                            <div class="col-sm-6">
                                                <label class="form-label" for="actualizar-fecha-entrega${ticket.Id}">Fecha de Entrega</label>
                                            </div>
            
                                            <div class="col-sm-6">
                                                <input type="date" id="actualizar-fecha-entrega${ticket.Id}" class="form-control"
                                                
                                            >
                                            </div>
            
                                        </div>
            
                                        <div class="row mb-3">
                                            <div class="col-sm-6">
                                                <label class="form-label" for="actualizar-prioridad${ticket.Id}">Prioridad</label>
                                            </div>
            
                                            <div class="col-sm-6">
                                                <select  id="actualizar-prioridad${ticket.Id}" name="prioridades" class = "form-control">
                                                    <option value="alta">Alta</option>
                                                    <option value="media">Media</option>
                                                    <option value="baja">Baja</option>
            
                                                </select>
                                            </div>
                                        </div>
            
            
            
            
                                        <div class="row mb-3 mt-3">
                                            <div class="col-sm-6">
                                                <label class="form-label" for="actualizar-estado${ticket.Id}">Estado</label>
                                            </div>
            
                                            <div class="col-sm-6">
                                                <select  id="actualizar-estado${ticket.Id}" name="estados" class = "form-control">
                                                    <option value="to-do">TO DO</option>
                                                    <option value="in-progress">IN PROGRESS</option>
                                                    <option value="finished">FINISHED</option>
            
                                                </select>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onclick="fnActualizarTicket(${ticket.Id}, ${ticket.Id}, '${ticket.FechaCreacion}', '${ticket.Creador}')">Editar Tarea</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Modal -->
                    <div class="modal fade" id="modalVerDetalle${ticket.Id}" tabindex="-1" aria-labelledby="modalDetalleLabel${ticket.Id}" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalDetalleLabel${ticket.Id}">Detalle de la Tarea</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <div class="card"">
                                        <div class="card-body">
                                            <h5 style = "margin-left:30%; margin-right: 30%;" class="card-title display-5">${ticket.Titulo}</h5>
                                            <h6 style = "margin-left:30%; margin-right: 30%;"  class="card-subtitle mb-2 text-muted">Descripcion</h6>
                                            <p class="card-text">${ticket.Descripcion}</p>

                                            <h6 class = "card-title display-6">Creacion y asignacion</h6>
                                            <div class = "row">
                                                <div class = "col-sm-6"> 
                                                    <h6 class = "card-subtitle ml-2">Creado por:</h6>
                                                </div>

                                                <div class = "col-sm-6">
                                                    <p class ="card-text">${ticket.Creador}</p>
                                                </div>
                                            </div>

                                            <div class = "row">
                                                <div class = "col-sm-6"> 
                                                    <h6 class = "card-subtitle ml-2">Asignado a:</h6>
                                                </div>

                                                <div class = "col-sm-6">
                                                    <p class ="card-text">${ticket.Responsable}</p>
                                                </div>
                                            </div>

                                            <h6 class = "card-title display-6">Fechas</h6>
                                            <div class = "row"> 
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">Fecha de creacion: </p>
                                                </div>
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">${ticket.FechaCreacion} </p>
                                                </div>
                                            </div>

                                            <div class = "row"> 
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">Fecha de vencimiento: </p>
                                                </div>
                                                <div class = "col-sm-6>
                                                    <p class = "card-text">${ticket.FechaFin} </p>
                                                </div>
                                            </div>

                                            <div class = "row">
                                                <div class = "col-sm-6">
                                                    Prioridad: 
                                                </div>

                                                <div class = "col-sm-6">
                                                    ${ticket.Prioridad}
                                                </div>
                                            </div>
                                </div>
                              </div>
                             </div>
                                <div class="modal-footer">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    `

                );

            }
            else {
                buff.push(
                    `<div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class = "card">
                                <div class = "card-body">
                                    <h5 style =  class = "card-title">${ticket.Titulo} </h5>
                                    <p class = "card-text">${ticket.Descripcion}</p>
                                    <button type = "button" class = "btn  btn-link" data-bs-toggle="modal" data-bs-target="#modalVerDetalle${ticket.Id}">Ver Mas</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            <!-- Modal -->
            <div class="modal fade" id="modalVerDetalle${ticket.Id}" tabindex="-1" aria-labelledby="modalDetalleLabel${ticket.Id}" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalDetalleLabel${ticket.Id}">Detalle de la Tarea</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="card"">
                                <div class="card-body">
                                    <h5 style = "margin-left:30%; margin-right: 30%;" class="card-title display-5">${ticket.Titulo}</h5>
                                    <h6 style = "margin-left:30%; margin-right: 30%;"  class="card-subtitle mb-2 text-muted">Descripcion</h6>
                                    <p class="card-text">${ticket.Descripcion}</p>

                                    <h6 class = "card-title display-6">Creacion y asignacion</h6>
                                    <div class = "row">
                                        <div class = "col-sm-6"> 
                                            <h6 class = "card-subtitle ml-2">Creado por:</h6>
                                        </div>

                                        <div class = "col-sm-6">
                                            <p class ="card-text">${ticket.Creador}</p>
                                        </div>
                                    </div>

                                    <div class = "row">
                                        <div class = "col-sm-6"> 
                                            <h6 class = "card-subtitle ml-2">Asignado a:</h6>
                                        </div>

                                        <div class = "col-sm-6">
                                            <p class ="card-text">${ticket.Responsable}</p>
                                        </div>
                                    </div>

                                    <h6 class = "card-title display-6">Fechas</h6>
                                    <div class = "row"> 
                                        <div class = "col-sm-6>
                                            <p class = "card-text">Fecha de creacion: </p>
                                        </div>
                                        <div class = "col-sm-6>
                                            <p class = "card-text">${ticket.FechaCreacion} </p>
                                        </div>
                                    </div>

                                    <div class = "row"> 
                                        <div class = "col-sm-6>
                                            <p class = "card-text">Fecha de vencimiento: </p>
                                        </div>
                                        <div class = "col-sm-6>
                                            <p class = "card-text">${ticket.FechaFin} </p>
                                        </div>
                                    </div>

                                    <div class = "row">
                                    <div class = "col-sm-6">
                                        Prioridad: 
                                    </div>

                                    <div class = "col-sm-6">
                                        ${ticket.Prioridad}
                                    </div>
                                </div>
                        </div>
                      </div>
                        </div>
                        <div class="modal-footer">
                        </div>
                    </div>
                </div>
            </div>
            
            `);





            }
        };
        buff.push('</div>')
        document.getElementById(id_estado_html).innerHTML = buff.join('\n');
    }
}

/**
 * Lista todos los tickets
 */
const fnListarTodosLosTickets = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    getTicketPorEstado("to-do", token.access_token)
        .then(result => fnListarTickets("to-do", JSON.parse(result)))
        .catch(error => console.log("error", error));
    getTicketPorEstado("in-progress", token.access_token)
        .then(result => fnListarTickets("in-progress", JSON.parse(result)))
        .catch(error => console.log("error", error));
    getTicketPorEstado("finished", token.access_token)
        .then(result => fnListarTickets("finished", JSON.parse(result)))
        .catch(error => console.log("error", error));
}

/**
 * Crea un ticket
 */
const fnCrearTicket = () => {
    let user = JSON.parse(localStorage.getItem("Logged"));
    let token = JSON.parse(localStorage.getItem("token"));
    let ticket_titulo = tituloTicket.value;
    let ticket_descripcion = descripcionTicket.value;
    let ticket_creador = user.Email;
    let ticket_responsable = responsable.value;
    let ticket_fecha_vencimiento = fechaEntrega.value;
    let ticket_fecha_inicio = new Date().toISOString();
    let ticket_prioridad = prioridad.value;
    let ticket_estado = estado.value;
    let ticket = new TicketCreateDTO(
        0,
        ticket_titulo,
        ticket_descripcion,
        ticket_responsable,
        ticket_fecha_inicio,
        ticket_fecha_vencimiento,
        ticket_prioridad,
        ticket_estado,
        ticket_creador
    );

    createTicket(ticket, token.access_token)
        .then(() => {
            console.log("ticket creado con exito");
        })
        .catch(error => {
            console.log("error al crear el ticket", error);
            alert("error al crear, Verifica que los usuarios son validos");
        })
        .finally(() => {
            fnListarTodosLosTickets();
        })
}

/**
 * Borra un Ticket a partir del id
 * @param {number} id id del ticket
 */
const fnBorrarTicket = (id) => {
    let band = window.confirm("Seguro que quieres borrar la tarea?");
    if (band) {
        let token = JSON.parse(localStorage.getItem("token"));
        getComments(token.access_token)
            .then(result => {
                localStorage.setItem("comentarios", result);
            }).catch(error => console.log(error))
            .finally(() => {
                let comentarios = JSON.parse(localStorage.getItem("comentarios"));
                for (let comentario of comentarios) {
                    if (comentario.TicketId === id) {
                        deleteComents(comentario.Id, token.access_token)
                            .then(c => console.log("eliminado la relacion"))
                            .catch(e => console.log("error", e));
                    }
                }

                deleteTicket(id, token.access_token)
                    .then(() => console.log("borrado el ticket con exito"))
                    .catch(et => console.log("error al borrar el ticket", et))
                    .finally(() => location.assign("TicketDashBoard.html"));
            });
    }
}

/**
 * Hace un update del ticket
 * @param {number} id id del ticket
 * @param {number} value id del componente html
 * @param {string} fechaInicio para conserver la fecha inicio
 * @param {string} creador para conservar al creador
 */
const fnActualizarTicket = (id, value, fechaInicio, creador) => {
    actualizarTitulo = document.getElementById(`actualizar-titulo${value}`);
    actualizarDescripcion = document.getElementById(`actualizar-descripcion${value}`);
    actualizarEntrega = document.getElementById(`actualizar-fecha-entrega${value}`);
    actualizarResponsable = document.getElementById(`actualizar-responsable${value}`);
    actualizarEstado = document.getElementById(`actualizar-estado${value}`);
    actualizarPrioridad = document.getElementById(`actualizar-prioridad${value}`);

    let token = JSON.parse(localStorage.getItem("token"));
    let ticket = new TicketCreateDTO(
        id,
        actualizarTitulo.value,
        actualizarDescripcion.value,
        actualizarResponsable.value,
        fechaInicio,
        actualizarEntrega.value,
        actualizarPrioridad.value,
        actualizarEstado.value,
        creador
    );
    
    console.log(ticket);
    updateTicket(id, token.access_token, ticket)
    .then(() => console.log("actualizado con exito"))
    .catch(error => console.log(error))
    .finally(() => {
        fnClear();
        fnListarTickets();
    })
    
}

/**
 * Filtra por nombre de usuario
 */
const fnFiltrarPorUserName =() => {
    let token = JSON.parse(localStorage.getItem("token"));
    if(filtrarUserName.value  === "ME"){
        filtrarTicketPorUserName(token.userName,token.access_token)
        .then(result => {
            let tickets = JSON.parse(result);
            fnClear();
            fnListarTickets("to-do", tickets.filter(t => t.Estado === "to-do"));
            fnListarTickets("in-progress", tickets.filter(t => t.Estado === "in-progress"));
            fnListarTickets("finished", tickets.filter(t => t.Estado === "finished"));
        }).catch(error => console.log(error));
    } else{
        filtrarTicketPorUserName(filtrarUserName.value, token.access_token)
        .then(result => {
            let tickets = JSON.parse(result);
            fnClear();
            fnListarTickets("to-do", tickets.filter(t => t.Estado === "to-do"));
            fnListarTickets("in-progress", tickets.filter(t => t.Estado === "in-progress"));
            fnListarTickets("finished", tickets.filter(t => t.Estado === "finished"));
        }).catch(error => console.log(error));
    }  
}

/**
 * Limpia la pantalla
 */
fnClear = () => {
    document.getElementById("to-do").innerHTML = `<div id = "to-do" class = "col-sm-4"> </div>`;
    document.getElementById("in-progress").innerHTML = `<div id = "in-progress" class = "col-sm-4"> </div>`;
    document.getElementById("finished").innerHTML = `<div id = "finished" class = "col-sm-4"> </div>`;
}

/**
 * Filtra por prioridad
 */
const fnFiltrarPorPrioridad = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    filtrarTicketporPrioridad(filtrarPrioridad.value, token.access_token)
    .then(result => {
        let tickets = JSON.parse(result);
        if(result.length === 0){
            return;
        }
        fnClear();
        fnListarTickets("to-do", tickets.filter(t => t.Estado === "to-do"));
        fnListarTickets("in-progress", tickets.filter(t => t.Estado === "in-progress"));
        fnListarTickets("finished", tickets.filter(t => t.Estado === "finished"));
    }).catch(error => console.log(error));
}

/**
 * Filtra por fechas
 */
const fnFiltrarPorFechas = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(filtrarFechaInicio.value)
    console.log(filtrarFechaFin.value);
    filtrarTicketPorFechas(filtrarFechaInicio.value, filtrarFechaFin.value, token.access_token)
    .then(result => {

        let tickets = JSON.parse(result);
        if(tickets == null){
            alert("la fecha de inicio debe ser menor a la fecha fin");
            return;
        }
        console.log(tickets);
        if(tickets.length === 0){
            return;
        }
        fnClear();
        fnListarTickets("to-do", tickets.filter(t => t.Estado === "to-do"));
        fnListarTickets("in-progress", tickets.filter(t => t.Estado === "in-progress"));
        fnListarTickets("finished", tickets.filter(t => t.Estado === "finished"));

    }).catch(error => console.log(error));
}
