package tsig.controllers;

import javax.ejb.Local;

import tsig.clases.Usuario;

@Local
public interface InterfazSecundario {

	
	public String iniciarSesion(String nick, String psw);
}
