package tsig.data;

import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.security.MessageDigest;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;


import javax.annotation.Resource;
import javax.ejb.LocalBean;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.ejb.TransactionAttribute;
import javax.ejb.TransactionAttributeType;
import javax.ejb.TransactionManagement;
import javax.ejb.TransactionManagementType;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.HeuristicMixedException;
import javax.transaction.HeuristicRollbackException;
import javax.transaction.NotSupportedException;
import javax.transaction.RollbackException;
import javax.transaction.SystemException;
import javax.transaction.UserTransaction;

import tsig.DataType.DtComentario;
import tsig.DataType.DtPartido;
import tsig.clases.Administrador;
import tsig.clases.Bar;
import tsig.clases.Cliente;
import tsig.clases.Comentario;
import tsig.clases.Estadio;
import tsig.clases.Hotel;
import tsig.clases.LugarTuristico;
import tsig.clases.Partido;
import tsig.clases.Promocion;
import tsig.clases.Puntosinteres;
import tsig.clases.Seleccion;
import tsig.clases.Usuario;

/**
 * Session Bean implementation class DBControladorSecundario
 */
@Singleton
@Startup
@TransactionManagement(TransactionManagementType.BEAN)
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class DBControladorSecundario implements DBControladorSecundarioLocal {

	@PersistenceContext
	private EntityManager em;
	
	@Resource
	private UserTransaction userTransaction;
	
	private String IPGeoserver = "192.168.1.7:8080";
	
    public DBControladorSecundario() {
        // TODO Auto-generated constructor stub
    }

    
	public String iniciarSesion(String nick, String psw) {
			
			try {
				Usuario user = em.find(Usuario.class,nick);
				if( user instanceof Administrador) {
					if (user.getPsw().equals(hash(psw))) {
						Administrador adm = (Administrador) user;
						
						return adm.toString();
					}
				}else if (user instanceof Cliente){
					if (user.getPsw().equals(hash(psw))) {
						Cliente cli = (Cliente) user;
						return cli.toString();
					}
				}
				return "false";
			} catch (SecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} 
			return "false";
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
		//SELECCIONES
		public boolean registrarEquipo(String nombre, String grupo) {
			
			try {
				Seleccion sel = new Seleccion(nombre);
				sel.setPuntos(0);
				sel.setGrupo(grupo);
				userTransaction.begin();
				em.persist(sel);
				userTransaction.commit();
				return true;
			}catch (SecurityException | IllegalStateException | RollbackException | HeuristicMixedException | HeuristicRollbackException | SystemException | NotSupportedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		}
		@Override
		public List<Seleccion> getAllSelecciones() {
			try {
				List<Seleccion> selecciones = em.createQuery("SELECT c FROM Seleccion c ", Seleccion.class).getResultList();
				return selecciones;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		
		}
		

		@Override
		public List<Seleccion> getPuntosPorGrupo(String nick) {
			try {
				Cliente user = em.find(Cliente.class,nick);
				String grupo = user.getSeleccion().getGrupo();
				List<Seleccion> selecciones = em.createQuery("SELECT c FROM Seleccion c WHERE grupo ='"+grupo+"'", Seleccion.class).getResultList();
				return selecciones;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}
		//PARTIDOS
		@Override
		public boolean registrarPartido(Date fecha, boolean finalizado, int resultl, int resultv, int localid,
				int visitanteid, String grupo) {
			try {
			Seleccion local = new Seleccion();
			Seleccion visitante = new Seleccion();
			if((em.find(Seleccion.class, localid)!= null) &&(em.find(Seleccion.class, visitanteid)!= null) ) {
				local = em.find(Seleccion.class, localid);
				visitante = em.find(Seleccion.class, visitanteid);
				Partido par = new Partido(local, visitante, fecha);
				par.setFinalizado(finalizado);
				par.setResultL(resultl);
				par.setResultV(resultv);
				par.setGrupo(grupo);
				userTransaction.begin();
				em.persist(par);
				userTransaction.commit();
			}
			else{
				Partido par = new Partido();
				par.setFecha(fecha);
				par.setFinalizado(finalizado);
				par.setResultL(resultl);
				par.setResultV(resultv);
				userTransaction.begin();
				em.persist(par);
				userTransaction.commit();
			}
			return true;
			} catch (NotSupportedException | SystemException | SecurityException | IllegalStateException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		}
		
		@Override
		public boolean registrarResultado(int idPartido, int resultl, int resultv, boolean terminado) {
			try {
				if(em.find(Partido.class, idPartido)!= null) {
					userTransaction.begin();
					Partido par = em.find(Partido.class, idPartido);
					par.setResultL(resultl);
					par.setResultV(resultv);			
					par.setFinalizado(terminado);
					// Aca vemos a quien le damos los puntos.
					if (terminado == true) {
						if(resultl < resultv) {
							Seleccion visita = em.find(Seleccion.class, par.getVisitante().getId());
							visita.setPuntos(visita.getPuntos() + 3);
						}
						if(resultl > resultv) {
							Seleccion local = em.find(Seleccion.class, par.getLocal().getId());
							local.setPuntos(local.getPuntos() + 3);
							}
						if(resultl == resultv) {
							Seleccion visita = em.find(Seleccion.class, par.getVisitante().getId());
							visita.setPuntos(visita.getPuntos() + 1);
							Seleccion local = em.find(Seleccion.class, par.getLocal().getId());
							local.setPuntos(local.getPuntos() + 1);
						}
						
					}
					
					userTransaction.commit();
					return true;
				}
				else{
					//El partido no existe.
					return false;}
			} catch (NotSupportedException | SystemException | SecurityException | IllegalStateException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
		
		}

		@Override
		public List<Partido> getAllPartidos() {
			try {
				List<Partido> partidos = em.createQuery("SELECT c FROM Partido c ", Partido.class).getResultList();
				return partidos;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		
		}
		
		@Override
		public List<Partido> verResultadosPartidos() {
			try {
				List<Partido> partidos = em.createQuery("SELECT c FROM Partido c WHERE finalizado = true", Partido.class).getResultList();
				return partidos;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		
		}


		@Override
		public boolean registrarAdmin(String nick, String psw) {
			try {
				Administrador user = new Administrador();
				if (em.find(Administrador.class,nick) == null)
				{
				user.setNick(nick);
				user.setPsw(hash(psw));
					
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


		@Override
		public List<Partido> partidosNoTerminados() {
			try {
				List<Partido> partidos = em.createQuery("SELECT c FROM Partido c WHERE finalizado = false", Partido.class).getResultList();
				return partidos;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}
		
		//---------------------------BD GEOGRAFICA--------------------------------------//
		public String modificarPayload(int id, String payload) {
			String resp = "";
			String aux = Integer.toString(id);
			
			resp = payload.replace("-1-", aux);
			
			return resp;
		}
		
		public boolean persistirBDGeografica(String payload) {
			
			try {
				URL url = new URL( "http://"+IPGeoserver+"/geoserver/wfs" );
			    HttpURLConnection con = (HttpURLConnection)url.openConnection();

			    con.setDoInput(true);
			    con.setDoOutput(true);
			    con.setRequestMethod("POST");
			    con.setUseCaches (false);
			    con.setDefaultUseCaches (false);

			    con.setRequestProperty("Content-Type", "text/xml");
			    
			    OutputStreamWriter writer = new OutputStreamWriter( con.getOutputStream() );
			    writer.write(payload);

			    writer.flush();
			    writer.close();
			    
			    InputStreamReader reader = new InputStreamReader( con.getInputStream() );
			    StringBuilder buf = new StringBuilder();
			    char[] cbuf = new char[ 2048 ];
			    int num;
			    while ( -1 != (num=reader.read( cbuf )))
			    {
			        buf.append( cbuf, 0, num );
			    }
			    String result = buf.toString();
			    
			    String[] aux1 = result.split("wfs:totalInserted");
			    
			    char aux2 = aux1[1].charAt(1);
			    
			    if(aux2=='1') {
			    	return true;
			    }
		    }catch(Exception e) {
		    	System.out.println(e.getMessage());
		    }
			
			return false;
		}
		
		public boolean modificarBDGeografica(String payload) {
			
			try {
				URL url = new URL( "http://"+IPGeoserver+"/geoserver/wfs" );
			    HttpURLConnection con = (HttpURLConnection)url.openConnection();

			    con.setDoInput(true);
			    con.setDoOutput(true);
			    con.setRequestMethod("POST");
			    con.setUseCaches (false);
			    con.setDefaultUseCaches (false);

			    con.setRequestProperty("Content-Type", "text/xml");
			    
			    OutputStreamWriter writer = new OutputStreamWriter( con.getOutputStream() );
			    writer.write(payload);

			    writer.flush();
			    writer.close();
			    
			    InputStreamReader reader = new InputStreamReader( con.getInputStream() );
			    StringBuilder buf = new StringBuilder();
			    char[] cbuf = new char[ 2048 ];
			    int num;
			    while ( -1 != (num=reader.read( cbuf )))
			    {
			        buf.append( cbuf, 0, num );
			    }
			    String result = buf.toString();
			    
			    String[] aux1 = result.split("wfs:totalUpdated");
			    
			    char aux2 = aux1[1].charAt(1);
			    
			    if(aux2=='1') {
			    	return true;
			    }
		    }catch(Exception e) {
		    	System.out.println(e.getMessage());
		    }
			
			return false;
		}
		
		//-------------------------------------------------------------------------------//
		

		// PUNTOS DE INTERES
		
		@Override
		public String registrarPuntoInteres(String nombre, String tipo, String descripcion, String telefono,
				int estrellas, String capacidad, String horaAbre, String horaCierra, String direccion, String payload) {
			try {
				switch (tipo) {
				case "Bar":
					Bar barpoi = new Bar();
					barpoi.setNombre(nombre);
					barpoi.setDescripcion(descripcion);
					barpoi.setTelefono(telefono);
					barpoi.setHoraAbre(horaAbre);
					barpoi.setHoraCierra(horaCierra);
					barpoi.setAddress(direccion);
					userTransaction.begin();
					em.persist(barpoi);
					if(this.persistirBDGeografica(this.modificarPayload(barpoi.getId(), payload))) {
						userTransaction.commit();
						return "true-"+barpoi.getId();
					}
					else {
						userTransaction.rollback();
						return "false";
					}
//					return "true-"+barpoi.getId();
					
				case "Hotel":
					Hotel hot = new Hotel();
					hot.setNombre(nombre);
					hot.setCapacidad(capacidad);
					hot.setDescripcion(descripcion);
					hot.setTelefono(telefono);
					hot.setEstrellas(estrellas);
					hot.setAddress(direccion);
					userTransaction.begin();
					em.persist(hot);
					if(this.persistirBDGeografica(this.modificarPayload(hot.getId(), payload))) {
						userTransaction.commit();
						return "true-"+hot.getId();
					}
					else {
						userTransaction.rollback();
						return "false";
					}
//					return "true-"+hot.getId();					
					
				case "Estadio":
					Estadio est = new Estadio();
					est.setNombre(nombre);
					est.setDescripcion(descripcion);
					est.setCapacidad(capacidad);
					est.setAddress(direccion);
					userTransaction.begin();
					em.persist(est);
					if(this.persistirBDGeografica(this.modificarPayload(est.getId(), payload))) {
						userTransaction.commit();
						return "true-"+est.getId();
					}
					else {
						userTransaction.rollback();
						return "false";
					}
//					return "true-"+est.getId();
					
				case "LugarTuristico":
					LugarTuristico lut = new LugarTuristico();
					lut.setNombre(nombre);
					lut.setDescripcion(descripcion);
					lut.setPuntuacion(0);
					lut.setAddress(direccion);
					userTransaction.begin();
					em.persist(lut);
					if(this.persistirBDGeografica(this.modificarPayload(lut.getId(), payload))) {
						userTransaction.commit();
						return "true-"+lut.getId();
					}
					else {
						userTransaction.rollback();
						return "false";
					}
//					return "true-"+lut.getId();
					
				default:
					return "false";
				}
				
				
			} catch (NotSupportedException | SystemException | SecurityException | IllegalStateException | RollbackException | HeuristicMixedException | HeuristicRollbackException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "false";
			}
		}


		@Override
		public List<Puntosinteres> getAllHotels() {
			try {
				List<Puntosinteres> puntosinteres = em.createQuery("SELECT c FROM Puntosinteres c WHERE dtype = 'Hotel'", Puntosinteres.class).getResultList();
				return puntosinteres;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}
		
		@Override
		public List<Puntosinteres> getAllPointsOfInterest() {
			try {
				List<Puntosinteres> puntosinteres = em.createQuery("SELECT c FROM Puntosinteres c", Puntosinteres.class).getResultList();
				return puntosinteres;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}
	
		//// PROMOCIONES


		@Override
		public String registrarPromocion(String nombre, String descripcion, int idPuntoInteres, String payload) {
			try {
				Promocion prom = new Promocion();
				prom.setDescripcion(descripcion);
				prom.setNombre(nombre);
				Puntosinteres punt = em.find(Puntosinteres.class,idPuntoInteres);
				prom.setPuntoint(punt);
				userTransaction.begin();
				em.persist(prom);
				if(this.persistirBDGeografica(payload)) {
					userTransaction.commit();
					return "true-"+idPuntoInteres;
				}
				else {
					userTransaction.rollback();
					return "false";
				}
			}catch (SecurityException | IllegalStateException | RollbackException | HeuristicMixedException | HeuristicRollbackException | SystemException | NotSupportedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return "false-NaN";
			}
		}


		@Override
		public List<Promocion> getAlllPromocion() {
			try {
				List<Promocion> promos = em.createQuery("SELECT c FROM Promocion c", Promocion.class).getResultList();
				return promos;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}


		@Override
		public boolean registrarComentario(String comentario, String idUser, int idPuntoInteres, int calificacion, String payload) {
			try {
				Comentario com = new Comentario();
				com.setText(comentario);
				Puntosinteres punt = em.find(Puntosinteres.class,idPuntoInteres);
				double aux = this.getQualification(punt.getId());
				int p = (int) Math.round(aux);
				System.out.println("id punto de interes " + p);
				punt.setPuntuacion(p);
				
				com.setPuntoint(punt);
				Usuario user = em.find(Usuario.class,idUser);
				com.setUsuario(user);
				java.util.Date utilDate = new java.util.Date();
				java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
				com.setFecha(sqlDate);
				com.setCalificacion(calificacion);
				userTransaction.begin();
				em.merge(punt);
				em.persist(com);
				if(this.modificarBDGeografica(this.modificarPayload(p, payload))) {
					userTransaction.commit();
					return true;
				}else {
					userTransaction.rollback();
					return false;
				}
				
			}catch (SecurityException | IllegalStateException | RollbackException | HeuristicMixedException | HeuristicRollbackException | SystemException | NotSupportedException e) {
				// TODO Auto-generated catch block
//				e.printStackTrace();
				System.out.println("encontrasete el error");
				return false;
			}
		}


		@Override
		public Double getQualification(int idPuntoInteres) {
			try {
				String comand = "SELECT AVG(c.calificacion) FROM Comentario c WHERE puntoint_id ='" + idPuntoInteres +"'";
				List<Double> comment = em.createQuery(comand, Double.class).getResultList();
				if (comment.get(0) == null) {
					return 0.0;
				}else {
					return comment.get(0);
				}
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				System.out.println("catch en getqualification "  + idPuntoInteres);
				return 0.0;
			}
		}


		@Override
		public List<DtComentario> getComments(int idPuntoInteres) {
			try {
				String comand = "SELECT c FROM Comentario c WHERE puntoint_id ='" + idPuntoInteres +"'";
				List<Comentario> comment = em.createQuery(comand, Comentario.class).getResultList();
				List<DtComentario> aux = new ArrayList<DtComentario>();
				int i= 0;
				int to = comment.size();
				for(i = 0; i<to; i++) {
					DtComentario com = new DtComentario();
					com.setCalificacion(comment.get(i).getCalificacion());
					com.setFecha(comment.get(i).getFecha());
					com.setText(comment.get(i).getText());
					if(comment.get(i).getUsuario() == null) {
						com.setNickUser("Anonimo");
					}
					else 
						com.setNickUser(comment.get(i).getUsuario().getNick());
					aux.add(i, com);
					
				}
				return aux;
			} catch (SecurityException | IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return null;
			}
		}


}
