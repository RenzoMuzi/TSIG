package tsig.clases;

import java.io.Serializable;

import javax.annotation.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.UniqueConstraint;

@Entity 
public class Administrador extends Usuario implements Serializable{

	private static final long serialVersionUID = 1L;
	

	public Administrador() {
		super();
	}


	public Administrador(String nick, String psw) {
		super(nick, psw);
		// TODO Auto-generated constructor stub
	}


	
	@Override
	public String toString() {
		return "{ \"tipo\":\"admin\", \"nick\":\""+this.getNick()+"\"}";
	}
	
	
}