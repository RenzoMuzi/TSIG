package tsig.clases;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class LugarTuristico extends Puntosinteres implements Serializable{

	private String descripcion;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public LugarTuristico() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public LugarTuristico(String descripcion) {
		super();
		this.descripcion = descripcion;
	}
	
}
