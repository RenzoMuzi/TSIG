package tsig.controllers;

import java.util.Date;
import java.util.List;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import tsig.DataType.DtPartido;
import tsig.DataType.DtPuntosinteres;
import tsig.DataType.DtUsuario;
import tsig.clases.Administrador;
import tsig.clases.Seleccion;
import tsig.data.DBControllerInterface;

@Stateless
@LocalBean
@Path("/serv/")
public class ControladorAdmin implements InterfazAdmin{

	@EJB(lookup="java:global/SIG-ear/SIG-ejb/SingletonDBController!tsig.data.DBControllerInterface")
	DBControllerInterface DBc;
	
	@POST
    @Path("/register")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registro(@QueryParam("nombre") String nombre, @QueryParam("nick") String nick,@QueryParam("psw") String psw, @QueryParam("email") String email, @QueryParam("hotel") int hotel, @QueryParam("seleccion") int seleccion) {

		try {
			boolean reg = DBc.registroCliente(nombre, nick, psw, email, hotel, seleccion);
			return reg;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	@POST
    @Path("/registerAdmin")
    @Produces(MediaType.APPLICATION_JSON)
	public boolean registroAdmin( @QueryParam("nick") String nick, @QueryParam("psw") String psw) {

		try {
			boolean reg = DBc.registroAdmin(nick, psw);
			return reg;
		}catch(Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	
	
	
	@POST
    @Path("/buscarpoi")
    @Produces(MediaType.APPLICATION_JSON)
	public DtPuntosinteres buscarPoI(@QueryParam("poiaddress") String poiaddress) {
		return DBc.buscarPoI(poiaddress);
	}
	
	@POST
    @Path("/registrarpoi")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public boolean registrarPoI(DtPuntosinteres poi) {
		return DBc.registrarPoI(poi);
	}
	
	@POST
	@Path("/addTeam")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean agregarEquipo(@QueryParam("pais") String pais) {
		return DBc.agregarEquipo(pais);
	}
	
	@POST
	@Path("/addPartido")
	@Produces(MediaType.APPLICATION_JSON)
	public boolean agregarPartido(@QueryParam("local") String local, @QueryParam("visitante") String visitante, @QueryParam("fecha") Date fecha) {
//		if(DBc.buscarPartido(local, visitante, fecha)==null) {
//			if(DBc.buscarEquipos(local)!=null && DBc.buscarEquipos(visitante)!=null) {
//				return DBc.agregarPartido(local, visitante, fecha);
//			}
//		}
		System.out.println(local+"  "+visitante+"  "+fecha);
		
		return false;
	}
	
	@POST
	@Path("/setResult")
	//@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON) //TODO: Agregar el parametro fecha
	public boolean setearResultado(@QueryParam("loc") String loc, @QueryParam("vis") String vis, @QueryParam("local") int local, @QueryParam("visitante") int visitante) {
//		DtPartido p = DBc.buscarPartido(loc, vis, fecha);
//		if(p!=null) {
//			return DBc.agregarResultado(p, local, visitante);
//		}
		System.out.println(loc);
		return false;
	}
	
	@GET
	@Path("/selecciones")
	@Produces(MediaType.APPLICATION_JSON) 
	public List<Seleccion> getSelecciones(@QueryParam("grupo") String grupo) {
		try {
			
			return DBc.Selecciones(grupo);
		}catch(Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}