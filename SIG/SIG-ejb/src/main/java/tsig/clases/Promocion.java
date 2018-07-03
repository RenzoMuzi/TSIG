package tsig.clases;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class Promocion implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private int id;
	private String nombre;
	private String descripcion;
	@ManyToOne
	private Puntosinteres puntoint;
	
	public Promocion() {
		
	}
	
	public Promocion(int id, String nombre, String descripcion, Puntosinteres puntoint) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.puntoint = puntoint;
	}

	public Promocion(String nombre, String descripcion, Puntosinteres puntoint) {
		super();
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.puntoint = puntoint;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public Promocion(String descripcion, Puntosinteres puntoint) {
		this.descripcion = descripcion;
		this.puntoint = puntoint;
	}
	public int getId() {
		return id;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public Puntosinteres getPuntoint() {
		return puntoint;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public void setPuntoint(Puntosinteres puntoint) {
		this.puntoint = puntoint;
	}
}
