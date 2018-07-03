package tsig.clases;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity
public class Cliente extends Usuario implements Serializable{

	
	private String nombre;
	private String email;
	@OneToOne
	private Seleccion seleccion;
	@OneToOne
	private Hotel hotel;
	
	private static final long serialVersionUID = 1L;

	public Cliente() {
		super();
		// TODO Auto-generated constructor stub
	}


	public Cliente(String nick, String psw,String nombre, String email, Seleccion seleccion, Hotel hotel) {
		super(nick, psw);
		this.nombre = nombre;
		this.email = email;
		this.seleccion = seleccion;
		this.hotel = hotel;
	}

	public Cliente(String nick, String psw,String nombre, String email) {
		super(nick, psw);
		this.nombre = nombre;
		this.email = email;
	}
	public String getNombre() {
		return nombre;
	}


	public void setNombre(String nombre) {
		this.nombre = nombre;
	}


	public Cliente(String nombre, String email) {
		super();
		this.nombre = nombre;
		this.email = email;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Seleccion getSeleccion() {
		return seleccion;
	}


	public void setSeleccion(Seleccion seleccion) {
		this.seleccion = seleccion;
	}


	public Hotel getHotel() {
		return hotel;
	}


	public void setHotel(Hotel hotel) {
		this.hotel = hotel;
	}
	
	@Override
	public String toString() {
		return "{ \"tipo\":\"user\", \"nick\":\""+this.getNick()+"\",\"nombre\":\""+this.nombre+"\",\"email\":\""+this.email+"\",\"seleccion\":\""+this.seleccion.getPais()+"\",\"hotel\":\""+this.hotel.getNombre()+"\"}";
	}
	
}