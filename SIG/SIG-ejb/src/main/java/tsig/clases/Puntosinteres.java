package tsig.clases;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@XmlRootElement
@Table(name = "puntosinteres", 
uniqueConstraints = @UniqueConstraint(columnNames = {"nombre"}))
public class Puntosinteres implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(name = "nombre",unique=true)
	private String nombre;
	private String address;
	private int puntuacion;
	@OneToMany(mappedBy = "puntoint")
	private Collection<Comentario> comentarios;
	@OneToMany(mappedBy = "puntoint")
	private Collection<Promocion> promociones;
	
	public Puntosinteres() {
		
	}
	
	public Puntosinteres(String nombre, String address, int puntuacion) {
		super();
		this.nombre = nombre;
		this.address = address;
		this.puntuacion = puntuacion;
		this.comentarios = new ArrayList<Comentario>();
		this.promociones = new ArrayList<Promocion>();
	}
	public int getId() {
		return id;
	}
	public String getNombre() {
		return nombre;
	}
	public String getAddress() {
		return address;
	}
	public int getPuntuacion() {
		return puntuacion;
	}
	public Collection<Comentario> getComentarios() {
		return comentarios;
	}
	public Collection<Promocion> getPromociones() {
		return promociones;
	}
	public void setId(int id) {
		this.id = id;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setPuntuacion(int puntuacion) {
		this.puntuacion = puntuacion;
	}
	public void setComentarios(Collection<Comentario> comentarios) {
		this.comentarios = comentarios;
	}
	public void setPromociones(Collection<Promocion> promociones) {
		this.promociones = promociones;
	}	
}
