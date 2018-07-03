package tsig.controllers;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import tsig.DataType.DtComentario;
import tsig.DataType.DtPartido;
import tsig.clases.Comentario;
import tsig.clases.Hotel;
import tsig.clases.Partido;
import tsig.clases.Promocion;
import tsig.clases.Puntosinteres;
import tsig.clases.Seleccion;
import tsig.clases.Usuario;
import tsig.data.DBControladorSecundarioLocal;
import tsig.data.DBControllerInterface;

@Stateless
@LocalBean
@Path("/controlador/")
public class ControladorSecundario implements InterfazSecundario{

	
	@EJB(lookup="java:global/SIG-ear/SIG-ejb/DBControladorSecundario!tsig.data.DBControladorSecundarioLocal")
	DBControladorSecundarioLocal DBc;
	
	@GET
    @Path("/login")
    @Produces(MediaType.APPLICATION_JSON)
	public String iniciarSesion(@QueryParam("nick") String nick, @QueryParam("psw") String psw) {
		//0 no entra
		//1 admin
		// usuario
		try {
			String ret = DBc.iniciarSesion(nick,psw);
			System.out.println(ret);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@POST
    @Path("/registrarAdmin")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registrarAdmin(@QueryParam("nick") String nick,@QueryParam("psw") String psw)  {
		try {
			boolean ret = DBc.registrarAdmin(nick, psw);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	//FUNCIONES SELECCIONES
	@GET
    @Path("/registrarEquipo")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registrarEquipo(@QueryParam("nombre") String nombre, @QueryParam("grupo") String grupo) {
		try {
			boolean ret = DBc.registrarEquipo(nombre, grupo);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@GET
    @Path("/allSelecciones")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Seleccion> getSelecciones() {
		try {
			return DBc.getAllSelecciones();
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@GET
    @Path("/allSeleccionesGroup")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Seleccion> getPuntosPorGrupo(@QueryParam("nick") String nick) {
		try {
			return DBc.getPuntosPorGrupo(nick);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
//	FUNCIONES PARTIDOS
	@GET
    @Path("/registrarPartido")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registrarPartido(@QueryParam("fecha") String fecha, @QueryParam("finalizado") boolean finalizado, @QueryParam("resultl") int resultl, @QueryParam("resultv") int resultv, @QueryParam("localid") int localid, @QueryParam("visitanteid") int visitanteid, @QueryParam("grupo") String grupo) {
		try {
			DateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
			java.util.Date parsedUtilDate = formater.parse(fecha);
			java.sql.Date sqltDate= new java.sql.Date(parsedUtilDate.getTime());
			boolean ret = DBc.registrarPartido(sqltDate, finalizado, resultl, resultv, localid, visitanteid, grupo);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	@GET
    @Path("/allPartidos")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Partido> getPartidos() {
		try {
			return DBc.getAllPartidos();
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@GET
    @Path("/partidosTerminados")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Partido> partidosTerminados() {
		try {
			List<Partido> ret = DBc.verResultadosPartidos();
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@GET
    @Path("/partidosNoTerminados")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Partido> partidosNoTerminados() {
		try {
			List<Partido> ret = DBc.partidosNoTerminados();
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@GET
    @Path("/registrarResultado")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registrarResultado(@QueryParam("idPartido") int idPartido, @QueryParam("resultl") int resultl, @QueryParam("resultv") int resultv, @QueryParam("terminado") boolean terminado ) {
		try {
			boolean ret = DBc.registrarResultado(idPartido, resultl, resultv, terminado);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	//FUNCIONES PUNTOS DE INTERES
	@GET
    @Path("/registrarPuntoInteres")
    @Produces(MediaType.APPLICATION_JSON)
	public String registrarPuntoInteres(@QueryParam("nombre") String nombre, @QueryParam("tipo") String tipo, @QueryParam("descripcion") String descripcion, @QueryParam("telefono") String telefono, @QueryParam("estrellas") int estrellas, @QueryParam("capacidad") String capacidad, @QueryParam("horaAbre") String horaAbre, @QueryParam("horaCierra") String horaCierra, @QueryParam("direccion") String direccion, @QueryParam("payload") String payload ) {
		try {
			String ret = DBc.registrarPuntoInteres(nombre, tipo, descripcion, telefono, estrellas, capacidad, horaAbre, horaCierra, direccion, payload);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return "false";
		}
	}

	@GET
    @Path("/allHotels")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Puntosinteres> allHotels() {
		try {
			return DBc.getAllHotels();
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	@GET
    @Path("/getAllPointsOfInterest")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Puntosinteres> getAllPointsOfInterest() {
		try {
			return DBc.getAllPointsOfInterest();
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	//FUNCIONES PROMOCIONES
	
	@GET
    @Path("/registrarPromocion")
    @Produces(MediaType.APPLICATION_JSON)
	public String registrarPromocion(@QueryParam("nombre") String nombre, @QueryParam("descripcion") String descripcion, @QueryParam("idPuntoInteres") int idPuntoInteres, @QueryParam("payload") String payload) {
		try {
			String ret = DBc.registrarPromocion(nombre, descripcion, idPuntoInteres, payload);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return "false-NaN";
		}
	}
	@GET
    @Path("/allPromocion")
    @Produces(MediaType.APPLICATION_JSON)
	public List<Promocion> getAllPromocion() {
		try {
			List<Promocion> ret = DBc.getAlllPromocion();
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	/// COMENTARIOS Y CALIFICACIONES 
	@GET
    @Path("/registrarComentario")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registrarComentario(@QueryParam("comentario") String comentario, @QueryParam("nickUser") String idUser, @QueryParam("idPuntoInteres") int idPuntoInteres,@QueryParam("calificacion") int calificacion, @QueryParam("payload") String payload) {
		
		try {
			boolean ret = DBc.registrarComentario(comentario, idUser, idPuntoInteres, calificacion, payload);
			return ret;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@GET
    @Path("/getQualification")
    @Produces(MediaType.APPLICATION_JSON)
	public Double getQualification(@QueryParam("idPuntoInteres") int idPuntoInteres) {
		try {
			return DBc.getQualification(idPuntoInteres);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@GET
    @Path("/getComments")
    @Produces(MediaType.APPLICATION_JSON)
	public List<DtComentario> getComments(@QueryParam("idPuntoInteres") int idPuntoInteres) {
		try {
			return DBc.getComments(idPuntoInteres);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}
