<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">

<!--     <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"> -->

    <title>TSIG</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">

    <!-- Custom styles for this template -->
    <link rel="stylesheet" href="css/signinLogin.css">
  </head>

  <body class="text-center" background="imgs/img1.jpg" style="background-size: cover;">
    <form class="form-signin">
   
      <h1 id="titleLogin" class="h3 mb-3 font-weight-normal">Ingresar</h1>
      <label for="inputEmail" class="sr-only">NickName</label>
      <input type="text" id="inputnickname" class="form-control" placeholder="Nickname" required>
      <label for="inputPassword" class="sr-only">Contrase&#241;a</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Contrase&#241;a" required>
      <label for="inputConfirmPassword" class="sr-only">Confirmacion de Contrase&#241;a</label>
      <input type="password" id="inputConfirmPassword" class="form-control hide-on-login" placeholder="Repita contraseña" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="recordarme">  Recordarme
        </label>
      </div>
      <button id="login" class="btn btn-lg btn-primary btn-block" type="button" onclick="logIn()">Ingresar</button>
      <button id="register" class="btn btn-lg btn-outline-primary btn-block" type="button" onclick="displayRegisterForm()">Registrarse</button>
      <div id="alertContainerLogin" class="nice-top-separation-login"></div>
      <p class="mt-5 mb-3 text-muted">&copy; TSIG - 2018</p>
    </form>
    <script src="js/VariablesGlobales.js"></script>
    <script src="js/signinLogin.js"></script>
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js" integrity="sha384-cs/chFZiN24E4KMATLdqdvsezGxaGsi4hLGOzlXwp5UZB1LY//20VyM2taTB4QvJ" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script>    
  </body>
</html>
