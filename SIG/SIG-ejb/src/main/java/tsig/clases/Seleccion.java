package tsig.clases;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Entity
@Table(name = "seleccion", 
uniqueConstraints = @UniqueConstraint(columnNames = {"pais"}))
public class Seleccion implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	@Column(name = "pais",unique=true)
	private String pais;
	private int puntos;
	private String grupo;
	
	public String getGrupo() {
		return grupo;
	}

	public void setGrupo(String grupo) {
		this.grupo = grupo;
	}

	public Seleccion(int id, String pais, int puntos) {
		super();
		this.id = id;
		this.pais = pais;
		this.puntos = puntos;
	}

	public int getPuntos() {
		return puntos;
	}

	public void setPuntos(int puntos) {
		this.puntos = puntos;
	}

	public Seleccion() {
		
	}

	public Seleccion(String pais) {
		this.pais = pais;
	}

	public String getPais() {
		return pais;
	}

	public void setPais(String pais) {
		this.pais = pais;
	}
	
	public int getId() {
		return this.id;
	}
}
