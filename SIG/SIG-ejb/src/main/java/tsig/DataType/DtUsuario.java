package tsig.DataType;

public class DtUsuario {
	private String nick;
	private String psw;
	private String nombre;
	private String email;
	private boolean admin;
	
	public DtUsuario(String nick, String psw, String nombre, String email, boolean admin) {
		this.nick = nick;
		this.psw = psw;
		this.nombre = nombre;
		this.email = email;
		this.admin = admin;
	}
	
	public String getNick() {
		return nick;
	}
	public String getPsw() {
		return psw;
	}
	public String getNombre() {
		return nombre;
	}
	public String getEmail() {
		return email;
	}
}
