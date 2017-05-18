<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<!-- Style sheet -->
	<link rel="stylesheet" type="text/css" href="styles.css">
	<!-- Ajax and JQuerry -->
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script>
	<!-- JavaScript and php files -->
	<script type="text/javascript" src="JS.js"></script>
	<title> Main page </title>
</head>
<body>
	<h1 id="title">Reserva de billetes</h1>

	<fieldset id="choosedest" class="bordered">
		<legend>Destinos</legend>
		<select id="dest_selector">
			<option value="">----</option>
		</select>
	</fieldset>

	<fieldset id="chooseseats" class="bordered">
		<legend>Elige plazas</legend>
		<div id="chooseseats_div"></div>
	</fieldset>

	<fieldset id="clientdata" class="bordered">
		<legend>Datos del cliente</legend>
		<form id="request_form">
		<div>
			<label>Nombre*</label>
			<input type="text" name="name" id="NAMEfield">
		</div>
		<div>
			<label>NIF*</label>
			<input type="text" name="nif" id="NIFfield">
		</div>
		<div>
			<label>Email*</label>
			<input type="text" name="mail" id="MAILfield">
		</div>
		<div>
			<button id="submit-button" type="submit" form="form" value="Enviar consulta">Reservar plazas</button>
		</div> 
	</form>
</fieldset>

</body>
</html>