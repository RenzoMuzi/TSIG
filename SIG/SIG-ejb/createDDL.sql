CREATE TABLE USUARIO (NICK VARCHAR(255) NOT NULL, DTYPE VARCHAR(31), PSW VARCHAR(255), EMAIL VARCHAR(255), NOMBRE VARCHAR(255), HOTEL_ID INTEGER, SELECCION_ID INTEGER, PRIMARY KEY (NICK))
CREATE TABLE COMENTARIO (ID INTEGER NOT NULL, FECHA DATE, TEXT VARCHAR(255), PUNTOINT_ID INTEGER, USUARIO_NICK VARCHAR(255), PRIMARY KEY (ID))
CREATE TABLE PUNTOSINTERES (ID INTEGER NOT NULL, DTYPE VARCHAR(31), ADDRESS VARCHAR(255), NOMBRE VARCHAR(255), PUNTUACION INTEGER, PRIMARY KEY (ID))
CREATE TABLE PARTIDO (ID INTEGER NOT NULL, FECHA DATE, FINALIZADO BOOLEAN, RESULTL INTEGER, RESULTV INTEGER, LOCAL_ID INTEGER, VISITANTE_ID INTEGER, PRIMARY KEY (ID))
CREATE TABLE PROMOCION (ID INTEGER NOT NULL, DESCRIPCION VARCHAR(255), PUNTOINT_ID INTEGER, PRIMARY KEY (ID))
CREATE TABLE SELECCION (ID INTEGER NOT NULL, PAIS VARCHAR(255), PRIMARY KEY (ID))
ALTER TABLE USUARIO ADD CONSTRAINT FK_USUARIO_SELECCION_ID FOREIGN KEY (SELECCION_ID) REFERENCES SELECCION (ID)
ALTER TABLE USUARIO ADD CONSTRAINT FK_USUARIO_HOTEL_ID FOREIGN KEY (HOTEL_ID) REFERENCES PUNTOSINTERES (ID)
ALTER TABLE COMENTARIO ADD CONSTRAINT FK_COMENTARIO_PUNTOINT_ID FOREIGN KEY (PUNTOINT_ID) REFERENCES PUNTOSINTERES (ID)
ALTER TABLE COMENTARIO ADD CONSTRAINT FK_COMENTARIO_USUARIO_NICK FOREIGN KEY (USUARIO_NICK) REFERENCES USUARIO (NICK)
ALTER TABLE PARTIDO ADD CONSTRAINT FK_PARTIDO_VISITANTE_ID FOREIGN KEY (VISITANTE_ID) REFERENCES SELECCION (ID)
ALTER TABLE PARTIDO ADD CONSTRAINT FK_PARTIDO_LOCAL_ID FOREIGN KEY (LOCAL_ID) REFERENCES SELECCION (ID)
ALTER TABLE PROMOCION ADD CONSTRAINT FK_PROMOCION_PUNTOINT_ID FOREIGN KEY (PUNTOINT_ID) REFERENCES PUNTOSINTERES (ID)
CREATE TABLE SEQUENCE (SEQ_NAME VARCHAR(50) NOT NULL, SEQ_COUNT DECIMAL(38), PRIMARY KEY (SEQ_NAME))
INSERT INTO SEQUENCE(SEQ_NAME, SEQ_COUNT) values ('SEQ_GEN', 0)