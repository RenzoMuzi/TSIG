package tsig.DataType;

import java.sql.Date;

public class DtPartido {
	private int id;
	private String local;
	private String visitante;
	private boolean finalizado;
	private int resultL;
	private int resultV;
	private Date fecha;
	
	public DtPartido(int id, String local, String visitante, boolean finalizado, int resultL, int resultV, Date fecha) {
		this.id = id;
		this.local = local;
		this.visitante = visitante;
		this.finalizado = finalizado;
		this.resultL = resultL;
		this.resultV = resultV;
		this.fecha = fecha;
	}
	///COMENTARIO EN DT PARTIDO
	public int getId() {
		return id;
	}
	public String getLocal() {
		return local;
	}
	public String getVisitante() {
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
	public Date getFecha() {
		return fecha;
	}
}
