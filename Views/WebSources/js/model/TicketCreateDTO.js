class TicketCreateDTO {
    constructor(
        id,
        titulo,
        descripcion,
        responsable,
        fecha_creacion,
        fecha_vencimiento,
        prioridad,
        estado,
        creador) {
        this.Id = id,
        this.Titulo = titulo;
        this.Descripcion = descripcion;
        this.Responsable = responsable;
        this.FechaCreacion = fecha_creacion;
        this.FechaFin = fecha_vencimiento;
        this.Prioridad = prioridad;
        this.Estado = estado;
        this.Creador = creador;
    }
}