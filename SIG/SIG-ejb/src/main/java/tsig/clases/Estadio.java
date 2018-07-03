package tsig.clases;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class Estadio extends Puntosinteres implements Serializable{

	
	private String capacidad;
	private String descripcion;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public Estadio() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getDescripcion() {
		return descripcion;
	}
	public Estadio(String capacidad, String descripcion) {
		super();
		this.capacidad = capacidad;
		this.descripcion = descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public String getCapacidad() {
		return capacidad;
	}
	public void setCapacidad(String capacidad) {
		this.capacidad = capacidad;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public Estadio(String capacidad) {
		super();
		this.capacidad = capacidad;
	}
	
}
