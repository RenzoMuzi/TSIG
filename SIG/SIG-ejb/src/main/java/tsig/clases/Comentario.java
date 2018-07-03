package tsig.clases;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

@Entity
public class Comentario implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue
	private int id; 
	private Date fecha;
	private String text;
	@OneToOne
	private Usuario usuario;
	@ManyToOne
	private Puntosinteres puntoint;
	private int calificacion;
	
	public Comentario() {
		
	}
	
	public int getCalificacion() {
		return calificacion;
	}

	public Comentario(Date fecha, String text, Usuario usuario, Puntosinteres puntoint, int calificacion) {
		super();
		this.fecha = fecha;
		this.text = text;
		this.usuario = usuario;
		this.puntoint = puntoint;
		this.calificacion = calificacion;
	}

	public void setCalificacion(int calificacion) {
		this.calificacion = calificacion;
	}

	public Comentario(Date fecha, String text, Usuario usuario, Puntosinteres puntoint) {
		this.fecha = fecha;
		this.text = text;
		this.usuario = usuario;
		this.puntoint = puntoint;
	}
	public int getId() {
		return id;
	}
	public Date getFecha() {
		return fecha;
	}
	public String getText() {
		return text;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public Puntosinteres getPuntoint() {
		return puntoint;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public void setText(String text) {
		this.text = text;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public void setPuntoint(Puntosinteres puntoint) {
		this.puntoint = puntoint;
	}
}
