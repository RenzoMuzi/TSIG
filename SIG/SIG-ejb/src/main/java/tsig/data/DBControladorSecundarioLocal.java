package tsig.data;

import java.sql.Date;
import java.util.List;

import javax.ejb.Local;
import javax.ws.rs.QueryParam;

import tsig.DataType.DtComentario;
import tsig.DataType.DtPartido;
import tsig.clases.Comentario;
import tsig.clases.Hotel;
import tsig.clases.Partido;
import tsig.clases.Promocion;
import tsig.clases.Puntosinteres;
import tsig.clases.Seleccion;
import tsig.clases.Usuario;

@Local
public interface DBControladorSecundarioLocal {

	public String iniciarSesion(String nick, String psw);
	public boolean registrarEquipo(String nombre, String grupo);
	public boolean registrarPartido(Date fecha, boolean finalizado, int resultl, int resultv, int localid, int visitanteid, String grupo);
	public boolean registrarResultado(int idPartido, int resultl, int resultv, boolean terminado);
	public List<Partido> getAllPartidos();
	public List<Seleccion> getAllSelecciones();
	public List<Partido> verResultadosPartidos();
	public boolean registrarAdmin(String nick, String psw);
	public List<Partido> partidosNoTerminados();
	public String registrarPuntoInteres(String nombre, String tipo, String descripcion, String telefono, int estrellas,
			String capacidad, String horaAbre, String horaCierra, String direccion, String payload);
	public List<Puntosinteres> getAllHotels();
	public List<Puntosinteres> getAllPointsOfInterest();
	public String registrarPromocion(String nombre, String descripcion, int idPuntoInteres, String payload);
	public List<Promocion> getAlllPromocion();
	public boolean registrarComentario(String comentario, String idUser, int idPuntoInteres, int calificacion, String payload);
	public Double getQualification(int idPuntoInteres);
	public List<DtComentario> getComments(int idPuntoInteres);
	public List<Seleccion> getPuntosPorGrupo(String nick);
}
