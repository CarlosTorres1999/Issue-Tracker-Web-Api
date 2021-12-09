using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Issue_Tracker_Web_API.Models;
using Issue_Tracker_Web_API.Models.DTOs;
using IssueTracker_web_api.Models;
using IssueTracker_web_api.Models.DTOs;

namespace IssueTracker_web_api.App_Start
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<ApplicationUser, UserDTO>();
            CreateMap<Ticket, TicketDTO>()

                .ForMember(
                    ticketDTO => ticketDTO.Creador,
                    opt => opt.MapFrom(ticket => ticket.Creador.UserName)
                )
                .ForMember(
                    ticketDTO => ticketDTO.Responsable,
                    opt => opt.MapFrom(ticket => ticket.Responsable.UserName)
                )
                .ForMember(
                    ticketDTO => ticketDTO.FechaCreacion,
                    opt => opt.MapFrom(ticket => ticket.FechaCreacion.ToString())
                )
                .ForMember(
                    ticketDTO => ticketDTO.FechaFin,
                    opt => opt.MapFrom(ticket => ticket.FechaFin.ToString())
                );

            CreateMap<TicketDTO, Ticket>()
                .ForMember(
                    ticket => ticket.FechaCreacion,
                    opt => opt.MapFrom(ticketDTO => Convert.ToDateTime(ticketDTO.FechaCreacion))
                )
                .ForMember(
                    ticket => ticket.FechaFin,
                    opt => opt.MapFrom(ticketDTO => Convert.ToDateTime(ticketDTO.FechaFin))
                )
                .ForMember(
                    ticket => ticket.Creador,
                    opt => opt.Ignore()
                )
                .ForMember(
                    ticket => ticket.Responsable,
                    opt => opt.Ignore()
                )
                .ForMember(
                    ticket => ticket.CreadorId,
                    opt => opt.Ignore()
                 )
                 .ForMember(
                    ticket => ticket.ResponsableId,
                    opt => opt.Ignore()
                 )
                 ;

            CreateMap<Comment, CommentDTO>()
                .ForMember(
                    dto => dto.UsuarioUserName,
                    opt => opt.MapFrom(entity => entity.UsuarioComment.UserName)
                )
                .ForMember(
                    dto => dto.TicketId,
                    opt => opt.MapFrom(entity => entity.Ticket.Id)
                )
                .ForMember(
                    dto => dto.Fecha,
                    opt => opt.MapFrom(entity => entity.FechaComentario.ToString())
                )
                ;

            CreateMap<CommentDTO, Comment>()
                .ForMember(
                    entity => entity.Ticket,
                    opt => opt.Ignore()
                )
                .ForMember(
                    entity => entity.UsuarioComment,
                    opt => opt.Ignore()
                )
                .ForMember(
                    entity => entity.TicketId,
                    opt => opt.Ignore()
                )
                .ForMember(
                    entity => entity.UsuarioComment,
                    opt => opt.Ignore()
                 )
                .ForMember(
                    entity => entity.FechaComentario,
                    opt => opt.MapFrom(dto => Convert.ToDateTime(dto.Fecha))
                 )
                ;

           

        }
        
    }
}