package tsig.clases;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class Bar extends Puntosinteres implements Serializable{

	private String horaAbre;
	private String horaCierra;
	private String descripcion;
	private String telefono;
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public Bar() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getHoraAbre() {
		return horaAbre;
	}

	public void setHoraAbre(String horaAbre) {
		this.horaAbre = horaAbre;
	}

	public String getHoraCierra() {
		return horaCierra;
	}

	public void setHoraCierra(String horaCierra) {
		this.horaCierra = horaCierra;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public Bar(String nombre, String address, int puntuacion) {
		super(nombre, address, puntuacion);
		// TODO Auto-generated constructor stub
	}

	public Bar(String horaAbre, String horaCierra, String descripcion, String telefono) {
		super();
		this.horaAbre = horaAbre;
		this.horaCierra = horaCierra;
		this.descripcion = descripcion;
		this.telefono = telefono;
	}
	
}
