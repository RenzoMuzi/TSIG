package tsig.data;

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
import javax.transaction.UserTransaction;

/**
 * Session Bean implementation class DBControladorTerciario
 */
@Singleton
@Startup
@TransactionManagement(TransactionManagementType.BEAN)
@TransactionAttribute(TransactionAttributeType.SUPPORTS)
public class DBControladorTerciario implements DBControladorTerciarioLocal {

	@PersistenceContext
	private EntityManager em;
	
	@Resource
	private UserTransaction userTransaction;
	
    public DBControladorTerciario() {
        // TODO Auto-generated constructor stub
    }

}
