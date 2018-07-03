package tsig.clases;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class Hotel extends Puntosinteres implements Serializable{
	
	private int estrellas;
	private String telefono;
	private String capacidad;
	private String descripcion;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public Hotel() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Hotel(int estrellas, String telefono, String capacidad, String descripcion) {
		super();
		this.estrellas = estrellas;
		this.telefono = telefono;
		this.capacidad = capacidad;
		this.descripcion = descripcion;
	}

	public int getEstrellas() {
		return estrellas;
	}

	public void setEstrellas(int estrellas) {
		this.estrellas = estrellas;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getCapacidad() {
		return capacidad;
	}

	public void setCapacidad(String capacidad) {
		this.capacidad = capacidad;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	
	
}
