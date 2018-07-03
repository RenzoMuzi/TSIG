package tsig.DataType;

public class DtPuntosinteres {
	private int id;
	private String nombre;
	private String address;
	private int puntuacion;
	
	public DtPuntosinteres(int id, String nombre, String address, int puntuacion) {
		super();
		this.id = id;
		this.nombre = nombre;
		this.address = address;
		this.puntuacion = puntuacion;
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
}
