package tsig.data;

import java.security.MessageDigest;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;
import org.jboss.arquillian.test.api.ArquillianResource;

import tsig.DataType.DtPartido;
import tsig.DataType.DtPuntosinteres;
import tsig.DataType.DtUsuario;
import tsig.clases.Administrador;
import tsig.clases.Cliente;
import tsig.clases.Hotel;
import tsig.clases.Partido;
import tsig.clases.Puntosinteres;
import tsig.clases.Seleccion;
import tsig.clases.Usuario;

@Singleton
@Startup
@TransactionManagement(TransactionManagementType.BEAN)
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class SingletonDBController implements DBControllerInterface{
	
	@PersistenceContext
	private EntityManager em;
	
	@Resource
	private UserTransaction userTransaction;
	
	public boolean registroCliente(String nombre, String nick, String psw, String email, int hotel, int seleccion) {
		
		try {
			Cliente user = new Cliente();
			if (em.find(Cliente.class,nick) == null)
			{
			user.setNick(nick);
			user.setPsw(hash(psw));
			user.setEmail(email);
			user.setNombre(nombre);
			if (em.find(Puntosinteres.class,hotel) == null)	{
				user.setHotel(null);
			}
			else 
				user.setHotel(em.find(Hotel.class,hotel));
			if (em.find(Seleccion.class,seleccion) == null)	user.setSeleccion(null);
			else user.setSeleccion(em.find(Seleccion.class,seleccion));
				
				
				userTransaction.begin();
				em.persist(user);
				userTransaction.commit();
				return true;
				}
			else{
				//El usuario ya existe. 
				return false;
				}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}
		private String hash(String clear) throws Exception { 
			MessageDigest md = MessageDigest.getInstance("MD5"); 
			byte[] b = md.digest(clear.getBytes()); 
			int size = b.length; 
			StringBuffer h = new StringBuffer(size); 
			for (int i = 0; i < size; i++) { 
				int u = b [ i ] & 255 ;
				if (u<16) { 
				h.append("0"+Integer.toHexString(u)); 
				}else { 
				h.append(Integer.toHexString(u)); 
				} 
			} 
			return h.toString(); 
			}
	public boolean registroAdmin(String nick, String psw) {
		
		try {
			Administrador user = new Administrador();
			if (em.find(Administrador.class,nick) == null)
			{
			user.setNick(nick);
			user.setPsw(psw);
			
				
				userTransaction.begin();
				em.persist(user);
				userTransaction.commit();
				return true;
				}
			else{
				//El usuario ya existe. 
				return false;
				}
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
	}

	
	
	
	public DtUsuario buscarUsuario(String nick) {
		
		try {
//			userTransaction.begin();
			Usuario user = em.find(Usuario.class, nick);
			if (user != null) {
				if (user instanceof Cliente) {
					Cliente c = (Cliente) user;
					return new DtUsuario(c.getNick(), c.getPsw(), c.getNombre(), c.getEmail(), false);
				}else {
					Administrador a = (Administrador) user;
					return new DtUsuario(a.getNick(), a.getPsw(), "", "", true);
				}
			}
			
//			userTransaction.commit();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
		
		
	}
	
	//TODO: puede ser una collection o no? mas de un poi en una misma dir
	public DtPuntosinteres buscarPoI(String direccion) {
		try {
		
		Query q = em.createQuery("select i from puintosinteres i where i.direccion=:qw",Puntosinteres.class);
		q.setParameter("qw", direccion);
		List l = (List) q.getResultList();
		Puntosinteres poi = (Puntosinteres)l.get(0);
		if (poi != null) {
			return new DtPuntosinteres(poi.getId(), poi.getNombre(), poi.getAddress(), poi.getPuntuacion());
		}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public String buscarEquipos(String pais) {
		
		
		return null;
	}
	
	public DtPartido buscarPartido(String local, String visitante, Date fecha) {
		return null;
	}
	
	public boolean registrarPoI(DtPuntosinteres p) {
		try {
			Puntosinteres poi = new Puntosinteres("nombre", "address", 5);
			userTransaction.begin();
			em.persist(poi);
			userTransaction.commit();
			return true;
		} catch (NotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SystemException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SecurityException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (RollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (HeuristicMixedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (HeuristicRollbackException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		return false;
	}
	
	public boolean agregarEquipo(String pais) {
		Seleccion e = new Seleccion(pais);
		
		try {
			userTransaction.begin();
			em.persist(e);
			userTransaction.commit();
			return true;
		}catch(Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	
	public boolean agregarPartido(String local, String visitante, Date fecha) {
		return false;
	}
	
	public boolean agregarResultado(DtPartido p, int local, int visitante) {
		return false;
	}

	@Override
	public List<Seleccion> Selecciones(String grupo) {
		try {
			List<Seleccion> selecciones = em.createQuery("SELECT c FROM Seleccion c where c.grupo='"+grupo+"'", Seleccion.class).getResultList();
			System.out.println(selecciones);
			return selecciones;
		} catch (SecurityException | IllegalStateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}		
	}
}