package tsig.controllers;

import java.util.Date;

import javax.ejb.Local;

import tsig.DataType.DtPuntosinteres;
import tsig.DataType.DtUsuario;

@Local
public interface InterfazAdmin {
	
	
	public boolean registrarPoI(DtPuntosinteres poi);
	public boolean agregarEquipo(String pais);
	public boolean agregarPartido(String local, String visitante, Date fecha);
	public boolean setearResultado(String loc, String vis, int local, int visitante);
}
