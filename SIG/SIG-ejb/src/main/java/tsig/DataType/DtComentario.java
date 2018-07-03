package tsig.DataType;

import java.sql.Date;

public class DtComentario {
	private int id;
	private Date fecha;
	private String text;
	private String nickUser;
	private int puntoint;
	private int calificacion;
		
	public DtComentario(int id, Date fecha, String text, String nickUser, int puntoint) {
		this.id = id;
		this.fecha = fecha;
		this.text = text;
		this.nickUser = nickUser;
		this.puntoint = puntoint;
	}
	
	public int getCalificacion() {
		return calificacion;
	}

	public void setCalificacion(int calificacion) {
		this.calificacion = calificacion;
	}

	public void setId(int id) {
		this.id = id;
	}

	public DtComentario() {
		super();
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public void setText(String text) {
		this.text = text;
	}

	public void setNickUser(String nickUser) {
		this.nickUser = nickUser;
	}

	public void setPuntoint(int puntoint) {
		this.puntoint = puntoint;
	}

	public DtComentario(Date fecha, String text, String nickUser, int puntoint, int calificacion) {
		super();
		this.fecha = fecha;
		this.text = text;
		this.nickUser = nickUser;
		this.puntoint = puntoint;
		this.calificacion = calificacion;
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
	public String getNickUser() {
		return nickUser;
	}
	public int getPuntoint() {
		return puntoint;
	}
}
