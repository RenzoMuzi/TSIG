package tsig.controllers;

import javax.ejb.EJB;
import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.ws.rs.Path;

import tsig.data.DBControladorTerciarioLocal;

/**
 * Session Bean implementation class ControladorTerciario
 */
@Stateless
@LocalBean
@Path("/controladortres/")
public class ControladorTerciario implements ControladorTerciarioLocal {

	 
	@EJB(lookup="java:global/SIG-ear/SIG-ejb/DBControladorSecundario!tsig.data.DBControladorSecundarioLocal")
	DBControladorTerciarioLocal DBc;
	
    /**
     * Default constructor. 
     */
    public ControladorTerciario() {
        // TODO Auto-generated constructor stub
    }

}
