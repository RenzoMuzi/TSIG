package tsig.DataType;

public class DtPromocion {
	private int id;
	private String descripcion;
	private int puntoint;
	
	public DtPromocion(int id, String descripcion, int puntoint) {
		this.id = id;
		this.descripcion = descripcion;
		this.puntoint = puntoint;
	}
	
	public int getId() {
		return id;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public int getPuntoint() {
		return puntoint;
	}
}
