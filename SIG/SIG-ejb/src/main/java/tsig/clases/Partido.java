package tsig.clases;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class Partido implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@OneToOne
	private Seleccion local;
	@OneToOne
	private Seleccion visitante;
	private boolean finalizado;
	private int resultL;
	private int resultV;
	private Date fecha;
	private String grupo;
	
	public Partido() {
		
	}
	
	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public Partido(Seleccion local, Seleccion visitante, Date fecha) {
		this.local = local;
		this.visitante = visitante;
		this.finalizado = false;
		this.resultL = -1;
		this.resultV = -1;
		this.fecha = fecha;
	}
	
	public Seleccion getLocal() {
		return local;
	}
	public Seleccion getVisitante() {
		return visitante;
	}
	public boolean isFinalizado() {
		return finalizado;
	}
	public int getResultL() {
		return resultL;
	}
	public int getResultV() {
		return resultV;
	}
	public void setLocal(Seleccion local) {
		this.local = local;
	}
	public void setVisitante(Seleccion visitante) {
		this.visitante = visitante;
	}
	public void setFinalizado(boolean finalizado) {
		this.finalizado = finalizado;
	}
	public void setResultL(int resultL) {
		this.resultL = resultL;
	}
	public void setResultV(int resultV) {
		this.resultV = resultV;
	}

	public int getId() {
		return id;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
}
