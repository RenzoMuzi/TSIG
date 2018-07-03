package tsig.data;

import java.util.Date;
import java.util.List;

import javax.ejb.Local;

import tsig.DataType.DtPartido;
import tsig.DataType.DtPuntosinteres;
import tsig.DataType.DtUsuario;
import tsig.clases.Seleccion;

@Local
public interface DBControllerInterface {
	
	public DtUsuario buscarUsuario(String nick);
	public DtPuntosinteres buscarPoI(String direccion);
	public String buscarEquipos(String pais);
	public DtPartido buscarPartido(String local, String visitante, Date fecha);
//-------------------------------------------------------------------------------------------
	public boolean registrarPoI(DtPuntosinteres p);
	public boolean agregarEquipo(String pais);
	public boolean agregarPartido(String local, String visitante, Date fecha);
//-------------------------------------------------------------------------------------------
	public boolean agregarResultado(DtPartido p, int local, int visitante);
	public boolean registroCliente(String nombre, String nick, String psw, String email, int hotel, int seleccion);
	public boolean registroAdmin(String nick, String psw);
	public List<Seleccion> Selecciones(String grupo);
}
