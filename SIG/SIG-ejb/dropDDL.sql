ALTER TABLE USUARIO DROP CONSTRAINT FK_USUARIO_SELECCION_ID
ALTER TABLE USUARIO DROP CONSTRAINT FK_USUARIO_HOTEL_ID
ALTER TABLE COMENTARIO DROP CONSTRAINT FK_COMENTARIO_PUNTOINT_ID
ALTER TABLE COMENTARIO DROP CONSTRAINT FK_COMENTARIO_USUARIO_NICK
ALTER TABLE PARTIDO DROP CONSTRAINT FK_PARTIDO_VISITANTE_ID
ALTER TABLE PARTIDO DROP CONSTRAINT FK_PARTIDO_LOCAL_ID
ALTER TABLE PROMOCION DROP CONSTRAINT FK_PROMOCION_PUNTOINT_ID
DROP TABLE USUARIO CASCADE
DROP TABLE COMENTARIO CASCADE
DROP TABLE PUNTOSINTERES CASCADE
DROP TABLE PARTIDO CASCADE
DROP TABLE PROMOCION CASCADE
DROP TABLE SELECCION CASCADE
DELETE FROM SEQUENCE WHERE SEQ_NAME = 'SEQ_GEN'
