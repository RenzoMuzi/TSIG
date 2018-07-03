<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>TSIG Main Page Administrador</title>
	<script type="text/javascript" src="javascript/adminjs.js"></script>
</head>
<body>
	<div>
		<h1> Autenticarse: </h1>
		
		<table>
			<tr>
				<td> Usuario: </td>
				<td> <input type="text" id="user"/> </td>
			</tr>
			<tr>
				<td> Contraseña: </td>
				<td> <input type="password" id="psw"/> </td>
			</tr>
		</table>
		<button onclick="logIn()">Iniciar Sesion</button>
	</div>
</body>
</html>